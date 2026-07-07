# 顺序生成剩余 7 立绘 + 5 场景图，15 秒间隔
$ErrorActionPreference = "Continue"
# murongwaner 已生成，跳过
$portraits = @("fengqiwu", "suwen", "xiaoyichen", "situhao", "mowuji", "wangteng", "luqingyang")
$scenes = @("sealing-array", "five-sect-battlefield", "heaven-tribulation-altar", "ascension-platform", "immortal-gate")

Write-Host "=== Generating 7 portraits (15s interval) ==="
foreach ($p in $portraits) {
    Write-Host "`n### Portrait: $p ###"
    python -u scripts\generate-cultivation-assets\gen_one.py $p portrait
    Start-Sleep -Seconds 15
}

Write-Host "`n=== Generating 5 scenes (15s interval) ==="
foreach ($s in $scenes) {
    Write-Host "`n### Scene: $s ###"
    python -u scripts\generate-cultivation-assets\gen_one.py $s scene
    Start-Sleep -Seconds 15
}

Write-Host "`n=== ALL DONE ==="
