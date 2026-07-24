# Design QA｜留白陶所

## 比對基準

- source visual truth：使用者於本次任務提供的 `1-Photo-1.jpg` 參考附件（附件本身不提交至公開儲存庫）
- implementation screenshot：`qa-desktop-1440.png`
- full-view combined evidence：`design-qa-comparison.png`
- focused section evidence：`design-qa-sections-comparison.png`
- supporting screenshots：`qa-courses-1440.png`、`qa-works-1440.png`、`qa-tablet-1024.png`、`qa-tablet-768.png`、`qa-mobile-390.png`、`qa-mobile-360.png`
- source pixels：1024 × 1280
- implementation pixels：1440 × 900
- CSS viewport：1440 × 900
- deviceScaleFactor：1
- normalization：完整參考圖與實作畫面皆等比例縮放至 720px 高後並排；區塊比對把課程與作品兩張 1440 × 900 實作畫面垂直合併，再與參考圖等高並排
- state：首頁初始狀態；課程與作品區為各自錨點的靜止狀態

## Full-view comparison evidence

`design-qa-comparison.png` 可同時看到參考圖與實作 Hero：

- 兩者都使用暖米白背景、墨褐色明體、灰橄欖 CTA 與極淡分隔線。
- 兩者都以左側品牌文案、右側自然光器物攝影建立首屏焦點。
- 實作保留更多垂直空間與較大的可讀字級，符合真實 1440 × 900 viewport，而不是把完整長頁縮進單張圖片。
- Hero 圖為全新生成素材，沒有複製參考圖的品牌、Logo、文案或原始照片。

## Focused region comparison evidence

`design-qa-sections-comparison.png` 同時包含參考圖與實作課程／作品區：

- 課程卡維持整齊四欄、低陰影、細邊框、圖片優先的資訊密度。
- 作品區延續低飽和陶器攝影，但使用深墨底建立獨立藝廊段落，避免整頁過度同質。
- 時間、價格、程度與操作均有足夠字級，不把參考圖的小字直接縮小複製。

## Required fidelity surfaces

### Fonts and typography

- 中文標題使用 Noto Serif TC／宋體／明體可靠後備字體，內文使用 Noto Sans TC／系統黑體。
- H1 已調整為桌面兩行，避免早期版本最後兩字單獨換行。
- 內文、課程資訊與表單字級未為追求極細風格而降低可讀性。

### Spacing and layout rhythm

- 首屏為約 45／55 的文案與圖片比例，對齊參考圖的視覺重心。
- 區塊使用 70–112px 垂直節奏、1px 細分隔線與少量方角，沒有每段都做厚重卡片。
- 768px 以下改為真正單欄流程；390px 與 360px 沒有水平溢位。

### Colors and visual tokens

- 背景、陶土、墨褐與灰橄欖色直接對應使用者指定的方向。
- 金屬感與高彩度被壓低，未出現 SaaS 藍紫、霓虹、玻璃擬態或大量漸層。
- 次要文字已由 #746D63 加深為 #70685E，使米白背景對比達約 4.77:1。

### Image quality and asset fidelity

- 11 張影像均逐張生成與裁切，不使用佔位圖、CSS 圖形或網路熱連結。
- Hero、工作室、四堂課與五張作品主圖維持相同自然光、低飽和、木材／亞麻／陶土材質。
- 所有圖片轉為 WebP 並設定實際寬高、alt 與非首屏 lazy loading。
- 圖示採本地 Bootstrap Icons，不使用 emoji 或自製 div 圖示。

### Copy and content

- 文案完整使用繁體中文，沒有 Lorem Ipsum、開發備註或英文模板文。
- 學員回饋、地址、電話與社群皆清楚標為情境展示。
- 表單成功訊息明確說明資料未送出、不儲存。

## Interaction and browser evidence

- 課程詳情視窗、課程帶入表單、作品展開、FAQ、漢堡選單、示範聯絡提示、表單錯誤與成功狀態皆已在瀏覽器實測。
- 1440、1024、768、390、360 五種 viewport 均實測。
- 瀏覽器控制台錯誤與警告：0。
- 本地正式頁面與主要資產：HTTP 200。
- `prefers-reduced-motion` 規則會關閉非必要動畫並立即顯示 reveal 內容。

## Comparison history

### Iteration 1

- [P2] 桌面 Hero H1 因字級與欄寬比例，第二行最後兩字單獨換行。
- 修正：把桌面 Hero 欄位改為約 45／55，H1 降至 43.2px 並減少字距。
- 修正後證據：`qa-desktop-1440.png` 顯示 H1 成為兩行，Hero 圖仍維持主要視覺。

### Iteration 2

- [P2] 次要文字在米白背景的計算對比約為 4.45:1，略低於一般文字 AA 目標。
- 修正：`--muted` 由 `#746D63` 加深為 `#70685E`。
- 修正後證據：計算對比約 4.77:1；實作截圖中的課程與說明文字仍保留柔和層級。

### Iteration 3

- [P3] 隱藏的第六張作品因 lazy loading 尚未下載，初始整頁圖片檢查會列為未完成。
- 修正：實際點擊「查看所有作品」，確認圖片載入完成、`naturalWidth = 900`，且按鈕可再收合。
- 此項不影響初始可見內容。

## Findings

- 沒有剩餘 P0、P1 或 P2 問題。
- 參考圖是把完整長頁縮在一張直式截圖中；實作依真實 viewport 保留較大字級與較長頁面，屬於可讀性與互動需求下的合理調整。

## Follow-up polish

- [P3] 未來取得正式品牌 Logo 後，可替換目前的文字字標。
- [P3] 真實公開前可再生成 1200 × 630 的專用 Open Graph 圖。

## 2026-07-24 手機響應式修正

### 本次視覺基準與合併證據

- 問題基準：使用者提供的實機畫面 `1-Photo-1.jpg`，可見漢堡導覽已啟用，但 Hero 仍維持左右雙欄。
- 桌面基準：使用者提供的 `2-Photo-2.jpg`，用於確認侘寂色調、左右 Hero 與桌面資訊密度不應被重做。
- 修正證據：`留白陶所_修正後_390px.png`。
- 合併比對：`design-qa-comparison.png` 將實機問題畫面與修正後 390px 首屏並排；兩側皆等比例縮放至 1280px 高。

### Comparison history

#### Mobile iteration 1

- [P1] 導覽列於 1024px 切成漢堡選單，但 Hero 直到 768px 才切成單欄；介於兩者的手機桌面模式會出現「漢堡＋雙欄 Hero」。
- 修正：保留桌面雙欄，將 768px 以下及實體裝置寬度 768px 以下明確切成單欄；Hero 文案、特色、圖片依閱讀順序排列。

#### Mobile iteration 2

- [P1] 主標題在狹窄欄位將「器物」拆開，花瓶圖沿用桌面固定高度而形成狹長直欄。
- 修正：H1 改為兩個語意行並保護「器物」不拆字；手機圖使用 4:3、`object-fit: cover` 與 62% 水平焦點。

#### Mobile iteration 3

- [P2] 1024px 初次檢查時 H1 為三行，偏離原桌面兩行構圖。
- 修正：769–1100px 使用 34.4px 標題與較緊字距；1024px 回復兩行，Hero、四欄課程與五步流程維持桌面結構。

#### Mobile iteration 4

- [P2] 手機固定 CTA 若永久顯示，會遮住首屏特色或頁尾。
- 修正：CTA 僅在 Hero 離開視窗後顯示，接近 Footer 時隱藏；使用 scroll、resize、pageshow、hashchange 與 IntersectionObserver 同步狀態。

### Final visual verification

- 360、390、412px：單欄 Hero、標題三行且「器物」完整、課程單欄、作品兩欄、流程單欄、Footer 兩欄。
- 768px：單欄 Hero、課程與流程兩欄、Footer 三欄。
- 1024、1440px：Hero 左右雙欄、課程四欄、流程五步橫向，桌面氣質與原有比例保留。
- 六種 viewport 的 `scrollWidth` 均等於 `clientWidth`，沒有水平溢位。
- 無剩餘 P0、P1 或 P2 視覺問題。

final result: passed
