# Ecommerce FAQ Chatbot — Demo + Landing

Chatbot e-commerce (Make + Gemini + Google Sheets) z landing page sprzedażową.

## Struktura

| Plik | Opis |
|------|------|
| `index.html` | **Landing page** — oferta, cennik, demo czatu |
| `chat.html` | Samo demo czatu (pełne okno) |
| `landing.css` | Style strony ofertowej |
| `landing.js` | Mailto, smooth scroll |
| `styles.css` | Style widgetu czatu |
| `app.js` | Logika czatu |
| `config.js` | Webhook + email kontaktowy |

## Uruchomienie

```powershell
cd C:\Users\Asus\Projects\ecommerce-faq-chatbot
py -3 -m http.server 5173
```

- **Landing:** http://localhost:5173/
- **Demo czat:** http://localhost:5173/chat.html

## Konfiguracja

Edytuj `config.js`:
- `webhookUrl` — URL webhooka Make
- `contactEmail` — email na przycisku kontaktowym

## CORS w Make

W każdym Webhook response dodaj:
`Access-Control-Allow-Origin: *`

## Hosting (opcjonalnie)

- Netlify Drop / GitHub Pages — wrzuć cały folder
- Link do landinga wysyłaj klientom zamiast samego demo
