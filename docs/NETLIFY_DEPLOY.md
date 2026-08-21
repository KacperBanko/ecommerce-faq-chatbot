# Publikacja na Netlify (HTTPS)

## Najprostsza metoda: Netlify Drop (bez instalacji)

1. Wejdź na: https://app.netlify.com/drop  
2. Zaloguj się (GitHub / email).  
3. Przeciągnij **cały folder**:
   `C:\Users\Asus\Projects\ecommerce-faq-chatbot`
4. Poczekaj ~30 sekund — dostaniesz adres:
   `https://losowa-nazwa.netlify.app`
5. Sprawdź:
   - Landing: `https://...netlify.app/`
   - Demo sklepu + widget: `https://...netlify.app/shop-demo.html`
   - Czat: `https://...netlify.app/chat.html`

## Snippet dla klienta (po publikacji)

Podmień `https://TWOJA-STRONA.netlify.app` na swój adres:

```html
<script>
  window.NORDTHREAD_CHAT = {
    webhookUrl: "https://hook.eu2.make.com/13dfib3i8ufb42tf59imnk9b1e8826j9",
    shopName: "NazwaSklepu",
    primaryColor: "#0f6b5c",
    welcome: "Cześć! W czym mogę pomóc?"
  };
</script>
<script src="https://TWOJA-STRONA.netlify.app/widget.js" defer></script>
```

## Po deployu — checklist

- [ ] Otwórz `/` — landing działa  
- [ ] Otwórz `/shop-demo.html` — widget w rogu, odpowiedzi z Make  
- [ ] Wklej URL do `docs/OFERTA.md` (pole Link demo)  
- [ ] Wklej URL do follow-upów zamiast `[LINK_DEMO]`  

## Aktualizacja strony później

Wejdź w Netlify → Sites → Twój site → Deploys → **Drag and drop** nowego folderu  
albo podłącz Git (opcjonalnie).

## Własna domena

Nie jest wymagana na start.  
Site settings → Domain management → Add custom domain — gdy będziesz gotowy.
