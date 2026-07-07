# 未定义全局函数调用扫描报告

生成时间: 2026-06-28T00:19:42.045Z

扫描范围: `D:\BC\ai_resume\qmzz\index.html`（仅扫描该文件中的内联 `<script>` 与事件处理器属性）

## 扫描统计

- 内联 JS 片段数: 180
- 提取到的全局函数定义数: 763
- 提取到的全局函数调用数: 900
- 可疑「调用但无定义」函数数: 139

## 可疑未定义函数列表

| 排名 | 函数名 | 调用次数 | 是否可能为 false positive |
|------|--------|----------|---------------------------|
| 1 | `rgba` | 129 | 是（存在同名变量赋值） |
| 2 | `gradient` | 62 | 是（存在同名变量赋值） |
| 3 | `safeStorageSet` | 50 | 否 |
| 4 | `safeStorageGet` | 45 | 否 |
| 5 | `onComplete` | 35 | 否 |
| 6 | `onError` | 27 | 是（存在同名变量赋值） |
| 7 | `closeSidePanel` | 17 | 否 |
| 8 | `resolve` | 9 | 是（存在同名变量赋值） |
| 9 | `openSidePanel` | 8 | 否 |
| 10 | `renderHomePage` | 8 | 否 |
| 11 | `safeStorageRemove` | 7 | 否 |
| 12 | `onProgress` | 6 | 否 |
| 13 | `url` | 6 | 是（存在同名变量赋值） |
| 14 | `switchGameSettingsMode` | 6 | 否 |
| 15 | `applyPresetBg` | 6 | 否 |
| 16 | `SimpleChatEngine` | 5 | 是（存在同名变量赋值） |
| 17 | `setDialogueBgType` | 5 | 否 |
| 18 | `keywords` | 4 | 是（存在同名变量赋值） |
| 19 | `Live2DRenderer` | 4 | 否 |
| 20 | `callback` | 4 | 否 |
| 21 | `cb` | 4 | 是（存在同名变量赋值） |
| 22 | `updateGachaUI` | 4 | 否 |
| 23 | `onDone` | 4 | 否 |
| 24 | `onFail` | 3 | 否 |
| 25 | `updateGenProgress` | 3 | 否 |
| 26 | `binding` | 3 | 否 |
| 27 | `exchangeShopItem` | 3 | 否 |
| 28 | `switchSaveTab` | 3 | 否 |
| 29 | `onResult` | 2 | 是（存在同名变量赋值） |
| 30 | `translate` | 2 | 否 |
| 31 | `not` | 2 | 否 |
| 32 | `markMessagesDeprecated` | 2 | 否 |
| 33 | `swipeToVersion` | 2 | 否 |
| 34 | `clearSaveSlot` | 2 | 否 |
| 35 | `wtLoadNode` | 2 | 否 |
| 36 | `wtBranchNode` | 2 | 否 |
| 37 | `wtDeleteNodeConfirm` | 2 | 否 |
| 38 | `executeGachaPull` | 2 | 否 |
| 39 | `messages` | 2 | 是（存在同名变量赋值） |
| 40 | `clamp` | 2 | 否 |
| 41 | `translateX` | 2 | 否 |
| 42 | `updateMetricsPanel` | 2 | 否 |
| 43 | `updateManipulatePanel` | 2 | 否 |
| 44 | `app` | 1 | 是（存在同名变量赋值） |
| 45 | `Functionality` | 1 | 否 |
| 46 | `Modal` | 1 | 否 |
| 47 | `updateTestMotionButtons` | 1 | 否 |
| 48 | `updateTestSkinButtons` | 1 | 否 |
| 49 | `SpriteSheetRenderer` | 1 | 否 |
| 50 | `errorCb` | 1 | 否 |
| 51 | `queryLorebookWithPositions` | 1 | 否 |
| 52 | `memories` | 1 | 是（存在同名变量赋值） |
| 53 | `onChunk` | 1 | 否 |
| 54 | `interactions` | 1 | 否 |
| 55 | `summaries` | 1 | 否 |
| 56 | `appearance` | 1 | 否 |
| 57 | `change` | 1 | 否 |
| 58 | `description` | 1 | 是（存在同名变量赋值） |
| 59 | `chars` | 1 | 是（存在同名变量赋值） |
| 60 | `dialogue` | 1 | 否 |
| 61 | `tryAutoBGM` | 1 | 否 |
| 62 | `EventEngine` | 1 | 是（存在同名变量赋值） |
| 63 | `ScriptEngineBridge` | 1 | 否 |
| 64 | `caller` | 1 | 否 |
| 65 | `initialized` | 1 | 否 |
| 66 | `ActionTagParser` | 1 | 否 |
| 67 | `preload` | 1 | 否 |
| 68 | `ID` | 1 | 否 |
| 69 | `interaction` | 1 | 否 |
| 70 | `WorldTreeStorage` | 1 | 是（存在同名变量赋值） |
| 71 | `_confirmModalResolve` | 1 | 是（存在同名变量赋值） |
| 72 | `name` | 1 | 是（存在同名变量赋值） |
| 73 | `segments` | 1 | 是（存在同名变量赋值） |
| 74 | `speak` | 1 | 否 |
| 75 | `pipe` | 1 | 否 |
| 76 | `cb1` | 1 | 是（存在同名变量赋值） |
| 77 | `AC` | 1 | 是（存在同名变量赋值） |
| 78 | `res` | 1 | 是（存在同名变量赋值） |
| 79 | `set` | 1 | 否 |
| 80 | `bar` | 1 | 是（存在同名变量赋值） |
| 81 | `typewriter` | 1 | 否 |
| 82 | `restore` | 1 | 否 |
| 83 | `Locations` | 1 | 否 |
| 84 | `onUpdate` | 1 | 否 |
| 85 | `showImportPreview` | 1 | 否 |
| 86 | `showGenProgress` | 1 | 否 |
| 87 | `completeGenProgress` | 1 | 否 |
| 88 | `showSuccessToast` | 1 | 否 |
| 89 | `hideGenProgress` | 1 | 否 |
| 90 | `script` | 1 | 是（存在同名变量赋值） |
| 91 | `initGameUI` | 1 | 否 |
| 92 | `showExitConfirm` | 1 | 否 |
| 93 | `wtDeleteNode` | 1 | 否 |
| 94 | `Management` | 1 | 否 |
| 95 | `importAllData` | 1 | 否 |
| 96 | `Layout` | 1 | 否 |
| 97 | `showEnvelopeResult` | 1 | 否 |
| 98 | `closeEnvelopeResult` | 1 | 否 |
| 99 | `Memory` | 1 | 否 |
| 100 | `Mail` | 1 | 否 |
| 101 | `topics` | 1 | 否 |
| 102 | `highlights` | 1 | 否 |
| 103 | `brightness` | 1 | 否 |
| 104 | `handling` | 1 | 否 |
| 105 | `body` | 1 | 是（存在同名变量赋值） |
| 106 | `fallback` | 1 | 是（存在同名变量赋值） |
| 107 | `dyPlayVideoAudio` | 1 | 否 |
| 108 | `dyShowSubtitle` | 1 | 否 |
| 109 | `title` | 1 | 是（存在同名变量赋值） |
| 110 | `views` | 1 | 是（存在同名变量赋值） |
| 111 | `attitude` | 1 | 否 |
| 112 | `impact` | 1 | 否 |
| 113 | `CreatorWarsEngine` | 1 | 是（存在同名变量赋值） |
| 114 | `renderManipulationHistory` | 1 | 否 |
| 115 | `updateBottomMetrics` | 1 | 否 |
| 116 | `generateHomeVideos` | 1 | 否 |
| 117 | `showResult` | 1 | 否 |
| 118 | `showProgressBar` | 1 | 否 |
| 119 | `publishVideo` | 1 | 否 |
| 120 | `restoreStudioView` | 1 | 否 |
| 121 | `endAgentLive` | 1 | 否 |
| 122 | `renderCharChat` | 1 | 否 |
| 123 | `generateInitialAgentContent` | 1 | 否 |
| 124 | `initNavbarIcons` | 1 | 否 |
| 125 | `initSettings` | 1 | 否 |
| 126 | `initDoujia` | 1 | 否 |
| 127 | `renderDoujiaHistory` | 1 | 否 |
| 128 | `initSearch` | 1 | 否 |
| 129 | `initProfileButtons` | 1 | 否 |
| 130 | `switchCallback` | 1 | 否 |
| 131 | `translateY` | 1 | 否 |
| 132 | `updates` | 1 | 否 |
| 133 | `visible` | 1 | 否 |
| 134 | `character` | 1 | 否 |
| 135 | `openChooseCharacter` | 1 | 否 |
| 136 | `applyDialogueBgImage` | 1 | 否 |
| 137 | `applyDialogueBgVideo` | 1 | 否 |
| 138 | `applyDialogueBgColor` | 1 | 否 |
| 139 | `resetDialogueBg` | 1 | 否 |

## false positive 过滤规则说明

1. **定义匹配规则**：识别 `function name(...)`、`var/let/const name = function(...)`、`var/let/const name = (...) => ...` 形式的全局函数定义。
2. **调用匹配规则**：匹配 `name(` 形式，但排除 `obj.name(`（方法调用）和 `new name(`（构造函数调用）。
3. **内置全局排除**：排除 `Math`、`JSON`、`Array`、`Object`、`String`、`Number`、`Date`、`console`、`window`、`document`、`localStorage`、`fetch`、`setTimeout`、`setInterval`、`parseInt`、`Promise`、`Error`、`RegExp`、`Map`、`Set`、`URL`、`MutationObserver`、`Audio`、`Image`、`navigator`、`location`、`history` 等内置全局对象/方法。
4. **DOM/BOM 方法排除**：排除 `getElementById`、`querySelector`、`addEventListener`、`getAttribute`、`createElement`、`appendChild` 等常见 DOM 方法。
5. **关键词排除**：排除 `if`、`while`、`for`、`switch`、`catch`、`return`、`typeof` 等关键词。
6. **false positive 标注**：若同一名称在代码中存在 `var/let/const name = ...` 非函数赋值，则标记为「可能是普通变量」。
7. **扫描限制**：仅扫描 `index.html` 内联脚本与事件处理器；不扫描外部 `.js` 文件；无法跨作用域精确解析局部变量、参数或闭包，因此结果需人工复核。

## 所有被识别的全局函数定义（供参考）

| 函数名 | 定义次数 |
|--------|----------|
| `_biliRebindTabEvents` | 1 |
| `_buildWeChatMessages` | 1 |
| `_completeCurrentTyping` | 1 |
| `_finishTypewriter` | 1 |
| `_generateCharacterPortraits` | 1 |
| `_generateSceneBackgrounds` | 1 |
| `_loadDetailLive2D` | 1 |
| `_loadDetailLive2DOrFallback` | 1 |
| `_next` | 1 |
| `_onTouchEnd` | 1 |
| `_onTouchStart` | 1 |
| `_pad` | 1 |
| `_pick` | 1 |
| `_removeTypingIndicator` | 1 |
| `_showContinueIndicator` | 1 |
| `_showTypingIndicator` | 1 |
| `_srand` | 1 |
| `_triggerGroupAIReply` | 1 |
| `_triggerSingleAIReply` | 1 |
| `_triggerWeChatAIReply` | 1 |
| `_updateAutoGenBgToggleState` | 1 |
| `_updateAutoGenPortraitToggleState` | 1 |
| `_updateWeChatLastMsg` | 1 |
| `activatePersona` | 1 |
| `addAffection` | 2 |
| `addBookmark` | 1 |
| `addChar` | 1 |
| `addChronicleEntry` | 1 |
| `addCustomAchievementCard` | 1 |
| `addCustomBgmEntry` | 1 |
| `addCustomEventCard` | 1 |
| `addCustomItemCard` | 1 |
| `addCustomNpcCard` | 1 |
| `addCustomNpcCardWithData` | 1 |
| `addCustomQuickReplyCard` | 1 |
| `addCustomRelationCard` | 1 |
| `addCustomTag` | 1 |
| `addEventAction` | 1 |
| `addEventActionToContainer` | 1 |
| `addEventCondition` | 1 |
| `addEventConditionToContainer` | 1 |
| `addGameEventCard` | 1 |
| `addItemToInventory` | 1 |
| `addKeyEvent` | 1 |
| `addLiveMessage` | 1 |
| `addLocationEntry` | 1 |
| `addLocationEntryWithData` | 1 |
| `addLongPressListener` | 1 |
| `addLoreEntry` | 1 |
| `addLoreEntryWithData` | 1 |
| `addNarrationMessage` | 1 |
| `addNPCMessage` | 1 |
| `addPersona` | 1 |
| `addPlayerDecision` | 1 |
| `addSystemMessage` | 1 |
| `addTypingIndicator` | 1 |
| `addUserMessage` | 1 |
| `advanceGalgameDialogue` | 1 |
| `advanceTime` | 2 |
| `APIError` | 1 |
| `appendChatBubble` | 1 |
| `applyCustomGameMode` | 1 |
| `applyDialogueBg` | 1 |
| `applyFontSize` | 1 |
| `applyQuickTemplate` | 1 |
| `applyReaderPrefs` | 1 |
| `applySettingsToUI` | 1 |
| `applyTheme` | 1 |
| `autoFillNpcFields` | 1 |
| `autoSave` | 1 |
| `avatarLetter` | 1 |
| `bindAgentMgmtEvents` | 1 |
| `bindCmEvents` | 1 |
| `bindCreatorWarsBtn` | 1 |
| `bindCustomVoiceButtons` | 1 |
| `bindEvents` | 2 |
| `bindGridEvents` | 1 |
| `bindPreviewCloseListeners` | 1 |
| `bindSettingsEvents` | 1 |
| `branchWorldTreeNode` | 1 |
| `buildBookApiMessages` | 1 |
| `buildBookContinueApiMessages` | 1 |
| `buildBookSystemPrompt` | 1 |
| `buildCharChatSystemPrompt` | 1 |
| `buildCommentsHtml` | 1 |
| `buildExportScriptData` | 1 |
| `buildMemorySummary` | 1 |
| `buildPortraitPool` | 1 |
| `buildSaveData` | 1 |
| `calculateImportance` | 1 |
| `cancel` | 1 |
| `cancelPersonaEditor` | 1 |
| `canCraft` | 1 |
| `changeLocation` | 1 |
| `checkAchievements` | 1 |
| `checkAffectionThresholds` | 1 |
| `checkSelectiveLogic` | 1 |
| `checkSupertonicStatus` | 1 |
| `checkVisible` | 1 |
| `classifyAsDialogue` | 1 |
| `classifyMessageType` | 1 |
| `cleanup` | 1 |
| `clearCustomDraft` | 1 |
| `clearLocationEntries` | 1 |
| `clearLoreEntries` | 1 |
| `clearValidationErrors` | 1 |
| `closeAllDropdowns` | 1 |
| `closeAllPanels` | 1 |
| `closeAnnouncementModal` | 1 |
| `closeBookReader` | 1 |
| `closeBookShelf` | 1 |
| `closeCompose` | 1 |
| `closeCraftDetail` | 1 |
| `closeCreatorWars` | 1 |
| `closeCustomChapterEditor` | 1 |
| `closeFavoritesPopup` | 1 |
| `closeFrameworkModal` | 1 |
| `closeHistoryPopup` | 1 |
| `closeImportPreview` | 1 |
| `closeItemDetail` | 1 |
| `closeMailPanel` | 1 |
| `closeMaterialModal` | 1 |
| `closeMilestonePopup` | 1 |
| `closeModelTestPage` | 1 |
| `closeMsgPopup` | 1 |
| `closeNotifyPopup` | 1 |
| `closePicker` | 1 |
| `closePromptManager` | 1 |
| `closeScriptListPanel` | 1 |
| `closeScriptPreview` | 1 |
| `closeTTSSettings` | 1 |
| `closeWorldTreePanel` | 1 |
| `constructPrompt` | 1 |
| `consumePendingAffectionEvent` | 1 |
| `copyCustomScript` | 1 |
| `craftItem` | 1 |
| `createTTSSettingsPanel` | 1 |
| `cwApiToast` | 1 |
| `CWE` | 1 |
| `cwSwitchApp` | 1 |
| `cwSwitchView` | 1 |
| `cwToast` | 1 |
| `deleteBookFromShelf` | 1 |
| `deleteCustomScript` | 1 |
| `deleteMessage` | 1 |
| `deletePersona` | 1 |
| `deletePromptTemplate` | 1 |
| `destroyChatLive2D` | 1 |
| `destroyDetailLive2D` | 1 |
| `destroyModelTest` | 1 |
| `destroyPortraitPickerApps` | 1 |
| `detectAffectionChanges` | 1 |
| `detectArrival` | 1 |
| `detectAttributeChanges` | 1 |
| `detectEmotion` | 1 |
| `detectItemAcquisition` | 1 |
| `detectItemLoss` | 1 |
| `detectKeyEventsFromContent` | 1 |
| `detectLocationChange` | 1 |
| `detectNPCRelationshipChanges` | 1 |
| `detectNPCSceneChanges` | 1 |
| `detectPlayerStatus` | 1 |
| `detectWASMSupport` | 1 |
| `detectWebGPU` | 1 |
| `discardItem` | 1 |
| `doCompose` | 1 |
| `doSearch` | 1 |
| `doShowPrompt` | 1 |
| `downloadBookAsTXT` | 1 |
| `downloadScriptFile` | 1 |
| `dyActivateAudio` | 1 |
| `dyAnchorAutoCreate` | 1 |
| `dyAnchorAutoRun` | 1 |
| `dyAnchorComposeVideo` | 1 |
| `dyAnchorFetchNews` | 1 |
| `dyAnchorGenerateScript` | 1 |
| `dyBgmDuck` | 1 |
| `dyBgmUnduck` | 1 |
| `dyBindEvents` | 1 |
| `dyCloseComments` | 1 |
| `dyClosePublish` | 1 |
| `dyHideSubtitle` | 1 |
| `dyMatchBgm` | 1 |
| `dyMatchLottie` | 1 |
| `dyNextVideo` | 1 |
| `dyOpenComments` | 1 |
| `dyOpenPublish` | 1 |
| `dyPlayBgm` | 1 |
| `dyPrevVideo` | 1 |
| `dySelectOption` | 1 |
| `dySendComment` | 1 |
| `dySetBgmVolume` | 1 |
| `dyShowAnchorNotification` | 1 |
| `dyStartCreate` | 1 |
| `dyStartTts` | 1 |
| `dyStopBgm` | 1 |
| `dyStopTts` | 1 |
| `dySwitchNav` | 1 |
| `dyToggleBookmark` | 1 |
| `dyToggleFollow` | 1 |
| `dyToggleLike` | 1 |
| `dyToggleMute` | 1 |
| `dyUpdateSlideContent` | 1 |
| `editMessage` | 1 |
| `editPersona` | 1 |
| `editPromptTemplate` | 1 |
| `EE` | 1 |
| `end` | 1 |
| `ensurePortraitVisible` | 1 |
| `escapeHtml` | 1 |
| `escHtml` | 2 |
| `escHtmlSimple` | 1 |
| `estimateTokens` | 1 |
| `executeOperation` | 1 |
| `exitGame` | 1 |
| `expandEditorSectionsWithContent` | 1 |
| `exportAllData` | 1 |
| `exportPromptTemplates` | 1 |
| `exportSave` | 1 |
| `exportScript` | 1 |
| `extractPlayerDecisions` | 1 |
| `extractSummaryFromMessages` | 1 |
| `fetchImageModelList` | 1 |
| `fetchModelList` | 1 |
| `findChatMsgIndex` | 1 |
| `findFrameworkById` | 1 |
| `findMaterialById` | 1 |
| `findPromptTemplate` | 1 |
| `finishOne` | 1 |
| `finishOpen` | 1 |
| `finishStream` | 1 |
| `finishTypingPart` | 1 |
| `flushSegment` | 1 |
| `formatBytes` | 1 |
| `formatChatTime` | 1 |
| `formatViews` | 1 |
| `generateAIArticle` | 1 |
| `generateAITitle` | 1 |
| `generateBook` | 1 |
| `generateCharacterPortrait` | 1 |
| `generateCustomScript` | 1 |
| `generateDefaultCover` | 1 |
| `generateImage` | 1 |
| `generateMemorySummary` | 1 |
| `generateQuickReplies` | 1 |
| `generateStoryboardFromBook` | 1 |
| `generateVideoFromStoryboard` | 1 |
| `generateVideoWithAgnes` | 1 |
| `generateWeather` | 1 |
| `GenerationError` | 1 |
| `getActivePersona` | 1 |
| `getAffection` | 2 |
| `getAffectionColorClass` | 1 |
| `getAffectionIcon` | 1 |
| `getAffectionLevel` | 2 |
| `getAffectionLevelProgress` | 1 |
| `getAnimLabel` | 1 |
| `getAuthorNoteContent` | 1 |
| `getAuthorNoteDepth` | 1 |
| `getAuthorNoteFrequency` | 1 |
| `getAvatar` | 1 |
| `getAvatarColor` | 1 |
| `getBaseUrl` | 1 |
| `getBgImageMap` | 1 |
| `getBuiltInScripts` | 1 |
| `getCharacterMails` | 1 |
| `getCharacterMemories` | 1 |
| `getCustomAchievements` | 1 |
| `getCustomBgmMap` | 1 |
| `getCustomConfig` | 1 |
| `getCustomEmotionMappings` | 1 |
| `getCustomEvents` | 1 |
| `getCustomItems` | 1 |
| `getCustomQuickReplies` | 1 |
| `getCustomQuickReplyTemplates` | 1 |
| `getCustomRelations` | 1 |
| `getCustomScriptsList` | 1 |
| `getCwElement` | 1 |
| `getCwElements` | 1 |
| `getDiscoverIcon` | 1 |
| `getEmailById` | 1 |
| `getFolderTitle` | 1 |
| `getImageBaseUrl` | 1 |
| `getInstance` | 2 |
| `getInventoryDescriptions` | 1 |
| `getItemName` | 1 |
| `getLocationEntries` | 1 |
| `getLoreEntries` | 1 |
| `getMaterialCount` | 1 |
| `getMeIcon` | 1 |
| `getNarrativePerspective` | 1 |
| `getNavIcon` | 1 |
| `getNPCData` | 1 |
| `getNpcGender` | 1 |
| `getNPCGender` | 1 |
| `getNpcNameById` | 1 |
| `getNPCRelationship` | 1 |
| `getNPCRelationshipPrompt` | 1 |
| `getReaderPrefs` | 1 |
| `getSaveSlotKey` | 1 |
| `getSelectedVoiceValue` | 1 |
| `getSettingsIcon` | 1 |
| `getSlotPreview` | 1 |
| `getTimePeriod` | 1 |
| `getTotalAffection` | 2 |
| `getTTSVoiceId` | 1 |
| `getTTSVoiceOverride` | 1 |
| `getTypeIcon` | 1 |
| `getUncertaintyLevel` | 1 |
| `getUserLevel` | 1 |
| `getVideoBaseUrl` | 1 |
| `grantMilestoneReward` | 1 |
| `guessGenderFromVoice` | 1 |
| `handleAiCompose` | 1 |
| `handleAiReply` | 1 |
| `handleAiSummary` | 1 |
| `handleBookErrorAction` | 1 |
| `handleCoverImageUpload` | 1 |
| `handleFailure` | 1 |
| `handleReaderBodyArea` | 1 |
| `handleRequest` | 1 |
| `handleTTSButtonClick` | 1 |
| `handleTTSProviderChange` | 1 |
| `hasItem` | 1 |
| `hideAllQuickReplies` | 1 |
| `hideConfirmModal` | 1 |
| `hideCustomModeSelector` | 1 |
| `hideExitConfirm` | 1 |
| `hideMemorialModal` | 1 |
| `hideMissionModal` | 1 |
| `hidePortraitLoading` | 1 |
| `hideToastElement` | 1 |
| `hideUserInfoModal` | 1 |
| `highlightGeneratedContent` | 1 |
| `importPromptTemplates` | 1 |
| `importSave` | 1 |
| `importScriptFile` | 1 |
| `inferNpcGender` | 1 |
| `init` | 2 |
| `initBookEvents` | 1 |
| `initChatBridge` | 1 |
| `initCmFilters` | 1 |
| `initCreatorCenterCards` | 1 |
| `initDialogueBgControls` | 1 |
| `initEditorSections` | 1 |
| `initGameState` | 1 |
| `initImportPreviewHandlers` | 1 |
| `initLive2D` | 1 |
| `initModelTest` | 1 |
| `initNavUtils` | 1 |
| `initOnInteraction` | 1 |
| `initPreview` | 1 |
| `initProfileTabs` | 1 |
| `initScriptFilterBar` | 1 |
| `initTagSelector` | 1 |
| `initWorldTree` | 1 |
| `isChinese` | 1 |
| `isClearlyNarration` | 1 |
| `isDuplicateKeyEvent` | 1 |
| `isPlaying` | 1 |
| `isRegexKey` | 1 |
| `isUsingOfficialModel` | 1 |
| `JSONParseError` | 1 |
| `keydownHandler` | 1 |
| `loadAffectionData` | 1 |
| `loadAutoSave` | 1 |
| `loadBGM` | 1 |
| `loadBio` | 1 |
| `loadBookmarks` | 1 |
| `loadCharChatHistory` | 1 |
| `loadChatSceneBg` | 1 |
| `loadCustomConfig` | 1 |
| `loadCustomDraft` | 1 |
| `loadCustomScriptForEdit` | 1 |
| `loadDialogueBgConfig` | 1 |
| `loadFromSlot` | 1 |
| `loadImportedScript` | 1 |
| `loadNPCModel` | 1 |
| `loadPendingAffectionEvents` | 1 |
| `loadPersonas` | 1 |
| `loadSettings` | 1 |
| `loadShelf` | 1 |
| `loadTransformersJS` | 1 |
| `loadTTSConfig` | 1 |
| `loadUserProfile` | 1 |
| `loadVoices` | 1 |
| `loadWorldTreeNode` | 1 |
| `lockGameOrientation` | 1 |
| `markEditorDirty` | 1 |
| `markItemNew` | 1 |
| `matchAction` | 1 |
| `matchImageProvider` | 1 |
| `matchKey` | 1 |
| `matchProvider` | 1 |
| `matchQuickReplyTemplate` | 1 |
| `matchVideoProvider` | 1 |
| `memorialKeydownHandler` | 1 |
| `migrateScriptData` | 1 |
| `missionKeydownHandler` | 1 |
| `modifyAffection` | 2 |
| `modifyNPCRelationship` | 1 |
| `modifyPlayerAttribute` | 1 |
| `muteAll` | 1 |
| `navigateBack` | 1 |
| `navigateChapter` | 1 |
| `normalizeAffection` | 1 |
| `normalizeGeneratedScript` | 1 |
| `NPCTTSClass` | 1 |
| `onModelLoaded` | 1 |
| `openAnnouncementModal` | 1 |
| `openBookReader` | 1 |
| `openBookShelf` | 1 |
| `openCharacterChat` | 1 |
| `openComposeWindow` | 1 |
| `openCreatorWars` | 1 |
| `openCustomChapterEditor` | 1 |
| `openCustomScriptEntry` | 1 |
| `openFavoritesPopup` | 1 |
| `openFrameworkModal` | 1 |
| `openHistoryPopup` | 1 |
| `openLive2dSelector` | 1 |
| `openMailDetail` | 1 |
| `openMailPanel` | 1 |
| `openMaterialModal` | 1 |
| `openMsgPopup` | 1 |
| `openNotifyPopup` | 1 |
| `openNpcVoiceSettings` | 1 |
| `openPortraitImageEditor` | 1 |
| `openPortraitPicker` | 1 |
| `openPromptManager` | 1 |
| `openScriptListPanel` | 1 |
| `openScriptPreview` | 1 |
| `openTTSSettings` | 1 |
| `openWorldTreePanel` | 1 |
| `paginateContent` | 1 |
| `parseActionTagAndDisplay` | 1 |
| `parseBookContent` | 1 |
| `parseMessageContent` | 1 |
| `parseNPCMessageContent` | 1 |
| `pauseBGM` | 1 |
| `persistSession` | 1 |
| `playBGM` | 1 |
| `playClick` | 1 |
| `playSend` | 1 |
| `playTypewriterSound` | 1 |
| `populateEdgeTTSPopupVoices` | 1 |
| `populateSingleVoiceSelect` | 1 |
| `populateTTSSettings` | 1 |
| `populateTTSVoices` | 1 |
| `populateVoiceSelectsFromList` | 1 |
| `postComment` | 1 |
| `prefixNpcIdInObj` | 1 |
| `preloadPortrait` | 1 |
| `prepareCustomScript` | 1 |
| `processAIResponse` | 1 |
| `processBuffer` | 1 |
| `processDialogueQueue` | 1 |
| `pushSegment` | 1 |
| `read` | 2 |
| `readChunk` | 1 |
| `rebuildChatSceneLayers` | 1 |
| `refreshMessages` | 1 |
| `refreshRelationNpcOptions` | 1 |
| `registerLocationAliases` | 1 |
| `removeCharChatTyping` | 1 |
| `removeEditorCard` | 1 |
| `removeEventCard` | 1 |
| `removeItemCard` | 1 |
| `removeItemFromInventory` | 1 |
| `removeNpcCard` | 1 |
| `removeTypingIndicator` | 1 |
| `render` | 1 |
| `renderAchievements` | 1 |
| `renderAgentMgmtPanel` | 1 |
| `renderBilibiliContent` | 1 |
| `renderBookContent` | 1 |
| `renderBookmarkList` | 1 |
| `renderCharacterList` | 1 |
| `renderCharacterMail` | 1 |
| `renderCharacterMemory` | 1 |
| `renderCharChatMessage` | 1 |
| `renderCharChatTyping` | 1 |
| `renderChatDetail` | 1 |
| `renderChatList` | 1 |
| `renderChronicle` | 1 |
| `renderCommentMgmt` | 1 |
| `renderContactDetail` | 1 |
| `renderContactsList` | 1 |
| `renderCraftingUI` | 1 |
| `renderCurlPage` | 1 |
| `renderDiscoverList` | 1 |
| `renderDiscoverPlaceholder` | 1 |
| `renderDmChat` | 1 |
| `renderDouyinContent` | 1 |
| `renderDynamicTab` | 1 |
| `renderEarningsHistory` | 1 |
| `renderEmailDetail` | 1 |
| `renderEmailList` | 1 |
| `renderFolders` | 1 |
| `renderFollowingList` | 1 |
| `renderFrameworkList` | 1 |
| `renderHomeGrid` | 1 |
| `renderLive2dPreview` | 1 |
| `renderMailContent` | 1 |
| `renderMailList` | 1 |
| `renderMaterialGrid` | 1 |
| `renderMeDetail` | 1 |
| `renderMeList` | 1 |
| `renderMessageList` | 1 |
| `renderMeTab` | 1 |
| `renderMomentsDetail` | 1 |
| `renderMsgContent` | 1 |
| `renderMsgPopupList` | 1 |
| `renderMsgTab` | 1 |
| `renderMyVideos` | 1 |
| `renderNotifyList` | 1 |
| `renderNPCRelPanel` | 1 |
| `renderOrders` | 1 |
| `renderPersonaList` | 1 |
| `renderPortraitPickerGrid` | 1 |
| `renderProfileMessages` | 1 |
| `renderProfilePage` | 1 |
| `renderPromptTemplateList` | 1 |
| `renderReaderContent` | 1 |
| `renderSaveSlots` | 1 |
| `renderScriptList` | 1 |
| `renderSettingsContent` | 1 |
| `renderShelf` | 1 |
| `renderThemeOptions` | 1 |
| `renderTocList` | 1 |
| `renderTonghuashunContent` | 1 |
| `renderVideoDetail` | 1 |
| `renderVideoDetailView` | 1 |
| `renderVideoGrid` | 1 |
| `renderWeChatContent` | 1 |
| `renderWorldTree` | 1 |
| `renderWorldTreeNode` | 1 |
| `renderWorldTreePanel` | 1 |
| `resetCustomEditor` | 1 |
| `resetModeSelectorView` | 1 |
| `resetScriptSubsystems` | 1 |
| `resetUI` | 1 |
| `resolveBgPath` | 1 |
| `resolveColor` | 1 |
| `resolveNpcId` | 1 |
| `resolveTTSVoice` | 1 |
| `restoreDialogueBgUI` | 1 |
| `restoreGameState` | 1 |
| `restoreNpcPortraitData` | 1 |
| `restoreSaveData` | 1 |
| `retryMessage` | 1 |
| `rollDice` | 1 |
| `saveAffectionData` | 2 |
| `saveBio` | 1 |
| `saveBookmarks` | 1 |
| `saveBookToShelf` | 1 |
| `saveCharacterMemory` | 1 |
| `saveCharChatHistory` | 1 |
| `saveCustomConfig` | 1 |
| `saveCustomDraft` | 1 |
| `saveCustomFramework` | 1 |
| `saveCustomMaterial` | 1 |
| `saveCustomPromptTemplates` | 1 |
| `saveCustomScriptsList` | 1 |
| `saveDialogueBgConfig` | 1 |
| `saveGachaState` | 1 |
| `saveGameState` | 1 |
| `savePersonaEditor` | 1 |
| `savePersonas` | 1 |
| `savePlayerName` | 1 |
| `savePromptTemplate` | 1 |
| `saveReaderPrefs` | 1 |
| `saveSettingsToStorage` | 1 |
| `saveShelf` | 1 |
| `saveToSlot` | 1 |
| `saveToWorldTree` | 1 |
| `saveTTSConfig` | 1 |
| `saveUserProfile` | 1 |
| `SCE` | 1 |
| `scheduleCustomDraftSave` | 1 |
| `scrollToBottom` | 1 |
| `scrollToChapter` | 1 |
| `selectCustomMode` | 1 |
| `selectPortraitItem` | 1 |
| `selectPromptTemplate` | 1 |
| `sendCharChatMessage` | 1 |
| `sendDm` | 1 |
| `sendLiveDanmaku` | 1 |
| `sendMail` | 1 |
| `sendUserMessage` | 1 |
| `setBGMVolume` | 1 |
| `setDefaultEdgeTTSVoices` | 1 |
| `setDigit` | 1 |
| `setFontSize` | 1 |
| `setNpcGender` | 1 |
| `setNPCRelationship` | 1 |
| `setPendingAffectionEvent` | 1 |
| `setPlayerProfile` | 1 |
| `setUIVolume` | 1 |
| `shouldInjectAuthorNote` | 1 |
| `shouldShowTime` | 1 |
| `showAiWorkbenchToast` | 1 |
| `showBiliAiCreateModal` | 1 |
| `showChapterTitleIfNeeded` | 1 |
| `showCharacterDetail` | 1 |
| `showChatStaticPortrait` | 1 |
| `showConfirmModal` | 1 |
| `showCraftDetail` | 1 |
| `showCraftSuccessAnimation` | 1 |
| `showCustomModeSelector` | 1 |
| `showEdgeTTSHelp` | 1 |
| `showErrorToast` | 1 |
| `showGalgameDialogue` | 1 |
| `showInfoToast` | 1 |
| `showItemDetail` | 1 |
| `showMemorialModal` | 1 |
| `showMessageDetail` | 1 |
| `showMissionModal` | 1 |
| `showNext` | 1 |
| `showNotification` | 1 |
| `showOfficialRoutePanel` | 1 |
| `showPlaceholderFallback` | 1 |
| `showPortraitError` | 1 |
| `showPortraitLoading` | 1 |
| `showPortraitPlaceholder` | 1 |
| `showPortraitSelector` | 1 |
| `showQuickReplies` | 1 |
| `showStudioArea` | 1 |
| `showToast` | 1 |
| `showUserInfoModal` | 1 |
| `showValidationErrors` | 1 |
| `smartAdvanceTime` | 1 |
| `speakWithEdgeTTS` | 1 |
| `speakWithTTS` | 1 |
| `splitBySentences` | 1 |
| `start` | 2 |
| `startAutoScroll` | 1 |
| `startAutoScrollIfNeeded` | 1 |
| `startBuiltinGame` | 1 |
| `startCustomGame` | 1 |
| `startCustomGameFromConfig` | 1 |
| `startGame` | 1 |
| `startOfficialRoute` | 1 |
| `startTimer` | 1 |
| `startToolbarAutoHide` | 1 |
| `stop` | 1 |
| `stopAutoScroll` | 1 |
| `stopBGM` | 1 |
| `stopCurrentTTSAudio` | 1 |
| `stopTimer` | 1 |
| `stopToolbarAutoHide` | 1 |
| `stripActionTags` | 1 |
| `stripJsonComments` | 1 |
| `SupertonicEngineClass` | 1 |
| `switchCwSettingsMode` | 1 |
| `switchNPC` | 1 |
| `switchStudioPanel` | 1 |
| `switchTab` | 2 |
| `syncBgUrl` | 1 |
| `syncGameStateFromBridge` | 1 |
| `tapHandler` | 1 |
| `testAiControl` | 1 |
| `testTTSConnection` | 1 |
| `thsBindEvents` | 1 |
| `thsBuildMeView` | 1 |
| `thsBuildNewsView` | 1 |
| `thsBuildQuoteView` | 1 |
| `thsBuildSidebar` | 1 |
| `thsBuildStockDetail` | 1 |
| `thsBuildTradeView` | 1 |
| `thsChangeClass` | 1 |
| `thsChangeIcon` | 1 |
| `thsChangeText` | 1 |
| `thsDoAiAdvice` | 1 |
| `thsDoAiAnalysis` | 1 |
| `thsDoAiNewsInterpret` | 1 |
| `thsDoAiQa` | 1 |
| `thsFormatPrice` | 1 |
| `thsGenerateKline` | 1 |
| `thsHandleSearch` | 1 |
| `thsIsQuestion` | 1 |
| `thsRender` | 1 |
| `thsRenderAiContent` | 1 |
| `thsShowAiError` | 1 |
| `thsShowAiLoading` | 1 |
| `thsSparkline` | 1 |
| `thsStreamAiContent` | 1 |
| `tick` | 1 |
| `toggleEditorSection` | 1 |
| `toggleEditorTag` | 1 |
| `togglePanel` | 1 |
| `toggleReaderOrientation` | 1 |
| `toggleToolbarVisibility` | 1 |
| `triggerAffectionMilestone` | 1 |
| `triggerQuickReplies` | 1 |
| `tryInitLive2D` | 1 |
| `tryLoadChatLive2D` | 1 |
| `turnToNextPage` | 1 |
| `turnToPrevPage` | 1 |
| `typeLoop` | 1 |
| `typewriterShow` | 1 |
| `unlockGameOrientation` | 1 |
| `unmuteAll` | 1 |
| `updateAddLocationBtn` | 1 |
| `updateAddLoreEntryBtn` | 1 |
| `updateAffectionBar` | 1 |
| `updateAllEmptyStates` | 1 |
| `updateAllSectionCounts` | 1 |
| `updateBackground` | 1 |
| `updateBalance` | 1 |
| `updateBatchBar` | 1 |
| `updateChapterIntro` | 1 |
| `updateCharacterEmotion` | 1 |
| `updateCharChatAffection` | 1 |
| `updateCharDetailAffection` | 1 |
| `updateCharPanel` | 1 |
| `updateChatSendBtn` | 1 |
| `updateEffectPreview` | 1 |
| `updateEstimate` | 1 |
| `updateGameStateUI` | 1 |
| `updateInfluenceDisplay` | 1 |
| `updateInventoryUI` | 1 |
| `updateKeyboardOffset` | 1 |
| `updateLevelUI` | 1 |
| `updateLocationEntryNumbers` | 1 |
| `updateLoreEntryNumbers` | 1 |
| `updateMsgBadge` | 1 |
| `updateNotifyDot` | 1 |
| `updateNPCBar` | 1 |
| `updateNPCList` | 1 |
| `updateNpcPortraitBtn` | 1 |
| `updateNpcVoiceButtonsVisibility` | 1 |
| `updateOfficialModelStatus` | 1 |
| `updatePlayerAttributesOnTimePass` | 1 |
| `updatePlayerAttributeUI` | 1 |
| `updatePortrait` | 1 |
| `updateQuickRepliesForInputMode` | 1 |
| `updateReaderProgress` | 1 |
| `updateRotatePrompt` | 1 |
| `updateSectionCount` | 1 |
| `updateStoryPanel` | 1 |
| `updateStudioMaterialGrid` | 1 |
| `updateSupertonicLoadProgress` | 1 |
| `updateSwipeNav` | 1 |
| `updateTagsCount` | 1 |
| `updateThemeSelector` | 1 |
| `updateTimer` | 1 |
| `updateUnreadBadge` | 1 |
| `updateUserPanel` | 1 |
| `uploadPortraitImage` | 1 |
| `uploadPortraitLive2d` | 1 |
| `useItem` | 1 |
| `useItemOnAttributes` | 1 |
| `userInfoKeydownHandler` | 1 |
| `validateCustomScript` | 1 |
| `validateScriptData` | 1 |
| `ValidationError` | 1 |
| `worldTreeAutoSave` | 1 |
| `worldTreeBranch` | 1 |
| `worldTreeLoad` | 1 |
| `worldTreeManualSave` | 1 |
| `worldTreeOnMessage` | 1 |
| `WTS` | 1 |

