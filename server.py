#!/usr/bin/env python3
"""
Simpel HTTP server til IbiSimulator
Kør denne fil for at undgå CORS og Google API problemer
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Find projektmappen
project_dir = Path(__file__).parent
os.chdir(project_dir)

# Server konfiguration
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

print(f"🚀 Starter IbiSimulator web server...")
print(f"📁 Server mappe: {project_dir}")
print(f"🌐 Server URL: http://localhost:{PORT}")
print(f"📱 Åbner browser automatisk...")
print(f"⏹️  Tryk Ctrl+C for at stoppe serveren")
print("-" * 50)

# Start server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    # Åbn browser automatisk
    webbrowser.open(f'http://localhost:{PORT}')
    
    try:
        print(f"✅ Server kører på http://localhost:{PORT}")
        print("🔄 Server kører... (Ctrl+C for at stoppe)")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stoppet")
        httpd.shutdown()
