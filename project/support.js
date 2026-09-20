/*
 * support.js — 畫板 runtime（重建版）
 *
 * 原本的 Design 畫布 runtime 沒有隨檔案匯出，這份是照 .dc.html 裡實際用到的語法重寫的，
 * 目的是讓 15 張畫板在任何瀏覽器直接打開就能正常顯示與操作。
 *
 * 支援的語法（就是畫板用到的全部）：
 *   <x-dc>                     畫板根節點
 *   <helmet>                   放 <style> / <link>，搬到 <head>
 *   {{path.to.value}}          文字與屬性插值；整個屬性只有一個插值時保留原始型別
 *   <sc-for list="{{arr}}" as="x">   重複子節點，x 綁進區域範圍
 *   <sc-if value="{{bool}}">         真值才渲染子節點
 *   onClick / onChange="{{fn}}"      事件；文字欄位另外綁 input 讓畫面即時更新
 *   value / checked / disabled / aria-*  依型別套到屬性或 property
 *   hint-placeholder-*         畫布的設計期提示，渲染時忽略
 *
 * 元件合約：class Component extends DCLogic，用 this.state、this.setState()、renderVals()。
 */
(function () {
  "use strict";

  var INTERP = /\{\{([^}]*)\}\}/g;
  var ONLY_INTERP = /^\s*\{\{([^}]*)\}\}\s*$/;
  var LIVE_INPUT = /^(text|tel|email|search|number|url|password)$/;

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.renderVals = function () {
    return {};
  };
  DCLogic.prototype.setState = function (patch) {
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) this.state[k] = patch[k];
    }
    if (this._render) this._render();
  };
  window.DCLogic = DCLogic;

  // 依 . 路徑取值。範圍用原型鏈串接，所以 sc-for 的區域變數查得到外層的值。
  function resolve(path, scope) {
    var parts = String(path).trim().split(".");
    var cur = scope;
    for (var i = 0; i < parts.length; i++) {
      if (cur === null || cur === undefined) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  // 整串就是單一個 {{x}} 時回傳原值（函式、布林、陣列都要留著），否則串成字串。
  function interpolate(str, scope) {
    var whole = str.match(ONLY_INTERP);
    if (whole) return resolve(whole[1], scope);
    return str.replace(INTERP, function (_, p) {
      var v = resolve(p, scope);
      return v === null || v === undefined ? "" : String(v);
    });
  }

  function applyAttr(el, name, value) {
    if (value === null || value === undefined || value === false) return;
    if (name.indexOf("aria-") === 0) {
      el.setAttribute(name, typeof value === "boolean" ? String(value) : String(value));
      return;
    }
    if (value === true) {
      el.setAttribute(name, "");
      if (name in el) el[name] = true;
      return;
    }
    el.setAttribute(name, String(value));
  }

  function buildElement(node, scope, out) {
    var el = document.createElement(node.tagName.toLowerCase());
    var pendingValue;
    var hasPendingValue = false;

    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i];
      var name = a.name;
      if (name.indexOf("hint-") === 0) continue;

      var raw = a.value;
      var v = raw.indexOf("{{") >= 0 ? interpolate(raw, scope) : raw;

      // onClick / onChange —— 解析器會把屬性名轉小寫，所以這裡比對的是 onclick / onchange
      if (/^on[a-z]+$/.test(name)) {
        if (typeof v === "function") bindEvent(el, name, v);
        continue;
      }

      // value 要等子節點（option）都建好才能設，否則 select 對不到
      if (name === "value") {
        pendingValue = v;
        hasPendingValue = true;
        continue;
      }
      applyAttr(el, name, v);
    }

    buildChildren(node, scope, el);

    if (hasPendingValue && pendingValue !== null && pendingValue !== undefined) {
      var tag = el.tagName;
      if (tag === "SELECT" || tag === "INPUT") el.value = String(pendingValue);
      else if (tag === "TEXTAREA") {
        el.textContent = String(pendingValue);
        el.value = String(pendingValue);
      } else applyAttr(el, "value", pendingValue);
    }
    out.push(el);
  }

  function bindEvent(el, attrName, fn) {
    var type = attrName.slice(2).toLowerCase();
    el.addEventListener(type, fn);
    // 文字欄位的 change 要離開欄位才觸發，補綁 input 讓畫面跟著打字更新
    if (type === "change") {
      var tag = el.tagName;
      var isText = tag === "TEXTAREA" || (tag === "INPUT" && LIVE_INPUT.test(el.type || "text"));
      if (isText) el.addEventListener("input", fn);
    }
  }

  function buildNode(node, scope, out) {
    if (node.nodeType === 3) {
      var text = node.nodeValue;
      out.push(document.createTextNode(text.indexOf("{{") >= 0 ? String(interpolate(text, scope)) : text));
      return;
    }
    if (node.nodeType !== 1) return;

    var tag = node.tagName.toLowerCase();

    if (tag === "sc-for") {
      var list = interpolate(node.getAttribute("list") || "", scope);
      var as = node.getAttribute("as") || "item";
      if (!list || !list.length) return;
      for (var i = 0; i < list.length; i++) {
        var childScope = Object.create(scope);
        childScope[as] = list[i];
        buildChildrenInto(node, childScope, out);
      }
      return;
    }

    if (tag === "sc-if") {
      if (interpolate(node.getAttribute("value") || "", scope)) buildChildrenInto(node, scope, out);
      return;
    }

    buildElement(node, scope, out);
  }

  function buildChildrenInto(node, scope, out) {
    for (var i = 0; i < node.childNodes.length; i++) buildNode(node.childNodes[i], scope, out);
  }

  function buildChildren(node, scope, parentEl) {
    var out = [];
    buildChildrenInto(node, scope, out);
    for (var i = 0; i < out.length; i++) parentEl.appendChild(out[i]);
  }

  // 每次 setState 重建整棵樹，所以要自己把焦點與游標位置接回去
  function snapshotFocus() {
    var el = document.activeElement;
    if (!el || !el.id || el === document.body) return null;
    var snap = { id: el.id, start: null, end: null };
    try {
      snap.start = el.selectionStart;
      snap.end = el.selectionEnd;
    } catch (e) {
      /* select 之類沒有選取範圍，忽略 */
    }
    return snap;
  }

  function restoreFocus(snap) {
    if (!snap) return;
    var el = document.getElementById(snap.id);
    if (!el) return;
    el.focus();
    if (snap.start !== null && snap.start !== undefined && el.setSelectionRange) {
      try {
        el.setSelectionRange(snap.start, snap.end);
      } catch (e) {
        /* 型別不支援，忽略 */
      }
    }
  }

  function boot() {
    var root = document.querySelector("x-dc");
    var script = document.querySelector("script[data-dc-script]");
    if (!root || !script) return;

    var style = document.createElement("style");
    style.textContent = "x-dc{display:block}helmet{display:none}";
    document.head.appendChild(style);

    var helmet = root.querySelector("helmet");
    if (helmet) {
      while (helmet.firstChild) document.head.appendChild(helmet.firstChild);
      helmet.parentNode.removeChild(helmet);
    }

    // 收起原始樣板，之後每次渲染都從這份乾淨的副本長出來
    var template = document.createDocumentFragment();
    while (root.firstChild) template.appendChild(root.firstChild);

    var props = {};
    try {
      props = JSON.parse(script.getAttribute("data-props") || "{}");
    } catch (e) {
      console.warn("[support] data-props 解析失敗", e);
    }

    var Component;
    try {
      Component = new Function("DCLogic", script.textContent + "\nreturn Component;")(DCLogic);
    } catch (e) {
      console.error("[support] 畫板程式載入失敗", e);
      return;
    }

    var comp = new Component(props);
    comp._render = function () {
      var snap = snapshotFocus();
      var vals = comp.renderVals() || {};
      var next = document.createDocumentFragment();
      buildChildren({ childNodes: template.childNodes }, vals, next);
      while (root.firstChild) root.removeChild(root.firstChild);
      root.appendChild(next);
      restoreFocus(snap);
    };
    comp._render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
