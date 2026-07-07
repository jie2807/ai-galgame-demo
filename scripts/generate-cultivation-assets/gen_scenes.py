#!/usr/bin/env python3
"""
为官方剧本「修仙：乱编的」批量生成 12 个场景背景图。
调用 byted-seedream-image-generate skill，结果直接保存到 images/scenes/cultivation/<locationid>.png。
场景图无需抠图，生成后用 Pillow 缩放压缩到 1536x640。
（与末日方舟方案完全一致，仅改 OUT_DIR）
"""
import os
import sys
import json
import base64
import time
import pathlib
import asyncio

from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parent.parent

# 1) 读取 .env 注入 ARK_API_KEY（必须在导入 skill 之前）
env_path = HERE / ".env"
if env_path.exists():
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

# 2) 导入 skill 的 seedream_generate
SKILL_SCRIPTS = r"c:\Users\Win10\.trae-cn\skills\byted-seedream-image-generate\scripts"
sys.path.insert(0, SKILL_SCRIPTS)
try:
    from seedream_image_generate import seedream_generate
except Exception as e:
    print(f"[FATAL] 无法导入 seedream_generate: {e}")
    print(f"  skill 路径: {SKILL_SCRIPTS}")
    sys.exit(1)

# 中间产物目录（原始大图，不提交）
RAW_DIR = HERE / "raw_scenes"
RAW_DIR.mkdir(exist_ok=True)
# 最终输出目录
OUT_DIR = PROJECT_ROOT / "images" / "scenes" / "cultivation"
OUT_DIR.mkdir(parents=True, exist_ok=True)

VERSION = "5.0"
# 5.0 要求 size 像素数 ≥ 3686400；3072x1536 = 4.72MP（2:1 宽幅）
SIZE = "3072x1536"
# 最终输出尺寸（保持 2.4:1 宽幅，适合做背景）
OUT_W, OUT_H = 1536, 640
MAX_RETRY = 3
TIMEOUT = 600


def compress_scene(raw_path: pathlib.Path, out_path: pathlib.Path) -> None:
    """缩放到 1536x640 并量化压缩"""
    img = Image.open(raw_path).convert("RGB")
    img = img.resize((OUT_W, OUT_H), Image.LANCZOS)
    # 场景图是 RGB，用 FASTOCTREE 量化为 palette PNG 压缩体积
    img_q = img.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
    img_q.save(out_path, "PNG", optimize=True)


async def gen_one(location_id: str, full_prompt: str) -> bool:
    task = {
        "prompt": full_prompt,
        "size": SIZE,
        "output_format": "png",
        "response_format": "b64_json",
        "watermark": False,
    }
    for attempt in range(1, MAX_RETRY + 1):
        try:
            print(f"\n>>> [{location_id}] 第 {attempt}/{MAX_RETRY} 次生成...")
            result = await seedream_generate([task], version=VERSION, timeout=TIMEOUT)
            if result.get("status") == "success" and result.get("success_list"):
                first = result["success_list"][0]
                data_uri = list(first.values())[0]
                if "," in data_uri:
                    b64 = data_uri.split(",", 1)[1]
                else:
                    b64 = data_uri
                img_bytes = base64.b64decode(b64)
                raw_path = RAW_DIR / f"{location_id}.png"
                raw_path.write_bytes(img_bytes)
                print(f"[RAW] {location_id} -> {raw_path} ({len(img_bytes)} bytes)")
                # 压缩到最终输出
                out_path = OUT_DIR / f"{location_id}.png"
                compress_scene(raw_path, out_path)
                size_kb = out_path.stat().st_size // 1024
                print(f"[OK] {location_id} -> {out_path} ({size_kb}KB)")
                return True
            else:
                err = result.get("error_list") or result.get("error_detail_list")
                print(f"[FAIL] {location_id}: {err}")
        except Exception as e:
            print(f"[ERR] {location_id}: {e}")
        if attempt < MAX_RETRY:
            time.sleep(3)
    return False


async def main():
    prompts = json.loads((HERE / "scene_prompts.json").read_text(encoding="utf-8"))
    style_suffix = prompts["_style_suffix"]
    scenes = prompts["scenes"]

    # 支持命令行参数指定 subset
    targets = sys.argv[1:] if len(sys.argv) > 1 else list(scenes.keys())

    results = {}
    for location_id in targets:
        if location_id not in scenes:
            print(f"[SKIP] 未知 location_id: {location_id}")
            continue
        full_prompt = scenes[location_id]["prompt"] + ", " + style_suffix
        ok = await gen_one(location_id, full_prompt)
        results[location_id] = ok

    print("\n=== 生成结果汇总 ===")
    for k, v in results.items():
        print(f"  {k}: {'OK' if v else 'FAIL'}")
    failed = [k for k, v in results.items() if not v]
    if failed:
        print(f"\n失败列表: {failed}")
        sys.exit(1)
    print("\n全部场景图生成成功。")


if __name__ == "__main__":
    asyncio.run(main())
