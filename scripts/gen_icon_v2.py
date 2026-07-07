#!/usr/bin/env python3
"""生成游戏图标 v2 - 参考战双帕弥什/鸣潮风格"""
import os
import sys
import json
import base64
import pathlib
import asyncio

HERE = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parent  # scripts/ -> qmzz/

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
    "a premium mobile game app icon in the style of Punishing Gray Raven and Wuthering Waves, "
    "featuring a stunning close-up portrait of an elegant young female character, "
    "silver-white hair with subtle violet streaks flowing dynamically, "
    "glowing violet-purple eyes with an intense mysterious gaze, "
    "delicate porcelain skin with refined facial features, confident expression, "
    "wearing a sleek futuristic dark outfit with crystalline armor shoulder accent and high collar, "
    "a small glowing violet gemstone embedded on her chest, "
    "dark gradient background from deep purple to near-black with subtle geometric tech patterns, "
    "dramatic cinematic rim lighting in violet and cyan tones, "
    "highly detailed anime game character art, sharp focus, "
    "centered composition, square format, "
    "premium mobile game app icon design, "
    "no text, no letters, no words, no logo, no border, no frame"
)


async def main():
    task = {
        "prompt": PROMPT,
        "size": "2048x2048",
        "output_format": "png",
        "response_format": "b64_json",
        "watermark": False,
    }
    print(">>> Generating game icon v2 (PGR/Wuthering Waves style)...")
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
