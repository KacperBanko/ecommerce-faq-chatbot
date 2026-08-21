(() => {
  const cfg = window.CHAT_CONFIG || {};
  const email = cfg.contactEmail || "kontakt@nordthread.pl";
  const subject = encodeURIComponent("Zapytanie o chatbota e-commerce");
  const mailto = `mailto:${email}?subject=${subject}`;

  const contactBtn = document.getElementById("ctaContact");
  if (contactBtn) {
    contactBtn.href = mailto;
    contactBtn.textContent = `Napisz: ${email}`;
  }

  ["ctaNav", "ctaHero", "ctaStarter", "ctaPro"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getAttribute("href") === "#kontakt") {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
