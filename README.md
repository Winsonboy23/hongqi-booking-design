# 弘淇羽球報名系統 — 介面設計稿（完整版．2026-09-24）

Design 畫布「弘淇羽球報名系統」的完整原始檔，共 24 張畫板。這一包已經包含先前 9/20 與 9/22 兩包的內容，可以直接取代它們。

每張 `.dc.html` 是一張獨立畫板，樣式全部內嵌（字體走 Google Fonts）。這個 repo 另外補了 `project/support.js`，所以瀏覽器直接開就能看到完整內容，下拉、月曆、展開也都會動（見下方說明）。

## 預覽

線上版：<https://winsonboy23.github.io/hongqi-booking-design/>（GitHub Pages，push 到 main 就自動更新）

`index.html` 是給業主看的設計稿畫廊，兩個分頁：

- **介面設計**：課程資訊頁的六個版本，頁面上只顯示版本代號，不標風格名。
  版本A＝`Main-Minimal-A`、版本B＝`Main-Minimal-B-v2`、版本C＝`Main-Warm-N1`、版本D＝`Main-Warm-N2`、
  版本E＝`Main-Warm-N3`、版本F＝`Main-Warm-N4`。
  `Main-Minimal-B-v2.html` 是設計師另外給的靜態預覽稿（不是 `.dc.html`，沒有 support.js，點了不會動），
  用來取代原本的簡約 B、C1、C2 三張；那三個 `.dc.html` 檔仍留在 `project/`，只是不進畫廊。
- **介面流程**：前台手機 5 張。第 1 張 `Main.dc.html` 已換成藍色版，其餘 4 張仍是粉色，風格定案後會一起換。

系統流程圖、前台桌機、後台目前先隱藏，要放回來把 `index.html` 裡那一組的 `hidden: true` 拿掉即可。
縮圖是實際運作中的畫板，點開可以放大操作，支援 ← → 換頁與 Esc 關閉；畫板裡連到其他畫板的按鈕會直接換到那張。
畫廊外框的樣式照簡約 A・清爽（白底、1px 細線、8px 圓角、無陰影、思源黑體），文字一律黑色，畫板本身不受影響。

本地預覽：

    python3 -m http.server 8080

然後開 <http://localhost:8080>。不要用 `file://` 直接開 `index.html`，瀏覽器的跨來源限制會擋掉 iframe 內容。

部署：純靜態、零建置、零相依。丟到任何靜態主機（Zeabur、GitHub Pages、Netlify…）都會自動認 `index.html`，push 即更新。

## 關於 support.js

原本 Design 畫布的 runtime 沒有隨檔案匯出，`project/support.js` 是照畫板實際用到的語法重寫的一份，涵蓋 `{{插值}}`、`<sc-for>`、`<sc-if>`、`onClick`／`onChange`、`DCLogic` + `setState`、`data-props` 的 Tweaks（取 default，網址 `?primary=%23…` 可換成 options 裡的值）、SVG 圖示（`<svg>` 以下用 SVG 命名空間建立）與畫板間連結（網址帶 `?embed` 時交給畫廊換頁）。24 張畫板都驗過：沒有殘留的 `{{}}`、沒有 console 錯誤、互動正常。

它只服務預覽，不是要進實作的程式碼。之後若拿到官方匯出的 `support.js`，直接覆蓋即可。這一包沒有附 runtime，所以更新時不要刪掉它。

## 一、主線：15 張完整流程

### 前台・手機 390
    Main.dc.html                    1 課程資訊・季報名（現為藍色版）
    BookingList-Mobile.dc.html      2 單堂預約列表
    Checkout-Mobile.dc.html         3 結帳
    Done-Mobile.dc.html             4 報名完成
    Lookup-Mobile.dc.html           5 查詢

### 前台・桌機 1280
    Courses-Desktop.dc.html         1 課程資訊・季報名
    BookingList-Desktop.dc.html     2 單堂預約列表
    Checkout-Desktop.dc.html        3 結帳
    Done-Desktop.dc.html            4 報名完成
    Lookup-Desktop.dc.html          5 查詢

### 後台・桌機 1440
    Admin-Courses.dc.html           A 課程／時段管理（複製、上下架）
    Admin-Coaches.dc.html           B 教練管理
    Admin-Venues.dc.html            C 地點管理
    Admin-Orders.dc.html            D 訂單管理（狀態、發票已開、發票號碼）
    Admin-Account.dc.html           E 帳號與登入

## 二、風格提案：8 張課程資訊頁

同一頁的不同視覺方向，版面與互動都相同，只差在視覺語言。

### 簡約系列（脫離可愛風）
    Main-Minimal-A.dc.html          A・清爽：白底細線、思源黑體、品牌深藍
    Main-Minimal-B.dc.html          B・運動：深色頂部、窄體粗字、藍綠 #4b6876（已不在畫廊）
    Main-Minimal-B-v2.html          B 改版：淺藍頂部的靜態預覽稿，畫廊的版本B
    Main-Minimal-C1.dc.html         C1・霧藍 #8fb8cc（已不在畫廊）
    Main-Minimal-C2.dc.html         C2・粉藍 #bcd8e6（已不在畫廊）

### 貼紙風配色（保留可愛版型，只換色系）
    Main-Warm-N1.dc.html            N1・黃＋米咖啡
    Main-Warm-N2.dc.html            N2・淡綠＋黃
    Main-Warm-N3.dc.html            N3・陶土＋燕麥
    Main-Warm-N4.dc.html            N4・藍

B、C1、C2 的 Tweaks 可以現場換強調色，文字顏色會自動跟著調（亮色配深字、暗色配白字）。N 系列每組各自配了一支深色當文字與描邊，不是只換按鈕。

## 三、其他

    System-Flow.dc.html             系統流程圖（2200 寬，泳道式）
    project/canvas.json             畫布索引：每張畫板的座標、尺寸、標題
    project/ds/hongqi/tokens.json   設計系統 token
    project/support.js              畫板 runtime（重建版，見上方說明）
    index.html                      設計稿畫廊（給業主看的預覽站）

## 進實作前要處理的事

館別、地區、教練、課名、價格、名額、訂單全部是示意資料。方括號欄位等你填：`[中心電話]`、`[館址]`、`[金流商名稱]`、`[網域]`、`[網站維護聯絡人]`、`[路名門牌]`、`[公司抬頭]`。

吉祥物與圖示：設計系統目前沒有正式資產，完成頁與空狀態用 token 幾何暫代，位置已預留。

字體：`Zen Maru Gothic` 是日文圓體，繁體專用字會掉到後備字。上線前要自架「jf open 粉圓」或思源圓體，並補進 `tokens.json` 的 `type.fonts`。

風格定案後：設計系統要出新版本，主線那 15 張也要跟著換。目前只有 `Main.dc.html` 換成藍色，其餘 13 張可愛風畫板仍是粉色。

## 流程圖上的三個待確認

1. 金流回傳付款成功後，要自動改成「已付款」，還是照規格全部手動改？
2. 名額在付款成功才扣，還是建立訂單時就先保留？
3. 一直沒付款的「待付款」訂單，要不要逾時自動取消並釋出名額？時限多久？
