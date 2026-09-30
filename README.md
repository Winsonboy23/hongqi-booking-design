# 弘淇羽球報名系統 — 介面設計稿（簡約 B 定案版）

Design 畫布「弘淇羽球報名系統」的原始檔。2026-09-30 客戶確認採用「簡約 B」風格後，**主線 15 張介面**（前台手機 5、前台桌機 5、後台 5）已全部統一成這個風格；連同系統流程圖與 6 張比稿存檔，共 22 張畫板。

每張 `.dc.html` 是一張獨立畫板，樣式全部內嵌（字體走 Google Fonts）。這個 repo 另外補了 `project/support.js`，所以瀏覽器直接開就能看到完整內容，下拉、月曆、展開也都會動（見下方說明）。

## 預覽

線上版：<https://winsonboy23.github.io/hongqi-booking-design/>（GitHub Pages，push 到 main 就自動更新）

`index.html` 是給業主看的設計稿畫廊，四個分頁：

- **介面流程**：前台手機 5 張，1 課程資訊 → 2 預約列表 → 3 結帳 → 4 完成 → 5 查詢。
- **前台・桌機**：同一套流程的 1280 版，5 張。
- **後台・桌機**：1440 版，A 課程／時段、B 教練、C 地點、D 訂單、E 帳號與登入。
- **系統流程圖**：2200 寬的泳道圖。

風格比稿已結束，提案分頁已移除；`Main-Minimal-*`、`Main-Warm-*` 六張提案稿仍留在 `project/` 存檔。
要把某一組收起來，在 `index.html` 裡那一組加 `hidden: true` 即可，拿掉旗標就會回來。
縮圖是實際運作中的畫板，點開可以放大操作，支援 ← → 換頁與 Esc 關閉；畫板裡連到其他畫板的按鈕會直接換到那張。
畫廊外框的樣式照簡約 A・清爽（白底、1px 細線、8px 圓角、無陰影、思源黑體），文字一律黑色，畫板本身不受影響。

本地預覽：

    python3 -m http.server 8080

然後開 <http://localhost:8080>。不要用 `file://` 直接開 `index.html`，瀏覽器的跨來源限制會擋掉 iframe 內容。

部署：純靜態、零建置、零相依。丟到任何靜態主機（Zeabur、GitHub Pages、Netlify…）都會自動認 `index.html`，push 即更新。

## 關於 support.js

原本 Design 畫布的 runtime 沒有隨檔案匯出，`project/support.js` 是照畫板實際用到的語法重寫的一份，涵蓋 `{{插值}}`、`<sc-for>`、`<sc-if>`、`onClick`／`onChange`、`DCLogic` + `setState`、`data-props` 的 Tweaks（取 default，網址 `?accent=%23…` 可換成 options 裡的值）、SVG 圖示（`<svg>` 以下用 SVG 命名空間建立）與畫板間連結（網址帶 `?embed` 時交給畫廊換頁）。22 張畫板都驗過：沒有殘留的 `{{}}`、沒有 console 錯誤、互動正常。

它只服務預覽，不是要進實作的程式碼。之後若拿到官方匯出的 `support.js`，直接覆蓋即可。設計師的交付包沒有附 runtime，所以更新時不要刪掉它。

## 檔案

設計師的壓縮包用中文資料夾分類，這個 repo 統一攤平在 `project/` 並沿用畫布的英文檔名（`canvas.json` 裡也是英文名）。對應如下。

    index.html                      設計稿畫廊（給業主看的預覽站）
    project/support.js              畫板 runtime（重建版，見上方說明）
    project/canvas.json             畫布索引：座標、尺寸、標題、是否可互動
    project/ds/hongqi/tokens.json   設計系統 token（已更新為簡約 B）

### 前台・手機 390（壓縮包 01-前台-手機390）

    Main.dc.html                    1 課程資訊・季報名
    BookingList-Mobile.dc.html      2 單堂預約列表
    Checkout-Mobile.dc.html         3 結帳
    Done-Mobile.dc.html             4 完成
    Lookup-Mobile.dc.html           5 查詢

### 前台・桌機 1280（壓縮包 02-前台-桌機1280）

    Courses-Desktop.dc.html         1 課程資訊・季報名
    BookingList-Desktop.dc.html     2 單堂預約列表
    Checkout-Desktop.dc.html        3 結帳
    Done-Desktop.dc.html            4 完成
    Lookup-Desktop.dc.html          5 查詢

### 後台・桌機 1440（壓縮包 03-後台-桌機1440）

    Admin-Courses.dc.html           A 課程／時段管理
    Admin-Coaches.dc.html           B 教練管理
    Admin-Venues.dc.html            C 地點管理
    Admin-Orders.dc.html            D 訂單管理
    Admin-Account.dc.html           E 帳號與登入

### 流程圖與比稿存檔（壓縮包 04、05）

    System-Flow.dc.html             系統流程圖（2200×1320）
    Main-Minimal-A.dc.html          簡約 A・清爽（提案存檔）
    Main-Minimal-B.dc.html          簡約 B・運動（定案的那一版，提案存檔）
    Main-Warm-N1.dc.html            配色 N1・黃＋米咖啡（提案存檔）
    Main-Warm-N2.dc.html            配色 N2・淡綠＋黃（提案存檔）
    Main-Warm-N3.dc.html            配色 N3・陶土＋燕麥（提案存檔）
    Main-Warm-N4.dc.html            配色 N4・藍（提案存檔）

## 簡約 B 的規格

| 項目 | 值 |
| --- | --- |
| 主色（頁首帶狀、主要按鈕） | `#b3d9ec` |
| 文字 / 線條 / 按鈕外框 | `#0e1a2b` |
| 次要文字（白底） | `#56657a`；帶狀上用 `#3c4f61` |
| 分隔線 | 區塊標題 `2px solid #0e1a2b`；列與列 `1px solid #e3e7ec` |
| 淺底色塊 | `#e9f2f8`，外框 `#7996a8` |
| 停用狀態 | 底 `#eef1f4`、字 `#8a96a5`、無外框 |
| 狀態色 | 有名額 `#3f7f68`／剩少量 `#9a6318`／額滿・取消 `#b04747` |
| 數字與英文 | Barlow Condensed |
| 中文 | Noto Sans TC（思源黑體） |
| 圓角 | 按鈕與開關 2px、輸入欄位 4px |

主要按鈕一律是「淺藍底 + 1px 深藍外框」，因為淺藍底單獨使用時邊界會糊掉；外框是刻意保留的。深藍字壓在 `#b3d9ec` 上的對比是 11.7:1，帶狀上的次要文字 `#3c4f61` 是 5.6:1，都過 WCAG AA。

## 可以點的互動

- **1 課程資訊**：換地區 → 館別自動跳到該區第一個館 → 月曆只有「有短橫」的日期能點 → 右側（桌機）／下方（手機）換成當天課表。
- **2 單堂預約**：地區、教練兩個下拉都會真的篩選；篩到空的會出現空狀態與「清除條件」。
- **3 結帳**：切到「統一編號發票」會展開統編欄位，金額即時從 NT$4,800 變成 NT$5,040（+5%）。
- **A/B/C 後台**：上架、前台顯示、啟用的開關都能實際切換，關掉的列會變淡。
- **D 訂單管理**：付款狀態下拉、「發票已開」勾選、發票號碼欄位都能改；勾選訂單會亮起批次工具列；上方篩選會實際過濾。

## 進實作前要處理的事

館別、地區、教練、課名、價格、名額、訂單全部是示意資料。方括號欄位等你填：`[中心電話]`、`[館址]`、`[金流商名稱]`、`[網域]`、`[網站維護聯絡人]`、`[路名門牌]`、`[公司抬頭]`。

吉祥物與圖示：設計系統目前沒有正式資產，完成頁與空狀態用 token 幾何暫代，位置已預留。

設計系統 artifact（`ds/hongqi`）本體的色票仍是最早的粉色版本；這個 repo 的 `tokens.json` 已是簡約 B，設計系統本體要另外更新。

## 流程圖上的三個待確認

1. 金流回傳付款成功後，要自動改成「已付款」，還是照規格全部手動改？
2. 名額在付款成功才扣，還是建立訂單時就先保留？
3. 一直沒付款的「待付款」訂單，要不要逾時自動取消並釋出名額？時限多久？
