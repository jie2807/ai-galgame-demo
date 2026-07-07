#!/usr/bin/env python3
"""单张图片生成脚本：用法 python gen_one.py <id> <type>
type: portrait 或 scene
"""
import os
import sys
import json
import base64
import pathlib
import asyncio

HERE = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parent.parent

env_path = HERE / ".env"
if env_path.exists():
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

sys.path.insert(0, r"c:\Users\Win10\.trae-cn\skills\byted-seedream-image-generate\scripts")
from seedream_image_generate import seedream_generate
from PIL import Image, ImageFilter
import numpy as np

VERSION = "5.0"
MAX_RETRY = 5
TIMEOUT = 600


async def gen_one(item_id: str, full_prompt: str, size: str) -> bytes | None:
    task = {
        "prompt": full_prompt,
        "size": size,
        "output_format": "png",
        "response_format": "b64_json",
        "watermark": False,
    }
    for attempt in range(1, MAX_RETRY + 1):
        try:
            print(f">>> [{item_id}] attempt {attempt}/{MAX_RETRY}...")
            result = await seedream_generate([task], version=VERSION, timeout=TIMEOUT)
            if result.get("status") == "success" and result.get("success_list"):
                first = result["success_list"][0]
                data_uri = list(first.values())[0]
                b64 = data_uri.split(",", 1)[1] if "," in data_uri else data_uri
                img_bytes = base64.b64decode(b64)
                print(f"[OK] {item_id} ({len(img_bytes)} bytes)")
                return img_bytes
            else:
                err = result.get("error_detail_list", [])
                print(f"[FAIL] {item_id}: {err}")
                if attempt < MAX_RETRY:
                    print(f"  wait 30s before retry...")
                    await asyncio.sleep(30)
        except Exception as e:
            print(f"[ERR] {item_id}: {e}")
            if attempt < MAX_RETRY:
                await asyncio.sleep(30)
    return None


def matte_portrait(img_bytes: bytes, out_path: pathlib.Path):
    import io
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    arr = np.array(img).astype(np.int16)
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    rgb_green = (G > 60) & ((G - R) > 35) & ((G - B) > 35)
    hsv = np.array(img.convert("HSV"))
    H, S, V = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    hsv_green = (H >= 35) & (H <= 130) & (S > 60) & (V > 50)
    green_mask = rgb_green & hsv_green
    alpha = np.where(green_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(5))
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(5))
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.3))
    alpha = np.array(alpha_img)
    edge = (alpha > 0) & (alpha < 250)
    arr_out = arr.copy()
    spill_G = np.maximum(arr[:, :, 0], arr[:, :, 2])
    arr_out[:, :, 1] = np.where(edge, spill_G, arr[:, :, 1])
    arr_out = np.clip(arr_out, 0, 255).astype(np.uint8)
    rgba = np.dstack([arr_out, alpha])
    final = Image.fromarray(rgba, mode="RGBA")
    final = final.resize((512, 768), Image.LANCZOS)
    final_q = final.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.NONE)
    final_q.save(out_path, "PNG", optimize=True)
    check = Image.open(out_path).convert("RGBA")
    a = np.array(check.split()[-1])
    trans = int((a < 10).sum())
    print(f"  -> {out_path.name} (transparent {trans*100//a.size}%)")


def compress_scene(img_bytes: bytes, out_path: pathlib.Path):
    import io
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize((1536, 640), Image.LANCZOS)
    img_q = img.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
    img_q.save(out_path, "PNG", optimize=True)
    size_kb = out_path.stat().st_size // 1024
    print(f"  -> {out_path.name} ({size_kb}KB)")


async def main():
    if len(sys.argv) < 3:
        print("Usage: python gen_one.py <id> <portrait|scene>")
        sys.exit(1)
    item_id = sys.argv[1]
    item_type = sys.argv[2]

    if item_type == "portrait":
        prompts = json.loads((HERE / "prompts.json").read_text(encoding="utf-8"))
        full_prompt = prompts["npcs"][item_id]["prompt"] + ", " + prompts["_style_suffix"]
        out_dir = PROJECT_ROOT / "images" / "portraits" / "cultivation"
        out_dir.mkdir(parents=True, exist_ok=True)
        img_bytes = await gen_one(item_id, full_prompt, "2048x3072")
        if img_bytes:
            matte_portrait(img_bytes, out_dir / f"{item_id}.png")
            print(f"DONE: {item_id}")
        else:
            print(f"FAILED: {item_id}")
            sys.exit(1)
    elif item_type == "scene":
        prompts = json.loads((HERE / "scene_prompts.json").read_text(encoding="utf-8"))
        full_prompt = prompts["scenes"][item_id]["prompt"] + ", " + prompts["_style_suffix"]
        out_dir = PROJECT_ROOT / "images" / "scenes" / "cultivation"
        out_dir.mkdir(parents=True, exist_ok=True)
        img_bytes = await gen_one(item_id, full_prompt, "3072x1536")
        if img_bytes:
            compress_scene(img_bytes, out_dir / f"{item_id}.png")
            print(f"DONE: {item_id}")
        else:
            print(f"FAILED: {item_id}")
            sys.exit(1)
    else:
        print(f"Unknown type: {item_type}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
