@echo off
echo 🚀 Uploading to GitHub (Optimized)...
echo.

echo 📝 Adding only necessary files for GitHub Pages...
git add index.html
git add README_GITHUB.md
git add floorplan.jpg.png
git add floorplan1.jpg.png
git add LOGO.png

echo.
echo 📝 Renaming README for GitHub...
copy README_GITHUB.md README.md

echo.
echo 💾 Committing changes...
git commit -m "Update Smart Home Simulator - Optimized for GitHub Pages deployment"

echo.
echo 📤 Pushing to GitHub...
git push origin main

echo.
echo ✅ Done! Check https://github.com/Moti90/Smarthome-Simulator
echo 🌐 Live demo: https://moti90.github.io/Smarthome-Simulator/
pause
