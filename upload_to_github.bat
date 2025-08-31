@echo off
echo 🚀 Uploading to GitHub...
echo.

echo 📝 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Fix brugeroprettelse problem - Rettet localStorage keys og tilføjet event handler"

echo.
echo 📤 Pushing to GitHub (force with lease)...
git push --force-with-lease origin main

echo.
echo ✅ Done! Check https://github.com/Moti90/Smarthome-Simulator
pause
