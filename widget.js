/**
 * Nordthread Chat Widget
 * Osadź na stronie sklepu jednym skryptem:
 *
 * <script>
 *   window.NORDTHREAD_CHAT = {
 *     webhookUrl: "https://hook.eu2.make.com/....",
 *     shopName: "NazwaSklepu",
 *     primaryColor: "#0f6b5c",
 *     welcome: "Cześć! W czym mogę pomóc?"
 *   };
 * </script>
 * <script src="https://TWOJA-DOMENA/widget.js" defer></script>
 */
(function () {
  if (window.__NORDTHREAD_WIDGET_LOADED__) return;
  window.__NORDTHREAD_WIDGET_LOADED__ = true;

  var cfg = Object.assign(
    {
      webhookUrl: "",
      shopName: "Asystent sklepu",
      primaryColor: "#0f6b5c",
      welcome:
        "Cześć! Pomogę z dostawą, zwrotami, płatnościami i dostępnością produktów. Jeśli sprawa dotyczy konkretnego zamówienia — przekażę ją do obsługi.",
      position: "right", // right | left
      hints: [
        { label: "Koszt dostawy", q: "Ile kosztuje dostawa?" },
        { label: "Dostępność produktu", q: "Czy macie PROD-001? Jaki jest stan i cena?" },
        { label: "Reklamacja", q: "Chcę złożyć reklamację na zamówienie nr 12345" },
      ],
    },
    window.NORDTHREAD_CHAT || {}
  );

  if (!cfg.webhookUrl) {
    console.error("[Nordthread] Brak webhookUrl w window.NORDTHREAD_CHAT");
    return;
  }

  var sessionId =
    "w_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now();
  var open = false;
  var busy = false;

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function text(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  }

  // Root
  var root = el("div", "nt-root nt-pos-" + (cfg.position === "left" ? "left" : "right"));
  root.style.setProperty("--nt-accent", cfg.primaryColor);

  // Launcher button
  var launcher = el("button", "nt-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Otwórz czat");
  launcher.innerHTML =
    '<svg class="nt-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>' +
    '<svg class="nt-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  // Panel
  var panel = el("div", "nt-panel");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Czat z asystentem sklepu");
  panel.hidden = true;

  var header = el("div", "nt-header");
  var avatar = text("div", "nt-avatar", (cfg.shopName || "A").charAt(0).toUpperCase());
  var headerText = el("div", "nt-header-text");
  headerText.appendChild(text("p", "nt-name", "Asystent " + cfg.shopName));
  var statusEl = text("p", "nt-status", "Online · odpowiadam w kilka sekund");
  headerText.appendChild(statusEl);
  header.appendChild(avatar);
  header.appendChild(headerText);

  var messages = el("div", "nt-messages");
  messages.setAttribute("role", "log");
  messages.setAttribute("aria-live", "polite");

  var form = el("form", "nt-form");
  var email = document.createElement("input");
  email.type = "email";
  email.className = "nt-email";
  email.placeholder = "Email (gdy sprawa wymaga kontaktu)";
  email.autocomplete = "email";

  var compose = el("div", "nt-compose");
  var textarea = document.createElement("textarea");
  textarea.className = "nt-input";
  textarea.rows = 1;
  textarea.required = true;
  textarea.placeholder = "Zapytaj o dostawę, zwrot albo produkt…";

  var sendBtn = el("button", "nt-send");
  sendBtn.type = "submit";
  sendBtn.setAttribute("aria-label", "Wyślij");
  sendBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  compose.appendChild(textarea);
  compose.appendChild(sendBtn);
  form.appendChild(email);
  form.appendChild(compose);

  var hints = el("div", "nt-hints");
  (cfg.hints || []).forEach(function (h) {
    var b = text("button", "nt-hint", h.label);
    b.type = "button";
    b.addEventListener("click", function () {
      ask(h.q);
    });
    hints.appendChild(b);
  });

  panel.appendChild(header);
  panel.appendChild(messages);
  panel.appendChild(form);
  panel.appendChild(hints);
  root.appendChild(panel);
  root.appendChild(launcher);
  document.body.appendChild(root);

  function setOpen(v) {
    open = v;
    panel.hidden = !v;
    root.classList.toggle("nt-open", v);
    launcher.setAttribute("aria-label", v ? "Zamknij czat" : "Otwórz czat");
    if (v) textarea.focus();
  }

  launcher.addEventListener("click", function () {
    setOpen(!open);
  });

  function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addBubble(content, role, extras) {
    extras = extras || {};
    var wrap = el("div", "nt-msg nt-msg--" + role);
    var bubble = text("div", "nt-bubble", content);
    wrap.appendChild(bubble);

    if (extras.badge) {
      var badge = text("span", "nt-badge" + (extras.badgeClass ? " " + extras.badgeClass : ""), extras.badge);
      wrap.appendChild(badge);
    }

    messages.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function addTyping() {
    var wrap = el("div", "nt-msg nt-msg--bot");
    wrap.dataset.typing = "1";
    wrap.innerHTML =
      '<div class="nt-bubble"><span class="nt-typing"><span></span><span></span><span></span></span></div>';
    messages.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function badgeFor(intent, escalated) {
    var key = String(intent || "").toUpperCase();
    if (escalated || key === "ESKALACJA") {
      return { text: "Do obsługi sklepu", className: "nt-badge--esc" };
    }
    if (key === "PRODUCT") return { text: "Produkt", className: "nt-badge--prod" };
    if (key === "FAQ") return { text: "Informacja", className: "nt-badge--faq" };
    return key ? { text: key, className: "nt-badge--faq" } : null;
  }

  function setBusy(v) {
    busy = v;
    sendBtn.disabled = v;
    textarea.disabled = v;
    statusEl.textContent = v ? "Pisze…" : "Online · odpowiadam w kilka sekund";
  }

  function ask(message) {
    if (!message || busy) return;
    if (!open) setOpen(true);

    addBubble(message, "user");
    var typing = addTyping();
    setBusy(true);

    fetch(cfg.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        session_id: sessionId,
        email: (email.value || "").trim() || "widget@demo.pl",
      }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        typing.remove();
        var answer =
          data.answer ||
          data.message ||
          "Nie udało się pobrać odpowiedzi. Spróbuj ponownie.";
        var intent = data.intent || "";
        var escalated =
          data.status === "escalated" ||
          data.escalated === true ||
          String(intent).toUpperCase() === "ESKALACJA";
        var badge = badgeFor(intent, escalated);

        addBubble(answer, "bot", {
          badge: badge ? badge.text : null,
          badgeClass: badge ? badge.className : "",
        });

        if (escalated) {
          statusEl.textContent = "Przekazano do obsługi";
          addBubble(
            (email.value || "").trim()
              ? "Sprawa trafiła do obsługi sklepu. Odezwiemy się na " + email.value.trim() + "."
              : "Sprawa trafiła do obsługi sklepu. Podaj email powyżej, żebyśmy mogli się odezwać.",
            "meta"
          );
        }
      })
      .catch(function (err) {
        console.error(err);
        typing.remove();
        addBubble(
          "Nie udało się połączyć z asystentem. Sprawdź internet i spróbuj ponownie.",
          "error"
        );
        statusEl.textContent = "Brak połączenia";
      })
      .finally(function () {
        setBusy(false);
        textarea.focus();
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = textarea.value.trim();
    if (!msg) return;
    textarea.value = "";
    textarea.style.height = "auto";
    ask(msg);
  });

  textarea.addEventListener("input", function () {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + "px";
  });

  textarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  // Welcome
  addBubble(cfg.welcome, "bot");

  // Inject CSS if not already present
  if (!document.getElementById("nt-widget-css")) {
    var link = document.createElement("link");
    link.id = "nt-widget-css";
    link.rel = "stylesheet";
    // Relative to widget.js location when served from same folder
    var scripts = document.getElementsByTagName("script");
    var src = "";
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf("widget.js") !== -1) {
        src = scripts[i].src.replace(/widget\.js(\?.*)?$/, "widget.css");
        break;
      }
    }
    link.href = src || "widget.css";
    document.head.appendChild(link);
  }
})();
