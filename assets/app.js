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

      if (wantsSugarFree) {
        title = 'Start with your no-added-sugar preference';
        body = 'Check added sugar on the exact label first. Plain powder is an option; if you prefer gummies, compare their ingredients before choosing a brand. Travel and missed doses do not override your sugar preference.';
        code = 'quiz-sugarfree'; secHref = '/sugar-free-creatine-gummies'; secText = 'Compare options for avoiding sugar';
      } else if (onTheGo) {
        title = 'Compare formats that are easy to carry';
        body = hasElectrolyte ? 'You already use an electrolyte product. Compare a separate creatine format before adding another combination product.' : 'Compare gummies and single-serve powder for portability. Being on the go does not by itself mean you need added electrolytes.';
        code = 'quiz-travel'; secHref = '/creatine-for-travel'; secText = 'Compare travel-friendly formats';
      } else if (skipsOften) {
        title = 'Build a routine you can maintain';
        body = 'A reminder and a convenient format may help. Compare the cost and ingredients of gummies with a powder routine before choosing.';
        code = 'quiz-adherence'; secHref = '/30-days-no-missed-creatine-dose'; secText = 'Build a practical daily routine';
      } else {
        title = 'Compare plain powder before paying for gummies';
        body = 'You take creatine at home and rarely miss it. Compare the price per gram and labeled serving of powder with gummies; convenience may not justify a higher price for your routine.';
        code = 'quiz-verified-pick'; secHref = '/creatine-gummies-vs-powder'; secText = 'Compare powder and gummies';
      }

      quizResult.innerHTML =
        '<h3>' + title + '</h3><p>' + body + '</p>' +
        '<a class="btn btn-full" data-link-id="' + code + '" data-cta-position="quiz_result" href="' + secHref + '">' + secText + ' &rarr;</a>' +
        '<p class="btn-note" style="color:#98A2B8">Format guidance, not a medical assessment. Read the exact product label before buying.</p>';
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
    var internalReferrer = /(^|\.)getgummygains\.com$/.test(referrerHost);
    var incomingSource = (params.get('utm_source') || '').toLowerCase();
    var isChatGPT = /^(chatgpt|chatgpt\.com)$/.test(incomingSource) || /(^|\.)chatgpt\.com$/.test(referrerHost);
    var trafficSource = isChatGPT ? 'chatgpt' : (incomingSource || (!internalReferrer && referrerHost) || 'direct');
    var sourceContext = {
      traffic_source: trafficSource,
      is_chatgpt_referral: isChatGPT ? 'yes' : 'no',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      landing_page: location.pathname
    };
    // Keep the original context across internal navigation, with a 30-minute inactivity limit.
    // Storage may be blocked; click tracking must still work in that case.
    try {
      var saved = JSON.parse(sessionStorage.getItem('gg_attribution_v2') || 'null');
      var now = Date.now();
      if (!incomingSource && (internalReferrer || !referrerHost) && saved &&
          saved.context && now - saved.updatedAt < 30 * 60 * 1000) {
        sourceContext = saved.context;
      }
      sessionStorage.setItem('gg_attribution_v2', JSON.stringify({ context: sourceContext, updatedAt: now }));
    } catch (e) {}

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

    // Delegation also covers links created after the quiz is completed.
    document.addEventListener('click', function (event) {
      var target = event.target;
      var a = target && target.closest ? target.closest('a[href]') : null;
      if (!a) { return; }
      var destination;
      try { destination = new URL(a.href, location.href); } catch (e) { return; }
      var createAffiliate = /^(www\.)?trycreate\.co$/.test(destination.hostname) && destination.pathname === '/15-9KD';
      var bulkAffiliate = /(^|\.)bulksupplements\.com$/.test(destination.hostname) &&
        /(^|\s)sponsored(\s|$)/.test(a.getAttribute('rel') || '');
      if (!createAffiliate && !bulkAffiliate) { return; }
      var position = 'inline';
      if (a.closest('.sticky')) { position = 'sticky'; }
      else if (a.closest('.pick')) { position = 'product_card'; }
      else if (a.closest('.quiz-result')) { position = 'quiz_result'; }
      else if (a.closest('.value-eq') || (a.previousElementSibling && a.previousElementSibling.classList && a.previousElementSibling.classList.contains('value-eq'))) { position = 'value_equation'; }
      position = a.getAttribute('data-cta-position') || position;
      gtag('event', 'affiliate_outbound_click', Object.assign({
        page_path: location.pathname,
        link_id: a.getAttribute('data-link-id') || location.pathname + ':' + position,
        link_url: destination.origin + destination.pathname,
        cta_position: position,
        link_text: (a.textContent || '').trim().slice(0, 60),
        transport_type: 'beacon'
      }, sourceContext));
    });
  }
})();
