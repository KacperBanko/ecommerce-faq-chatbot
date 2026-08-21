# Widget chatbota — jak podłączyć i co przekazać klientowi

## Twoje zmiany w Make — ocena

Wyglądają dobrze i domykają MVP:

| Zmiana | Ocena |
|--------|--------|
| Parse JSON z odpowiedzi Gemini | ✓ poprawne |
| Router boolean true/false + fallback | ✓ |
| CORS `Access-Control-Allow-Origin: *` | ✓ potrzebne dla widgetu |
| Mail przy eskalacji | ✓ |
| ChatHistory (log rozmów) | ✓ |

Backend jest gotowy pod osadzenie na stronie.

---

## Jak działa podłączenie do sklepu

```
Strona sklepu (HTML)
   └── widget.js (pływający przycisk czatu)
         └── POST JSON → Webhook Make
               └── Gemini + Sheets → odpowiedź JSON
                     └── widget pokazuje odpowiedź
```

Klient **nie instaluje Make**. Dostaje 2–3 linie kodu do wklejenia w stopkę strony (lub przez Google Tag Manager / wtyczkę „Custom HTML”).

---

## Test lokalny (teraz)

```powershell
cd C:\Users\Asus\Projects\ecommerce-faq-chatbot
py -3 -m http.server 5173
```

Otwórz: **http://localhost:5173/shop-demo.html**

1. Kliknij zielony przycisk w prawym dolnym rogu  
2. Przetestuj:
   - „Ile kosztuje dostawa?”
   - „Czy macie PROD-001?”
   - „Reklamacja zamówienia nr 12345”

---

## Kod do wklejenia na stronie sklepu (produkcja)

Gdy `widget.js` i `widget.css` będą na hostingu HTTPS (Netlify / Twoja domena):

```html
<!-- Chatbot — przed </body> -->
<script>
  window.NORDTHREAD_CHAT = {
    webhookUrl: "https://hook.eu2.make.com/TWOJ_WEBHOOK",
    shopName: "NazwaSklepuKlienta",
    primaryColor: "#0f6b5c",
    position: "right",
    welcome: "Cześć! W czym mogę pomóc?"
  };
</script>
<script src="https://TWOJA-DOMENA/widget.js" defer></script>
```

`widget.js` sam dociąga `widget.css` z tego samego folderu.

### Gdzie wkleić u klienta

| Platforma | Gdzie |
|-----------|--------|
| Shoper | Wygląd → Edycja HTML / skrypty w stopce |
| WooCommerce | Motyw → `footer.php` albo wtyczka „Insert Headers and Footers” |
| Shopify | theme.liquid przed `</body>` |
| IdoSell / inny | Panel → niestandardowy HTML / skrypty globalne |
| GTM | Tag Custom HTML na wszystkich stronach |

---

## Co MUSISZ przekazać klientowi (checklist)

### A) Jeśli Ty utrzymujesz bota (rekomendowane na start)

Przekazujesz klientowi:

1. **Kod snippet** (jak wyżej) z jego `shopName` i kolorem  
2. **Link do demo** (Twoja strona / nagranie)  
3. **Instrukcję edycji FAQ** (jak zmieniać odpowiedzi w Google Sheets)  
4. **Informację o eskalacjach** (na jaki mail trafiają zgłoszenia)  
5. **Cennik utrzymania** (np. 300 PLN/mies.)  

Ty trzymasz:
- konto Make
- klucz Gemini
- arkusze (lub udostępniasz klientowi do edycji FAQ)

Klient **nie zakłada Make**.

### B) Jeśli klient ma mieć pełną kontrolę (handover)

Przekazujesz:

| Element | Forma |
|---------|--------|
| Export scenariusza Make | plik `.json` / blueprint |
| Arkusz Google Sheets | kopia (FAQ, Produkty, Eskalacje, ChatHistory) |
| Pliki widgetu | `widget.js` + `widget.css` |
| Snippet do strony | gotowy HTML |
| Instrukcja wdrożenia | ten dokument / PDF |
| Checklist testów | FAQ / produkt / reklamacja |

Klient musi mieć:
- własne konto Make
- własny klucz Gemini
- webhook URL podmieniony w snippecie

---

## Co wysłać w mailu do klienta (szablon)

```
Temat: Chatbot — kod do wklejenia + instrukcja

Cześć [Imię],

poniżej kod do wklejenia na stronie sklepu (przed zamknięciem </body>
albo przez wtyczkę „własny HTML”):

[SNIPPET]

Po wklejeniu:
1. Odśwież stronę sklepu
2. Kliknij zielony przycisk czatu w rogu
3. Wyślij test: „Ile kosztuje dostawa?”

FAQ i produkty edytujemy w udostępnionym arkuszu Google
(instrukcja w załączniku).

Reklamacje i sprawy z numerem zamówienia trafiają na:
[EMAIL OBSŁUGI]

Gdy coś nie działa — napisz, poprawimy.
```

---

## Ważne uwagi techniczne

1. **CORS** — już masz `Access-Control-Allow-Origin: *` w Make. Bez tego widget na stronie sklepu nie zadziała.  
2. **HTTPS** — sklep klienta jest zwykle na HTTPS. Widget też musi być serwowany z HTTPS (nie z `localhost` na produkcji).  
3. **Webhook** — nie udostępniaj publicznie w dokumentacji dla obcych; w snippecie dla klienta jest OK (to i tak publiczny endpoint).  
4. **Kolor / nazwa** — zmieniaj w `NORDTHREAD_CHAT`, nie w kodzie widgetu.

---

## Pliki w projekcie

| Plik | Rola |
|------|------|
| `widget.js` | Logika pływającego czatu |
| `widget.css` | Wygląd widgetu |
| `shop-demo.html` | Lokalny „fałszywy sklep” do testów |
| `docs/WIDGET_I_PRZEKAZANIE.md` | Ta instrukcja |

---

## Kolejność działań

1. Przetestuj lokalnie `shop-demo.html`  
2. Wrzuć `widget.js` + `widget.css` na hosting HTTPS (Netlify Drop wystarczy)  
3. Wyślij klientowi snippet z URL-em HTTPS  
4. Potwierdź 3 testy na jego stronie  
