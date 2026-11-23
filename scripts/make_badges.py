#!/usr/bin/env python3
"""Build lab-result badges for brands that met their creatine label claim in a public test round.

Reads data/creatine-gummy-lab-results.csv and writes:
  assets/badges/<brand-slug>.svg   one badge per brand with at least one passing gummy row
  lab-test-badges.html              page with each badge, its rows, and copy-paste embed code

Every badge states the lab, the round year and a pass count, so a brand with mixed results
(e.g. Create: 2 of 3 rounds) is shown as mixed. Re-run after the CSV changes:
  python3 scripts/make_badges.py
"""
import csv, html, re
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://getgummygains.com"
TRACKER = SITE + "/creatine-gummies-lab-tested#tracker"
CHECKED = "November 23, 2026"

rows = [r for r in csv.DictReader(open(ROOT / "data/creatine-gummy-lab-results.csv", encoding="utf-8"))
        if r["brand"] not in ("Various", "Not published")]
brands = OrderedDict()
for r in rows:
    brands.setdefault(r["brand"], []).append(r)
passing = OrderedDict((b, rs) for b, rs in brands.items() if any(r["result"] == "Pass" for r in rs))

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

def year(r):
    return r["test_date"][:4]

def lab_short(r):
    return {"NOW Foods (HPLC)": "NOW Foods HPLC", "SuppCo (ISO 17025)": "SuppCo ISO 17025",
            "James Smith / Eurofins": "Eurofins"}.get(r["lab"], r["lab"])

def summary(rs):
    p = [r for r in rs if r["result"] == "Pass"]
    if len(rs) == 1:
        return f"Met label claim · {lab_short(p[0])} {year(p[0])}"
    return f"Met label claim in {len(p)} of {len(rs)} public rounds"

def svg(brand, rs):
    line2 = html.escape(summary(rs))
    b = html.escape(brand)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="380" height="92" viewBox="0 0 380 92" role="img" aria-label="{b}: {line2}. Source: GummyGains Creatine Gummy Lab Tracker">
<rect x="1" y="1" width="378" height="90" rx="12" fill="#ffffff" stroke="#0B1020" stroke-width="2"/>
<circle cx="40" cy="46" r="24" fill="#FF4A22"/>
<path d="M29 46.5l7.5 7.5 15-15" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
<text x="76" y="30" font-family="Arial,Helvetica,sans-serif" font-size="{16 if len(brand)<=14 else 14}" font-weight="700" fill="#0B1020">{b} creatine gummies</text>
<text x="76" y="51" font-family="Arial,Helvetica,sans-serif" font-size="13" fill="#0B1020">{line2}</text>
<text x="76" y="72" font-family="Arial,Helvetica,sans-serif" font-size="11.5" fill="#5b6275">Independent results tracked by GummyGains</text>
</svg>
'''

def embed(brand, rs):
    alt = f"{brand}: {summary(rs)} (GummyGains Creatine Gummy Lab Tracker)"
    return (f'<a href="{TRACKER}" target="_blank" rel="noopener">'
            f'<img src="{SITE}/assets/badges/{slug(brand)}.svg" width="380" height="92" alt="{html.escape(alt, quote=True)}"></a>')

out = ROOT / "assets/badges"
out.mkdir(parents=True, exist_ok=True)
for f in out.glob("*.svg"):
    f.unlink()
for b, rs in passing.items():
    (out / f"{slug(b)}.svg").write_text(svg(b, rs), encoding="utf-8")

# Page: reuse header/footer from methodology.html so nav stays in sync.
tpl = (ROOT / "methodology.html").read_text(encoding="utf-8")
head_end = tpl.index("<body>")
header = tpl[head_end:tpl.index("<main>") + len("<main>")]
footer = tpl[tpl.index("</main>"):]
title = "Lab-Result Badges for Creatine Gummy Brands"
desc = "Embeddable badges for creatine gummy brands that met their label claim in a public independent lab round, linked to the source data."
head = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{SITE}/lab-test-badges">
<meta name="robots" content="noindex,follow">
<meta name="theme-color" content="#0B1020">
<link rel="stylesheet" href="/assets/style.css">
</head>
'''
cards = []
for b, rs in passing.items():
    trs = "".join(
        f"<tr><td>{html.escape(r['round'])}, {html.escape(r['test_date'])}</td><td>{html.escape(r['lab'])}</td>"
        f"<td>{html.escape(r['label_claim'] or '—')}</td><td>{html.escape(r['measured'] or '—')}</td>"
        f"<td><strong>{html.escape(r['result'])}</strong></td>"
        f"<td><a href=\"{html.escape(r['source_url'], quote=True)}\" rel=\"noopener\" target=\"_blank\">source</a></td></tr>"
        for r in rs)
    cards.append(f'''<h2 id="{slug(b)}">{html.escape(b)}</h2>
<p><img src="/assets/badges/{slug(b)}.svg" width="380" height="92" alt="{html.escape(b)} lab-result badge"></p>
<div class="tw"><table><thead><tr><th>Round</th><th>Lab</th><th>Label</th><th>Measured</th><th>Result</th><th>Source</th></tr></thead><tbody>{trs}</tbody></table></div>
<p><label for="e-{slug(b)}"><strong>Embed code</strong></label></p>
<textarea id="e-{slug(b)}" readonly rows="3" style="width:100%;font:13px monospace">{html.escape(embed(b, rs))}</textarea>
''')

body = f'''
<section class="hero"><div class="wrap hero-in">
<span class="eyebrow">For brands and retailers</span>
<h1>Lab-result badges</h1>
<p class="lede">If your creatine gummy met its label claim in a public independent lab round, you can show that on your product page with a badge that links to the source data.</p>
</div></section>
<div class="wrap narrow"><p class="byline-top">By <a href="/about">Henry Nguyen</a> · Checked {CHECKED} · <a href="/methodology">How we evaluate</a></p></div>
<section class="sec"><div class="wrap narrow">
<h2 style="margin-top:0">Rules for using a badge</h2>
<ul>
<li>A badge reports a result that a lab published. GummyGains did not test these products, and no brand pays for a badge or a listing.</li>
<li>A result applies to the lot the lab tested, in the year shown. A brand with mixed results gets a badge that says so.</li>
<li>Keep the link to the <a href="/creatine-gummies-lab-tested#tracker">Creatine Gummy Lab Tracker</a> so shoppers can check the row and the lab's own source.</li>
<li>If a newer public round reports a failure, the badge file changes to show it. Ask us at the address on the <a href="/about">About page</a> if you have a newer independent result.</li>
</ul>
{"".join(cards)}
<p class="src">Data: <a href="/data/creatine-gummy-lab-results.csv">CSV</a> · <a href="/data/creatine-gummy-lab-results.json">JSON</a> · CC BY 4.0. Badges are generated from the same file as the tracker.</p>
</div></section>
'''
(ROOT / "lab-test-badges.html").write_text(head + header + body + footer, encoding="utf-8")
print(f"{len(passing)} badges:", ", ".join(passing))
