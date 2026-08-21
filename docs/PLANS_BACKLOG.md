# Plany na później + porównanie z Tidio/Lyro

**Status:** PAUZA sprzedażowa / produktowa (06.08.2026)  
**Źródło researchu:** `Co oferuje TidioLyro (funkcje, któr.txt)`  
**Decyzja:** NIE budujemy „Lyro 2.0” teraz. Najpierw oferta + follow-up + 1. klient.

---

## Werdykt: Make MVP vs SaaS

| Funkcja z Tidio/Lyro | Da się na Make + widget? | Potrzeba mini-SaaS / własnego produktu? | Kiedy |
|----------------------|---------------------------|----------------------------------------|--------|
| FAQ + język naturalny | ✓ Już mamy (Sheets + Gemini) | Nie | — |
| Stany/ceny z arkusza | ✓ Już mamy | Nie | — |
| Eskalacja + mail | ✓ Już mamy | Nie | — |
| Widget na stronie | ✓ Już mamy (lokalnie) | HTTPS hosting | Następny krok |
| Proste karty produktów w czacie | Częściowo (frontend + dane z Sheets) | Niekoniecznie | Po 1. kliencie |
| Status zamówienia (API sklepu) | Częściowo (Make + API Woo/Shoper) | Lepiej w SaaS przy wielu klientach | Po 1–2 klientach |
| Live sync katalogu | Słabo / drogo w Make | **Tak** | SaaS |
| Rekomendacje + koszyk | Trudno solidnie | **Tak** | SaaS |
| Omnichannel (IG/WA/FB) | Bardzo ciężko | **Tak** | Dużo później |
| Live chat + przejęcie przez agenta | Nie w Make sensownie | **Tak** | SaaS |
| Analytics dashboard | Sheets = surowe dane | Panel = **SaaS** | Po cashflow |
| Flow builder drag&drop | Nie | **Tak** | Nie celujemy |
| Visitor tracking + triggery | Ograniczenie | **Tak** | Później |
| Copilot dla agenta | Nie | **Tak** | Później |
| Multi-tenant + billing | Nie | **Tak** (to jest SaaS) | Po walidacji |

### Krótka odpowiedź
**Nie wprowadzamy teraz funkcji z notatki Tidio.**  
Większość z nich **wymaga SaaS** (własny backend, panel, wielu klientów).  
Na Make da się tylko **cienkie przybliżenia** — i to dopiero po pierwszej sprzedaży.

Twoje MVP konkuruje z **prostym wsparciem FAQ**, nie z całym Tidio.  
I to jest OK — sprzedajesz wdrożenie + opiekę, nie „tańszy Lyro”.

---

## Co sprzedajemy TERAZ (bez Tidio)

- Widget na stronę sklepu  
- FAQ + stany z Google Sheets  
- Przekazanie trudnych spraw do obsługi (+ mail)  
- Edycja treści bez programisty  
- Wdrożenie 5–7 dni  

**Nie obiecujemy:** live koszyk, Messenger/IG, panel agentów, scraping całej strony, 70% resolution rate jak Tidio.

---

## Backlog — zapisane na później

### Faza A — sprzedaż (następna sesja)
1. Oferta 1-stronicowa (+ sekcja faktury)
2. Follow-up / wiadomości do firm
3. Prawdziwy email kontaktowy
4. HTTPS + hosting widgetu (Netlify)

### Faza B — po 1. płatnym kliencie
1. Instrukcja edycji FAQ dla klienta  
2. Checklist wdrożenia u klienta  
3. Proste karty produktu w widgetcie  
4. Lepsze limity / monitoring kosztów Make+Gemini  

### Faza C — mini-SaaS (gdy jest cashflow)
1. Wspólny backend + workspace per klient  
2. Panel admina (FAQ/produkty/logi)  
3. Billing Stripe + limity wiadomości  
4. Integracja WooCommerce/Shoper API (live stany / zamówienia)  

### Faza D — „Lyro-like” (opcjonalnie, miesiące później)
1. Analytics  
2. Live handoff  
3. Omnichannel  
4. Proactive triggers  
5. RAG ze strony www  

---

## Faktury — jak sprzedawać firmom (BEZ JDG)

### Zasada
Firma B2B chce fakturę. **Na teraz:** rozliczenie przez **Useme / platformę** — fakturę wystawia platforma.

### Ścieżka aktywna
1. Klient akceptuje ofertę + podaje NIP  
2. Zlecenie na Useme  
3. Faktura od platformy → płatność  
4. Start wdrożenia  

### Później (opcjonalnie)
JDG + własna faktura — po 1–2 klientach, jeśli zechcesz.  

---

## Notatka strategiczna

Research Tidio był wartościowy jako **mapa rynku**, nie jako TODO na ten tydzień.  
Cel LVL 9 = **pierwszy płatny klient**, nie feature parity z Tidio.
