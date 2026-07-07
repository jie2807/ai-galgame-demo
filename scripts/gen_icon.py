#!/usr/bin/env python3
"""生成游戏图标"""
import os
import sys
import json
import base64
import pathlib
import asyncio

HERE = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parent.parent

env_path = HERE / "generate-cultivation-assets" / ".env"
if env_path.exists():
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

sys.path.insert(0, r"c:\Users\Win10\.trae-cn\skills\byted-seedream-image-generate\scripts")
from seedream_image_generate import seedream_generate
from PIL import Image

VERSION = "5.0"
TIMEOUT = 600

PROMPT = (
    "a modern mobile game app icon, square format, featuring a stylized violet purple gemstone "
    "shaped like a speech bubble, symbolizing AI dialogue and storytelling, "
    "the gemstone has a glowing purple-to-magenta gradient with soft inner light, "
    "surrounded by subtle tech circuit patterns on the left and magical sparkles on the right, "
    "representing the fusion of technology and fantasy, "
    "minimalist design with clean edges, centered composition, "
    "deep dark navy background with subtle purple glow, "
    "high contrast, bold silhouette, easily recognizable at small sizes, "
    "premium mobile app icon style, iOS app icon design, "
    "no text, no letters, no words, no border, no frame"
)


async def main():
    task = {
        "prompt": PROMPT,
        "size": "2048x2048",
        "output_format": "png",
        "response_format": "b64_json",
        "watermark": False,
    }
    print(">>> Generating game icon...")
    result = await seedream_generate([task], version=VERSION, timeout=TIMEOUT)
    if result.get("status") == "success" and result.get("success_list"):
        first = result["success_list"][0]
        data_uri = list(first.values())[0]
        b64 = data_uri.split(",", 1)[1] if "," in data_uri else data_uri
        img_bytes = base64.b64decode(b64)
        print(f"[OK] icon ({len(img_bytes)} bytes)")

        out_dir = PROJECT_ROOT / "images"
        out_dir.mkdir(parents=True, exist_ok=True)

        out_path = out_dir / "game-icon.png"
        with open(out_path, "wb") as f:
            f.write(img_bytes)

        img = Image.open(out_path)
        img_512 = img.resize((512, 512), Image.LANCZOS)
        img_512.save(out_path, "PNG", optimize=True)
        print(f"  -> {out_path.name} (512x512, {out_path.stat().st_size // 1024}KB)")
        print(f"DONE: game icon saved to {out_path}")
    else:
        print(f"[FAIL] {result.get('error_detail_list', [])}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
