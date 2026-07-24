# 留白陶所｜範例網站說明

## 網站定位

「留白陶所」是陶藝教室、手作工作室與生活選物品牌的一頁式商用網站示範案例。品牌、課程、地址、聯絡方式與回饋皆為情境展示，不代表真實營業店家。

主要用途：

- 展示侘寂、東方留白與自然材質取向的品牌網站設計能力。
- 完整介紹體驗課程、作品、製作流程與常見問題。
- 示範從課程瀏覽、詳情確認到預約表單的轉換流程。
- 作為「7 天工作室網站上線包」可交付成果的正式案例。

公開展示網址：<https://gavin1424.github.io/liubai-pottery-studio-demo/>

GitHub 儲存庫：<https://github.com/gavin1424/liubai-pottery-studio-demo>

## 使用技術

- 語意化 HTML5
- 原生 CSS（色彩變數、Grid、Flexbox、響應式與 reduced-motion）
- 原生 JavaScript（無框架、無資料庫）
- Google Fonts Noto Serif TC（全站繁體中文明體系統）
- 本地 WebP 影像與 Bootstrap Icons 圖示
- 前端示範表單驗證

網站不需要安裝套件，直接使用靜態檔案即可預覽或部署。

## 資料夾架構

```text
留白陶所/
├─ index.html                  首頁
├─ privacy.html                隱私權政策
├─ terms.html                  使用條款
├─ 404.html                    找不到頁面
├─ styles.css                  全站樣式與響應式規則
├─ script.js                   導覽、視窗、表單與互動
├─ favicon.svg                 網站圖示
├─ robots.txt
├─ sitemap.xml
├─ assets/
│  ├─ images/                 11 張情境圖片及 1 張 Open Graph 圖
│  └─ icons/                  本地 Bootstrap Icons 與授權文字
├─ README_範例網站說明.md
├─ 範例網站完成報告.md
└─ design-qa.md
```

## 如何在本機開啟

最簡單的方式是直接開啟 `index.html`。

若要完整測試相對路徑、404 與瀏覽器行為，建議在本資料夾啟動本機伺服器：

```powershell
python -m http.server 8771 --bind 127.0.0.1
```

再開啟：

`http://127.0.0.1:8771/`

## 如何部署

這是純靜態網站，目前以 GitHub Pages 從 `main` 分支根目錄發布；亦可部署至一般虛擬主機或其他支援 HTML、CSS、JavaScript 的靜態空間。

更新公開版本：

1. 在本機完成修改及測試。
2. 使用 `git status` 與 `git diff` 確認只包含預期檔案。
3. 建立 Git commit 並推送到 `origin/main`。
4. 等待 GitHub Pages 完成建置，再檢查公開網址與主要資產。

目前 canonical、Open Graph、robots.txt 與 sitemap.xml 均使用正式公開網址。由於「留白陶所」是虛構品牌，本版本固定維持 `noindex, follow`；若未來改成真實品牌，仍須先替換聯絡資料、表單、隱私權內容及品牌聲明，再另行評估索引設定。

## 如何替換文字

- 品牌與 Hero：編輯 `index.html` 的 `header` 與 `#top`。
- 品牌介紹：編輯 `#about`。
- 課程、價格與說明：編輯 `#courses` 中的四個 `.course-card`。
- 作品名稱與材質：編輯 `#works` 的 `figcaption`。
- 聯絡資料與營業時間：編輯 `#booking`。
- FAQ：編輯 `#faq` 中的 `details`。

所有對外文字都集中在 HTML，不需要修改 JavaScript。

## 如何替換圖片

1. 將新圖片轉成 WebP，放入 `assets/images/`。
2. 使用相同檔名直接替換，或修改 HTML 中對應的 `src`。
3. 同步更新 `width`、`height` 與 `alt`。
4. Hero 圖保留一般載入與 `fetchpriority="high"`；桌面與手機裁切位置由 `styles.css` 的 `.hero-media > img` 控制。
5. 建議 Hero 小於 250 KB，其他單張圖片小於 180 KB。

目前 11 張正式圖片均為本案例透過內建圖片生成工具新生成，再轉為 WebP 的原創情境素材；沒有直接使用參考圖或外部熱連結。

## 如何修改課程及價格

每張課程卡的畫面內容與詳情視窗資料都在同一個 `.course-card`：

- `data-course`：課程名稱
- `data-duration`：課程時間
- `data-level`：適合程度
- `data-price`：價格
- `data-detail`：詳情視窗文案

同時更新卡片內可見的標題、時間、價格與說明，並在預約表單的課程選單加入相同名稱。

## 如何串接正式表單

目前送出按鈕只執行前端驗證，成功後明確顯示「資料未送出、未儲存」。

正式串接可選：

- Google 表單：將送出行為改為開啟已驗證的 Google Form。
- Formspree 或同類服務：在取得品牌同意及完成隱私權說明後設定表單端點。
- 自有後端：由後端驗證、寄送通知並設定資料保存規則。
- LINE：將預約按鈕改為品牌提供的官方帳號網址。

不得直接把未經確認的私人 Email、LINE、電話或 API 金鑰寫入專案。

## 示範模式

- LINE、Instagram 與展示聯絡按鈕只開啟安全提示，不連到假帳號。
- 表單不會建立訂單、保留名額、寄信或外傳資料。
- 學員分享清楚標示為情境示範。
- 頁尾、隱私權與使用條款皆標示虛構品牌與展示用途。
- SEO 維持 `noindex, follow`，避免被誤認為真實營業場所。
