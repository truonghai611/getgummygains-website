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

  /* ---- routine quiz ---- */
  var quiz = document.getElementById('quiz');
  if (quiz) {
    var qAnswers = {};
    var qResults = {
      electrolytes: {
        title: 'Creatine + Electrolytes is the closest match',
        body: "You are already using electrolytes, so a combined format can cut two products down to one on training days.",
        cta: 'See the creatine + electrolytes guide',
        href: 'creatine-with-electrolytes'
      },
      sugarfree: {
        title: 'Unflavored stick packs are the closest match',
        body: "You want the full dose without added sugar \u2014 an unflavored stick pack gets you 5\u00A0g with nothing extra.",
        cta: 'See stick packs vs. gummies for travel',
        href: 'creatine-for-travel'
      },
      gummies: {
        title: 'Gummies are the closest match',
        body: "You are on the move or you skip doses sometimes \u2014 the format that removes the most friction wins.",
        cta: 'See which gummies passed independent lab testing',
        href: 'best-creatine-gummies-2026'
      },
      powder: {
        title: 'Plain powder may honestly suit you best',
        body: "You are consistent at home and sugar is not a concern \u2014 bulk powder is the cheapest, most precise option. We are not going to pretend gummies are the better buy here.",
        cta: 'See the honest gummies vs. powder comparison',
        href: 'creatine-gummies-vs-powder'
      }
    };

    var qButtons = quiz.querySelectorAll('.quiz-opt');
    for (var qi = 0; qi < qButtons.length; qi++) {
      qButtons[qi].addEventListener('click', function () {
        var q = this.getAttribute('data-q');
        var v = this.getAttribute('data-v');
        qAnswers[q] = v;
        var group = quiz.querySelectorAll('.quiz-opt[data-q="' + q + '"]');
        for (var gi = 0; gi < group.length; gi++) { group[gi].classList.remove('sel'); }
        this.classList.add('sel');
        if (Object.keys(qAnswers).length === 4) { showQuizResult(); }
      });
    }

    var showQuizResult = function () {
      var key;
      if (qAnswers['4'] === 'yes') { key = 'electrolytes'; }
      else if (qAnswers['3'] === 'yes') { key = 'sugarfree'; }
      else if (qAnswers['1'] === 'onthego' || qAnswers['2'] === 'often') { key = 'gummies'; }
      else { key = 'powder'; }

      var r = qResults[key];
      var out = document.getElementById('quiz-result');
      out.innerHTML = '<h3>' + r.title + '</h3><p>' + r.body + '</p><a class="btn" href="' + r.href + '">' + r.cta + ' \u2192</a>';
      out.classList.add('show');
      out.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });
})();
