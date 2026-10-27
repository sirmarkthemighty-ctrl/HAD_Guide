// Shock guides, extravasation content and the data normaliser.
// Each line carries `src`: KKU sheet code, or an outside guideline checked line by line on 2026-10-27:
//   SSC2021 = Surviving Sepsis Campaign 2021 (Evans L, et al. Crit Care Med 2021;49:e1063; PMC8486643)
//   AHA2022 = 2022 AHA/ACC/HFSA HF guideline, section 9.5 + Table 20 (JACC 2022;79:e263)
//   SOAPII  = De Backer D, et al. N Engl J Med 2010;362:779 (abstract)
// Lines that are not from a KKU sheet are labelled "นอกแนวทาง KKU HAD" in the page.

const HAD_DRUGS = HAD_DRUGS_A.concat(HAD_DRUGS_B);

const SRC_LABEL = {
  SSC2021: "SSC 2021",
  AHA2022: "AHA/ACC/HFSA HF 2022",
  SOAPII: "SOAP II (NEJM 2010)"
};

const SHOCK_GUIDES = {
  septic: {
    title: "Septic shock",
    items: [
      { label: "เป้าหมาย MAP", text: "แนะนำ initial target MAP 65 mmHg มากกว่าเป้าหมายที่สูงกว่า (strong recommendation)", src: "SSC2021" },
      { label: "1st line", text: "แนะนำ Norepinephrine เป็นยาแรก มากกว่า vasopressor อื่น (strong recommendation)", src: "SSC2021" },
      { label: "Norepinephrine (KKU)", text: "Peripheral ≤ 16 mcg/mL (4 mg/250 mL D5W/5DS) ในหลอดเลือดดำเหนือข้อพับ, central ได้ถึง 64 mcg/mL • ตาราง 0.08–1 mcg/kg/min, สูงสุดโดยปกติไม่เกิน 2 mcg/kg/min ใน refractory shock", src: "SD-3.17-05/23" },
      { label: "Peripheral start", text: "แนะนำเริ่ม vasopressor ทาง peripheral เพื่อแก้ MAP แทนการรอจนได้ central venous access (weak recommendation)", src: "SSC2021" },
      { label: "MAP ไม่พอ", text: "แนะนำเพิ่ม vasopressin แทนการเพิ่มขนาด norepinephrine (weak) — ในทางปฏิบัติมักเริ่มเมื่อ norepinephrine 0.25–0.5 mcg/kg/min • Vasopressin ไม่อยู่ในแนวทาง KKU HAD 2026 (ขนาดยา N/A)", src: "SSC2021" },
      { label: "MAP ยังไม่พอ", text: "แนะนำเพิ่ม epinephrine เมื่อ MAP ไม่พอแม้ได้ norepinephrine และ vasopressin (weak)", src: "SSC2021" },
      { label: "Terlipressin (KKU)", text: "Refractory septic shock (NE > 0.25–0.5 mcg/kg/min, SVRI < 1,500): 20–80 mcg/hr titrate 20 mcg/hr ทุก 15–30 นาที (สูงสุด 160 mcg/hr), ไม่เกิน 2 วัน", src: "SD-3.17-05/28" },
      { label: "⚠ ขัดแย้ง", text: "SSC 2021 แนะนำ \"ไม่ใช้\" terlipressin ใน septic shock (weak recommendation against) — ต่างจากแนวทาง KKU ด้านบน ควรปรึกษาก่อนใช้", src: "SSC2021", flag: true },
      { label: "Cardiac dysfunction", text: "มี cardiac dysfunction ร่วมกับ hypoperfusion ต่อเนื่องแม้ volume และ BP เพียงพอ: แนะนำเพิ่ม dobutamine ร่วมกับ norepinephrine หรือใช้ epinephrine เดี่ยว (weak) • ไม่แนะนำ levosimendan (weak)", src: "SSC2021" },
      { label: "Corticosteroid", text: "ยังต้องใช้ vasopressor: แนะนำ IV corticosteroid (weak) — hydrocortisone 200 mg/day (50 mg IV ทุก 6 ชม. หรือ continuous infusion) เริ่มเมื่อ norepinephrine หรือ epinephrine ≥ 0.25 mcg/kg/min อย่างน้อย 4 ชม. หลังเริ่มยา", src: "SSC2021" }
    ]
  },
  cardiogenic: {
    title: "Cardiogenic shock",
    items: [
      { label: "เกณฑ์ (hemodynamic)", text: "SBP < 90 mmHg หรือ mean BP < 60 mmHg, Cardiac index < 2.2 L/min/m2, PCWP > 15 mmHg (Table 23)", src: "AHA2022" },
      { label: "Inotrope", text: "ควรให้ IV inotropic support เพื่อรักษา systemic perfusion และ end-organ performance (COR 1, LOE B-NR) • ไม่มีหลักฐานชัดว่า inotrope ตัวใดดีกว่ากัน; เลือกตามความดันโลหิต arrhythmia ที่มีอยู่ และยาที่มี", src: "AHA2022" },
      { label: "ขนาดยา (Table 20)", text: "Dobutamine 2.5–20 mcg/kg/min • Milrinone 0.125–0.75 mcg/kg/min (bolus: not recommended) • Dopamine 5–10 และ 10–15 mcg/kg/min • Epinephrine 5–15 และ 15–20 mcg/min • Norepinephrine 0.5–30 mcg/min", src: "AHA2022" },
      { label: "Dopamine vs NE", text: "Dopamine มี arrhythmic events มากกว่า norepinephrine (24.1% vs 12.4%) และใน subgroup cardiogenic shock (n = 280) dopamine สัมพันธ์กับอัตราตายที่ 28 วันสูงกว่า (subgroup analysis)", src: "SOAPII" },
      { label: "Temporary MCS", text: "สมเหตุสมผลเมื่อยาไม่สามารถรักษา end-organ function ได้ (COR 2a, B-NR) • ทีม multidisciplinary shock team (2a) • PA line อาจพิจารณา (2b) • ส่งต่อศูนย์ที่มี temporary MCS เมื่อไม่ตอบสนองเร็ว (2b)", src: "AHA2022" },
      { label: "Acute MI", text: "กรณี acute MI การทำ urgent revascularization มีความสำคัญสูงสุด", src: "AHA2022" },
      { label: "Dobutamine (KKU)", text: "ขนาดสูงสุด ≤ 40 mcg/kg/min, ความเข้มข้นสูงสุด ≤ 5 mg/mL", src: "SD-3.17-05/11" }
    ]
  },
  anaphylactic: {
    title: "Anaphylaxis",
    items: [
      { label: "IM / SC (KKU)", text: "ให้ Adrenaline 1 amp ความเข้มข้น 1 mg/mL (1:1,000) เท่านั้น • หลีกเลี่ยง IM บริเวณสะโพก • แนวทางไม่ระบุขนาดยา IM (mg)", src: "SD-3.17-05/01" },
      { label: "IV bolus (KKU)", text: "Anaphylaxis Grade II–III: เจือจาง 1 amp ด้วย D5W หรือ NSS 9 mL (1:10,000) IV push", src: "SD-3.17-05/01" },
      { label: "Monitoring (KKU)", text: "HR, BP ทุก 5–10 นาที จนครบ 30 นาที • HR < 70 หรือ > 120, BP < 90/60 หรือ > 140/90 รายงานแพทย์", src: "SD-3.17-05/01" }
    ],
    missing: "ขนาดยา IM, สารน้ำ, antihistamine/steroid"
  },
  hepatorenal: {
    title: "Hepatorenal syndrome (HRS-AKI)",
    items: [
      { label: "Terlipressin (KKU)", text: "เริ่ม 0.5 mg q 6 hr titrate ทีละ 0.5 mg ทุก 6–12 hr (สูงสุด 2 mg q 6 hr) • IV bolus: ผสมเป็น 10 mL push ใน 10 นาที q 6 hr หรือ continuous: ผสมเป็น 100 mL drip ใน 6 hr q 6 hr", src: "SD-3.17-05/28" },
      { label: "Outcome / Duration (KKU)", text: "SCr ลดลง > 25% จาก baseline ที่ 72 hr • ให้ไม่เกิน 14 วัน", src: "SD-3.17-05/28" }
    ],
    missing: "Albumin, ทางเลือกเมื่อไม่มี terlipressin"
  },
  neurogenic: { title: "Neurogenic shock", items: [], missing: "ทั้งหมด — ไม่มีในแนวทาง KKU HAD 2026 และไม่มีแหล่งอ้างอิงที่ตรวจสอบได้" },
  hypovolemic: { title: "Hypovolemic / hemorrhagic shock", items: [], missing: "ทั้งหมด — ไม่มีในแนวทาง KKU HAD 2026 และไม่มีแหล่งอ้างอิงที่ตรวจสอบได้" }
};

// Extravasation / IV-site statements, all from the KKU sheets.
const EXTRAV_ITEMS = [
  { drug: "Norepinephrine", sd: "SD-3.17-05/23", text: "ให้ในเส้นเลือดดำขนาดใหญ่ (peripheral เหนือข้อพับ หรือ central) และระวัง extravasation • ตรวจ IV site ทุก 4 ชม.: รอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่ง" },
  { drug: "Terlipressin", sd: "SD-3.17-05/28", text: "Peripheral ในเส้นเลือดดำขนาดใหญ่เหนือข้อพับ หรือ central และระวัง extravasation • ตรวจ IV site ทุก 1 ชม." },
  { drug: "Nicardipine", sd: "SD-3.17-05/21", text: "ระวัง phlebitis, extravasation • เส้นที่แขนเปลี่ยนตำแหน่งเมื่อครบ 12 ชม. • พบการอักเสบ: หยุดยา เปลี่ยนตำแหน่ง ประคบร้อน" },
  { drug: "Adrenaline", sd: "SD-3.17-05/01", text: "ตรวจ IV site ทุก 1 ชม.: รอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่ง" },
  { drug: "Dopamine / Dobutamine", sd: "SD-3.17-05/12, /11", text: "ตรวจ IV site ทุก 1 ชม.: รอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่ง" },
  { drug: "Amiodarone", sd: "SD-3.17-05/03", text: "Peripheral ≤ 2 mg/mL • ตรวจ IV site ทุก 1 ชม. (6 ชม. แรก): ปวด ให้ลดอัตราเร็วหรือหยุดยา" },
  { drug: "Calcium gluconate", sd: "SD-3.17-05/07", text: "ปวดบริเวณที่ฉีด ให้หยุดยาหรือลดความเร็ว • ตรวจ IV site ทุก 4 ชม." },
  { drug: "Dipotassium phosphate", sd: "SD-3.17-05/10", text: "Peripheral K+ < 40 mEq/L, < 10 mEq/hr • ตรวจหลอดเลือดดำ (peripheral) ทุก 4 ชม." },
  { drug: "Amphotericin B", sd: "SD-3.17-05/04", text: "ตรวจ IV site ทุก 8 ชม." }
];

const ROUTE_META = {
  peripheral: ["Peripheral line", "badge-emerald"],
  both: ["Peripheral / Central", "badge-emerald"],
  central: ["Central line", "badge-rose"],
  iv: ["IV (แนวทางไม่ระบุสาย)", "badge-slate"],
  imsc: ["IM / SC", "badge-sky"],
  sc: ["SC", "badge-sky"],
  oral: ["Oral", "badge-violet"],
  patch: ["Transdermal", "badge-violet"]
};

const NA = "N/A";
const NA_HTML = '<span class="na-tag" title="ไม่มีในแนวทาง KKU HAD 2026">N/A</span>';

HAD_DRUGS.forEach(d => {
  d.product = d.strength;
  d.brandName = d.sd;
  d.formulations.forEach((f, i) => {
    const meta = ROUTE_META[f.route] || ["N/A", "badge-slate"];
    f.routeLabel = f.routeNote || meta[0];
    f.routeClass = meta[1];
    f.index = i;
    if (f.totalVolume == null) f.totalVolume = NA;
  });
  d.calcForms = d.calc ? d.formulations.filter(f => f.concNumber && f.calc !== false) : [];
});
