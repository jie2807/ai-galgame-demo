# 媒体资源压缩报告

生成时间：2026-06-27 21:08:09
项目根目录：`d:\BC\ai_resume\qmzz`

## 工具与环境

- ffmpeg：未安装
- oxipng：未安装
- pngquant：未安装
- jpegoptim：未安装
- Python：3.14.2
- Pillow：12.2.0

### 视频处理说明

由于系统中未找到 `ffmpeg`，且 Python 的 `ffmpeg-python`、`moviepy`、`imageio_ffmpeg`、`pymedia` 均未安装，无法对 `.mp4` 视频进行本地重新编码。
已将原始视频备份，未覆盖原文件。

**后续建议（视频压缩）：**

1. 安装 ffmpeg 后执行如下命令（保持原分辨率，H.264，CRF 25，码率约 1.5 Mbps）：
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 25 -preset slower -b:v 1.5M -c:a copy output.mp4
   ```
2. 或使用在线视频压缩服务（如 CloudConvert、FreeConvert、VEED.IO），上传后选择 H.264、720p/原分辨率、1-2 Mbps 码率再下载覆盖。

### 图片处理说明

PNG 文件使用 Pillow 以 `optimize=True` 重新保存，进行无损元数据/滤波优化；JPG 文件使用 Pillow 以 `quality=82`、`optimize=True` 重新编码。
所有引用路径保持不变，`index.html` 无需修改。

## 压缩结果汇总

- 处理成功文件数：28
- 处理失败文件数：3
- 原始总大小：29.22 MB
- 压缩后总大小：27.43 MB
- 总释放空间：1.79 MB（6.13%）

## 成功项明细

| 文件 | 类型 | 工具/参数 | 原始大小 | 压缩后大小 | 压缩率 |
|------|------|-----------|----------|------------|--------|
| `models\live2d\haru\haru_greeter_t03.2048\texture_00.png` | Live2D Texture PNG | Pillow save(optimize=True) — compressed | 1.46 MB | 1.25 MB | +14.30% |
| `models\live2d\haru\haru_greeter_t03.2048\texture_01.png` | Live2D Texture PNG | Pillow save(optimize=True) — compressed | 1.13 MB | 1.01 MB | +10.95% |
| `models\live2d\hiyori\Hiyori.2048\texture_00.png` | Live2D Texture PNG | Pillow save(optimize=True) — compressed | 1.73 MB | 1.43 MB | +17.56% |
| `models\live2d\hiyori\Hiyori.2048\texture_01.png` | Live2D Texture PNG | Pillow save(optimize=True) — compressed | 2.39 MB | 2.05 MB | +14.28% |
| `models\live2d\mao\Mao.2048\texture_00.png` | Live2D Texture PNG | Pillow save(optimize=True) — compressed | 2.99 MB | 2.82 MB | +5.54% |
| `images\portraits\noxasen\albrecht.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 38.05 KB | 38.05 KB | +0.00% |
| `images\portraits\noxasen\erich.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 48.65 KB | 48.65 KB | +0.00% |
| `images\portraits\noxasen\friedrich.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 45.58 KB | 45.58 KB | +0.00% |
| `images\portraits\noxasen\heinrich.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 33.20 KB | 33.20 KB | +0.00% |
| `images\portraits\noxasen\klara.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 38.78 KB | 38.78 KB | +0.00% |
| `images\portraits\noxasen\lena.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 38.89 KB | 38.89 KB | +0.00% |
| `images\portraits\noxasen\margaret.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 37.48 KB | 37.48 KB | +0.00% |
| `images\portraits\noxasen\weber.png` | Image PNG | Pillow save(optimize=True) — original (compressed larger) | 29.97 KB | 29.97 KB | +0.00% |
| `images\scenes\noxasen\crown-study.png` | Image PNG | Pillow save(optimize=True) — compressed | 532.66 KB | 516.62 KB | +3.01% |
| `images\scenes\noxasen\noble-manor.png` | Image PNG | Pillow save(optimize=True) — compressed | 804.99 KB | 791.71 KB | +1.65% |
| `images\scenes\noxasen\people-rally.png` | Image PNG | Pillow save(optimize=True) — compressed | 442.37 KB | 425.92 KB | +3.72% |
| `images\seal_3.png` | Image PNG | Pillow save(optimize=True) — compressed | 172.49 KB | 156.32 KB | +9.37% |
| `images\seal_4.png` | Image PNG | Pillow save(optimize=True) — compressed | 172.49 KB | 156.32 KB | +9.37% |
| `images\backgrounds\main_bg.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 172.49 KB | 57.30 KB | +66.78% |
| `images\backgrounds\vintage_texture.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 172.49 KB | 57.30 KB | +66.78% |
| `images\backgrounds\warm_light.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 172.49 KB | 57.30 KB | +66.78% |
| `images\cards\books_letters.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 172.49 KB | 57.30 KB | +66.78% |
| `images\cards\school_building.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 172.49 KB | 57.30 KB | +66.78% |
| `images\character-collection.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — original (compressed larger) | 18.58 KB | 18.58 KB | +0.00% |
| `images\evergarden-flowers.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — original (compressed larger) | 19.08 KB | 19.08 KB | +0.00% |
| `images\starry-sky.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — original (compressed larger) | 5.97 KB | 5.97 KB | +0.00% |
| `images\violet-avatar-lg.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 14.44 KB | 8.36 KB | +42.12% |
| `images\violet-avatar.jpg` | Image JPG | Pillow JPEG quality=82, optimize=True — compressed | 9.44 KB | 4.76 KB | +49.54% |

## 失败项明细

| 文件 | 原始大小 | 失败原因 |
|------|----------|----------|
| `videos\chapter_background.mp4` | 10.90 MB | ffmpeg not installed; ffmpeg-python/moviepy/imageio_ffmpeg/pymedia unavailable |
| `videos\charlist_bg.mp4` | 2.67 MB | ffmpeg not installed; ffmpeg-python/moviepy/imageio_ffmpeg/pymedia unavailable |
| `videos\main_background.mp4` | 2.67 MB | ffmpeg not installed; ffmpeg-python/moviepy/imageio_ffmpeg/pymedia unavailable |

## 备份位置

所有原始文件已备份至：`d:\BC\ai_resume\qmzz\.trae\specs\deep-slim-project-resources-and-code\backups`

---
*由 `compress_media.py` 自动生成*