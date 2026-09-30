動作按鈕。四種語氣：主要（accent 填色）、次要（白底描邊）、危險（danger 描邊與文字）、安靜（只有底線）。一個畫面只放一個主要按鈕。

外框不可省略。主要按鈕是 `accent` 填色**加** 1px `ink` 外框；淺藍在白底上單獨出現時邊界會糊掉。次要與危險按鈕靠同一道 1px 外框撐出形狀，底色維持 `surface-card`。

尺寸兩階：一般 48px 高、`space-6` 左右內距；表格與工具列裡的小按鈕 36px 高、`space-3` 內距、13px 字。手機版的主要按鈕拉到 52–56px 並撐滿寬度。

圓角一律 `radius-control`（2px）。不使用膠囊，不使用陰影。hover 只換底色（`accent` → `accent-deep`，白底 → `accent-tint`），不位移、不縮放、不加陰影，轉場 140ms。

停用狀態改成 `surface-sunken` 底、`ink-disabled` 字、**移除外框**——它不該看起來可按。停用時一定要在附近用 `caption` 說明原因（「已額滿」「開課前 24 小時關閉」），只把按鈕變灰不算把話說完。

按鈕裡的圖示用 14px、2px 描邊、`stroke-linecap: square`、`currentColor`，放在文字右側表示前進，左側表示返回。

消費端要提供：`type`、無障礙名稱（圖示按鈕用 `aria-label`）、停用時的 `disabled`，以及切換型按鈕的 `aria-pressed`。
