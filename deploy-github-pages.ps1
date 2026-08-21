# Krok po kroku: GitHub Pages
# Odpal w PowerShell (całość albo krokami)

cd C:\Users\Asus\Projects\ecommerce-faq-chatbot

Write-Host "`n=== KROK 1: Git init ===" -ForegroundColor Cyan
if (-not (Test-Path .git)) { git init } else { Write-Host "Git juz zainicjalizowany" }

Write-Host "`n=== KROK 2: Logowanie GitHub (gh) ===" -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host "Nie jestes zalogowany. Uruchom: gh auth login" -ForegroundColor Yellow
  Write-Host "Wybierz: GitHub.com -> HTTPS -> Login with browser" -ForegroundColor Yellow
  gh auth login
}

Write-Host "`n=== KROK 3: Commit ===" -ForegroundColor Cyan
git add .
git status
git branch -M main
git commit -m "Initial site for GitHub Pages (landing, widget, demo)"

Write-Host "`n=== KROK 4: Utworzenie repo i push ===" -ForegroundColor Cyan
$user = gh api user -q .login
Write-Host "GitHub user: $user"

# Jesli remote juz istnieje, pomin create
$remotes = git remote 2>$null
if ($remotes -notcontains "origin") {
  gh repo create ecommerce-faq-chatbot --public --source=. --remote=origin --push
} else {
  Write-Host "Remote origin juz istnieje — push..."
  git push -u origin main
}

Write-Host "`n=== KROK 5: Wlaczenie GitHub Pages ===" -ForegroundColor Cyan
gh api -X POST "repos/$user/ecommerce-faq-chatbot/pages" -f "source[branch]=main" -f "source[path]=/" 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "API moglo zwrocic blad (np. Pages juz wlaczone). Sprawdz recznie:" -ForegroundColor Yellow
  Write-Host "https://github.com/$user/ecommerce-faq-chatbot/settings/pages"
}

Write-Host "`n=== GOTOWO ===" -ForegroundColor Green
Write-Host "Repo:  https://github.com/$user/ecommerce-faq-chatbot"
Write-Host "Pages: https://$user.github.io/ecommerce-faq-chatbot/"
Write-Host "Demo:  https://$user.github.io/ecommerce-faq-chatbot/shop-demo.html"
Write-Host "`nPoczekaj 1-2 minuty, potem otworz link Pages w przegladarce."
