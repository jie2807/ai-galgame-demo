#!/usr/bin/env python3
"""
为官方剧本「修仙：乱编的」批量生成 15 个 NPC 的绿幕立绘原图。
调用 byted-seedream-image-generate skill，结果保存到 raw_green/<npcid>.png。
抠图由 matting.py 单独处理（输出到 images/portraits/cultivation/）。
"""
import os
import sys
import json
import base64
import time
import pathlib
import asyncio

HERE = pathlib.Path(__file__).resolve().parent

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

RAW_DIR = HERE / "raw_green"
RAW_DIR.mkdir(exist_ok=True)

VERSION = "5.0"
# 5.0 要求 size 像素数 ≥ 3686400；2048x3072 为竖版 2:3，抠图后缩放到 512x768
SIZE = "2048x3072"
MAX_RETRY = 3
TIMEOUT = 600


async def gen_one(npcid: str, full_prompt: str) -> bool:
    task = {
        "prompt": full_prompt,
        "size": SIZE,
        "output_format": "png",
        "response_format": "b64_json",
        "watermark": False,
    }
    for attempt in range(1, MAX_RETRY + 1):
        try:
            print(f"\n>>> [{npcid}] 第 {attempt}/{MAX_RETRY} 次生成...")
            result = await seedream_generate([task], version=VERSION, timeout=TIMEOUT)
            if result.get("status") == "success" and result.get("success_list"):
                first = result["success_list"][0]
                data_uri = list(first.values())[0]
                if "," in data_uri:
                    b64 = data_uri.split(",", 1)[1]
                else:
                    b64 = data_uri
                img_bytes = base64.b64decode(b64)
                out = RAW_DIR / f"{npcid}.png"
                out.write_bytes(img_bytes)
                print(f"[OK] {npcid} -> {out} ({len(img_bytes)} bytes)")
                return True
            else:
                err = result.get("error_list") or result.get("error_detail_list")
                print(f"[FAIL] {npcid}: {err}")
        except Exception as e:
            print(f"[ERR] {npcid}: {e}")
        if attempt < MAX_RETRY:
            time.sleep(3)
    return False


async def main():
    prompts = json.loads((HERE / "prompts.json").read_text(encoding="utf-8"))
    style_suffix = prompts["_style_suffix"]
    npcs = prompts["npcs"]

    # 支持命令行参数指定 subset，例如 python gen_portraits.py suwanqing linyueyao
    targets = sys.argv[1:] if len(sys.argv) > 1 else list(npcs.keys())

    results = {}
    for npcid in targets:
        if npcid not in npcs:
            print(f"[SKIP] 未知 npcid: {npcid}")
            continue
        full_prompt = npcs[npcid]["prompt"] + ", " + style_suffix
        ok = await gen_one(npcid, full_prompt)
        results[npcid] = ok

    print("\n=== 生成结果汇总 ===")
    for k, v in results.items():
        print(f"  {k}: {'OK' if v else 'FAIL'}")
    failed = [k for k, v in results.items() if not v]
    if failed:
        print(f"\n失败列表: {failed}")
        sys.exit(1)
    print("\n全部生成成功。下一步运行 matting.py 抠图。")


if __name__ == "__main__":
    asyncio.run(main())
