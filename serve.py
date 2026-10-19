#!/usr/bin/env python3
"""Preview clean marketing URLs: python3 serve.py [port]."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit
import sys

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def resolve_page(self):
        url = urlsplit(self.path)
        path = unquote(url.path)
        if path.endswith('.html'):
            clean = '/' if path == '/index.html' else path[:-5]
            self.send_response(301)
            self.send_header('Location', urlunsplit(('', '', clean, url.query, '')))
            self.end_headers()
            return False
        candidate = (ROOT / path.strip('/')).resolve()
        if candidate.is_relative_to(ROOT) and path != '/' and candidate.with_suffix('.html').is_file() and not candidate.suffix:
            self.path = urlunsplit(('', '', path.rstrip('/') + '.html', url.query, ''))
        return True

    def do_GET(self):
        if self.resolve_page():
            super().do_GET()

    def do_HEAD(self):
        if self.resolve_page():
            super().do_HEAD()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    server = ThreadingHTTPServer(('127.0.0.1', port), partial(Handler, directory=str(ROOT)))
    print(f'JobSeam preview: http://localhost:{server.server_port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
