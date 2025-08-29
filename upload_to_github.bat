@echo off
echo 🚀 Uploading to GitHub...
echo.

echo 📝 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Fix brugeroprettelse problem - Rettet localStorage keys og tilføjet event handler"

echo.
echo 📤 Pushing to GitHub...
git push origin main

echo.
echo ✅ Done! Check https://github.com/Moti90/Smarthome-Simulator
pause
