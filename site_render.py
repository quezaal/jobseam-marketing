"""Render shared site navigation and public demo settings into static HTML."""

import html
import json
import re
from urllib.parse import urlsplit


def nav_link(item, route, header=False):
    destination = html.escape(item['href'], quote=True)
    label = html.escape(item['label'])
    current = ' aria-current="page"' if item['href'] == route else ''
    button = ' class="button"' if header and item.get('button') else ''
    return f'<a href="{destination}"{current}{button}>{label}</a>'


def render_navigation(items, route):
    header = []
    footer = {}
    utility = []
    for item in items:
        if 'items' in item:
            label = html.escape(item['label'])
            links = '\n'.join(nav_link(child, route) for child in item['items'])
            active = any(child['href'] == route or (child['href'] == '/help' and route.startswith('/help-'))
                         for child in item['items'])
            group_class = 'nav-group nav-group-current' if active else 'nav-group'
            header.append(
                f'<details class="{group_class}"><summary>{label} '
                '<span aria-hidden="true" class="nav-chevron">⌄</span></summary>'
                f'<div class="nav-submenu">\n{links}\n</div></details>'
            )
            footer.setdefault(item['label'], []).extend(item['items'])
        else:
            header.append(nav_link(item, route, header=True))
            if item.get('footer_group'):
                footer.setdefault(item['footer_group'], []).append(item)
            else:
                utility.append(nav_link(item, route))

    return {
        '{{HEADER_LINKS}}': '\n'.join(header),
        '{{FOOTER_GROUPS}}': '\n'.join(
            f'<section><h2>{html.escape(label)}</h2>\n'
            + '\n'.join(nav_link(item, route) for item in links)
            + '\n</section>' for label, links in footer.items()
        ),
        '{{FOOTER_LINKS}}': ''.join(utility),
    }


def render_page(root, source):
    page = source.read_text(encoding='utf-8')
    route = '/' if source.stem == 'index' else '/' + source.stem
    parts = [part for part in ('header', 'footer') if f'<!-- include:{part} -->' in page]
    if parts:
        items = json.loads((root / 'partials' / 'navigation.json').read_text(encoding='utf-8'))
        replacements = render_navigation(items, route)
        for part in parts:
            fragment = (root / 'partials' / f'{part}.html').read_text(encoding='utf-8')
            for key, value in replacements.items():
                fragment = fragment.replace(key, value)
            page = page.replace(f'<!-- include:{part} -->', fragment.rstrip())

    if '<!-- include:demo-booking -->' in page:
        settings = json.loads((root / 'site-config.json').read_text(encoding='utf-8'))
        recipient = settings['demo_recipient']
        if not re.fullmatch(r'[A-Za-z0-9._+%\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}', recipient):
            raise ValueError('demo_recipient must be an email address')
        booking = settings['zoho_booking_url'].strip()
        widget = ''
        if booking:
            target = urlsplit(booking)
            if target.scheme != 'https' or not target.hostname or target.username or target.password or any(c.isspace() for c in booking):
                raise ValueError('zoho_booking_url must be a public HTTPS booking link without credentials')
            widget = (
                '<p>Choose an available slot on our Zoho Bookings page for a live demo.</p>'
                f'<p><a class="button" href="{html.escape(booking, quote=True)}" '
                'target="_blank" rel="noopener">Choose a demo time ↗</a></p>'
            )
        page = page.replace('<!-- include:demo-booking -->', widget)
        page = page.replace('{{DEMO_RECIPIENT}}', html.escape(recipient, quote=True))
    return page
