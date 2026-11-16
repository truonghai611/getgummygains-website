#!/usr/bin/env python3
"""Publish Create's Black Friday / Cyber Monday code across the site in one step.

Run this the day Create announces its sale (check Gmail from:hi@trycreate.co
and trycreate.co first; only publish a code Create itself announced):

    python3 scripts/set_bf_deal.py --code BF2026 \
        --offer "up to 40% off subscriptions" \
        --dates "November 24 to December 1, 2026" \
        --checked "November 24, 2026"

It updates:
  * create-creatine-black-friday.html: short-answer box, code/terms table,
    status line, FAQ (visible + JSON-LD), dateModified and bylines
  * cheapest-way-to-buy-create-creatine.html: short-answer box sentence
  * every page with the site-wide "Black Friday is November 27" notice

Use --ended to mark the sale as over after Cyber Monday.
It prints a warning for any block it could not find. Review `git diff` before committing.
"""
import argparse
import datetime as dt
import glob
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BF = os.path.join(ROOT, 'create-creatine-black-friday.html')
CW = os.path.join(ROOT, 'cheapest-way-to-buy-create-creatine.html')

NOTICE_RE = re.compile(r'Create has not announced its 2026 sale \(checked [A-Za-z]+ \d+, 2026\)\. '
                       r'<a href="/create-creatine-black-friday">[^<]*</a>\.')
NOTICE_LIVE_RE = re.compile(r'Create&rsquo;s (?:sale is live: code <strong>[^<]*</strong>[^<]*|Black Friday sale has ended )\(checked [^)]*\)\. '
                            r'<a href="/create-creatine-black-friday">[^<]*</a>\.')


CHIP = 'font-size:1.1em;font-weight:700;padding:2px 8px;border:1px dashed currentColor;border-radius:6px;white-space:nowrap'
BTN = 'font:inherit;font-size:.85em;padding:2px 10px;margin-left:4px;border:1px solid currentColor;border-radius:6px;background:transparent;color:inherit;cursor:pointer'


def iso(checked):
    return dt.datetime.strptime(checked, '%B %d, %Y').date().isoformat()


def sub(pattern, repl, s, label, count=1, flags=0):
    new, n = re.subn(pattern, repl, s, count=count, flags=flags)
    if n == 0:
        print(f'  ! pattern not found: {label}')
    return new


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--code', help='code exactly as Create published it')
    ap.add_argument('--offer', help='plain-English offer, e.g. "up to 40% off subscriptions"')
    ap.add_argument('--dates', help='sale dates as Create states them')
    ap.add_argument('--checked', required=True, help='date you verified it, e.g. "November 24, 2026"')
    ap.add_argument('--ended', action='store_true', help='mark the sale as ended')
    a = ap.parse_args()
    if not a.ended and not (a.code and a.offer and a.dates):
        sys.exit('--code, --offer and --dates are required unless --ended')

    code = html.escape(a.code or '')
    offer = html.escape(a.offer or '')
    dates = html.escape(a.dates or '')
    checked = a.checked
    day = iso(checked)

    # ---- Black Friday page ----
    s = open(BF, encoding='utf-8').read()
    if a.ended:
        box = f'<strong>Create&rsquo;s Black Friday sale has ended</strong> (checked {checked}). The 20% referral offer above still applies.'
        table_code, table_off, table_dates = 'Ended', 'Ended', f'Ended (ran {dates})' if dates else 'Ended'
        faq = f'Create&#39;s Black Friday 2026 sale has ended (checked {checked}). The 20% referral offer still applies.'
        notice = (f'Create&rsquo;s Black Friday sale has ended (checked {checked}). '
                  '<a href="/create-creatine-black-friday">See the offer that still works</a>.')
    else:
        box = (f'<strong>Black Friday is live: code <code class="promo-code" style="{CHIP}">{code}</code></strong> '
               f'<button type="button" class="copy-code" data-copy="{code}" style="{BTN}">Copy</button> for {offer}, {dates} '
               f'(Create announced it; checked {checked}). Only one code usually applies per order, so compare both in the cart.')
        table_code, table_off, table_dates = f'<strong>{code}</strong>', offer, dates
        faq = f'Yes. Create&#39;s Black Friday 2026 code is {code}: {offer}, {dates} (checked {checked}).'
        notice = (f'Create&rsquo;s sale is live: code <strong>{code}</strong>, {offer} (checked {checked}). '
                  '<a href="/create-creatine-black-friday">See terms and the price to beat</a>.')

    # short-answer box: the <span id="bf-sa"> sentence
    s = sub(r'<span id="bf-sa">.*?</span>(?=</p><a class="btn btn-full")', f'<span id="bf-sa">{box}</span>', s,
            'BF short-answer span', flags=re.S)
    s = sub(r'(<th scope="row">Code</th><td>)[^<]*(?:<strong>[^<]*</strong>)?[^<]*(</td>)', rf'\g<1>{table_code}\2', s, 'table code')
    s = sub(r'(<th scope="row">Discount</th><td>)[^<]*(</td>)', rf'\g<1>{table_off}\2', s, 'table discount')
    s = sub(r'(<th scope="row">Dates</th><td>)[^<]*(</td>)', rf'\g<1>{table_dates}\2', s, 'table dates')
    s = sub(r'(<th scope="row">Last checked</th><td>)[^<]*(</td>)', rf'\g<1>{checked} on trycreate.co\2', s, 'table checked')
    s = sub(r'(<strong>Status on )[A-Za-z]+ \d+, 2026(:</strong>)[^<]*',
            rf'\g<1>{checked}\2 {"The sale has ended." if a.ended else f"Create&rsquo;s Black Friday code is {code} ({offer}, {dates})."} Black Friday is ',
            s, 'status line')
    # FAQ "Does Create have a Black Friday sale?" in JSON-LD and visible details
    s = sub(r'("name":"Does Create have a Black Friday sale\?","acceptedAnswer":\{"@type":"Answer","text":")[^"]*(")',
            rf'\g<1>{html.unescape(faq)}\2', s, 'FAQ JSON-LD')
    s = sub(r'(<summary>Does Create have a Black Friday sale\?</summary><div class="ans"><p>)[^<]*(</p>)',
            rf'\g<1>{faq}\2', s, 'FAQ visible')
    s = re.sub(r'"dateModified":"[\d-]+"', f'"dateModified":"{day}"', s, count=1)
    s = re.sub(r'Updated [A-Za-z]+ \d+, 2026', f'Updated {checked}', s)
    open(BF, 'w', encoding='utf-8').write(s)
    print('updated', os.path.basename(BF))

    # ---- cheapest-way page ----
    c = open(CW, encoding='utf-8').read()
    c = sub(r'<span id="bf-line">.*?</span>',
            '<span id="bf-line">' + ('<strong>Black Friday:</strong> Create&rsquo;s sale has ended. <a href="/create-creatine-black-friday">Details</a>.' if a.ended else
             f'<strong>Black Friday is live:</strong> Create&rsquo;s code is <strong>{code}</strong>, {offer}, {dates}. '
             '<a href="/create-creatine-black-friday">Terms and price to beat</a>.') + '</span>',
            c, 'cheapest-way bf-line', flags=re.S)
    open(CW, 'w', encoding='utf-8').write(c)
    print('updated', os.path.basename(CW))

    # ---- site-wide notice ----
    n = 0
    for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
        t = open(f, encoding='utf-8').read()
        u = NOTICE_RE.sub(notice, t)
        u = NOTICE_LIVE_RE.sub(notice, u)
        if u != t:
            open(f, 'w', encoding='utf-8').write(u)
            n += 1
    print(f'site-wide notice updated on {n} pages')


if __name__ == '__main__':
    main()
