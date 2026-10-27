// Build the HAD guide: inject had-guide-src/*.js into had-drug-guide.html between
// /*HAD-DATA-START*/ and /*HAD-DATA-END*/, then (with --test) check the data.
// Usage: node .claude/build-had.js [--test]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'had-drug-guide.html');
const srcFiles = ['drugs-a.js', 'drugs-b.js', 'guides.js'].map(f => path.join(root, 'had-guide-src', f));

const START = '/*HAD-DATA-START*/';
const END = '/*HAD-DATA-END*/';

const src = srcFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
let html = fs.readFileSync(htmlPath, 'utf8');
const a = html.indexOf(START), b = html.indexOf(END);
if (a < 0 || b < a) throw new Error('data markers not found in had-drug-guide.html');
html = html.slice(0, a + START.length) + '\n' + src + '\n' + html.slice(b);
fs.writeFileSync(htmlPath, html);
console.log('built had-drug-guide.html (' + html.length + ' chars)');

// Artifact copy: the claude.ai artifact host adds its own doctype/html/head/body skeleton, so drop ours.
const art = html
  .replace(/^<!doctype html>\s*<html[^>]*>\s*<head>\s*/i, '')
  .replace(/<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/, '')
  .replace(/<title>[^<]*<\/title>/, '<title>HAD Drug Guide</title>\n<meta name="claude:viewport-fit-sides" content="cover">')
  .replace(/<\/head>\s*<body>\s*/, '')
  .replace(/\s*<\/body>\s*<\/html>\s*$/, '\n');
if (/<html|<\/head>|<body/i.test(art.slice(0, 2000))) throw new Error('artifact copy still has page skeleton');
fs.writeFileSync(htmlPath.replace(/\.html$/, '.artifact.html'), art);
console.log('built had-drug-guide.artifact.html');

if (!process.argv.includes('--test')) process.exit(0);

// ---------- tests ----------
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL ' + msg); } };

const ctx = {};
vm.createContext(ctx);
vm.runInContext(src + '\nthis.HAD_DRUGS = HAD_DRUGS; this.SHOCK_GUIDES = SHOCK_GUIDES; this.EXTRAV_ITEMS = EXTRAV_ITEMS;', ctx);
const drugs = ctx.HAD_DRUGS;

ok(drugs.length === 21, 'expected 21 drugs, got ' + drugs.length);
const ids = new Set();
const sds = new Set();
for (const d of drugs) {
  const t = d.id;
  ok(!ids.has(d.id), t + ': duplicate id'); ids.add(d.id);
  ok(/^SD-3\.17-05\/\d\d$/.test(d.sd), t + ': bad sd code ' + d.sd);
  ok(!sds.has(d.sd), t + ': duplicate sd ' + d.sd); sds.add(d.sd);
  ok(d.post === 306 || d.post === 307, t + ': post must be 306 or 307');
  for (const k of ['name', 'nameTh', 'category', 'categoryLabel', 'strength', 'diluent', 'standardDose'])
    ok(typeof d[k] === 'string' && d[k].length > 0, t + ': missing ' + k);
  ok(Array.isArray(d.formulations) && d.formulations.length > 0, t + ': needs at least one formulation');
  ok(Array.isArray(d.safetyAlerts) && d.safetyAlerts.length > 0, t + ': needs safetyAlerts');
  ok(Array.isArray(d.monitoring) && d.monitoring.length > 0, t + ': needs monitoring');
  ok(Array.isArray(d.adverseEffects), t + ': adverseEffects must be an array');
  ok(Array.isArray(d.indications), t + ': indications must be an array');
  ok(Array.isArray(d.errata), t + ': errata must be an array');
  for (const k of ['receptors', 'hemodynamics', 'pearls', 'extravasationRisk', 'brand'])
    ok(!(k in d) || k === 'brandName', t + ': old unsourced field still present: ' + k);
  for (const m of d.monitoring) ok(m.param && m.timing && m.criticalPoint, t + ': monitoring row incomplete');
  for (const f of d.formulations) {
    ok(f.ratio && f.concText && f.recipe, t + ': formulation incomplete');
    ok(f.routeClass && f.routeLabel && f.routeLabel !== 'N/A', t + ': unknown route ' + f.route);
  }
  if (d.calc) {
    ok(d.doseUnit && d.dosingRange && d.calcForms.length > 0, t + ': calc drug needs doseUnit, dosingRange, calc formulations');
  } else {
    ok(d.calcForms.length === 0, t + ': non-calc drug has calcForms');
  }
}

// Rate checks against values printed in the KKU sheets (mL/hr), using the page's own formula.
function rate(drugId, conc, dose, weight) {
  const d = drugs.find(x => x.id === drugId);
  const u = d.doseUnit;
  if (u === 'mcg/kg/min') return dose * weight * 60 / conc;
  if (u === 'mcg/min') return dose * 60 / conc;
  if (u === 'mg/hr') return dose / (conc / 1000);
  if (u === 'mcg/hr') return dose / conc;
  if (u === 'mcg/kg/hr') return dose * weight / conc;
  if (u === 'units/hr') return dose / conc;
  throw new Error('unit ' + u);
}
const sheet = [
  ['adrenaline', 100, 20, null, 12], ['adrenaline', 100, 50, null, 30],
  ['norepinephrine', 16, 0.2, 60, 45], ['norepinephrine', 64, 1, 85, 79.69], ['norepinephrine', 16, 0.08, 40, 12],
  ['dopamine', 1000, 10, 60, 36], ['dopamine', 2000, 15, 90, 40.5],
  ['dobutamine', 1000, 7, 70, 29.4], ['dobutamine', 4000, 20, 90, 27],
  ['nicardipine', 100, 5, null, 50], ['nicardipine', 200, 15, null, 75],
  ['nitroglycerin', 200, 100, null, 30], ['nitroglycerin', 200, 200, null, 60],
  ['terlipressin', 10, 160, null, 16],
  ['heparin', 100, 1000, null, 10], ['heparin', 10, 1200, null, 120],
  ['fentanyl', 5, 2, 60, 24], ['fentanyl', 10, 7, 75, 52.5]
];
for (const [id, conc, dose, w, expect] of sheet) {
  const d = drugs.find(x => x.id === id);
  ok(d.calcForms.some(f => f.concNumber === conc), id + ': no calc formulation at ' + conc);
  const r = rate(id, conc, dose, w);
  ok(Math.abs(r - expect) <= 0.6, id + ' ' + dose + ' ' + d.doseUnit + ' @' + conc + ': got ' + r.toFixed(2) + ' mL/hr, sheet ' + expect);
}

// Shock guide lines must name a source.
for (const [k, g] of Object.entries(ctx.SHOCK_GUIDES)) {
  for (const it of g.items) ok(it.src && it.text, 'shock ' + k + ': line without source');
  ok(g.items.length > 0 || g.missing, 'shock ' + k + ': empty guide must say what is missing');
}
for (const e of ctx.EXTRAV_ITEMS) ok(/^SD-3\.17-05\//.test(e.sd), 'extravasation ' + e.drug + ': needs sheet code');

// Page code must not use removed fields.
const code = html.slice(0, html.indexOf(START)) + html.slice(html.indexOf(END));
for (const k of ['.receptors', '.hemodynamics', '.pearls', 'Phentolamine', 'Hyaluronidase', 'ไม่มี Specific Antidote'])
  ok(!code.includes(k), 'page code still uses ' + k);

console.log(fails ? fails + ' check(s) failed' : 'all checks passed');
process.exit(fails ? 1 : 0);
