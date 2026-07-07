"""临时脚本：把 characters.js 中 12 个 NPC 的 portrait 字段从 fallback SVG 改为 doomsday 立绘路径。"""
import pathlib
import re

P = pathlib.Path(r"d:\BC\ai_resume\qmzz\data\characters.js")
NPCS = {"linshen", "suqing", "laozhou", "xiaolu", "lie", "lingshuang",
        "alpha", "mila", "yuanzhang", "lin", "shenfu", "ada"}

lines = P.read_text(encoding="utf-8").splitlines(keepends=True)
current = None
in_gacha = False
changed = 0
for i, line in enumerate(lines):
    if "let gachaPool" in line:
        in_gacha = True
        current = None
        continue
    if not in_gacha:
        m = re.match(r"\s*(\w+):\s*\{", line)
        if m and m.group(1) in NPCS:
            current = m.group(1)
    else:
        m = re.search(r"id:\s*'(\w+)'", line)
        if m and m.group(1) in NPCS:
            current = m.group(1)
    if current and "portrait: 'assets/portraits/fallback-" in line:
        new_line = line.replace(
            "assets/portraits/fallback-male.svg",
            f"images/portraits/doomsday/{current}.png"
        ).replace(
            "assets/portraits/fallback-female.svg",
            f"images/portraits/doomsday/{current}.png"
        )
        if new_line != line:
            lines[i] = new_line
            changed += 1
            print(f"  L{i+1} [{current}] -> images/portraits/doomsday/{current}.png")

P.write_text("".join(lines), encoding="utf-8")
print(f"\n共替换 {changed} 处 portrait 字段")
