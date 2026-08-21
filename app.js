(() => {
  const cfg = window.CHAT_CONFIG || {};
  const chatEl = document.querySelector(".chat");
  if (!chatEl) return;

  const messagesEl = document.getElementById("messages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("message");
  const emailInput = document.getElementById("email");
  const sendBtn = document.getElementById("sendBtn");
  const statusText = document.getElementById("statusText");
  const hints = document.getElementById("hints");

  const sessionId =
    "web_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now();

  const FOLLOW_UPS = {
    FAQ: [
      { label: "Sprawdź zwroty", q: "Jak mogę zwrócić zakupiony produkt?" },
      { label: "Metody płatności", q: "Jakie metody płatności akceptujecie?" },
    ],
    PRODUCT: [
      { label: "Koszt dostawy", q: "Ile kosztuje dostawa?" },
      { label: "Czas dostawy", q: "Jaki jest czas oczekiwania na przesyłkę?" },
    ],
    ESKALACJA: [
      { label: "Jak złożyć reklamację?", q: "Co zrobić, jeśli produkt jest wadliwy?" },
      { label: "Polityka zwrotów", q: "Ile mam czasu na zwrot?" },
    ],
    POZA_ZAKRESEM: [
      { label: "Koszt dostawy", q: "Ile kosztuje dostawa?" },
      { label: "Dostępność produktu", q: "Czy macie PROD-001? Jaki jest stan i cena?" },
    ],
  };

  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setStatus(mode, text) {
    chatEl.classList.remove("chat--busy", "chat--error", "chat--escalated");
    if (mode === "busy") chatEl.classList.add("chat--busy");
    if (mode === "error") chatEl.classList.add("chat--error");
    if (mode === "escalated") chatEl.classList.add("chat--escalated");
    statusText.textContent = text;
  }

  function intentLabel(intent, escalated) {
    const key = String(intent || "").toUpperCase();
    if (escalated || key === "ESKALACJA") {
      return { text: "Do obsługi sklepu", className: "msg__badge--escalated" };
    }
    if (key === "PRODUCT") {
      return { text: "Produkt", className: "msg__badge--product" };
    }
    if (key === "FAQ") {
      return { text: "Informacja", className: "msg__badge--faq" };
    }
    if (key === "POZA_ZAKRESEM") {
      return { text: "Poza zakresem", className: "msg__badge--faq" };
    }
    return key ? { text: key, className: "msg__badge--faq" } : null;
  }

  function addMessage(text, role, extras = {}) {
    const wrap = document.createElement("div");
    wrap.className = `msg msg--${role}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (extras.intent || extras.escalated) {
      const label = intentLabel(extras.intent, extras.escalated);
      if (label) {
        const badge = document.createElement("span");
        badge.className = `msg__badge ${label.className}`;
        badge.textContent = label.text;
        wrap.appendChild(badge);
      }
    }

    messagesEl.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function addNotice(title, text) {
    const notice = document.createElement("div");
    notice.className = "notice";
    notice.innerHTML = `
      <p class="notice__title"></p>
      <p class="notice__text"></p>
    `;
    notice.querySelector(".notice__title").textContent = title;
    notice.querySelector(".notice__text").textContent = text;
    messagesEl.appendChild(notice);
    scrollBottom();
    return notice;
  }

  function clearSuggestions() {
    messagesEl.querySelectorAll(".suggestions").forEach((el) => el.remove());
  }

  function addSuggestions(intent) {
    clearSuggestions();
    const key = String(intent || "").toUpperCase();
    const items = FOLLOW_UPS[key] || FOLLOW_UPS.FAQ;
    const row = document.createElement("div");
    row.className = "suggestions";

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = item.label;
      btn.addEventListener("click", () => askBot(item.q));
      row.appendChild(btn);
    });

    messagesEl.appendChild(row);
    scrollBottom();
  }

  function addTyping() {
    const wrap = document.createElement("div");
    wrap.className = "msg msg--bot";
    wrap.dataset.typing = "1";
    wrap.innerHTML =
      '<div class="bubble"><span class="typing" aria-label="Pisze"><span></span><span></span><span></span></span></div>';
    messagesEl.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function setBusy(busy) {
    sendBtn.disabled = busy;
    input.disabled = busy;
    if (busy) {
      setStatus("busy", "Pisze…");
    }
  }

  function autoGrow() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }

  async function askBot(message) {
    const email = (emailInput.value || "").trim();

    clearSuggestions();
    addMessage(message, "user");
    const typing = addTyping();
    setBusy(true);

    try {
      const res = await fetch(cfg.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id: sessionId,
          email: email || "demo@nordthread.pl",
        }),
      });

      typing.remove();

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const answer =
        data.answer ||
        data.message ||
        "Nie udało się pobrać odpowiedzi. Spróbuj ponownie.";
      const intent = data.intent || "";
      const escalated =
        data.status === "escalated" ||
        data.escalated === true ||
        String(intent).toUpperCase() === "ESKALACJA";

      addMessage(answer, "bot", { intent, escalated });

      if (escalated) {
        setStatus("escalated", "Przekazano do obsługi");
        addNotice(
          "Sprawa trafiła do obsługi sklepu",
          email
            ? `Odezwiemy się na ${email}, zwykle w ciągu 24 godzin.`
            : "Podaj email powyżej — skontaktujemy się w sprawie Twojego zgłoszenia."
        );
      } else if (data.status === "fallback") {
        setStatus("error", "Tryb awaryjny");
        addMessage(
          "Wystąpił problem techniczny. Spróbuj ponownie za chwilę.",
          "meta"
        );
      } else {
        setStatus("online", "Online · odpowiadam w kilka sekund");
      }

      addSuggestions(intent);
    } catch (err) {
      typing.remove();
      console.error(err);
      setStatus("error", "Brak połączenia");
      addMessage(
        "Nie udało się połączyć z asystentem. Sprawdź internet i spróbuj ponownie.",
        "error"
      );
    } finally {
      setBusy(false);
      if (!chatEl.classList.contains("chat--error") && !chatEl.classList.contains("chat--escalated")) {
        setStatus("online", "Online · odpowiadam w kilka sekund");
      }
      input.focus();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    autoGrow();
    askBot(text);
  });

  input.addEventListener("input", autoGrow);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  hints.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (!btn) return;
    askBot(btn.dataset.q);
  });

  addMessage(
    cfg.welcome ||
      "Cześć! Pomogę w pytaniach o dostawę, zwroty, płatności i dostępność produktów.",
    "bot"
  );
})();
