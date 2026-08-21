# GitHub Pages — instrukcja

**Login:** `KacperBanko`  
**Repo:** https://github.com/KacperBanko/ecommerce-faq-chatbot

## Adresy (HTTPS)

| Strona | URL |
|--------|-----|
| Landing | https://KacperBanko.github.io/ecommerce-faq-chatbot/ |
| Demo sklepu + widget | https://KacperBanko.github.io/ecommerce-faq-chatbot/shop-demo.html |
| Sam czat | https://KacperBanko.github.io/ecommerce-faq-chatbot/chat.html |
| Widget JS | https://KacperBanko.github.io/ecommerce-faq-chatbot/widget.js |

## Snippet dla klienta

```html
<script>
  window.NORDTHREAD_CHAT = {
    webhookUrl: "https://hook.eu2.make.com/13dfib3i8ufb42tf59imnk9b1e8826j9",
    shopName: "NazwaSklepu",
    primaryColor: "#0f6b5c",
    welcome: "Cześć! W czym mogę pomóc?"
  };
</script>
<script src="https://KacperBanko.github.io/ecommerce-faq-chatbot/widget.js" defer></script>
```

## Konfiguracja Pages (jeśli jeszcze nie działa)

1. https://github.com/KacperBanko/ecommerce-faq-chatbot/settings/pages
2. Source: Deploy from a branch → `main` / `/` → Save
3. Poczekaj 1–2 minuty

## Aktualizacje lokalne + push

```powershell
cd C:\Users\Asus\Projects\ecommerce-faq-chatbot
git remote set-url origin https://github.com/KacperBanko/ecommerce-faq-chatbot.git
git add .
git commit -m "Update site"
git push
```
