# GitHub Pages — instrukcja

## Adres strony (po włączeniu Pages)

```
https://TWOJ-LOGIN.github.io/ecommerce-faq-chatbot/
```

| Strona | URL |
|--------|-----|
| Landing | `https://TWOJ-LOGIN.github.io/ecommerce-faq-chatbot/` |
| Demo sklepu + widget | `.../shop-demo.html` |
| Sam czat | `.../chat.html` |
| Widget JS | `.../widget.js` |

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
<script src="https://TWOJ-LOGIN.github.io/ecommerce-faq-chatbot/widget.js" defer></script>
```

Podmień `TWOJ-LOGIN` na swój login GitHub.

## Konfiguracja w GitHub (UI)

1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` → folder `/` (root) → **Save**
4. Poczekaj 1–2 minuty → pojawia się zielony link HTTPS

## Aktualizacje

```powershell
cd C:\Users\Asus\Projects\ecommerce-faq-chatbot
git add .
git commit -m "Update site"
git push
```

Po ~1 minucie zmiany są na Pages.
