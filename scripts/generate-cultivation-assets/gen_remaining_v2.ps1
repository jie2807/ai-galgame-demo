# 顺序生成剩余 8 立绘 + 5 场景图，90 秒间隔避免 429
$ErrorActionPreference = "Continue"
$portraits = @("murongwaner", "fengqiwu", "suwen", "xiaoyichen", "situhao", "mowuji", "wangteng", "luqingyang")
$scenes = @("sealing-array", "five-sect-battlefield", "heaven-tribulation-altar", "ascension-platform", "immortal-gate")

Write-Host "=== Generating 8 portraits (90s interval) ==="
foreach ($p in $portraits) {
    Write-Host "`n### Portrait: $p ###"
    python -u scripts\generate-cultivation-assets\gen_one_v2.py $p portrait
    Write-Host "Waiting 90s before next..."
    Start-Sleep -Seconds 90
}

Write-Host "`n=== Generating 5 scenes (90s interval) ==="
foreach ($s in $scenes) {
    Write-Host "`n### Scene: $s ###"
    python -u scripts\generate-cultivation-assets\gen_one_v2.py $s scene
    Write-Host "Waiting 90s before next..."
    Start-Sleep -Seconds 90
}

Write-Host "`n=== ALL DONE ==="
