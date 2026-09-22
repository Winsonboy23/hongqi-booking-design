# 弘淇羽球報名系統 — 介面設計稿

Design 畫布「弘淇羽球報名系統」的原始檔（版本 5，2026-09-20）。共 18 張畫板：前台手機 5、前台桌機 5、後台桌機 5，加上 2026-09-22 新增的簡約風格提案 2 與系統流程圖 1（說明見 [README-2026-09-22.md](README-2026-09-22.md)）。

每張 `.dc.html` 是一張獨立畫板，全部樣式內嵌（字體走 Google Fonts）。畫板的資料綁定與互動由同目錄的 `support.js` 提供，用瀏覽器直接開就能看到完整內容，下拉、月曆、展開也都會動。

## 預覽

線上版：<https://winsonboy23.github.io/hongqi-booking-design/>（GitHub Pages，push 到 main 就自動更新）

`index.html` 是給業主看的設計稿畫廊：兩個分頁——「介面設計」放課程資訊頁的三個版本（版本A＝簡約 A `Main-Minimal-A`、版本B＝簡約 B `Main-Minimal-B`、版本C＝舊版 `Main.dc.html`；頁面上只顯示版本代號，不標新舊與風格名），「介面流程」放前台手機 5 張。系統流程圖、前台桌機、後台目前先隱藏，要放回來把 `index.html` 裡那一組的 `hidden: true` 拿掉即可。縮圖是實際運作中的畫板，點開可以放大操作，支援 ← → 換頁與 Esc 關閉。畫板裡連到其他畫板的按鈕會直接換到那張。畫廊外框的樣式照簡約 A・清爽（白底、1px 細線、8px 圓角、無陰影、思源黑體），文字一律黑色，畫板本身不受影響。

本地預覽：

    python3 -m http.server 8080

然後開 <http://localhost:8080>。不要用 `file://` 直接開 `index.html`，瀏覽器的跨來源限制會擋掉 iframe 內容。

部署：純靜態、零建置、零相依。丟到任何靜態主機（Zeabur、GitHub Pages、Netlify…）都會自動認 `index.html`，push 即更新。

## 關於 support.js

原本 Design 畫布的 runtime 沒有隨檔案匯出，`project/support.js` 是照畫板實際用到的語法重寫的一份，涵蓋 `{{插值}}`、`<sc-for>`、`<sc-if>`、`onClick`／`onChange`、`DCLogic` + `setState`、`data-props` 的 Tweaks（取 default，網址 `?primary=%23…` 可換成 options 裡的值）與畫板間連結（網址帶 `?embed` 時交給畫廊換頁）。18 張畫板都驗過：沒有殘留的 `{{}}`、沒有 console 錯誤、互動正常。

它只服務預覽，不是要進實作的程式碼。之後若拿到官方匯出的 `support.js`，直接覆蓋即可。

## 檔案

    index.html                      設計稿畫廊（給業主看的預覽站）
    project/support.js              畫板 runtime（重建版，見上方說明）
    project/canvas.json             畫布索引：每張畫板的座標、尺寸、標題、是否可互動
    project/ds/hongqi/tokens.json   設計系統 token（色彩、字級、間距、圓角、描邊、陰影）

### 前台・手機 390（畫廊分頁「介面流程」）

    Main.dc.html                    1 課程資訊・季報名（地區 → 館別 → 月曆 → 當日課程）
    BookingList-Mobile.dc.html      2 單堂預約列表（地區 → 教練 篩選）
    Checkout-Mobile.dc.html         3 結帳（報名資料 + 發票，統編即時 +5%）
    Done-Mobile.dc.html             4 報名完成
    Lookup-Mobile.dc.html           5 查詢（電話 + 訂單編號）

### 前台・桌機 1280（畫廊先隱藏）

    Courses-Desktop.dc.html         1 課程資訊・季報名
    BookingList-Desktop.dc.html     2 單堂預約列表
    Checkout-Desktop.dc.html        3 結帳
    Done-Desktop.dc.html            4 報名完成
    Lookup-Desktop.dc.html          5 查詢

### 後台・桌機 1440（畫廊先隱藏）

    Admin-Courses.dc.html           A 課程／時段管理（含複製、上下架）
    Admin-Coaches.dc.html           B 教練管理
    Admin-Venues.dc.html            C 地點管理
    Admin-Orders.dc.html            D 訂單管理（狀態、發票已開、發票號碼、詳情）
    Admin-Account.dc.html           E 帳號與登入頁

### 簡約風格提案・手機 390（2026-09-22，畫廊分頁「介面設計」）

    Main-Minimal-A.dc.html          A 清爽：課程資訊頁，Tweaks 可切主色（深藍／墨綠／炭灰）
    Main-Minimal-B.dc.html          B 運動：課程資訊頁，Tweaks 可切強調色（萊姆綠／薄荷綠／羽球黃）

### 系統流程圖・2200（2026-09-22，畫廊先隱藏）

    System-Flow.dc.html             泳道圖：五個角色 × 七個階段，含三件待確認事項

## 進實作前要換掉的東西

館別、地區、教練、課名、價格、名額、訂單全部是示意資料。方括號欄位等你填：`[中心電話]`、`[館址]`、`[金流商名稱]`、`[網域]`、`[網站維護聯絡人]`、`[路名門牌]`、`[公司抬頭]`。

吉祥物與圖示：設計系統目前沒有正式資產。完成頁與空狀態的羽球圖是用 token 幾何暫代的，位置已預留，換成正式 SVG 即可。

字體：`Zen Maru Gothic` 是日文圓體，繁體專用字會掉到後備字。上線前請自架「jf open 粉圓」或思源圓體，並補進 `tokens.json` 的 `type.fonts`。

按鈕層級：設計系統規定一頁一顆 Primary，但列表每一列都有「報名／預約」，這裡把重複列的同一個動作當成一顆，仍用 blush Primary，其餘動作一律降成 outline。要嚴格照規範的話，把列表列改成 sky 次要色即可。
