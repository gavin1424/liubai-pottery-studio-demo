# Design QA｜留白陶所 Hero 疊圖改版

## 比對基準

- 桌面 source visual truth：使用者本次提供的 `2-Photo-2.jpg`。
- 手機問題基準：使用者本次提供的 `1-Photo-1.jpg`。
- 桌面 implementation screenshot：`留白陶所_Hero疊圖改版_1440px.png`。
- 手機 implementation screenshot：`留白陶所_Hero疊圖改版_390px.png`。
- 桌面合併證據：`design-qa-comparison.png`。
- 手機合併證據：`design-qa-sections-comparison.png`。
- 桌面 source pixels：1024 × 1280；網站 Hero 可見區裁切為 924 × 358。
- 手機 source pixels：576 × 1280。
- 桌面 implementation pixels：1404 × 891；CSS viewport 1440 × 900。
- 手機 implementation pixels：375 × 812；CSS viewport 390 × 844。
- deviceScaleFactor：1。
- normalization：桌面將來源與實作 Hero 各縮放至 700px 寬並置於相同 700 × 520 畫布後並排；手機將問題畫面與實作畫面各等比例縮放至 1000px 高後並排。
- state：首頁初始、選單收合、未捲動。

## Full-view comparison evidence

`design-qa-comparison.png` 顯示：

- 導覽列下方直接接完整 Hero 大圖，沒有獨立白底文字欄。
- 主標題、說明與 CTA 疊在圖片左側；陶瓶、枝葉與陶碗維持在右側。
- 米白半透明遮罩只加強左側可讀性，右側材質與自然光仍清晰。
- 實作 Hero 依需求提高至約 82svh，因此比來源圖中的短 Hero 更高；構圖、字體方向與視覺重心一致。

## Focused mobile comparison evidence

`design-qa-sections-comparison.png` 顯示：

- 修正前是文字區、資訊列、圖片依序分開；修正後全部首屏內容疊在同一張陶藝主視覺中。
- 390px 主標題維持三行，按鈕依內容寬度顯示，次要連結置於按鈕下方。
- 花瓶保留在右側，CTA 與連結靠左，沒有蓋住花瓶主體。
- 三項課程資訊移到 Hero 下方，因此不占用手機首屏。

## Required fidelity surfaces

### Fonts and typography

- 已在所有 HTML head 正式載入 Google Fonts `Noto Serif TC` 300／400／500／600。
- 全站中文使用 Noto Serif TC，並保留 Source Han Serif TC、Songti TC、PMingLiU 後備。
- Logo 為 500 字重；導覽為 400；Hero H1 為 400，桌面兩行、手機三行。
- 瀏覽器 `document.fonts.check()` 回傳已載入，計算字體為 Noto Serif TC 字族。

### Spacing and layout rhythm

- 桌面 Hero 高度 738px；1024px 為 720px；360／390／412px 為 720／760／824px。
- 桌面文案左緣約 8%，最大寬度 680px；標題不置中。
- 360／390／412px 使用 20px 安全距離，Hero CTA 寬 167px，不是滿版。
- 體驗資訊改為 Hero 後的細線三欄；手機改為單欄。

### Colors and visual tokens

- 主要色票使用米白 `#f1eee5`、暖白 `#f7f4ec`、墨色 `#35342f`、灰綠 `#74785d`、深灰綠 `#62664d`。
- 金屬感、鮮豔漸層、玻璃擬態與厚重陰影均未加入。
- Hero 遮罩使用低彩度米白透明層，沒有對整張照片加灰色蒙版。

### Image quality and asset fidelity

- Hero 使用既有本地原創 `assets/images/hero-ceramics.webp`，1600 × 1066、約 89KB。
- 桌面使用 `object-position: center right`；手機使用 63% 水平焦點。
- 圖片維持 WebP、本地相對路徑、`fetchpriority="high"` 與有效 alt。
- 沒有使用參考圖本身作為正式素材，也沒有新增來源不明圖片。

### Copy and content

- Hero 文案完全依本次指定內容。
- 導覽更新為關於我們、課程介紹、作品選物、體驗預約、日誌、聯繫我們。
- 示範品牌聲明、情境評價標示、表單不傳送提示均保留。

## Interaction and browser evidence

- 360、390、412、768、1024、1440 六種 viewport 均實測，無水平溢位。
- 900px 以下使用漢堡選單；1024／1440 顯示桌面導覽。
- 手機漢堡可開啟、關閉，點擊課程介紹後會收合並跳到正確錨點。
- Hero CTA 可跳至預約表單。
- FAQ 可展開與收合。
- 表單空白送出會顯示 7 個錯誤；有效測試資料送出後顯示「資料未送出、未儲存」示範提示。
- 完整捲動後 39 張圖片破圖數為 0。
- 控制台錯誤：0。
- reduced-motion 規則仍會停止非必要動畫並直接顯示 reveal 內容。

## Comparison history

### Iteration 1

- [P1] 桌面 H1 因字級過大，第二句被切成兩行，整體成為三行。
- 修正：Hero 文案寬度提高至 750px，左側位置調為約 8%，H1 改為最大 52px。
- 修正後：1440 與 1024 皆為兩行。

### Iteration 2

- [P1] 360／390px 的 Hero CTA 被舊有 `.hero-actions .button { width: 100% }` 撐滿。
- 修正：使用較高 specificity 將 `.hero-actions .hero-primary` 設為 `width: fit-content`，實測寬度 167px。

### Iteration 3

- [P2] 手機 CTA 與次要連結並排時，次要連結與花瓶主體有交疊。
- 修正：手機 action group 改為直向排列，兩者均靠左。

### Iteration 4

- [P2] 768px 的垂直遮罩讓右側陶瓶過度泛白。
- 修正：521–768px 改用左深右淡的水平遮罩；520px 以下保留垂直遮罩以維持狹窄手機的文字可讀性。

## Findings

- 沒有剩餘 P0、P1 或 P2 問題。
- 來源 Hero 較短；實作依使用者明確要求使用 720–880px／約 82svh，因此高度差異屬於指定調整。

## Follow-up polish

- [P3] 未來若有正式書法字標，可替換目前 Noto Serif TC 文字 Logo；現況已符合可商用示範與清晰辨識需求。

final result: passed
