# Create affiliate tracking legend

Every Create link on this site is:

`https://trycreate.co/15-9KD?q=<page-slug>-<slot>`

`<page-slug>` is the HTML filename without `.html`. The homepage slug is `index`.
`<slot>` is where the link sits on that page:

| Slot | Where it is used |
| --- | --- |
| `hero` | Top decision button (`data-cta-position="hero"` or `decision_summary`) |
| `card` | Product pick card (`.pick`) |
| `inline` | Other in-article button |
| `sticky` | Sticky bar |
| `checkout` | “Before you leave to buy” checkout check |
| `source` | Citation or source sentence that is not a button |

`data-link-id` is the same string as `q`. GA4 `affiliate_outbound_click` sends that string as `q` and as `link_id`. `link_url` stays the path only (`https://trycreate.co/15-9KD`), so other query parameters are not copied onto the event. Incoming UTMs on getgummygains.com are not added to the Create URL.

The Create review page has two citation links. The source-check sentence uses `source`. The evidence-provenance sentence uses `inline`, because `source` was already taken on that page.

## Opaque codes

These `q` values were not readable. They are gone from the HTML. Where one code was reused on several buttons, each button now has its own sub-id. Use the new sub-ids below when you compare older Superfiliate or GA4 rows.

| Old code | Page | New sub-ids that replaced it |
| --- | --- | --- |
| `3iMQkwu8` | `best-creatine-gummies-2026` | `best-creatine-gummies-2026-inline`, `best-creatine-gummies-2026-source`, `best-creatine-gummies-2026-card`, `best-creatine-gummies-2026-sticky` |
| `f6pm1xJY` | `create-creatine-gummies-review` | `create-creatine-gummies-review-card`, `create-creatine-gummies-review-inline`, `create-creatine-gummies-review-sticky` |
| `RiOuVi3a` | `create-creatine-discount-code` | `create-creatine-discount-code-hero`, `create-creatine-discount-code-sticky` |
| `X6x5Vzeg` | `creatine-gummies-lab-tested` | `creatine-gummies-lab-tested-inline` |
| `QFmoNEA1` | `create-vs-force-factor` | `create-vs-force-factor-inline`, `create-vs-force-factor-sticky` |

Links on those pages that had no `q` before (checkout buttons, and some source or sticky links) were not using the opaque code. They now have their own sub-id in the inventory below.

## Readable sub-ids that were renamed

| Old `q` | Page | New `q` |
| --- | --- | --- |
| `bearbalanced-page` | `bear-balanced-creatine-gummies-review` | `bear-balanced-creatine-gummies-review-inline` |
| `bearbalanced-sticky` | `bear-balanced-creatine-gummies-review` | `bear-balanced-creatine-gummies-review-sticky` |
| `beastbites-page` | `beast-bites-creatine-gummies-review` | `beast-bites-creatine-gummies-review-inline` |
| `beastbites-sticky` | `beast-bites-creatine-gummies-review` | `beast-bites-creatine-gummies-review-sticky` |
| `women-page` | `best-creatine-gummies-for-women` | `best-creatine-gummies-for-women-card` |
| `besttime-page` | `best-time-to-take-creatine-gummies` | `best-time-to-take-creatine-gummies-inline` |
| `besttime-sticky` | `best-time-to-take-creatine-gummies` | `best-time-to-take-creatine-gummies-sticky` |
| `cvbb-body` | `create-vs-bear-balanced` | `create-vs-bear-balanced-inline` |
| `cvbb-sticky` | `create-vs-bear-balanced` | `create-vs-bear-balanced-sticky` |
| `cvb-body` | `create-vs-beast-bites` | `create-vs-beast-bites-inline` |
| `cvb-sticky` | `create-vs-beast-bites` | `create-vs-beast-bites-sticky` |
| `beginners-page` | `creatine-gummies-for-beginners` | `creatine-gummies-for-beginners-inline` |
| `beginners-sticky` | `creatine-gummies-for-beginners` | `creatine-gummies-for-beginners-sticky` |
| `returns-page` | `creatine-gummies-return-policy` | `creatine-gummies-return-policy-inline` |
| `returns-sticky` | `creatine-gummies-return-policy` | `creatine-gummies-return-policy-sticky` |
| `vscapsules-page` | `creatine-gummies-vs-capsules` | `creatine-gummies-vs-capsules-inline` |
| `vscapsules-sticky` | `creatine-gummies-vs-capsules` | `creatine-gummies-vs-capsules-sticky` |
| `impurity-page` | `creatine-impurities-dcd-dht` | `creatine-impurities-dcd-dht-inline` |
| `impurity-sticky` | `creatine-impurities-dcd-dht` | `creatine-impurities-dcd-dht-sticky` |
| `creatinine-body` | `creatine-to-creatinine` | `creatine-to-creatinine-inline` |
| `creatinine-sticky` | `creatine-to-creatinine` | `creatine-to-creatinine-sticky` |
| `bundles-page` | `do-creatine-gummy-bundles-save-money` | `do-creatine-gummy-bundles-save-money-inline` |
| `bundles-sticky` | `do-creatine-gummy-bundles-save-money` | `do-creatine-gummy-bundles-save-money-sticky` |
| `howlong-page` | `how-long-do-creatine-gummies-take-to-work` | `how-long-do-creatine-gummies-take-to-work-inline` |
| `howlong-sticky` | `how-long-do-creatine-gummies-take-to-work` | `how-long-do-creatine-gummies-take-to-work-sticky` |
| `glutenfree-page` | `is-creatine-gluten-free` | `is-creatine-gluten-free-inline` |
| `glutenfree-sticky` | `is-creatine-gluten-free` | `is-creatine-gluten-free-sticky` |
| `sugarfree-page` | `sugar-free-creatine-gummies` | `sugar-free-creatine-gummies-inline` |
| `sugarfree-sticky` | `sugar-free-creatine-gummies` | `sugar-free-creatine-gummies-sticky` |
| `swoly-page` | `swoly-creatine-gummies-review` | `swoly-creatine-gummies-review-inline` |

## Full inventory

`Previous q` is blank when the link was `https://trycreate.co/15-9KD` with no sub-id. `Previous data-link-id` is blank when the anchor had none.

| Page | New `q` | Previous `q` | Previous `data-link-id` |
| --- | --- | --- | --- |
| `30-days-no-missed-creatine-dose` | `30-days-no-missed-creatine-dose-sticky` |  | `30-days-no-missed-creatine-dose-cta-1` |
| `are-creatine-gummies-worth-it` | `are-creatine-gummies-worth-it-inline` |  | `are-creatine-gummies-worth-it-cta-1` |
| `are-creatine-gummies-worth-it` | `are-creatine-gummies-worth-it-sticky` |  | `are-creatine-gummies-worth-it-cta-2` |
| `bear-balanced-creatine-gummies-review` | `bear-balanced-creatine-gummies-review-inline` | `bearbalanced-page` | `bear-balanced-creatine-gummies-review-cta-1` |
| `bear-balanced-creatine-gummies-review` | `bear-balanced-creatine-gummies-review-sticky` | `bearbalanced-sticky` | `bear-balanced-creatine-gummies-review-cta-2` |
| `beast-bites-creatine-gummies-review` | `beast-bites-creatine-gummies-review-inline` | `beastbites-page` | `beast-bites-creatine-gummies-review-cta-1` |
| `beast-bites-creatine-gummies-review` | `beast-bites-creatine-gummies-review-sticky` | `beastbites-sticky` | `beast-bites-creatine-gummies-review-cta-2` |
| `best-creatine-gummies-2026` | `best-creatine-gummies-2026-inline` | `3iMQkwu8` | `best-creatine-gummies-2026-cta-1` |
| `best-creatine-gummies-2026` | `best-creatine-gummies-2026-source` | `3iMQkwu8` | `best-creatine-gummies-2026-cta-2` |
| `best-creatine-gummies-2026` | `best-creatine-gummies-2026-card` | `3iMQkwu8` | `best-creatine-gummies-2026-cta-3` |
| `best-creatine-gummies-2026` | `best-creatine-gummies-2026-checkout` |  | `ccwc-checkout-comparison` |
| `best-creatine-gummies-2026` | `best-creatine-gummies-2026-sticky` | `3iMQkwu8` | `best-creatine-gummies-2026-cta-4` |
| `best-creatine-gummies-for-muscle-growth` | `best-creatine-gummies-for-muscle-growth-inline` |  | `best-creatine-gummies-for-muscle-growth-cta-1` |
| `best-creatine-gummies-for-muscle-growth` | `best-creatine-gummies-for-muscle-growth-sticky` |  | `best-creatine-gummies-for-muscle-growth-cta-2` |
| `best-creatine-gummies-for-women` | `best-creatine-gummies-for-women-card` | `women-page` | `best-creatine-gummies-for-women-cta-1` |
| `best-creatine-gummies-for-women` | `best-creatine-gummies-for-women-sticky` |  | `best-creatine-gummies-for-women-cta-2` |
| `best-tasting-creatine-gummies` | `best-tasting-creatine-gummies-source` |  |  |
| `best-tasting-creatine-gummies` | `best-tasting-creatine-gummies-inline` |  | `best-tasting-creatine-gummies-cta-1` |
| `best-time-to-take-creatine-gummies` | `best-time-to-take-creatine-gummies-inline` | `besttime-page` | `best-time-to-take-creatine-gummies-cta-1` |
| `best-time-to-take-creatine-gummies` | `best-time-to-take-creatine-gummies-sticky` | `besttime-sticky` | `best-time-to-take-creatine-gummies-cta-2` |
| `bloom-nutrition-creatine-gummies-review` | `bloom-nutrition-creatine-gummies-review-inline` |  | `bloom-nutrition-creatine-gummies-review-cta-1` |
| `bloom-nutrition-creatine-gummies-review` | `bloom-nutrition-creatine-gummies-review-sticky` |  | `bloom-nutrition-creatine-gummies-review-cta-2` |
| `bounce-nutrition-creatine-gummies-review` | `bounce-nutrition-creatine-gummies-review-inline` |  | `bounce-nutrition-creatine-gummies-review-cta-1` |
| `bounce-nutrition-creatine-gummies-review` | `bounce-nutrition-creatine-gummies-review-sticky` |  | `bounce-nutrition-creatine-gummies-review-cta-2` |
| `cheapest-way-to-buy-create-creatine` | `cheapest-way-to-buy-create-creatine-hero` |  | `ccwc-purchase` |
| `cheapest-way-to-buy-create-creatine` | `cheapest-way-to-buy-create-creatine-source` |  |  |
| `cheapest-way-to-buy-create-creatine` | `cheapest-way-to-buy-create-creatine-inline` |  | `facts-create-offer` |
| `cheapest-way-to-buy-create-creatine` | `cheapest-way-to-buy-create-creatine-checkout` |  | `ccwc-checkout-purchase` |
| `create-creatine-discount-code` | `create-creatine-discount-code-hero` | `RiOuVi3a` | `create-creatine-discount-code-cta-1` |
| `create-creatine-discount-code` | `create-creatine-discount-code-source` |  |  |
| `create-creatine-discount-code` | `create-creatine-discount-code-sticky` | `RiOuVi3a` | `create-creatine-discount-code-cta-2` |
| `create-creatine-gummies-review` | `create-creatine-gummies-review-source` |  |  |
| `create-creatine-gummies-review` | `create-creatine-gummies-review-card` | `f6pm1xJY` | `create-creatine-gummies-review-cta-1` |
| `create-creatine-gummies-review` | `create-creatine-gummies-review-inline` | `f6pm1xJY` | `create-creatine-gummies-review-cta-2` |
| `create-creatine-gummies-review` | `create-creatine-gummies-review-checkout` |  | `ccwc-checkout-brand_review` |
| `create-creatine-gummies-review` | `create-creatine-gummies-review-sticky` | `f6pm1xJY` | `create-creatine-gummies-review-cta-3` |
| `create-vs-bear-balanced` | `create-vs-bear-balanced-inline` | `cvbb-body` | `create-vs-bear-balanced-cta-1` |
| `create-vs-bear-balanced` | `create-vs-bear-balanced-sticky` | `cvbb-sticky` | `create-vs-bear-balanced-cta-2` |
| `create-vs-beast-bites` | `create-vs-beast-bites-inline` | `cvb-body` | `create-vs-beast-bites-cta-1` |
| `create-vs-beast-bites` | `create-vs-beast-bites-sticky` | `cvb-sticky` | `create-vs-beast-bites-cta-2` |
| `create-vs-force-factor` | `create-vs-force-factor-inline` | `QFmoNEA1` | `create-vs-force-factor-cta-1` |
| `create-vs-force-factor` | `create-vs-force-factor-sticky` | `QFmoNEA1` | `create-vs-force-factor-cta-2` |
| `creatine-dose-calculator` | `creatine-dose-calculator-sticky` |  | `creatine-dose-calculator-cta-2` |
| `creatine-for-travel` | `creatine-for-travel-sticky` |  | `creatine-for-travel-cta-1` |
| `creatine-gummies-and-alcohol` | `creatine-gummies-and-alcohol-inline` |  | `creatine-gummies-and-alcohol-cta-1` |
| `creatine-gummies-and-caffeine-pre-workout` | `creatine-gummies-and-caffeine-pre-workout-sticky` |  | `creatine-gummies-and-caffeine-pre-workout-cta-1` |
| `creatine-gummies-dosage` | `creatine-gummies-dosage-inline` |  | `creatine-gummies-dosage-cta-1` |
| `creatine-gummies-dosage` | `creatine-gummies-dosage-sticky` |  | `creatine-gummies-dosage-cta-2` |
| `creatine-gummies-drug-test` | `creatine-gummies-drug-test-inline` |  | `creatine-gummies-drug-test-cta-1` |
| `creatine-gummies-for-beginners` | `creatine-gummies-for-beginners-inline` | `beginners-page` | `creatine-gummies-for-beginners-cta-1` |
| `creatine-gummies-for-beginners` | `creatine-gummies-for-beginners-sticky` | `beginners-sticky` | `creatine-gummies-for-beginners-cta-2` |
| `creatine-gummies-for-muscle-recovery` | `creatine-gummies-for-muscle-recovery-inline` |  | `creatine-gummies-for-muscle-recovery-cta-1` |
| `creatine-gummies-for-older-adults` | `creatine-gummies-for-older-adults-inline` |  | `creatine-gummies-for-older-adults-cta-1` |
| `creatine-gummies-for-powerlifting-and-strength-training` | `creatine-gummies-for-powerlifting-and-strength-training-inline` |  | `creatine-gummies-for-powerlifting-and-strength-training-cta-1` |
| `creatine-gummies-for-runners-and-endurance-athletes` | `creatine-gummies-for-runners-and-endurance-athletes-sticky` |  | `creatine-gummies-for-runners-and-endurance-athletes-cta-1` |
| `creatine-gummies-for-weight-loss` | `creatine-gummies-for-weight-loss-sticky` |  | `creatine-gummies-for-weight-loss-cta-1` |
| `creatine-gummies-fsa-hsa-eligible` | `creatine-gummies-fsa-hsa-eligible-inline` |  | `creatine-gummies-fsa-hsa-eligible-cta-1` |
| `creatine-gummies-lab-tested` | `creatine-gummies-lab-tested-source` |  |  |
| `creatine-gummies-lab-tested` | `creatine-gummies-lab-tested-inline` | `X6x5Vzeg` | `creatine-gummies-lab-tested-cta-1` |
| `creatine-gummies-lab-tested` | `creatine-gummies-lab-tested-sticky` |  | `creatine-gummies-lab-tested-cta-2` |
| `creatine-gummies-recall-and-safety-check` | `creatine-gummies-recall-and-safety-check-sticky` |  | `creatine-gummies-recall-and-safety-check-cta-1` |
| `creatine-gummies-return-policy` | `creatine-gummies-return-policy-inline` | `returns-page` | `creatine-gummies-return-policy-cta-1` |
| `creatine-gummies-return-policy` | `creatine-gummies-return-policy-sticky` | `returns-sticky` | `creatine-gummies-return-policy-cta-2` |
| `creatine-gummies-side-effects` | `creatine-gummies-side-effects-inline` |  | `creatine-gummies-side-effects-cta-1` |
| `creatine-gummies-vs-capsules` | `creatine-gummies-vs-capsules-inline` | `vscapsules-page` | `creatine-gummies-vs-capsules-cta-1` |
| `creatine-gummies-vs-capsules` | `creatine-gummies-vs-capsules-sticky` | `vscapsules-sticky` | `creatine-gummies-vs-capsules-cta-2` |
| `creatine-gummies-vs-chews` | `creatine-gummies-vs-chews-inline` |  | `creatine-gummies-vs-chews-cta-1` |
| `creatine-gummies-vs-powder` | `creatine-gummies-vs-powder-inline` |  | `creatine-gummies-vs-powder-cta-1` |
| `creatine-gummies-vs-powder` | `creatine-gummies-vs-powder-sticky` |  | `creatine-gummies-vs-powder-cta-2` |
| `creatine-gummies-vs-stick-packs` | `creatine-gummies-vs-stick-packs-source` |  |  |
| `creatine-gummies-vs-stick-packs` | `creatine-gummies-vs-stick-packs-sticky` |  | `creatine-gummies-vs-stick-packs-cta-1` |
| `creatine-gummies-while-fasting` | `creatine-gummies-while-fasting-sticky` |  | `creatine-gummies-while-fasting-cta-1` |
| `creatine-impurities-dcd-dht` | `creatine-impurities-dcd-dht-source` |  |  |
| `creatine-impurities-dcd-dht` | `creatine-impurities-dcd-dht-inline` | `impurity-page` | `creatine-impurities-dcd-dht-cta-1` |
| `creatine-impurities-dcd-dht` | `creatine-impurities-dcd-dht-sticky` | `impurity-sticky` | `creatine-impurities-dcd-dht-cta-2` |
| `creatine-to-creatinine` | `creatine-to-creatinine-inline` | `creatinine-body` | `creatine-to-creatinine-cta-1` |
| `creatine-to-creatinine` | `creatine-to-creatinine-sticky` | `creatinine-sticky` | `creatine-to-creatinine-cta-2` |
| `creatine-with-electrolytes` | `creatine-with-electrolytes-source` |  |  |
| `creatine-with-electrolytes` | `creatine-with-electrolytes-sticky` |  | `creatine-with-electrolytes-cta-1` |
| `do-creatine-gummies-expire` | `do-creatine-gummies-expire-sticky` |  | `do-creatine-gummies-expire-cta-1` |
| `do-creatine-gummies-work` | `do-creatine-gummies-work-inline` |  | `do-creatine-gummies-work-cta-1` |
| `do-creatine-gummies-work` | `do-creatine-gummies-work-source` |  |  |
| `do-creatine-gummies-work` | `do-creatine-gummies-work-sticky` |  | `do-creatine-gummies-work-cta-2` |
| `do-creatine-gummy-bundles-save-money` | `do-creatine-gummy-bundles-save-money-source` |  |  |
| `do-creatine-gummy-bundles-save-money` | `do-creatine-gummy-bundles-save-money-inline` | `bundles-page` | `do-creatine-gummy-bundles-save-money-cta-1` |
| `do-creatine-gummy-bundles-save-money` | `do-creatine-gummy-bundles-save-money-sticky` | `bundles-sticky` | `do-creatine-gummy-bundles-save-money-cta-2` |
| `force-factor-creatine-gummies-review` | `force-factor-creatine-gummies-review-inline` |  | `force-factor-creatine-gummies-review-cta-1` |
| `force-factor-creatine-gummies-review` | `force-factor-creatine-gummies-review-sticky` |  | `force-factor-creatine-gummies-review-cta-2` |
| `gluten-free-creatine-gummies` | `gluten-free-creatine-gummies-card` |  | `gluten-free-creatine-gummies-cta-1` |
| `gluten-free-creatine-gummies` | `gluten-free-creatine-gummies-sticky` |  | `gluten-free-creatine-gummies-cta-2` |
| `how-long-do-creatine-gummies-take-to-work` | `how-long-do-creatine-gummies-take-to-work-inline` | `howlong-page` | `how-long-do-creatine-gummies-take-to-work-cta-1` |
| `how-long-do-creatine-gummies-take-to-work` | `how-long-do-creatine-gummies-take-to-work-sticky` | `howlong-sticky` | `how-long-do-creatine-gummies-take-to-work-cta-2` |
| `how-much-should-creatine-gummies-cost` | `how-much-should-creatine-gummies-cost-source` |  | `how-much-should-creatine-gummies-cost-cta-1` |
| `how-much-should-creatine-gummies-cost` | `how-much-should-creatine-gummies-cost-sticky` |  | `how-much-should-creatine-gummies-cost-cta-2` |
| `index` | `index-card` |  | `index-cta-1` |
| `is-creatine-gluten-free` | `is-creatine-gluten-free-inline` | `glutenfree-page` | `is-creatine-gluten-free-cta-1` |
| `is-creatine-gluten-free` | `is-creatine-gluten-free-sticky` | `glutenfree-sticky` | `is-creatine-gluten-free-cta-2` |
| `legion-creatine-gummies-review` | `legion-creatine-gummies-review-inline` |  | `legion-creatine-gummies-review-cta-1` |
| `legion-creatine-gummies-review` | `legion-creatine-gummies-review-sticky` |  | `legion-creatine-gummies-review-cta-2` |
| `lemme-creatine-gummies-review` | `lemme-creatine-gummies-review-inline` |  | `lemme-creatine-gummies-review-cta-1` |
| `lemme-creatine-gummies-review` | `lemme-creatine-gummies-review-sticky` |  | `lemme-creatine-gummies-review-cta-2` |
| `momentous-creatine-chews-review` | `momentous-creatine-chews-review-inline` |  | `momentous-creatine-chews-review-cta-1` |
| `momentous-creatine-chews-review` | `momentous-creatine-chews-review-sticky` |  | `momentous-creatine-chews-review-cta-2` |
| `state-of-creatine-gummies-2026` | `state-of-creatine-gummies-2026-sticky` |  | `state-of-creatine-gummies-2026-cta-1` |
| `sugar-free-creatine-gummies` | `sugar-free-creatine-gummies-inline` | `sugarfree-page` | `sugar-free-creatine-gummies-cta-1` |
| `sugar-free-creatine-gummies` | `sugar-free-creatine-gummies-sticky` | `sugarfree-sticky` | `sugar-free-creatine-gummies-cta-2` |
| `swoly-creatine-gummies-review` | `swoly-creatine-gummies-review-inline` | `swoly-page` | `swoly-creatine-gummies-review-cta-1` |
| `vegan-creatine-gummies` | `vegan-creatine-gummies-sticky` |  | `vegan-creatine-gummies-cta-1` |
| `wild-gainz-creatine-gummies-review` | `wild-gainz-creatine-gummies-review-inline` |  | `wild-gainz-creatine-gummies-review-cta-1` |
| `wild-gainz-creatine-gummies-review` | `wild-gainz-creatine-gummies-review-sticky` |  | `wild-gainz-creatine-gummies-review-cta-2` |

## Added October 14, 2026

| Page | New `q` | Previous `q` | Previous `data-link-id` |
| --- | --- | --- | --- |
| `is-create-legit` | `is-create-legit-source` |  |  |
| `is-create-legit` | `is-create-legit-inline` |  |  |
| `is-create-legit` | `is-create-legit-sticky` |  |  |
