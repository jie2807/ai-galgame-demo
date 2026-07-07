#!/usr/bin/env python3
"""
将 raw_green/<npcid>.png 中的纯绿幕背景抠除，输出透明 PNG 到 images/portraits/doomsday/<npcid>.png
算法：RGB+HSV 双重绿色判定 -> 形态学清理 -> 高斯羽化 -> 绿色溢出抑制
"""
import sys
import pathlib
import numpy as np
from PIL import Image, ImageFilter

HERE = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parent.parent
RAW_DIR = HERE / "raw_green"
OUT_DIR = PROJECT_ROOT / "images" / "portraits" / "doomsday"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# 绿色判定阈值（针对 #00FF00 绿幕及轻微光照变化）
G_MIN = 60
G_MINUS_R = 35
G_MINUS_B = 35


def build_green_mask(arr: np.ndarray) -> np.ndarray:
    """返回布尔数组，True 表示该像素是绿色背景"""
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    rgb_green = (G > G_MIN) & ((G - R) > G_MINUS_R) & ((G - B) > G_MINUS_B)

    # HSV 辅助：转 HSV 取 H 通道，绿色 Hue 约在 40-120（Pillow H 范围 0-255）
    img = Image.fromarray(arr.astype(np.uint8), mode="RGB")
    hsv = np.array(img.convert("HSV"))
    H, S, V = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    hsv_green = (H >= 35) & (H <= 130) & (S > 60) & (V > 50)

    return rgb_green & hsv_green


def matte(input_path: pathlib.Path, output_path: pathlib.Path) -> None:
    img = Image.open(input_path).convert("RGB")
    arr = np.array(img).astype(np.int16)

    green_mask = build_green_mask(arr)
    # alpha：非绿=255（不透明），绿=0（透明）
    alpha = np.where(green_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")

    # 形态学闭运算（膨胀→腐蚀）：填补人物内部被误判为绿色的小孔
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(5))
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(5))
    # 形态学开运算（腐蚀→膨胀）：去除背景中孤立的小实色噪点
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(3))

    # 边缘羽化
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.3))
    alpha = np.array(alpha_img)

    # 绿色溢出抑制（spill removal）：对半透明边缘像素，把 G 降到 max(R,B)
    edge = (alpha > 0) & (alpha < 250)
    arr_out = arr.copy()
    spill_G = np.maximum(arr[:, :, 0], arr[:, :, 2])
    arr_out[:, :, 1] = np.where(edge, spill_G, arr[:, :, 1])
    arr_out = np.clip(arr_out, 0, 255).astype(np.uint8)

    rgba = np.dstack([arr_out, alpha])
    final = Image.fromarray(rgba, mode="RGBA")
    # 缩放到目标立绘尺寸（与 noxasen 范例一致 512x768），控制体积
    final = final.resize((512, 768), Image.LANCZOS)
    # 量化为 palette PNG 压缩体积（205KB -> ~38KB），保留 transparency
    final_q = final.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.NONE)
    final_q.save(output_path, "PNG", optimize=True)


def main():
    targets = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    count = 0
    failed = []
    for f in sorted(RAW_DIR.glob("*.png")):
        npcid = f.stem
        if targets and npcid not in targets:
            continue
        out_path = OUT_DIR / f"{npcid}.png"
        print(f"[MATTE] {npcid} ...")
        try:
            matte(f, out_path)
            # 简要统计透明像素占比
            check = Image.open(out_path)
            a = np.array(check.split()[-1])
            trans = int((a < 10).sum())
            total = a.size
            print(f"  -> {out_path} (透明占比 {trans*100//total}%)")
            count += 1
        except Exception as e:
            print(f"  [ERR] {npcid}: {e}")
            failed.append(npcid)

    print(f"\n抠图完成：{count} 张成功 -> {OUT_DIR}")
    if failed:
        print(f"失败: {failed}")
        sys.exit(1)


if __name__ == "__main__":
    main()
