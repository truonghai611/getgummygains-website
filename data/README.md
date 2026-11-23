---
license: cc-by-4.0
pretty_name: Creatine Gummy Lab Test Tracker
language:
- en
tags:
- supplements
- creatine
- dietary-supplements
- lab-testing
- label-accuracy
size_categories:
- n<1K
configs:
- config_name: default
  data_files: creatine-gummy-lab-results.csv
---

# Creatine Gummy Lab Test Tracker

Every publicly reported independent laboratory test of creatine gummy products in one table:
label claim, measured creatine, pass or fail against the label, creatinine findings, and an
NSF Certified for Sport registry cross-check.

- **Rows:** 29 (28 gummy product tests: 12 Pass, 16 Fail, plus one pooled row for the five powders tested in Round 2)
- **Sources:** NOW Foods HPLC round (2024), SuppCo ISO 17025 round (2025), James Smith / Eurofins round (July 2025). Every row carries its `source_url`.
- **Maintained by:** GummyGains (Henry Nguyen). Live table and methodology: https://getgummygains.com/creatine-gummies-lab-tested
- **DOI:** [10.5281/zenodo.24452623](https://doi.org/10.5281/zenodo.24452623)
- **License:** CC BY 4.0. Attribute as "GummyGains Creatine Gummy Lab Test Tracker" with a link to https://getgummygains.com/creatine-gummies-lab-tested. The measurements belong to the labs named on each row.

## Columns

| column | meaning |
|---|---|
| product, brand | product as named in the lab's report |
| round, lab, test_date | which public test round, which lab, when |
| label_claim, measured | grams of creatine per serving on the label and as measured, when the lab published them |
| creatinine_flagged | whether the lab reported elevated creatinine (a creatine breakdown product) |
| result | Pass / Fail against the label claim, as reported by the lab |
| nsf_certified_for_sport_gummy_listings, nsf_checked_on | NSF Certified for Sport gummy listings for the brand on the check date |
| source_url | the lab's or publisher's own report |
| notes | caveats |

## Limits

A result applies to the lot that was tested. NOW Foods reported seven failing brands but published
names for six, so one row is "Not published". Formulations change; check the live tracker for newer rounds.

## Citation

GummyGains. *Creatine Gummy Lab Test Tracker*. https://getgummygains.com/creatine-gummies-lab-tested (CC BY 4.0).
