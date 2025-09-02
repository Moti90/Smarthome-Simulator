@echo off
echo 🚀 Uploading to GitHub (Full Project - All Files)...
echo.

echo 📝 Adding all project files for GitHub Pages...
git add .

echo.
echo 📝 Renaming README for GitHub...
copy README_GITHUB.md README.md

echo.
echo 💾 Committing changes...
git commit -m "Update Smart Home Simulator - Full project with backend and security files"

echo.
echo 📤 Pushing to GitHub...
git push origin main

echo.
echo ✅ Done! Full project uploaded to GitHub
echo 🌐 Live demo: https://moti90.github.io/Smarthome-Simulator/
echo 🔒 Backend and security files included
pause
