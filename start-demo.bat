@echo off
cd /d "%~dp0"
echo.
echo  Demo chat — http://localhost:5173
echo  Zamknij to okno, zeby zatrzymac serwer.
echo.
py -3 -m http.server 5173 2>nul
if errorlevel 1 python -m http.server 5173 2>nul
if errorlevel 1 (
  echo Nie znaleziono Pythona.
  echo Otwieram index.html bezposrednio w przegladarce...
  start "" "%~dp0index.html"
  pause
)
