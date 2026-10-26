#!/usr/bin/env python3
"""Build Pinterest pins (1000x1500) and a Pinterest bulk-upload CSV.

Every claim on a pin is a paraphrase of the linked page's own meta description.
Run: python3 scripts/make_pins.py  ->  pins/*.jpg + docs/pinterest-bulk-<date>.csv
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime, timedelta
import csv

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'pins'
OUT.mkdir(exist_ok=True)
FONT = '/usr/share/fonts/opentype/inter/Inter-{}.otf'
SITE = 'https://getgummygains.com'
UTM = 'utm_source=pinterest&utm_medium=social&utm_campaign=pins-2026-11'
START = datetime(2026, 10, 28, 14, 0)  # 14:00 UTC = morning US
W, H = 1000, 1500
INK, INK2, BG2, BG3, CTA, MUTED, WHITE = '#0B1020', '#1C2333', '#F6F8FC', '#EEF2F9', '#FF4A22', '#5A6478', '#FFFFFF'
P = 'assets/product/'

BOARDS = {
    'guide': 'Creatine Gummies Guide',
    'women': 'Creatine for Women',
    'labs': 'Supplement Lab Tests & Reviews',
}

# slug, board, kicker, headline, bullets (template B), product image (template A)
PINS = [
    ('creatine-gummies-lab-tested', 'labs', 'LAB TEST TRACKER', '28 lab tests. 16 creatine gummies missed their label.',
     ['3 independent labs', 'Label claim vs measured', 'Free CSV of every result'], 'create-variety-gummy-pouch-960.webp'),
    ('best-creatine-gummies-2026', 'guide', '2026 COMPARISON', 'Best creatine gummies: labels, lab tests & cost compared',
     ['Published test results', 'Certification checked', 'Real cost per serving'], 'create-sour-trio-bundle-960.webp'),
    ('how-long-do-creatine-gummies-take-to-work', 'guide', 'WEEK BY WEEK', 'How long do creatine gummies take to work?',
     ['Muscle stores fill in ~3-4 weeks', 'At 3-5 g a day', 'Visible change: 8-12 weeks of training'], 'create-watermelon-tub-in-hand.jpg'),
    ('creatine-gummies-hair-loss', 'guide', 'MYTH CHECK', 'Does creatine cause hair loss?',
     ['The 2009 DHT study measured no hair', 'A 2025 RCT measured hair: no change', 'What to do if you are worried'], None),
    ('creatine-gummies-for-menopause', 'women', 'WOMEN 40+', 'Creatine for menopause: what the trials show',
     ['Strength evidence is solid', 'Brain & mood data are early', 'No bone-density effect vs placebo'], None),
    ('best-creatine-gummies-for-women', 'women', 'BUYER GUIDE', 'Creatine gummies for women: labels, sugar & cost',
     ['Labeled serving vs real dose', 'Sugar per day', 'Gummy or powder?'], 'create-watermelon-pouch-960.webp'),
    ('creatine-gummies-dosage', 'guide', 'DOSAGE', 'How many creatine gummies do you need a day?',
     ['The 3-5 g daily target', 'Is loading worth it?', 'Convert any label in seconds'], 'create-watermelon-supplement-facts.jpg'),
    ('creatine-gummies-vs-powder', 'guide', 'GUMMIES VS POWDER', 'Gummies cost 3-8x more per gram. When is it worth it?',
     ['Cost per gram compared', 'Added sugar', 'Who should pick which'], 'create-unflavored-stick-pouch-960.webp'),
    ('creatine-gummies-side-effects', 'guide', 'SIDE EFFECTS', "Creatine gummy side effects: what's real, what's a myth",
     ['Bloating & stomach upset', 'Kidney safety', 'Who should be cautious'], None),
    ('do-creatine-gummies-work', 'guide', 'THE EVIDENCE', 'Do creatine gummies actually work?',
     ['Creatine has strong evidence', 'Gummies: check dose & stability', 'Verify the exact product'], 'create-blue-raspberry-tub-960.webp'),
    ('best-time-to-take-creatine-gummies', 'guide', 'TIMING', 'Best time to take creatine: morning, night or workout?',
     ['Timing barely matters', 'Daily consistency does', 'Pre vs post-workout data'], 'create-orange-tub-960.webp'),
    ('creatine-gummies-for-weight-loss', 'women', 'CUTTING', 'Creatine & weight loss: what research shows',
     ['Creatine does not burn fat', 'The scale may rise first (water)', 'Its real role when cutting'], None),
    ('creatine-gummies-for-brain-health', 'guide', 'BRAIN & MEMORY', 'Creatine for memory: what 16 trials found',
     ['2024 meta-analysis', 'Small memory boost', 'Not better overall cognition'], None),
    ('creatine-dose-calculator', 'guide', 'FREE CALCULATOR', 'What does your creatine gummy really cost per 5\u00a0g?',
     ['Enter price & count', 'See cost per serving', 'Compare any brand'], 'create-high-five-bundle-960.webp'),
    ('create-creatine-gummies-review', 'labs', 'HONEST REVIEW', 'Create creatine gummies review: tests, lawsuits & cost',
     ['4.5 g label per serving', '3 public lab rounds', 'Dated prices'], 'create-sour-cherry-tub-960.webp'),
    ('is-create-legit', 'labs', 'IS IT LEGIT?', 'Is Create creatine legit? Lab tests, NSF & lawsuits',
     ['Some flavors NSF Certified for Sport', 'Lab results are mixed', 'Two lawsuits allege underdosing'], 'create-watermelon-tub-front.jpg'),
    ('creatine-gummies-for-beginners', 'guide', 'BEGINNER GUIDE', 'Creatine gummies for beginners: start here',
     ['What creatine does', 'The 3-5 g dose that matters', '2 common mistakes'], 'create-starter-bundle-960.webp'),
    ('creatine-gummies-while-fasting', 'women', 'INTERMITTENT FASTING', 'Do creatine gummies break a fast?',
     ['Plain creatine: no', "Gummies aren't plain creatine", 'What the sugar does'], None),
    ('creatine-gummies-and-caffeine-pre-workout', 'guide', 'COFFEE + CREATINE', 'Does caffeine cancel creatine?',
     ['Older studies said maybe', 'Later trials mostly say no', 'Stomach upset is the real tradeoff'], None),
    ('creatine-gummies-for-older-adults', 'guide', 'AGE 50+', 'Creatine gummies for older adults: dose & safety',
     ['Same 3-5 g dose', 'Best with resistance training', 'Kidney caveats'], 'create-watermelon-tub-960.webp'),
]
# second variant for the 10 pages with the most buyer intent / search demand
SECOND = ['creatine-gummies-lab-tested', 'best-creatine-gummies-2026', 'how-long-do-creatine-gummies-take-to-work',
          'creatine-gummies-hair-loss', 'creatine-gummies-for-menopause', 'best-creatine-gummies-for-women',
          'creatine-gummies-dosage', 'creatine-gummies-vs-powder', 'create-creatine-gummies-review', 'is-create-legit']

def font(w, s): return ImageFont.truetype(FONT.format(w), s)

def wrap(d, text, f, maxw):
    lines, cur = [], ''
    for word in text.split(' '):
        t = (cur + ' ' + word).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = word
    return lines + [cur]

def fit_headline(d, text, maxw, maxh, sizes=(92, 84, 76, 68, 60)):
    for s in sizes:
        f = font('ExtraBold', s); lines = wrap(d, text, f, maxw)
        if len(lines) * s * 1.12 <= maxh: return f, lines, s
    return f, lines, s

def footer(d, dark):
    d.rectangle([0, H - 110, W, H], fill=CTA)
    f = font('Bold', 40)
    t = 'Read more at getgummygains.com'
    d.text(((W - d.textlength(t, font=f)) / 2, H - 80), t, font=f, fill=WHITE)

def template_a(p, path):
    slug, board, kicker, head, bullets, img = p
    im = Image.new('RGB', (W, H), INK); d = ImageDraw.Draw(im)
    d.text((70, 80), kicker, font=font('Bold', 34), fill=CTA)
    f, lines, s = fit_headline(d, head, W - 140, 470)
    y = 140
    for l in lines: d.text((70, y), l, font=f, fill=WHITE); y += int(s * 1.12)
    box = (70, 660, W - 70, H - 160)
    d.rounded_rectangle(box, radius=36, fill=BG3)
    prod = Image.open(ROOT / P / img).convert('RGB')
    bw, bh = box[2] - box[0] - 60, box[3] - box[1] - 60
    prod.thumbnail((bw, bh))
    im.paste(prod, (box[0] + 30 + (bw - prod.width) // 2, box[1] + 30 + (bh - prod.height) // 2))
    footer(d, True); im.save(path, quality=86, optimize=True)

def template_b(p, path):
    slug, board, kicker, head, bullets, img = p
    im = Image.new('RGB', (W, H), BG2); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W, 18], fill=CTA)
    d.text((70, 90), kicker, font=font('Bold', 34), fill=CTA)
    f, lines, s = fit_headline(d, head, W - 140, 560)
    y = 150
    for l in lines: d.text((70, y), l, font=f, fill=INK); y += int(s * 1.12)
    block = len(bullets) * 180 - 30
    y = y + max(60, (H - 110 - y - block) // 2 - 20)
    bf = font('SemiBold', 46)
    for i, b in enumerate(bullets):
        d.rounded_rectangle([70, y, W - 70, y + 150], radius=28, fill=WHITE, outline='#E4E8F0', width=3)
        d.ellipse([105, y + 45, 165, y + 105], fill=CTA)
        n = font('Bold', 36); d.text((135 - d.textlength(str(i + 1), font=n) / 2, y + 53), str(i + 1), font=n, fill=WHITE)
        bl = wrap(d, b, bf, W - 330)
        ty = y + 75 - len(bl) * 28
        for l in bl: d.text((200, ty), l, font=bf, fill=INK2); ty += 56
        y += 180
    footer(d, False); im.save(path, quality=86, optimize=True)

DESC_TAIL = ' Independent, sourced guide from GummyGains. Not medical advice.'
KEYWORDS = {'guide': 'creatine gummies, creatine, fitness supplements, gym tips',
            'women': 'creatine for women, women fitness, creatine gummies, strength training for women',
            'labs': 'creatine gummies review, supplement testing, creatine gummies lab test'}

rows, i = [], 0
by_slug = {p[0]: p for p in PINS}
order = [(p, 'a' if p[5] else 'b') for p in PINS] + [(by_slug[s], 'b' if by_slug[s][5] else 'a2') for s in SECOND]
for p, t in order:
    slug, board, kicker, head, bullets = p[:5]
    name = f'{slug}-{"1" if t in ("a", "b") and (p, t) in order[:len(PINS)] else "2"}.jpg'
    if t == 'a': template_a(p, OUT / name)
    elif t == 'b': template_b(p, OUT / name)
    else:  # a2: text-only page gets its second look as the dark template with a generic gummy shot
        template_a(p[:5] + ('create-variety-gummy-pouch-960.webp',), OUT / name)
    desc = head.rstrip('.?') + ': ' + '; '.join(bullets) + '.' + DESC_TAIL
    rows.append({'Title': head[:100], 'Media URL': f'{SITE}/pins/{name}', 'Pinterest board': BOARDS[board],
                 'Thumbnail': '', 'Description': desc[:500], 'Link': f'{SITE}/{slug}?{UTM}',
                 'Publish date': (START + timedelta(days=i)).strftime('%Y-%m-%dT%H:%M:%S'),
                 'Keywords': KEYWORDS[board]})
    i += 1
csvp = ROOT / 'docs' / 'pinterest-bulk-2026-10-28.csv'
with open(csvp, 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
print(len(rows), 'pins ->', OUT, csvp)
