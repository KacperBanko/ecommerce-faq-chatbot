# FAQ Nordthread — zaktualizowane na podstawie Twojego CSV

Źródło: `E-commerce_Baza_Danych_Sklepu_Final - Arkusz 1 - FAQ.csv`  
Gotowy plik do importu: **`FAQ_GOTOWY_DO_SHEETS.csv`**

## Dane sklepu demo (wypełnione placeholdery)

| Pole | Wartość |
|------|---------|
| Telefon | +48 500 123 456 |
| Email | kontakt@nordthread.pl |
| Paczkomat | 14,99 PLN |
| Kurier DPD | 18,99 PLN |
| Darmowa dostawa | od 199 PLN |
| Czas dostawy | 1–2 dni robocze |
| Adres zwrotów | Nordthread, ul. Przykładowa 12, 00-001 Warszawa |
| Koszt zwrotu (odstąpienie) | klient |
| Koszt zwrotu (wada) | sklep |

---

## Co było źle w oryginalnym pliku

Oryginał nadal miał placeholdery:
- `[Numer Telefonu]`, `[E-mail]`
- `[Kwota]`, `[Liczba]`
- `[Link]`, `[Adres]`
- `[Klient/Sklep]`
- `[BLIK, Przelewy24, Karty, Pobranie]` (jako nawias, nie lista)

Bot mógł je cytować klientowi — wyglądało to na niedokończony sklep.

---

## Odpowiedzi po poprawce

### F001 — Status zamówienia
Status zamówienia sprawdzisz w mailu z potwierdzeniem albo po zalogowaniu w zakładce „Moje zamówienia”. Po wysyłce dostaniesz link do śledzenia InPost/DPD. Brak aktualizacji? Napisz na kontakt@nordthread.pl z numerem zamówienia.

### F002 — Zmiana / anulowanie
Jeśli chcesz zmienić lub anulować zamówienie, skontaktuj się jak najszybciej pod +48 500 123 456 lub kontakt@nordthread.pl. Zmiany są możliwe przed przekazaniem paczki do wysyłki.

### F003 — Płatności
Oferujemy bezpieczne płatności: BLIK, Przelewy24, karty Visa/Mastercard oraz pobranie. Wszystkie transakcje online są szyfrowane i chronione certyfikatem SSL.

### F004 — Dostawa
InPost Paczkomat: 14,99 PLN (1–2 dni robocze). Kurier DPD: 18,99 PLN (1–2 dni robocze). Odbiór osobisty: 0 PLN. Darmowa dostawa Paczkomatem od 199 PLN. Zwykle wysyłamy w ciągu 1 dnia roboczego od zaksięgowania płatności.

### F005 — Wysyłka zagraniczna
Tak, wysyłamy do wybranych krajów UE (m.in. Niemcy, Czechy, Słowacja). Koszty są wyliczane automatycznie w koszyku po wybraniu kraju dostawy.

### F006 — Zwrot produktu
Masz 14 dni na zwrot. Napisz na kontakt@nordthread.pl lub skorzystaj z formularza na nordthread.pl/zwroty, a następnie odeślij produkt na: Nordthread, ul. Przykładowa 12, 00-001 Warszawa. Środki zwrócimy w ciągu 14 dni.

### F007 — Czas i koszt zwrotu
Ustawowy czas na zwrot to 14 dni kalendarzowych. Przy odstąpieniu od umowy koszt odesłania ponosi klient. Przy wadzie lub niezgodności z zamówieniem koszt zwrotu pokrywa sklep.

### F008 — Reklamacja
W przypadku wady produktu przysługuje Ci reklamacja z tytułu rękojmi (2 lata). Napisz na kontakt@nordthread.pl lub zadzwoń +48 500 123 456 — rozpatrzymy sprawę w ciągu 14 dni i zorganizujemy naprawę lub wymianę.

### F009 — Konto i RODO
Konto założysz w sekcji „Zarejestruj się”. Twoje dane są bezpieczne, przetwarzane zgodnie z RODO i chronione przed dostępem osób trzecich.

### F010 — Faktura VAT
Tak, wystawiamy faktury VAT. Wystarczy zaznaczyć odpowiednią opcję w koszyku i podać NIP firmy. Duplikat wyślemy po mailu na kontakt@nordthread.pl.

---

## Jak wgrać do Google Sheets

1. Otwórz arkusz FAQ w Google Sheets
2. Usuń stare wiersze danych (zostaw nagłówki) **albo** zaimportuj nowy CSV
3. Plik → Importuj → wgraj `FAQ_GOTOWY_DO_SHEETS.csv`
4. Albo otwórz CSV w Excelu i skopiuj kolumny A–F do Sheets
5. Zapisz i przetestuj w czacie: „Ile kosztuje dostawa?”

Oczekiwany wynik: **14,99 / 18,99 / 199 PLN** — bez `[Kwota]`.
