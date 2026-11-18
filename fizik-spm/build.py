#!/usr/bin/env python3
"""Gabungkan fail dalam src/ menjadi satu laman web.

  python3 build.py            -> index.html (laman lengkap, boleh dibuka terus)
  python3 build.py --fragmen F -> juga tulis versi tanpa <html>/<head>/<body> ke fail F
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / 'src'
TITLE = 'Fizik SPM Interaktif'
FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=Bricolage+Grotesque:opsz,wght@12..96,700..800'
         '&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400'
         '&family=STIX+Two+Text:ital,wght@0,400;0,600;1,400&display=swap">')

css = (SRC / 'style.css').read_text(encoding='utf-8')
body = (SRC / 'body.html').read_text(encoding='utf-8')
js = '\n'.join((SRC / n).read_text(encoding='utf-8') for n in ('core.js', 'sims.js', 'data-t4.js', 'data-t5.js', 'spm-t4.js', 'spm-t5.js')) + '\nroute();\n'
assert '</script' not in js.lower()

inner = f'{FONTS}\n<style>\n{css}</style>\n{body}<script>\n{js}</script>\n'
full = ('<!doctype html>\n<html lang="ms">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        f'<title>{TITLE}</title>\n'
        '<meta name="description" content="Nota ringkas, visual interaktif dan latihan SPM bagi Fizik KSSM Tingkatan 4 dan 5.">\n'
        f'</head>\n<body>\n{inner}</body>\n</html>\n')
(ROOT / 'index.html').write_text(full, encoding='utf-8')
print('index.html', len(full.encode('utf-8')), 'bait')

if '--fragmen' in sys.argv:
    out = pathlib.Path(sys.argv[sys.argv.index('--fragmen') + 1])
    frag = f'<title>{TITLE}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n{inner}'
    out.write_text(frag, encoding='utf-8')
    print(out, len(frag.encode('utf-8')), 'bait')
