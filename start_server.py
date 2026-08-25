import http.server
import socketserver
import socket
import webbrowser
import os
import sys
import json
from datetime import datetime

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DIRECTORY, "data.json")

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

class SyncServerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS for all local network devices (iPhone, iPad, PC)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/data' or self.path == '/api/sync':
            if os.path.exists(DATA_FILE):
                try:
                    with open(DATA_FILE, 'r', encoding='utf-8') as f:
                        content = f.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    return
                except Exception as e:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
                    return
            else:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "empty", "message": "No data saved yet"}).encode('utf-8'))
                return
        
        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/data' or self.path == '/api/sync':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                post_body = self.rfile.read(content_length)
                data = json.loads(post_body.decode('utf-8'))
                
                # Add server timestamp
                data['lastSyncedAt'] = datetime.now().isoformat()
                
                with open(DATA_FILE, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                
                response_payload = {
                    "status": "ok",
                    "savedAt": data['lastSyncedAt'],
                    "bytes": len(post_body)
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return
                
        return super().do_POST()

def run():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    local_url = f"http://localhost:{PORT}"
    network_url = f"http://{local_ip}:{PORT}"

    print("=" * 65)
    print("  🌵 NutriPlan 72K - Servidor con Sincronización Automática")
    print("=" * 65)
    print(f"\n  💻 En este ordenador:    {local_url}")
    print(f"  📱 En iPhone 15 / iPad:   {network_url}")
    print(f"\n  🔄 Sincronización activa: {DATA_FILE}")
    print("     Todos tus dispositivos compartirán la misma información.")
    print("\n  💡 Para instalar la PWA en iPhone / iPad:")
    print("     1. Conéctate a la misma red Wi-Fi de tu casa.")
    print(f"     2. Abre Safari e introduce: {network_url}")
    print("     3. Pulsa 'Compartir' -> 'Añadir a pantalla de inicio'.")
    print("=" * 65)
    print("  Pulsa Ctrl + C para detener el servidor.\n")

    # Automatically open local browser
    try:
        webbrowser.open(local_url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SyncServerHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
            sys.exit(0)

if __name__ == '__main__':
    run()
