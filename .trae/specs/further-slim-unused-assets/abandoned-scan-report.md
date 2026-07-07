# 废弃文件与功能扫描报告

> 扫描时间：2026/6/28 01:06:15

## 一、未引用资源文件

| 路径 | 大小 | 备注 |
|---|---:|---|
| images/seal_3.png | 156.3 KB | 无引用 |
| images/seal_4.png | 156.3 KB | 无引用 |

### Live2D 子资源引用情况

三个模型（haru / hiyori / mao）的 motion / expression / texture / moc / physics / pose / cdi 文件均已被各自的 `.model3.json` 引用，无未引用子资源。

## 二、未使用 CSS 选择器

> 基于 `styles.css` 提取 class/id 选择器，并在 `index.html` 中检查 `class="..."`、`id="..."`、`classList.add('...')`、`getElementById('...')` 等使用方式。

| 选择器 | 可释放字节 | 备注 |
|---|---:|---|
| mc-content | 22.0 KB | 未在 index.html 中使用 |
| reader-page | 15.3 KB | 未在 index.html 中使用 |
| chapter-mission-page | 15.0 KB | 未在 index.html 中使用 |
| glass-card | 4.1 KB | 未在 index.html 中使用 |
| glass-panel | 3.4 KB | 未在 index.html 中使用 |
| card | 3.1 KB | 未在 index.html 中使用 |
| glass-panel-dark | 2.7 KB | 未在 index.html 中使用 |
| chardetail-header | 2.2 KB | 未在 index.html 中使用 |
| book-footer | 2.2 KB | 未在 index.html 中使用 |
| gacha-anim-envelope | 2.1 KB | 未在 index.html 中使用 |
| npc-panel-close-btn | 2.1 KB | 未在 index.html 中使用 |
| theme-night | 1.9 KB | 未在 index.html 中使用 |
| theme-parchment | 1.8 KB | 未在 index.html 中使用 |
| game-footer | 1.8 KB | 未在 index.html 中使用 |
| theme-eye | 1.7 KB | 未在 index.html 中使用 |
| theme-day | 1.7 KB | 未在 index.html 中使用 |
| reader-toc-item | 1.6 KB | 未在 index.html 中使用 |
| panel | 1.4 KB | 未在 index.html 中使用 |
| btn-primary | 1.4 KB | 未在 index.html 中使用 |
| toast-notification | 1.4 KB | 未在 index.html 中使用 |
| glass-icon-btn | 1.3 KB | 未在 index.html 中使用 |
| glass-scrollbar | 1.2 KB | 未在 index.html 中使用 |
| page-content | 1.2 KB | 未在 index.html 中使用 |
| modal | 1.2 KB | 未在 index.html 中使用 |
| btn-danger | 1.1 KB | 未在 index.html 中使用 |
| scroll-to-top-btn | 1.1 KB | 未在 index.html 中使用 |
| btn-secondary | 1.1 KB | 未在 index.html 中使用 |
| dialogue-message | 1.0 KB | 未在 index.html 中使用 |
| settings-select | 1013 B | 未在 index.html 中使用 |
| tts-panel | 1007 B | 未在 index.html 中使用 |
| input-field | 1002 B | 未在 index.html 中使用 |
| dialogue-message-bubble | 960 B | 未在 index.html 中使用 |
| mission-start-btn | 937 B | 未在 index.html 中使用 |
| shelf-book-delete | 922 B | 未在 index.html 中使用 |
| reader-dialogue-line | 913 B | 未在 index.html 中使用 |
| msg-edit-actions | 911 B | 未在 index.html 中使用 |
| shelf-book-card | 910 B | 未在 index.html 中使用 |
| user-info-close-btn | 890 B | 未在 index.html 中使用 |
| glow-gold | 882 B | 未在 index.html 中使用 |
| npc-list-item | 857 B | 未在 index.html 中使用 |
| cce-npc-image-btn | 846 B | 未在 index.html 中使用 |
| bg-video-ctrl | 798 B | 未在 index.html 中使用 |
| charlist-rarity-btn | 786 B | 未在 index.html 中使用 |
| reader-chapter-title | 767 B | 未在 index.html 中使用 |
| script-filter-chip | 754 B | 未在 index.html 中使用 |
| mini-chapter | 752 B | 未在 index.html 中使用 |
| reader-content-title | 742 B | 未在 index.html 中使用 |
| charlist-afflatus-btn | 738 B | 未在 index.html 中使用 |
| config-close-btn | 736 B | 未在 index.html 中使用 |
| reader-book-title | 720 B | 未在 index.html 中使用 |
| reader-paragraph | 711 B | 未在 index.html 中使用 |
| book-placeholder | 702 B | 未在 index.html 中使用 |
| npc-item | 638 B | 未在 index.html 中使用 |
| tts-btn | 637 B | 未在 index.html 中使用 |
| gacha-shop-choose-item | 628 B | 未在 index.html 中使用 |
| reader-action-btn | 626 B | 未在 index.html 中使用 |
| mission-back-btn | 626 B | 未在 index.html 中使用 |
| reader-epilogue-text | 624 B | 未在 index.html 中使用 |
| reader-the-end | 623 B | 未在 index.html 中使用 |
| mc-close-btn | 603 B | 未在 index.html 中使用 |
| config-save-btn | 599 B | 未在 index.html 中使用 |
| msg-system | 586 B | 未在 index.html 中使用 |
| config-test-btn | 555 B | 未在 index.html 中使用 |
| portrait-retry-btn | 549 B | 未在 index.html 中使用 |
| chat-header-btn | 545 B | 未在 index.html 中使用 |
| mini-chapter-dot | 531 B | 未在 index.html 中使用 |
| tts-toggle-slider | 519 B | 未在 index.html 中使用 |
| script-card | 515 B | 未在 index.html 中使用 |
| reader-page-current | 514 B | 未在 index.html 中使用 |
| config-input | 513 B | 未在 index.html 中使用 |
| gacha-anim-envelope-body | 512 B | 未在 index.html 中使用 |
| mc-item-inner | 506 B | 未在 index.html 中使用 |
| shelf-book-cover-icon | 489 B | 未在 index.html 中使用 |
| reader-bookmark-item | 482 B | 未在 index.html 中使用 |
| reader-orientation-horizontal | 475 B | 未在 index.html 中使用 |
| config-select | 468 B | 未在 index.html 中使用 |
| mc-title | 466 B | 未在 index.html 中使用 |
| mail-folder-item | 456 B | 未在 index.html 中使用 |
| mail-email-item | 453 B | 未在 index.html 中使用 |
| settings-slider | 452 B | 未在 index.html 中使用 |
| ... | ... | 共 306 个，此处仅列前 80 个 |

## 三、废弃 DOM 区块与关联代码

| 区块 | DOM 标识 | 关联函数/变量 | 可释放字节 | 风险 |
|---|---|---|---|---:|---|
| 旧扭蛋页 | id: gachaPage, gachaBgVideo, gachaBackBtn, gachaLetters, gachaLettersAddBtn...<br>class: gacha-page, gacha-bg, gacha-bg-gradient, gacha-bg-video, gacha-header... | executeGachaPull（已不存在）, updateGachaUI（已不存在）, gachaState, saveGachaState, exchangeShopItem, openChooseCharacter, 以及 26634 行起的整段事件绑定 | 13.9 KB | 低（业务已废弃，存在 undefined 调用） |
| 旧书架按钮 | id: bookShelfBtn<br>class: side-btn, book-shelf-btn, side-btn-bg, side-label, side-en | openBookShelf / closeBookShelf / renderShelf 等已移除；残留 _currentReaderBook, _readerToolbarTimer, startToolbarAutoHide, stopToolbarAutoHide, navigateChapter, toggleToolbarVisibility, openAnnouncementModal, closeAnnouncementModal | 284 B | 低 |
| 旧书架页 | id: bookShelfPage, shelfBackBtn, shelfAnnounceBtn, shelfEmpty, shelfGrid<br>class: book-shelf-page, shelf-page-bg, shelf-header, shelf-back-btn, shelf-header-title... | openBookShelf / closeBookShelf / renderShelf 等已移除；残留 _currentReaderBook, _readerToolbarTimer, startToolbarAutoHide, stopToolbarAutoHide, navigateChapter, toggleToolbarVisibility, openAnnouncementModal, closeAnnouncementModal | 2.6 KB | 低 |
| 旧阅读器页 | id: bookReaderPage, readerHeader, readerBackBtn, readerTitle, readerVideoBtn...<br>class: book-reader-page, reader-page-bg, reader-header, reader-back-btn, reader-title... | 同旧书架系统残留函数；readerBackBtn/readerTocBtn 等已无事件绑定 | 18.5 KB | 低 |
| 旧一键成片进度弹窗 | id: videoProgressOverlay, videoProgressCloseBtn, videoProgressBody, videoProgressStep, videoProgressFill...<br>class: video-progress-overlay, video-progress-modal, video-progress-header, video-progress-title, video-progress-close... | generateVideoFromStoryboard / publishVideo 等已移除；DOM 无 JS 引用 | 1.3 KB | 低 |
| 旧一键成片结果弹窗 | id: videoResultOverlay, videoResultCloseBtn, videoResultBody<br>class: video-result-overlay, video-result-modal, video-result-header, video-result-title, video-result-close... | generateVideoFromStoryboard / publishVideo 等已移除；DOM 无 JS 引用 | 744 B | 低 |

### 其他已删除 DOM 但 JS/CSS 仍残留的模块

| 模块 | 残留标识 | 说明 |
|---|---|---|
| Creator Wars 旧工作室/数据中心/评论管理/抖加 | `cwStudioArea`, `cwStudioContent`, `cwDataCenter`, `cwCommentMgmt`, `cwSettingsPanel`, `cwDoujiaPanel`, `switchStudioPanel`, `.cw-platform-view`, `.cw-doujia-target`, `.cw-doujia-budget` | 静态 DOM 中已无对应元素，但 JS 仍通过 getElementById/querySelector 引用并操作。属于旧平台/工作室视图与抖加推广残留。 |
| 旧抖音主播 Agent | `_dyAnchorPersona`, `dyAnchorFetchNews`, `dyAnchorGenerateScript`, `dyAnchorComposeVideo`, `dyAnchorAutoRun`, `dyAnchorAutoCreate`, `.dy-profile-tabs`, `.dy-anchor-auto-btn` | DOM 由 JS 字符串拼接生成，相关函数仍定义在 Creator Wars 区域，疑似旧 Agent 直播/短视频模块残留。 |

## 四、未使用的 data/*.js

| 文件 | 全局变量 | 备注 |
|---|---|---|
| - | - | 所有 data/*.js 文件导出的全局变量均在 index.html 中被引用 |

## 五、可移除的中风险死代码

> 从 `dead-code-removal-report.md` / `uncalled-sized.json` 提取风险为 medium 且与本次扫描废弃模块相关的函数。

| 函数名 | 所属模块 | 移除建议 |
|---|---|---|
| updateStudioMaterialGrid | 旧平台/工作室/抖加 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| stripJsonComments | 旧平台/工作室/抖加 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| toggleToolbarVisibility | 旧书架/阅读器 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| startToolbarAutoHide | 旧书架/阅读器 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| stopToolbarAutoHide | 旧书架/阅读器 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| closeAnnouncementModal | 旧书架/阅读器 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |
| openAnnouncementModal | 旧书架/阅读器 | 对应 DOM 已废弃或无引用，建议整组移除（先确认无字符串调用） |

## 六、清理建议与优先级

1. **最高优先级：删除旧扭蛋与旧书架/阅读器 DOM 区块**
   - 旧扭蛋页（gacha-page）约 13.9 KB，且存在对 `executeGachaPull`、`updateGachaUI` 等已删除函数的调用，直接删除可消除运行时错误隐患。
   - 旧书架/阅读器区块合计约 21.4 KB，可连同残留 toolbar/announcement 函数一起删除。
2. **次高优先级：清理旧一键成片弹窗**
   - `video-progress-overlay`、`video-result-overlay` 已无对应业务函数，可安全移除。
3. **中优先级：清理 Creator Wars 旧工作室/抖加残留 JS**
   - `switchStudioPanel`、`cwDoujiaPanel`、`cwStudioArea` 等引用指向不存在的 DOM；需确认 Creator Wars 当前是否仍需要这些子视图，若不需要则整组删除。
4. **低优先级：CSS 选择器瘦身**
   - 本次共识别 306 个未使用 CSS 选择器，释放字节约 172.8 KB。建议结合 DOM 清理后统一删除，避免误删动态生成内容使用的样式。
5. **资源文件**
   - 仅发现 `images/seal_3.png` 与 `images/seal_4.png` 完全未引用，可直接删除。
