# HAD Drug Guide
### แนวทางการใช้ยา High Alert Drugs (HAD) 2026 — รพ.ศรีนครินทร์ มหาวิทยาลัยขอนแก่น

A bedside reference for the 21 high-alert drugs in the KKU Srinagarind Hospital HAD 2026 guideline, by
Warodom Phaenthong, M.D. It is one self-contained HTML page (`had-drug-guide.html`, opened by `index.html`) that
runs in the browser, with no installation and no data sent anywhere.

It is decision support for healthcare professionals, not a substitute for the KKU HAD documents, your hospital's
protocols, product labels or clinical judgement.

## What it contains

- 21 drugs (vasopressors/inotropes, vasodilators, antithrombotics incl. DOACs and LMWH, antiarrhythmics,
  concentrated electrolytes, fentanyl, amphotericin B): strength, diluent, standard recipes and concentrations,
  line, dosing, monitoring with critical points, cautions, stability/compatibility, adverse effects and antidote —
  each drug shows its KKU document code (SD-3.17-05/xx) and links to the KKU page.
- Anything a KKU sheet does not state shows **N/A**. Values in a sheet that look like typing errors are shown with
  an **⚠ Errata** note instead of being silently changed.
- Infusion calculator (dose ↔ mL/hr) for the recipes that have a concentration in the sheets.
- Shock guide: every line carries its source — KKU, or "นอกแนวทาง KKU" for lines checked against SSC 2021,
  AHA/ACC/HFSA HF 2022 or SOAP II. Conflicts (e.g. terlipressin in septic shock) are flagged.
- Extravasation / IV-site statements from the KKU sheets, compare view, A4 print, PNG export.
- Colour-coded folding sections, light and dark themes, TH/EN title, phone layout.

Tap the version badge next to the title for the changelog.

## Editing

The drug data lives in `had-guide-src/` (`drugs-a.js`, `drugs-b.js`, `guides.js`). After editing, rebuild and test:

```
node .claude/build-had.js --test
```

The build injects the data into `had-drug-guide.html` and checks every drug's fields, the calculator rates against
values printed in the KKU sheets, and that every shock-guide line names a source.

## Licence

Code and layout: CC BY-NC-SA 4.0 (see `LICENSE`). The drug content belongs to the KKU Department of Pharmacy;
see `NOTICE`.
