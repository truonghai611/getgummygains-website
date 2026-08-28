/* Google tag (gtag.js) — GA4 property for getgummygains.com */
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-C0MW3RSC76';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-C0MW3RSC76');
})();

/* GummyGains — mobile nav, sticky CTA, dose/cost calculator */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- sticky CTA: appears after the hero leaves the viewport ---- */
  var sticky = document.querySelector('.sticky');
  if (sticky) {
    document.body.classList.add('has-sticky');
    var anchor = document.querySelector('[data-sticky-trigger]') || document.querySelector('.hero');
    var show = function (v) { sticky.classList.toggle('show', v); };
    if (anchor && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { show(!e[0].isIntersecting); },
        { rootMargin: '-40px 0px 0px 0px' }).observe(anchor);
    } else {
      window.addEventListener('scroll', function () { show(window.scrollY > 420); }, { passive: true });
    }
  }

  /* ---- cost-per-dose calculator ---- */
  var calc = document.getElementById('calc');
  if (calc) {
    var $ = function (id) { return document.getElementById(id); };
    var fields = ['c-price', 'c-count', 'c-per', 'c-target'];
    var fmt = function (n) {
      return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    var run = function () {
      var price = parseFloat($('c-price').value) || 0;
      var count = parseFloat($('c-count').value) || 0;
      var per = parseFloat($('c-per').value) || 0;
      var target = parseFloat($('c-target').value) || 5;
      var out = $('c-out'), gum = $('c-gummies'), days = $('c-days'), verdict = $('c-verdict');
      if (!price || !count || !per || !target) { out.textContent = '—'; return; }

      var totalG = count * per;                 // total grams of creatine in the tub
      var doses = totalG / target;              // how many real doses it contains
      var costPerDose = price / doses;
      var gPerDose = Math.ceil(target / per);   // gummies you must chew per dose
      var daysLeft = Math.floor(count / gPerDose);

      out.textContent = fmt(costPerDose);
      gum.textContent = gPerDose + ' gummies';
      days.textContent = daysLeft + ' days';

      var msg, cls;
      if (costPerDose <= 1.20) {
        msg = '<b>Fair for the format.</b> That is in the normal band for an honestly dosed gummy — roughly 3–4x powder, which is the convenience premium.';
        cls = 'pass';
      } else if (costPerDose <= 2.00) {
        msg = '<b>Premium.</b> You are paying a real markup over powder. Worth it only if the gummy is the reason you actually take it daily.';
        cls = 'warn';
      } else {
        msg = '<b>Expensive.</b> Over $2 per 5&nbsp;g dose is roughly 6–10x the cost of powder. Check whether the label is quoting creatine per gummy instead of per serving.';
        cls = 'fail';
      }
      if (gPerDose >= 6) {
        msg += ' Also note: <b>' + gPerDose + ' gummies a day</b> is a lot of chewing — this is the number people quietly stop hitting after week two.';
      }
      verdict.innerHTML = msg;
      verdict.setAttribute('data-level', cls);
    };

    fields.forEach(function (id) {
      var el = $(id);
      if (el) { el.addEventListener('input', run); }
    });

    document.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('data-preset').split(',');
        $('c-price').value = p[0]; $('c-count').value = p[1]; $('c-per').value = p[2];
        run();
      });
    });

    run();
  }

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });

  /* ---- 60-second routine quiz: routes to a tailored recommendation ---- */
  var quiz = document.getElementById('quiz');
  if (quiz) {
    var quizAnswers = {};
    var quizResult = document.getElementById('quiz-result');

    quiz.querySelectorAll('.quiz-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = btn.getAttribute('data-q');
        quiz.querySelectorAll('.quiz-opt[data-q="' + q + '"]').forEach(function (b) {
          b.classList.remove('sel');
        });
        btn.classList.add('sel');
        quizAnswers[q] = btn.getAttribute('data-v');
        if (Object.keys(quizAnswers).length >= 4) { renderQuizResult(); }
      });
    });

    function renderQuizResult() {
      var onTheGo = quizAnswers['1'] === 'onthego';
      var skipsOften = quizAnswers['2'] === 'often';
      var wantsSugarFree = quizAnswers['3'] === 'yes';
      var hasElectrolyte = quizAnswers['4'] === 'yes';
      var title, body, code, secHref, secText;

      if (onTheGo && !hasElectrolyte) {
        title = 'A combined creatine + electrolyte format fits your routine';
        body = 'You take creatine on the move and do not already use a separate electrolyte product. A combo gummy or stick pack removes one thing to pack and one thing to forget — that is worth more to your results than any brand difference.';
        code = 'quiz-travel-electrolyte'; secHref = '/creatine-for-travel'; secText = 'See the on-the-go format guide';
      } else if (onTheGo || skipsOften) {
        title = 'Your real risk is missed doses, not the wrong brand';
        body = 'Whatever you pick, the format you will actually take every single day beats the format that is cheapest on paper. A lab-verified gummy you keep chewing beats a tub of powder gathering dust in the cabinet.';
        code = 'quiz-adherence'; secHref = '/30-days-no-missed-creatine-dose'; secText = 'How to build a 30-day streak without missing a dose';
      } else if (wantsSugarFree) {
        title = 'Check the sugar panel before the flavor';
        body = 'You rarely skip a dose and want to avoid added sugar — you already have the discipline for plain powder. If you still prefer the gummy format, read the exact sugar grams on the panel rather than trusting a "sugar-free" claim on the front.';
        code = 'quiz-sugarfree'; secHref = '/sugar-free-creatine-gummies'; secText = 'What "sugar-free" really means on the label';
      } else {
        title = 'Honestly, plain powder is the more efficient pick for you';
        body = 'You take it at home and rarely skip a dose — that is exactly the profile that does fine on plain creatine monohydrate powder at a fraction of the price. If you still want the gummy format for taste, choose one with independent lab verification.';
        code = 'quiz-verified-pick'; secHref = '/creatine-gummies-vs-powder'; secText = 'See the honest gummies-vs-powder math';
      }

      quizResult.innerHTML =
        '<h3>' + title + '</h3><p>' + body + '</p>' +
        '<a class="btn btn-full" href="https://trycreate.co/15-9KD?q=' + code + '" rel="sponsored nofollow noopener" target="_blank">Check current Create price &rarr;</a>' +
        '<p class="btn-note" style="color:#98A2B8">We may earn a commission &middot; <a href="' + secHref + '" style="color:#D7DDEA;text-decoration:underline">' + secText + '</a></p>';
      quizResult.classList.add('show');
      quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof gtag === 'function') {
        gtag('event', 'quiz_complete', { quiz_result: code, page_path: location.pathname });
      }
    }
  }

  /* ---- behavior analytics: source attribution, money-page views, scroll depth + affiliate outbound clicks ---- */
  if (typeof gtag === 'function') {
    var params = new URLSearchParams(location.search);
    var referrerHost = '';
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
    var isChatGPT = params.get('utm_source') === 'chatgpt.com' || /(^|\.)chatgpt\.com$/.test(referrerHost);
    var trafficSource = isChatGPT ? 'chatgpt' : (params.get('utm_source') || referrerHost || 'direct');
    var sourceContext = {
      traffic_source: trafficSource,
      is_chatgpt_referral: isChatGPT ? 'yes' : 'no',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      landing_page: sessionStorage.getItem('gg_landing_page') || location.pathname
    };
    if (!sessionStorage.getItem('gg_landing_page')) {
      sessionStorage.setItem('gg_landing_page', location.pathname);
      sourceContext.landing_page = location.pathname;
    }
    if (!sessionStorage.getItem('gg_traffic_source')) {
      sessionStorage.setItem('gg_traffic_source', trafficSource);
    } else if (trafficSource === 'direct') {
      sourceContext.traffic_source = sessionStorage.getItem('gg_traffic_source');
    }

    var moneyPages = ['/best-creatine-gummies-2026', '/create-creatine-gummies-review', '/creatine-gummies-lab-tested', '/best-creatine-gummies-for-women', '/creatine-gummies-vs-powder', '/creatine-dose-calculator'];
    if (moneyPages.indexOf(location.pathname.replace(/\/$/, '')) !== -1) {
      gtag('event', 'view_money_page', Object.assign({
        page_path: location.pathname,
        page_title: document.title
      }, sourceContext));
    }
    if (isChatGPT) {
      gtag('event', 'chatgpt_referral_landing', Object.assign({
        page_path: location.pathname,
        page_title: document.title
      }, sourceContext));
    }

    var seenDepth = {};
    var markDepth = function (pct) {
      if (seenDepth[pct]) { return; }
      seenDepth[pct] = true;
      gtag('event', 'scroll_depth', { percent_scrolled: pct, page_path: location.pathname });
    };
    var depthThresholds = [25, 50, 75, 90];
    var onScrollDepth = function () {
      var doc = document.documentElement;
      var scrolled = window.scrollY || doc.scrollTop || 0;
      var height = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.round((scrolled / height) * 100);
      depthThresholds.forEach(function (t) { if (pct >= t) { markDepth(t); } });
    };
    window.addEventListener('scroll', onScrollDepth, { passive: true });
    onScrollDepth();

    document.querySelectorAll('a[href*="trycreate.co"],a[href*="bulksupplements.com"]').forEach(function (a) {
      a.addEventListener('click', function () {
        var position = 'inline';
        if (a.closest('.sticky')) { position = 'sticky'; }
        else if (a.closest('.pick')) { position = 'product_card'; }
        else if (a.closest('.quiz-result')) { position = 'quiz_result'; }
        else if (a.closest('.value-eq') || (a.previousElementSibling && a.previousElementSibling.classList && a.previousElementSibling.classList.contains('value-eq'))) { position = 'value_equation'; }
        var explicitPosition = a.getAttribute('data-cta-position');
        if (explicitPosition) { position = explicitPosition; }
        gtag('event', 'affiliate_outbound_click', Object.assign({
          page_path: location.pathname,
          link_id: a.getAttribute('data-link-id') || '',
          link_url: a.href,
          cta_position: position,
          link_text: (a.textContent || '').trim().slice(0, 60)
        }, sourceContext));
      });
    });
  }
})();
