// HAD drug data, part B (anticoagulants, electrolytes, fentanyl, amphotericin B).
// Same rules as drugs-a.js: only what the named KKU HAD 2026 sheet states.

const BLEED_ADR = ["เกิดรอยช้ำ/จ้ำเลือด", "เลือดออกบริเวณเหงือก", "เลือดกำเดาไหล", "อาเจียนเป็นเลือด", "ปัสสาวะมีสีแดง", "อุจจาระมีเลือดปน/สีดำ"];
const DOAC_ADR = BLEED_ADR.concat(["ขาบวม/ชา", "ตาพร่า", "ปวดเมื่อย/ไม่มีแรง"]);
const LMWH_SWITCH = "Time to start anticoagulant (จาก LMWH/SC): Dabigatran ≤ 2 hr ก่อน next dose • Apixaban next dose • Edoxaban next dose • Rivaroxaban ≤ 2 hr ก่อน next dose • Heparin next dose • Warfarin ให้ร่วมกันจนได้ therapeutic INR";
const DOAC_PREG = "หลีกเลี่ยงในหญิงให้นมบุตรและหญิงตั้งครรภ์ แนะนำ heparin หรือ LMWH หรืออาจใช้ warfarin ในไตรมาสที่ 2 และ 3 หากจำเป็น โดยประเมินความเสี่ยงและประโยชน์ก่อนให้ยาทุกครั้ง";
const DOAC_CAUTION = "ข้อควรระวัง: ผู้ป่วยสูงอายุ ≥ 75 ปี (เพิ่มเสี่ยงเลือดออกในทางเดินอาหาร), renal impairment, ผู้ป่วยที่ต้องผ่าตัดหรือทำหัตถการ";
const DOAC_CONTRA = "ข้อห้ามใช้: platelet < 50,000/mm3, active bleeding หรือเลือดออกง่าย, ประวัติ mechanical prosthetic heart valve, moderate to severe mitral stenosis, antiphospholipid syndrome ที่เสี่ยงลิ่มเลือดสูง, VTE ที่มี CrCl < 30 mL/min, การทำงานของตับบกพร่อง (Child-Pugh C) และผู้ที่แพ้ยานี้";
const DOAC_CBC = { param: "CBC", timing: "ก่อนให้ยา แล้วทุก 1 ปี (ผู้ป่วยทั่วไป) • ทุก 3–6 เดือน (อายุ ≥ 75 ปี หรือ CrCl < 30 mL/min)", criticalPoint: "แนวทางไม่ระบุค่า" };
const PCC_TEXT = "3-factor หรือ 4-factor PCC 25–50 IU/kg IV ไม่เกิน 2 mL/min (60 IU/min) • activated PCC (aPCC) 25–50 IU/kg IV infusion (สูงสุด 200 IU/kg/day)";
const XA_ANTIDOTE = "Andexanet alfa: low dose 400 mg IV bolus + 480 mg IV infusion, high dose 800 mg IV bolus + 960 mg IV infusion • Ciraparantag 100–300 mg IV bolus single dose • กรณีไม่มี andexanet alfa และ ciraparantag (ปัจจุบันไม่มีในประเทศไทย): " + PCC_TEXT;
const SC_TECH = "การให้แบบ subcutaneous: ฉีดแบบ intrafat หรือ deep SC บริเวณ abdominal fat layer ห่างจากสะดือมากกว่า 2 นิ้ว หลังฉีดกดเบาๆ 5–10 วินาที, ไม่ไล่ฟองอากาศออกจากหลอดบรรจุยา, ห้ามนวด, ประคบเย็นได้ และเปลี่ยนที่ฉีดครั้งต่อไปเพื่อป้องกัน hematoma";

const HAD_DRUGS_B = [
  {
    id: "heparin", sd: "SD-3.17-05/16", post: 306,
    name: "Unfractionated Heparin (UFH)", nameTh: "เฮพาริน",
    category: "antithrombotic", categoryLabel: "Anticoagulant (UFH)",
    strength: "5,000 unit/mL (5 mL)",
    diluent: "NSS, 1/2NS, 5DW (bolus) • D5W หรือ NSS (infusion)",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "units/hr", dosingRange: { min: 100, usualMax: 2000, max: 2000 },
    standardDose: "IV Bolus / Initial infusion (Max bolus / Max infusion): STEMI adjunct to fibrinolysis, NSTEMI, UA 60 u/kg (4,000) / 12 u/kg/hr (1,000 u/hr) • ACS, mechanical valve 60–70 u/kg (5,000) / 12–15 u/kg/hr (1,000) • PE, ventricular/atrial thrombus, AF cardioversion 80 u/kg (10,000) / 18 u/kg/hr (1,800) • Peripheral arterial embolism/DVT 80 u/kg (5,000) / 18 u/kg/hr (1,000) • Anticoagulation IV 10,000 u bolus แล้ว 50–70 u/kg (5,000–10,000 u q 4–6 hr) • DVT/PE SC 333 u/kg แล้ว 250 u/kg q 12 hr • Thromboprophylaxis SC 5,000 u q 8–12 hr • Total dose 48,000 u/day (2,000 u/hr)",
    formulations: [
      { ratio: "100 : 1", concText: "100 unit/mL", concNumber: 100, recipe: "ดูดยา 2 mL (10,000 unit) up to D5W หรือ NSS 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "50 : 1", concText: "50 unit/mL", concNumber: 50, recipe: "ดูดยา 1 mL (5,000 unit) up to D5W หรือ NSS 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "10 : 1", concText: "10 unit/mL", concNumber: 10, recipe: "ดูดยา 0.2 mL (1,000 unit) up to D5W หรือ NSS 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "SC (undiluted)", concText: "5,000 unit/mL", concNumber: 5000, calc: false, recipe: "ไม่ต้องเจือจาง ฉีดแบบ intrafat หรือ deep SC (ปริมาตร mL = units ที่ต้องการ ÷ 5,000)", totalVolume: null, route: "sc" }
    ],
    indications: ["STEMI (adjunct to fibrinolysis), NSTEMI, Unstable angina", "Acute coronary syndrome, Mechanical valve", "Pulmonary embolism, ventricular/atrial thrombus, AF (cardioversion)", "Peripheral arterial embolism / Deep vein thrombosis", "Thromboprophylaxis"],
    safetyAlerts: [
      "ระมัดระวังในผู้ป่วยที่เลือดออกง่าย หรือเกล็ดเลือดต่ำกว่า 100,000/mm3 และควรปรึกษาแพทย์เฉพาะทาง",
      "ห้ามให้ยาโดยวิธี IM (ระคายเคือง/ปวดบริเวณที่ฉีด)",
      "IV bolus: ให้ไม่เจือจางหรือเจือจางก็ได้ อัตราเร็ว 5,000 units ใน 1 นาที; เด็ก 50 units/kg ให้มากกว่า 1 นาที",
      "Continuous IV infusion: ให้ยาไม่เจือจางหรือเจือจาง ควรใช้ infusion pump",
      "SC: ฉีดบริเวณ abdominal fat layer ห่างจากสะดือ > 2 นิ้ว กดเบาๆ 5–10 วินาที ห้ามนวด และเปลี่ยนที่ฉีดเพื่อป้องกัน hematoma",
      "ปรับขนาดยาตามน้ำหนักตัวและอาการทางคลินิก • สูตร: ปริมาตร (mL) = units ที่ต้องการ ÷ 5,000 units/mL"
    ],
    stability: "หลังเจือจางยา ควรใช้ภายใน 24 ชั่วโมง",
    compat: "เข้ากันได้กับ NSS, 1/2NS, 5DW",
    monitoring: [
      { param: "aPTT", timing: "IV: ก่อนให้ยา 30 นาที และทุก 4–6 ชม. จนได้ค่าเป้าหมาย จากนั้นทุก 24 ชม. • SC: ก่อนและหลังให้ยา 6 ชม. และทุก 12–24 ชม.", criticalPoint: "> 2.5 เท่าของค่าปกติ" },
      { param: "HR", timing: "ตามรอบ aPTT", criticalPoint: "< 60 หรือ > 120 ครั้ง/นาที" },
      { param: "BP", timing: "ตามรอบ aPTT", criticalPoint: "< 90/60 หรือ > 160/100 mmHg" },
      { param: "Platelet count", timing: "ก่อนให้ยา ต่อไปทุก 3 วัน", criticalPoint: "< 100,000/mm3" },
      { param: "Hb", timing: "ก่อนให้ยา ต่อไปทุก 3 วัน", criticalPoint: "< 12 หรือ > 18 g/dL" },
      { param: "Bleeding", timing: "ก่อนให้ยา ต่อไปทุก 3 วัน", criticalPoint: "เลือดออก" }
    ],
    adverseEffects: ["เกิดรอยช้ำ/จ้ำเลือด", "เลือดออกบริเวณเหงือก", "เลือดกำเดาออก", "อาเจียนเป็นเลือด", "ปัสสาวะมีสีแดง", "อุจจาระมีเลือดปน/สีดำ"],
    antidote: "Protamine 1 mg : 100 unit heparin (คำนวณจากค่าครึ่งชีวิตของ heparin ที่ 30 นาที) IV slow push 1–3 นาที (ไม่ควรให้ IM) max dose 50 mg",
    management: "การปรับขนาดตาม aPTT — VTE: < 40 bolus 5,000 u ↑ 300 u/hr; 40–49 bolus 3,000 u ↑ 200 u/hr; 50–59 ↑ 150 u/hr; 60–85 no change; 86–95 ↓ 100 u/hr; 96–120 hold 30 min ↓ 100 u/hr; > 120 hold 60 min ↓ 150 u/hr<br>ACS: < 40 bolus 3,000 u ↑ 100 u/hr; 40–49 ↑ 100 u/hr; 50–75 no change; 76–85 ↓ 100 u/hr; 86–100 hold 30 min ↓ 100 u/hr; > 100 hold 60 min ↓ 200 u/hr<br>ตาม aPTT / aPTT ratio (weight-based): < 35 / < 1.2 bolus 80 u/kg ↑ 4 u/kg/hr; 35–45 / 1.2–1.5 bolus 40 u/kg ↑ 2 u/kg/hr; 46–70 / 1.5–2.5 no change; 71–90 / 2.6–3.0 hold 60 min ↓ 2 u/kg/hr; > 90 / 3.1–4.0 hold 60 min ↓ 3 u/kg/hr<br>ตาม aPTT ratio: < 1.2 bolus 5,000 u ↑ 400 u/hr; 1.2–1.7 bolus 2,500 u ↑ 100–200 u/hr; 1.8–2.5 no change; 2.6–3.0 hold 30–60 min ↓ 100 u/hr; 3.1–4.0 hold 30–60 min ↓ 200 u/hr; 4.1–5.0 hold 30–60 min ↓ 300 u/hr; 5.1–7.0 hold 60 min ↓ 500 u/hr; > 7.0 hold 180 min ↓ 500 u/hr",
    errata: ["ตาราง 50 unit/mL: แถว 1,600–2,000 unit/hr พิมพ์ว่า 16–20 mL/hr — คำนวณได้ 32–40 mL/hr (ตารางเดียวกันแถว 1,500 = 30 mL/hr)"]
  },
  {
    id: "enoxaparin", sd: "SD-3.17-05/14", post: 306,
    name: "Enoxaparin", nameTh: "อีน็อกซาพาริน",
    category: "antithrombotic", categoryLabel: "LMWH",
    strength: "40 mg/0.4 mL, 60 mg/0.6 mL, 80 mg/0.8 mL",
    diluent: "Pre-filled syringe (SC)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "STEMI ≤ 75 ปี: 30 mg IV bolus อีก 15 นาที ตามด้วย 1 mg/kg (สูงสุด 100 mg สำหรับ 2 doses แรก) จากนั้น 1 mg/kg SC q 12 hrs • STEMI > 75 ปี: 0.75 mg/kg SC q 12 hrs (สูงสุด 75 mg สำหรับ 2 doses แรก) • NSTEMI: 1 mg/kg SC q 12 hrs • DVT/PE: 1 mg/kg SC q 12 hrs หรือ 1.5 mg/kg SC q 24 hrs • VTE prophylaxis: Cancer 40 mg SC q 24 hrs หรือ 1 mg/kg SC q 24 hrs; BW < 150 kg, CrCl > 30: 40 mg q 24 hrs; CrCl 10–29: 30 mg q 24 hrs; BW > 150 kg, CrCl > 30: 30 mg q 12 hrs • CrCl 15–30: 1 mg/kg SC q 24 hrs • CrCl < 15: แนะนำ unfractionated heparin",
    formulations: [
      { ratio: "Pre-filled syringe", concText: "100 mg/mL (1 mg = 0.01 mL = 100 anti-Xa IU)", concNumber: null, recipe: SC_TECH, totalVolume: "0.4 / 0.6 / 0.8 mL", route: "sc" }
    ],
    indications: ["Acute STEMI", "NSTEMI", "Deep vein thrombosis (DVT)", "Pulmonary embolism (PE)", "VTE prophylaxis"],
    safetyAlerts: [
      "Enoxaparin sodium 1 mg (0.01 mL) เทียบเท่า 100 anti-Xa IU • ตรวจสอบชื่อยาและความแรงก่อนให้ยาทุกครั้ง",
      "ห้ามให้ยาโดยวิธี IM (ระคายเคือง/ปวดบริเวณที่ฉีด)",
      "CrCl 15–30 mL/min: enoxaparin 1 mg/kg SC q 24 hrs • CrCl < 15 mL/min: แนะนำ unfractionated heparin",
      "เปลี่ยนจาก UFH มาเป็น enoxaparin: เริ่ม enoxaparin หลังหยุด UFH ภายใน 1 ชั่วโมง",
      "ข้อควรระวัง: เกล็ดเลือด < 100,000/mm3; หลีกเลี่ยงใช้ร่วมกับ antiplatelets, anticoagulants, NSAIDs และยาเพิ่ม potassium (K-sparing diuretics); ผู้ป่วย neuraxial anesthesia / spinal puncture / spinal surgery (เสี่ยง epidural/spinal hematoma)",
      "ข้อห้ามใช้: active bleeding เลือดออกง่าย หรือเกล็ดเลือด < 50,000/mm3 (หากจำเป็นปรึกษาแพทย์เฉพาะทาง), ประวัติ HIT และผู้ที่แพ้ยานี้",
      LMWH_SWITCH
    ],
    stability: null, compat: null,
    monitoring: [
      { param: "Anti-Xa level (กลุ่มเสี่ยง)", timing: "หญิงตั้งครรภ์ที่มี mechanical valve, ไตเสื่อม, อ้วน, เด็ก, ใช้ยานาน, เสี่ยงเลือดออกสูง, หลังผ่าตัด", criticalPoint: "ค่าปกติ BID 0.6–1 IU/mL, OD 1–2 IU/mL" },
      { param: "Heart rate", timing: "ก่อนให้ยา 30 นาที และต่อเนื่องทุก 24 ชั่วโมง", criticalPoint: "< 60 หรือ > 120 bpm" },
      { param: "Blood pressure", timing: "ก่อนให้ยา 30 นาที และต่อเนื่องทุก 24 ชั่วโมง", criticalPoint: "< 90/60 หรือ > 160/100 mmHg" },
      { param: "Platelet count", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "< 100,000/mm3" },
      { param: "Creatinine clearance", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "< 30 mL/min" },
      { param: "Bleeding", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "แนวทางไม่ระบุค่า" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: "Protamine 1 mg / 100 anti-Xa IU (1 mg) ของ enoxaparin เมื่อได้รับยาภายใน 8 ชั่วโมง IV over 10 นาที (ไม่ควรให้ IM) max 50 mg • หากให้ enoxaparin เกิน 12 ชั่วโมง อาจไม่จำเป็นต้องให้ protamine",
    management: null, errata: []
  },
  {
    id: "bemiparin", sd: "SD-3.17-05/06", post: 306,
    name: "Bemiparin", nameTh: "เบมิพาริน",
    category: "antithrombotic", categoryLabel: "LMWH",
    strength: "3,500 IU/0.2 mL, 7,500 IU/0.3 mL",
    diluent: "Pre-filled syringe (SC)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "VTE prophylaxis (high risk): 3,500 IU SC OD (2 hrs ก่อน หรือ 6 hrs หลังผ่าตัด) • VTE treatment: ≤ 50 kg 5,000 IU; > 50–70 kg 7,500 IU; > 70–100 kg 10,000 IU; > 100 kg 115 IU/kg SC OD • Secondary prevention (DVT, transitory risk): 3,500 IU SC OD • Hemodialysis circuit: < 60 kg 2,500 IU, > 60 kg 3,500 IU single dose in arterial line (HD < 4 hrs) • CrCl < 30: prophylaxis/secondary prevention/> 100 kg ลด 25%; treatment ≤ 50 kg 3,500 IU, > 50–70 kg 5,000 IU, > 70–100 kg 7,500 IU",
    formulations: [
      { ratio: "Pre-filled syringe", concText: "3,500 IU/0.2 mL • 7,500 IU/0.3 mL", concNumber: null, recipe: SC_TECH, totalVolume: "0.2 / 0.3 mL", route: "sc" }
    ],
    indications: ["VTE prophylaxis", "VTE treatment", "Secondary prevention of VTE recurrences", "Prevention of clotting in the extracorporeal circuit during hemodialysis"],
    safetyAlerts: [
      "ตรวจสอบชื่อยาและความแรงก่อนให้ยาทุกครั้ง",
      "ห้ามให้ยาโดยวิธี IM เนื่องจากอาจทำให้เกิด hematoma",
      "ผู้ป่วยเด็ก: ไม่แนะนำในผู้ป่วยอายุต่ำกว่า 18 ปี เนื่องจากข้อมูลยังไม่เพียงพอ • ผู้สูงอายุ: ไม่จำเป็นต้องปรับขนาดยา",
      "ข้อควรระวัง: ใช้ร่วมกับ antiplatelets, anticoagulants, NSAIDs, ยาเพิ่ม potassium (K-sparing diuretics); ตับ/ไตบกพร่อง; uncontrolled hypertension; nephrolithiasis และ urethrolithiasis; neuraxial anesthesia / spinal puncture / spinal surgery (เสี่ยง epidural/spinal hematoma)",
      "ข้อห้ามใช้: เกล็ดเลือด < 50,000/mm3, active bleeding หรือเลือดออกง่าย, ประวัติ DIC, แพ้ผลิตภัณฑ์จากหมู แพ้ heparin หรือแพ้ยานี้",
      "ปรับขนาดยาตามน้ำหนักตัว ค่าการทำงานของไต และอาการทางคลินิก",
      LMWH_SWITCH
    ],
    stability: null, compat: null,
    monitoring: [
      { param: "Anti-factor Xa level (กลุ่มเสี่ยง)", timing: "หญิงตั้งครรภ์ที่มี mechanical valve, ไตเสื่อม, อ้วน, เด็ก, ใช้ยานาน, เสี่ยงเลือดออกสูง, หลังผ่าตัด", criticalPoint: "ค่าปกติ LMWH 0.5–1.2 IU/mL" },
      { param: "Heart rate", timing: "ก่อนให้ยา 30 นาที และต่อเนื่องทุก 24 ชั่วโมง", criticalPoint: "< 60 หรือ > 120 bpm" },
      { param: "Blood pressure", timing: "ก่อนให้ยา 30 นาที และต่อเนื่องทุก 24 ชั่วโมง", criticalPoint: "< 90/60 หรือ > 160/100 mmHg" },
      { param: "Platelet count", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "< 100,000/mm3" },
      { param: "Creatinine clearance", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "< 30 mL/min" },
      { param: "Bleeding", timing: "ก่อนให้ยา และต่อเนื่องทุก 3 วัน", criticalPoint: "ภาวะเลือดออก" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: "จากการศึกษา protamine 1.4 mg / 100 anti-factor Xa IU ของ bemiparin ลด anti-Xa activity ได้ประมาณ 2 ชั่วโมง IV over 10 นาที (ไม่ควรให้ IM) max 50 mg",
    management: null, errata: []
  },
  {
    id: "calcium-gluconate", sd: "SD-3.17-05/07", post: 306,
    name: "Calcium Gluconate", nameTh: "แคลเซียมกลูโคเนต",
    category: "electrolyte", categoryLabel: "Concentrated Electrolyte",
    strength: "1 g/10 mL (1 amp) = 90 mg elemental calcium = 4.5 mEq = 2.25 mmol Ca",
    diluent: "D5W, D10W, LRS, NSS (NSS อาจทำให้ calcium ขับออกเร็วขึ้น)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "อัตราเร็วไม่เกิน ≤ 200 mg calcium gluconate/min • แนวทางไม่ระบุขนาดยาตามข้อบ่งใช้",
    formulations: [
      { ratio: "ภาวะฉุกเฉิน (undiluted)", concText: "100 mg/mL", concNumber: null, recipe: "ภาวะฉุกเฉิน เช่น hyperkalemia, hypocalcemia ให้แบบไม่เจือจางได้ แต่ให้ช้าๆ > 5–10 นาที (ห้าม IV push)", totalVolume: "10 mL", route: "iv" },
      { ratio: "ภาวะฉุกเฉิน (diluted)", concText: "10–50 mg/mL", concNumber: null, recipe: "ความเข้มข้นมาตรฐาน: 1 amp ใน D5W 50 mL", totalVolume: null, route: "iv" },
      { ratio: "IV infusion", concText: "< 10 mg/mL", concNumber: null, recipe: "ความเข้มข้นมาตรฐาน: 1 amp ในสารละลายอย่างน้อย 100 mL", totalVolume: "≥ 100 mL", route: "iv" }
    ],
    indications: ["Hyperkalemia, hypocalcemia (ภาวะฉุกเฉิน)"],
    safetyAlerts: [
      "ห้าม IV push — ภาวะฉุกเฉินให้ undiluted ช้าๆ > 5–10 นาที หรือเจือจาง 10–50 mg/mL",
      "อัตราเร็วไม่เกิน ≤ 200 mg/min เพราะให้เร็วเกินไปอาจเกิดอาการชาหรือความดันต่ำ",
      "ไม่ควรผสมกับสารละลายที่มีเกลือ carbonate, bicarbonate, phosphate, sulfate, tartrate เช่น sodium bicarbonate, dipotassium phosphate, magnesium sulphate (ตกตะกอน); การผสม PN ขึ้นกับความเข้มข้นและลำดับการผสม",
      "ให้ขนาดสูงและรวดเร็ว ควรส่งวัด Serum Phosphate เพื่อป้องกัน metastatic calcification",
      "ติดตาม EKG เมื่อให้ slowly IV push (hypercalcemia: ST depression, short QT)",
      "หากผู้ป่วยปวดบริเวณที่ฉีด ให้หยุดยาหรือลดความเร็วการให้ยา"
    ],
    stability: null,
    compat: "เจือจางได้ใน D5W, D10W, LRS, NSS • ห้ามผสมกับ carbonate, bicarbonate, phosphate, sulfate, tartrate",
    monitoring: [
      { param: "Heart rate", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 4 ชม.", criticalPoint: "< 60 หรือ > 100 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 4 ชม.", criticalPoint: "< 90/60 หรือ > 160/90 mmHg" },
      { param: "IV site", timing: "ทุก 4 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" },
      { param: "Serum Calcium", timing: "ตามแพทย์สั่ง", criticalPoint: "> 10.5 mg/dL" },
      { param: "Serum Phosphate", timing: "ตามแพทย์สั่ง", criticalPoint: "> 4.5 mg/dL" }
    ],
    adverseEffects: ["หัวใจเต้นผิดปกติ", "ชัก/กระตุก/กล้ามเนื้ออ่อนแรง", "คลื่นไส้/อาเจียน/ปวดท้อง/ท้องผูก", "ปวดกระดูก"],
    antidote: null, management: null, errata: []
  },
  {
    id: "k2hpo4", sd: "SD-3.17-05/10", post: 306,
    name: "Dipotassium Phosphate (K2HPO4)", nameTh: "ไดโพแทสเซียมฟอสเฟต",
    category: "electrolyte", categoryLabel: "Concentrated Electrolyte",
    strength: "20 mEq/20 mL (K+ 20 mEq/20 mL, HPO4 2− 20 mEq/20 mL)",
    diluent: "NSS หรือ 5%DW (ถ้าไม่มีข้อห้ามควรใช้ NSS เพราะ dextrose ทำให้ hypokalemia)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "อัตราเร็ว (potassium): peripheral < 10 mEq/hr, central < 20 mEq/hr • แนวทางไม่ระบุขนาดยาตามข้อบ่งใช้",
    formulations: [
      { ratio: "Peripheral line", concText: "K+ < 40 mEq/L", concNumber: null, recipe: "อัตราเร็ว < 10 mEq/hr ผ่าน infusion pump (แนวทางไม่ระบุสูตรผสม)", totalVolume: null, route: "peripheral" },
      { ratio: "Central line", concText: "K+ < 200 mEq/L (20 mEq/100 mL)", concNumber: null, recipe: "อัตราเร็ว < 20 mEq/hr ผ่าน infusion pump", totalVolume: null, route: "central" }
    ],
    indications: [],
    safetyAlerts: [
      "ระมัดระวังในโรคไตเรื้อรังระยะ 5 และไตวายเฉียบพลัน หรือปัสสาวะ < 25 mL/hr: ลดขนาดยาและติดตามผลเลือดใกล้ชิด",
      "ควรให้ทางหลอดเลือดดำและใช้ infusion pump เท่านั้น (ห้าม IV push)",
      "ห้ามผสมกับ 10%DS, Ringer's solution หรือ Acetar (ตกตะกอน) • การผสมใน TPN ระวังตะกอน calcium phosphate, magnesium phosphate",
      "การผสม: ตั้งขวดสารละลายฝาอยู่ด้านบน เติมยา แล้วกลับขวดไปมาอย่างน้อย 10 ครั้ง • ห้ามผสมยาลงขวดสารน้ำที่ยังแขวนอยู่",
      "อัตราเร็ว > 10 mEq/hr ควรให้ในหอผู้ป่วยกึ่งวิกฤตหรือวิกฤตที่ติดตาม EKG และระดับ K ใกล้ชิด • > 20 mEq/hr อาจชักกระตุกหรือโปแตสเซียมสูง",
      "ผู้ป่วยไตเรื้อรัง/ไตวายเฉียบพลัน หรือพร่องฟอสเฟตไม่รุนแรง ให้ช้าลง infusion อย่างน้อย 4 ชั่วโมง"
    ],
    stability: null,
    compat: "เจือจางด้วย NSS หรือ 5%DW • ห้ามผสมกับ 10%DS, Ringer's, Acetar",
    monitoring: [
      { param: "Heart rate", timing: "K < 10 mEq/hr: ทุก 4 ชม. • K > 10 mEq/hr: ทุก 1 ชม.", criticalPoint: "< 60 หรือ > 100 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "K < 10 mEq/hr: ทุก 4 ชม. • K > 10 mEq/hr: ทุก 1 ชม.", criticalPoint: "< 90/60 หรือ > 160/90 mmHg" },
      { param: "การอักเสบหลอดเลือดดำ (peripheral line)", timing: "ทุก 4 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" },
      { param: "Serum Potassium", timing: "ตามแพทย์สั่ง", criticalPoint: "< 3.5 หรือ > 5.0 mEq/L" },
      { param: "Serum Phosphate", timing: "ตามแพทย์สั่ง", criticalPoint: "< 2.5 หรือ > 4.5 mEq/L (ตามเอกสาร)" },
      { param: "EKG", timing: "ตามแพทย์สั่ง", criticalPoint: "Peaked T, flattened P, prolonged PR, prolonged QRS, heart block, ventricular arrhythmias (hyperkalemia)" }
    ],
    adverseEffects: ["ชัก/กระตุก", "ตะคริว/กล้ามเนื้ออ่อนแรง", "เหงื่อออก/กระสับกระส่าย"],
    antidote: null, management: null,
    errata: ["Serum Phosphate critical point พิมพ์หน่วยเป็น mEq/L — ค่า 2.5–4.5 ตรงกับช่วงปกติในหน่วย mg/dL (แนวทาง Calcium gluconate ใช้ > 4.5 mg/dL); ยืนยันหน่วยกับห้องปฏิบัติการ"]
  },
  {
    id: "fentanyl", sd: "SD-3.17-05/15", post: 306,
    name: "Fentanyl", nameTh: "เฟนทานิล",
    category: "analgesic", categoryLabel: "Opioid",
    strength: "Inj 50 mcg/mL (2 mL, 10 mL) • Transdermal patch Durogesic® 12.5, 25, 50 mcg/hr — หน่วยเป็น \"ไมโครกรัม\"",
    diluent: "NSS, 5DW",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "mcg/kg/hr", dosingRange: { min: 0.5, usualMax: 10, max: 10 },
    standardDose: "Bolus 0.35–0.5 mcg/kg (max concentration undiluted 50 mcg/mL) • Infusion 0.5–10 mcg/kg/hr (25–500 mcg/hr) titrate 25 mcg/hr ทุก 30 นาที • ให้ได้ IM, IV (slowly 3–5 นาที), SL",
    formulations: [
      { ratio: "5:1", concText: "5 mcg/mL", concNumber: 5, recipe: "Fentanyl 1 amp (500 mcg/10 mL) + NSS/D5W up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "10:1", concText: "10 mcg/mL", concNumber: 10, recipe: "Fentanyl 2 amp (1000 mcg) + NSS/D5W up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "Transdermal patch", concText: "12.5 / 25 / 50 mcg/hr", concNumber: null, calc: false, recipe: "เปลี่ยนทุก 72 ชั่วโมง ห้ามตัดแผ่นยา ติดบริเวณที่ไม่มีขนและกดไว้ประมาณ 30 วินาที เปลี่ยนบริเวณปิด", totalVolume: null, route: "patch" }
    ],
    indications: ["บรรเทาอาการปวดแบบปานกลางถึงรุนแรง"],
    safetyAlerts: [
      "หน่วยเป็น \"ไมโครกรัม\" (mcg)",
      "Transdermal patch: หลีกเลี่ยงความร้อนสูง ระวังในผู้ป่วยไข้สูง ห้ามวางกระเป๋าน้ำร้อน ขวดน้ำร้อน ผ้าห่มไฟฟ้าบริเวณที่ปิดแผ่นยา ไม่อบไอน้ำหรือแช่อ่างน้ำอุ่น (ปลดปล่อยยาเร็วขึ้น)",
      "หากใช้ติดต่อกันนาน ไม่ควรหยุดยาทันที",
      "ห้ามใช้ร่วมกับ MAOIs (เช่น Selegiline) และควรหยุด MAOIs มากกว่า 2 สัปดาห์",
      "Sedative score: 0 = ไม่ง่วงซึม ตื่นสดชื่น; 1 = ง่วงซึมเล็กน้อย ปลุกตื่นง่าย; 2 = ง่วงซึมปานกลาง ง่วงบ่อยหรือตลอดเวลาแต่ปลุกตื่นง่าย; 3 = ง่วงซึมรุนแรง หลับมาก ปลุกตื่นยาก"
    ],
    stability: null,
    compat: "เจือจางด้วย NSS, 5DW",
    monitoring: [
      { param: "Respiratory rate", timing: "ทุก 5 นาที x 5 และหลังจากนั้นทุก 4 ชม.", criticalPoint: "< 12 ครั้ง/นาที" },
      { param: "O2 saturation", timing: "ทุก 5 นาที x 5 และหลังจากนั้นทุก 4 ชม.", criticalPoint: "< 94%" },
      { param: "ความรู้สึกตัว (Sedative score)", timing: "ทุก 5 นาที x 5 และหลังจากนั้นทุก 4 ชม.", criticalPoint: "≥ 2" },
      { param: "ขนาดรูม่านตา", timing: "ทุก 5 นาที x 5 และหลังจากนั้นทุก 4 ชม.", criticalPoint: "< 1 mm" },
      { param: "ความเจ็บปวด (Pain score)", timing: "ยาฉีดทุก 15 นาที / ยากินทุก 30 นาที หลังจากนั้นทุก 2 ชั่วโมง", criticalPoint: "≥ 4" }
    ],
    adverseEffects: ["ปวดศีรษะ", "สับสน", "เกร็งกระตุก (ให้ยาเร็ว/ขนาดสูง)", "เจ็บหน้าอก", "คลื่นไส้/อาเจียน/เบื่ออาหาร", "ท้องผูกติดต่อกัน 3 วัน"],
    antidote: "Naloxone 0.2 mg (IV, IM, SC) ซ้ำทุก 2–3 นาที จำนวน 2 ครั้ง หลังจากนั้นปรึกษาวิสัญญี",
    management: null, errata: []
  },
  {
    id: "amphotericin-b", sd: "SD-3.17-05/04", post: 306,
    name: "Amphotericin B", nameTh: "แอมโฟเทอริซิน บี",
    category: "analgesic", categoryLabel: "Antifungal",
    strength: "50 mg/vial",
    diluent: "5%DW เท่านั้น (ห้ามผสม NSS เพราะตกตะกอน)",
    d5wOnly: true, lightProtected: true,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "IV infusion ความเข้มข้นสุดท้ายไม่เกิน 0.1 mg/mL บริหารอย่างช้าๆ 4–6 ชม. • แนวทางไม่ระบุขนาดยา (mg/kg)",
    formulations: [
      { ratio: "IV infusion", concText: "≤ 0.1 mg/mL", concNumber: null, recipe: "ผสมใน 5%DW เท่านั้น ให้ช้าๆ 4–6 ชม. (แนวทางไม่ระบุปริมาตร)", totalVolume: null, route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ผสมใน 5%DW เท่านั้น (ห้ามผสม NSS เพราะตกตะกอน) ความเข้มข้นสุดท้ายไม่เกิน 0.1 mg/mL ให้ช้าๆ 4–6 ชม.",
      "แนะนำ Paracetamol และ Chlorpheniramine ก่อนให้ยา 30 นาที ป้องกันไข้และหนาวสั่น หากอาการรุนแรงอาจพิจารณา Hydrocortisone injection ร่วมด้วย",
      "ผู้ป่วยที่ไม่จำกัดน้ำ แนะนำ NSS 500–1,000 mL IV 4 ชม. ก่อนให้ยา เพื่อลดอาการไม่พึงประสงค์ต่อไต",
      "กรณี Sepsis/Septic shock ควรบริหารยา dose แรกภายใน 2 ชม.",
      "หากให้ Potassium supplement รักษาโปแตสเซียมต่ำจากยา เมื่อสั่งหยุด Amphotericin B ควรพิจารณาหยุด supplement"
    ],
    stability: "เก็บยาที่ 2–8 °C • หลังผสมเก็บให้พ้นแสง (24 ชม. ที่อุณหภูมิห้อง และ 1 สัปดาห์ในตู้เย็น) • สารละลายที่เจือจางแล้วควรใช้ทันที",
    compat: "5%DW เท่านั้น • ห้ามผสม NSS",
    monitoring: [
      { param: "Body temperature", timing: "ทุก 4 ชั่วโมง", criticalPoint: "> 37.8 °C" },
      { param: "Heart rate", timing: "ทุก 4 ชั่วโมง", criticalPoint: "< 60 หรือ > 100 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 4 ชั่วโมง", criticalPoint: "< 90/60 หรือ > 140/90 mmHg" },
      { param: "IV site", timing: "ทุก 8 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" },
      { param: "Serum Potassium", timing: "ตามแพทย์สั่ง", criticalPoint: "< 3.5 หรือ > 5.0 mEq/L" },
      { param: "Serum magnesium", timing: "ตามแพทย์สั่ง", criticalPoint: "< 1.6 หรือ > 2.6 mEq/L" },
      { param: "Serum Cr", timing: "ตามแพทย์สั่ง", criticalPoint: "> 1.3 mg/dL" },
      { param: "Urine output", timing: "ตามแพทย์สั่ง", criticalPoint: "< 25 cc/hr" }
    ],
    adverseEffects: ["ไข้/หนาวสั่น", "หายใจลำบาก", "คลื่นไส้/อาเจียน", "เกร็ง", "ปวดศีรษะ/มึนงง", "อ่อนเพลีย", "หัวใจเต้นผิดปกติ", "ปัสสาวะลดลง", "กล้ามเนื้ออ่อนแรง"],
    antidote: null, management: null, errata: []
  },
  {
    id: "warfarin", sd: "SD-3.17-05/30", post: 307,
    name: "Warfarin", nameTh: "วาร์ฟาริน",
    category: "antithrombotic", categoryLabel: "Oral anticoagulant (VKA)",
    strength: "1 mg (ขาว), 2 mg (ส้ม), 3 mg (ฟ้าเข้ม), 4 mg (เหลือง), 5 mg (ชมพู)",
    diluent: "ยารับประทาน",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "เริ่มต้น: ผู้ป่วยอายุ > 60 ปี หรือเสี่ยงเลือดออกสูง เริ่ม 2.5–3 mg/day • Day 3: INR < 1.5 ↑ 0–25%/wk; 1.5–1.9 no change; 2.0–2.5 ↓ 25–50%/wk; > 2.5 ↓ 50%/wk หรือ hold next dose • Day 5: < 1.5 ↑ 25%/wk; 1.5–1.9 ↑ 0–25%/wk; 2.0–3.0 no change หรือ ↓ 10–25%/wk; > 3.0 ↓ 25–50%/wk",
    formulations: [
      { ratio: "Tablet", concText: "1, 2, 3, 4, 5 mg", concNumber: null, recipe: "ยารับประทาน — ตรวจสอบความแรง (สีเม็ดยา) ก่อนให้ยาทุกครั้ง", totalVolume: null, route: "oral" }
    ],
    indications: [],
    safetyAlerts: [
      "ควรตรวจสอบความแรงก่อนให้ยาทุกครั้ง",
      "ห้ามใช้ระหว่างตั้งครรภ์ โดยเฉพาะไตรมาสแรก (ผ่านรก; ควรใช้ heparin หรือ LMWH) แต่อาจใช้ในไตรมาสที่ 2 และ 3 อย่างระมัดระวังเมื่อจำเป็น โดยปรึกษาแพทย์เฉพาะทาง",
      "งดเว้นการให้ยาทาง IM ขณะได้รับยานี้",
      "ยาที่ลดฤทธิ์ warfarin (เพิ่มโอกาส clotting): griseofulvin, ribavirin, rifampin, barbiturate, carbamazepine",
      "ยาที่ลดการดูดซึม (ให้ห่างกัน 2 ชั่วโมง): ยาลดกรด, sucralfate, cholestyramine",
      "ยาที่เพิ่มฤทธิ์ warfarin (เพิ่มโอกาส bleeding): paracetamol, omeprazole, cimetidine, diltiazem, propranolol, amiodarone, gemfibrozil, ketoconazole, fluconazole, itraconazole, clarithromycin, erythromycin, metronidazole, sulperazone, cotrimoxazole, NSAIDs (diclofenac, ibuprofen, piroxicam, naproxen), quinolones (ciprofloxacin, levofloxacin, ofloxacin, moxifloxacin, norfloxacin), aspirin, phenytoin, ritonavir, capecitabine, fluorouracil, propylthiouracil, levothyroxine, methimazole, oseltamivir",
      "Warfarin over dose ต้องหาสาเหตุเสมอ"
    ],
    stability: null, compat: null,
    monitoring: [
      { param: "INR (เป้าหมาย 2–3 หรือ 2.5–3.5)", timing: "ทุกครั้งที่ปรับขนาดยาหรือสั่งยาที่มีอันตรกิริยา: เริ่มหลังใช้ยา 3 วัน จากนั้นทุก 1 สัปดาห์ ต่อไปทุก 1 เดือน", criticalPoint: "> 3.5" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: null,
    management: "Steady state (Target INR 2.0–3.0): < 1.5 ↑ 10–20%/wk ให้ extra dose (INR ซ้ำ 4–8 วัน); 1.5–1.9 ↑ 5–10%/wk (7–14 วัน); 3.1–3.9 ↓ 5–10%/wk (7–14 วัน); 4.0–4.9 หยุดยา 0–1 วัน และ ↓ 10%/wk (4–8 วัน); 5.0–6.0 หยุดยา 1–2 วัน และ ↓ 5–15%/wk (1–5 วัน) • ถ้า INR 1.8–1.9 หรือ 3.1–3.2 พิจารณา no change แล้วตรวจซ้ำใน 7–14 วัน<br>Steady state (Target INR 2.5–3.5): < 1.5 ↑ 10–20%/wk ให้ extra dose (4–8 วัน); 1.5–2.4 ↑ 5–10%/wk (7–14 วัน); 3.6–4.5 หยุดยา 1 dose ↓ 5–10%/wk (7–14 วัน); 4.5–6.0 หยุดยา 1–2 วัน และ ↓ 5–15%/wk (1–5 วัน) • ถ้า INR 2.3–2.4 หรือ 3.6–3.7 พิจารณา no change แล้วตรวจซ้ำใน 7–14 วัน<br>Over dose — ไม่มีเลือดออกหรือเลือดออกไม่รุนแรง: INR < 4.5 หยุดยาจน INR อยู่ในช่วงเป้าหมาย แล้วเริ่มยาลดลง 10%; INR 4.5–10 หยุดยา ติดตาม INR ทุก 24–48 ชม. เริ่มยาลดลง 15–25% หากเสี่ยงเลือดออกให้วิตามินเครับประทาน 1–2.5 mg; INR > 10 หยุดยา ให้วิตามินเครับประทาน 5 mg หรือ 1–3 mg slow IV ใน 3 นาที วัด INR ภายใน 24 ชม. อาจให้ซ้ำ แล้วเริ่มยาด้วยขนาดต่ำกว่าเดิม<br>เลือดออกรุนแรง (INR ทุกค่า): วิตามินเค 5–10 mg slow IV ใน 10 นาที และให้ Fresh frozen plasma หรือ Prothrombin complex ติดตาม INR หลังให้เลือด 30 นาที ภายใน 12 ชม. อาจให้วิตามินเคซ้ำจน INR ปกติหรืออยู่ในเป้าหมาย",
    errata: []
  },
  {
    id: "apixaban", sd: "SD-3.17-05/05", post: 306,
    name: "Apixaban", nameTh: "อะพิซาแบน",
    category: "antithrombotic", categoryLabel: "DOAC (Factor Xa inhibitor)",
    strength: "5 mg",
    diluent: "ยารับประทาน",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "NVAF: 5 mg BID (2.5 mg BID เมื่อมีอย่างน้อย 2 ใน 3: อายุ ≥ 80 ปี, น้ำหนัก ≤ 60 kg, SCr ≥ 1.5 mg/dL) • DVT/PE: 10 mg BID x 7 วัน แล้ว 5 mg BID • DVT prophylaxis หลัง total knee replacement: 2.5 mg BID เริ่ม 12–24 hr หลังผ่าตัด x 12 วัน; total hip replacement x 35 วัน • DVT/PE prophylaxis: 2.5 mg BID หรือ 2.5/5 mg BID • VTE prophylaxis in cancer: 2.5 mg BID • HIT: 10 mg BID x 7 วัน แล้ว 5 mg BID • Renal (ข้อบ่งใช้ VTE/prophylaxis/HIT): CrCl < 30 mL/min avoid use • Hepatic: Child-Pugh B use with caution, C avoid use",
    formulations: [
      { ratio: "Tablet", concText: "5 mg", concNumber: null, recipe: "ยารับประทาน — ตรวจสอบชื่อยาก่อนให้ยาทุกครั้ง", totalVolume: null, route: "oral" }
    ],
    indications: ["Non-valvular atrial fibrillation", "DVT and PE (treatment)", "DVT prophylaxis หลัง total knee / hip replacement", "DVT/PE prophylaxis", "VTE prophylaxis in cancer", "Heparin-induced thrombocytopenia"],
    safetyAlerts: [
      "ตรวจสอบชื่อยาก่อนให้ยาทุกครั้ง",
      DOAC_PREG,
      "ยาที่ลดฤทธิ์: carbamazepine, phenobarbital, phenytoin, rifampicin (P-gp/CYP3A4 inducers, ลดฤทธิ์ 54%)",
      "ยาที่เพิ่มฤทธิ์: naproxen (เพิ่ม 55%), protease inhibitors เช่น ritonavir (avoid use), itraconazole/fluconazole/posaconazole/voriconazole (เพิ่ม 100%), diltiazem (เพิ่มถึง 40%)",
      DOAC_CAUTION, DOAC_CONTRA,
      "Time to start anticoagulant (จาก Apixaban): Dabigatran, Edoxaban, Rivaroxaban, Heparin, LMWH/SC next dose • Warfarin next dose + bridging"
    ],
    stability: null, compat: null,
    monitoring: [
      DOAC_CBC,
      { param: "aPTT, Prothrombin time", timing: "กรณีต้องการดู coagulation effect", criticalPoint: "แนวทางไม่ระบุค่า" },
      { param: "Plasma apixaban concentration", timing: "ก่อน cardiac surgery ที่ไม่ทราบเวลารับยาครั้งสุดท้าย, organ dysfunction, กรณีฉุกเฉิน", criticalPoint: "2.5 mg BID: peak 30–153, trough 11–90 ng/mL • 5 mg BID: peak 59–302, trough 22–177 ng/mL" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: XA_ANTIDOTE,
    management: null, errata: []
  },
  {
    id: "dabigatran", sd: "SD-3.17-05/08", post: 306,
    name: "Dabigatran", nameTh: "ดาบิกาแทรน",
    category: "antithrombotic", categoryLabel: "DOAC (Direct thrombin inhibitor)",
    strength: "110 mg, 150 mg",
    diluent: "ยารับประทาน (capsule)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "NVAF: 150 mg BID (CrCl 15–30: 75 mg BID; < 15: avoid) • DVT/PE: 150 mg BID (CrCl < 30: avoid) • DVT prophylaxis หลัง knee arthroplasty: 150 mg หรือ 220 mg OD x 10–14 วัน หรือถึง 35 วัน • DVT/PE prophylaxis หลัง total hip replacement: 110 mg 1–4 hr หลังผ่าตัด แล้ว 220 mg OD x 28–35 วัน • prophylaxis: CrCl 30–50 150 mg OD; < 30 avoid • HIT: 150 mg BID • Hepatic: Child-Pugh B use with caution, C avoid use",
    formulations: [
      { ratio: "Capsule", concText: "110 mg, 150 mg", concNumber: null, recipe: "ห้ามแกะแคปซูลยา — ผู้ป่วยกลืนลำบาก ควรเปลี่ยนเป็น warfarin, rivaroxaban, apixaban หรือ edoxaban", totalVolume: null, route: "oral" }
    ],
    indications: ["Non-valvular atrial fibrillation", "DVT and PE (treatment)", "DVT prophylaxis หลัง knee arthroplasty", "DVT/PE prophylaxis หลัง total hip replacement", "Heparin-induced thrombocytopenia"],
    safetyAlerts: [
      "ตรวจสอบชื่อยาและความแรงก่อนให้ยาทุกครั้ง",
      DOAC_PREG,
      "ผู้ป่วยกลืนลำบากห้ามแกะแคปซูลยา ควรเปลี่ยนเป็นยาต้านการแข็งตัวของเลือดชนิดอื่น",
      "ยาที่ลดฤทธิ์: carbamazepine, phenobarbital, phenytoin, rifampicin (ลดฤทธิ์ 66%)",
      "ยาที่เพิ่มฤทธิ์: cyclosporin/tacrolimus (avoid use), amiodarone (12–60%), protease inhibitors เช่น ritonavir, itraconazole/fluconazole/posaconazole/voriconazole (140–150%), verapamil (12–180%), clarithromycin/erythromycin (15–20%)",
      DOAC_CAUTION, DOAC_CONTRA,
      "Time to start anticoagulant (จาก Dabigatran): Apixaban, Edoxaban next dose • Rivaroxaban ≤ 2 hr ก่อน next dose • Heparin, LMWH: CrCl ≥ 30 next 12 hr, CrCl < 30 next 24 hr • Warfarin: CrCl ≥ 50 −3 วัน, 30–49 −2 วัน, 15–29 −1 วัน"
    ],
    stability: null, compat: null,
    monitoring: [
      DOAC_CBC,
      { param: "aPTT, Prothrombin time, Thrombin time", timing: "กรณีต้องการดู coagulation effect", criticalPoint: "แนวทางไม่ระบุค่า" },
      { param: "Plasma dabigatran concentration", timing: "ก่อน cardiac surgery ที่ไม่ทราบเวลารับยาครั้งสุดท้าย, organ dysfunction, กรณีฉุกเฉิน", criticalPoint: "peak 64–443, trough 31–225 ng/mL" },
      { param: "Scr (ผู้ป่วยที่ต้องผ่าตัด)", timing: "ทุกวันก่อนผ่าตัด", criticalPoint: "แนวทางไม่ระบุค่า" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: "Idarucizumab 5 g (1 กล่อง): 2.5 g (50 mL) IV bolus ภายใน 5–10 นาที 2 ครั้ง ห่างกัน 15 นาที หรือ IV infusion (flush ด้วย 0.9% NSS) ไม่ให้คู่กับ IV หรือสารละลายอื่น ไม่ต้องปรับขนาดตามตับและไต • กรณีไม่มี Idarucizumab: " + PCC_TEXT,
    management: null, errata: []
  },
  {
    id: "edoxaban", sd: "SD-3.17-05/13", post: 306,
    name: "Edoxaban", nameTh: "อีด็อกซาแบน",
    category: "antithrombotic", categoryLabel: "DOAC (Factor Xa inhibitor)",
    strength: "30 mg, 60 mg",
    diluent: "ยารับประทาน",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "NVAF: BW > 60 kg 60 mg OD; BW ≤ 60 kg 30 mg OD; ใช้ร่วมกับ P-gp inhibitors 30 mg OD • CrCl 15–50: 30 mg OD; < 15: avoid • DVT/PE และ VTE in cancer: BW > 60 kg 60 mg OD; ≤ 60 kg 30 mg OD; P-gp inhibitors 30 mg OD • CrCl 30–50: 30 mg OD; < 30: avoid • Hepatic: Child-Pugh B use with caution, C avoid use",
    formulations: [
      { ratio: "Tablet", concText: "30 mg, 60 mg", concNumber: null, recipe: "ยารับประทาน — ตรวจสอบชื่อยาและความแรงก่อนให้ยาทุกครั้ง", totalVolume: null, route: "oral" }
    ],
    indications: ["Non-valvular atrial fibrillation", "DVT and PE", "Venous thromboembolism in cancer"],
    safetyAlerts: [
      "ตรวจสอบชื่อยาและความแรงก่อนให้ยาทุกครั้ง",
      DOAC_PREG,
      "ยาที่ลดฤทธิ์: carbamazepine, phenobarbital, phenytoin, rifampicin (ลดฤทธิ์ 35%)",
      "ยาที่เพิ่มฤทธิ์: cyclosporin/tacrolimus (73%), amiodarone (40%), protease inhibitors เช่น ritonavir (avoid use), itraconazole/fluconazole/posaconazole/voriconazole (87–95% แนะนำลดขนาด edoxaban 50%), verapamil (53%), clarithromycin/erythromycin (90% แนะนำลดขนาด edoxaban 50%)",
      DOAC_CAUTION, DOAC_CONTRA,
      "Time to start anticoagulant (จาก Edoxaban): Dabigatran, Apixaban, Rivaroxaban, Heparin, LMWH/SC next dose • Warfarin next dose + bridging"
    ],
    stability: null, compat: null,
    monitoring: [
      DOAC_CBC,
      { param: "aPTT, Prothrombin time", timing: "กรณีต้องการดู coagulation effect", criticalPoint: "แนวทางไม่ระบุค่า" },
      { param: "Plasma edoxaban concentration", timing: "ก่อน cardiac surgery ที่ไม่ทราบเวลารับยาครั้งสุดท้าย, organ dysfunction, กรณีฉุกเฉิน", criticalPoint: "peak 49.5–288, trough 5.47–46.4 ng/mL" }
    ],
    adverseEffects: DOAC_ADR,
    antidote: XA_ANTIDOTE,
    management: null, errata: []
  }
];
