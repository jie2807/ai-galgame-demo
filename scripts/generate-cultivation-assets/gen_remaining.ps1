# 顺序生成剩余 8 立绘 + 5 场景图，每张间隔 15 秒避免 429
$ErrorActionPreference = "Continue"
$portraits = @("murongwaner", "fengqiwu", "suwen", "xiaoyichen", "situhao", "mowuji", "wangteng", "luqingyang")
$scenes = @("sealing-array", "five-sect-battlefield", "heaven-tribulation-altar", "ascension-platform", "immortal-gate")

Write-Host "=== Generating 8 portraits ==="
foreach ($p in $portraits) {
    Write-Host "`n### Portrait: $p ###"
    python -u scripts\generate-cultivation-assets\gen_one.py $p portrait
    Start-Sleep -Seconds 15
}

Write-Host "`n=== Generating 5 scenes ==="
foreach ($s in $scenes) {
    Write-Host "`n### Scene: $s ###"
    python -u scripts\generate-cultivation-assets\gen_one.py $s scene
    Start-Sleep -Seconds 15
}

Write-Host "`n=== ALL DONE ==="
