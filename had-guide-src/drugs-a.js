// HAD drug data, part A (vasoactive, antiarrhythmic, rt-PA, digoxin).
// Every value is transcribed from the KKU Srinagarind HAD 2026 sheet named in `sd`
// (PDFs in ../kku_pdfs, checked 2026-10-27). Anything a sheet does not state is null / [] and shows as N/A.
// `errata` lists values in the sheet itself that look like typing errors; they are shown, never "fixed" silently.

const HAD_DRUGS_A = [
  {
    id: "adrenaline", sd: "SD-3.17-05/01", post: 306,
    name: "Adrenaline (Epinephrine)", nameTh: "อะดรีนาลีน",
    category: "vasoactive", categoryLabel: "Vasopressor / Inotrope",
    strength: "1 mg/mL หรือ 1:1,000 (1 g/1,000 mL)",
    diluent: "D5W หรือ NSS",
    d5wOnly: false, lightProtected: true,
    calc: true, doseUnit: "mcg/min", dosingRange: { min: 2, usualMax: 50, max: null },
    standardDose: "IV infusion (infusion pump): 0.01–2 mcg/kg/min สำหรับ refractory shock • ตารางอัตราหยด 2–50 mcg/min (1–30 mL/hr) ที่ 100 mcg/mL",
    formulations: [
      { ratio: "1:10,000 (infusion)", concText: "100 mcg/mL", concNumber: 100, recipe: "Adrenaline 10 mg (10 amp) ใน D5W หรือ NSS 90 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "1:10,000 (IV bolus)", concText: "100 mcg/mL", concNumber: 100, calc: false, recipe: "Adrenaline 1 amp เจือจางด้วย D5W หรือ NSS 9 mL — IV push ใช้ในกรณี cardiac arrest ตาม algorithm หรือ Anaphylaxis Grade II–III", totalVolume: "10 mL", route: "iv" },
      { ratio: "1:1,000 (IM, SC)", concText: "1 mg/mL", concNumber: 1000, calc: false, recipe: "IM, SC ให้ Adrenaline 1 amp ความเข้มข้น 1 mg/mL (1:1,000) เท่านั้น ไม่ต้องเจือจาง", totalVolume: "1 mL", route: "imsc" }
    ],
    indications: ["Cardiac arrest (IV push ตาม algorithm)", "Anaphylaxis Grade II–III (IV push)", "Refractory shock (IV infusion)"],
    safetyAlerts: [
      "ห้ามใช้ในผู้ป่วยที่มีความดันโลหิตสูง",
      "ระมัดระวังการใช้ในผู้ป่วยที่มีโรคหัวใจเต้นผิดจังหวะ ผู้ป่วยที่มีปัญหาหลอดเลือดส่วนปลาย",
      "หลีกเลี่ยงการให้ IM บริเวณสะโพก เนื่องจากอาจทำให้หลอดเลือดตีบจนกล้ามเนื้อตาย",
      "IV infusion ควรใช้ infusion pump (การให้ยาเร็วอาจเกิดเลือดออกในสมอง หรือหัวใจเต้นเร็ว)"
    ],
    stability: "เมื่อผสมในสารละลายใดๆ คงตัวได้ 24 ชั่วโมง ทั้งที่อุณหภูมิห้องหรือในตู้เย็น และควรเก็บให้พ้นแสง",
    compat: "ผสมร่วมได้: doPAmine, doBUtamine • ห้ามผสมร่วม: aminophylline, sodium bicarbonate, alkali solution (สารละลายด่าง)",
    monitoring: [
      { param: "Heart rate", timing: "Anaphylaxis: ทุก 5–10 นาที จนครบ 30 นาที • Hypotension ที่ให้ IV drip: ทุก 1 ชั่วโมง ตลอดระยะเวลาที่ให้ยา", criticalPoint: "< 70 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "เช่นเดียวกับ Heart rate", criticalPoint: "< 90/60 หรือ > 140/90 mmHg" },
      { param: "IV site (การอักเสบตำแหน่งให้ยา)", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" }
    ],
    adverseEffects: ["ผิวซีดเย็นหรือเขียว", "Cardiac arrhythmia", "ปวดศีรษะ", "แน่นหน้าอก หายใจหอบเหนื่อย", "ปลายมือ ปลายเท้าเขียว"],
    antidote: null, management: null, errata: []
  },
  {
    id: "norepinephrine", sd: "SD-3.17-05/23", post: 307,
    name: "Norepinephrine", nameTh: "นอร์เอพิเนฟริน",
    category: "vasoactive", categoryLabel: "Vasopressor",
    strength: "4 mg/4 mL",
    diluent: "5DW หรือ 5DS (ห้ามผสมใน NSS)",
    d5wOnly: true, lightProtected: true,
    calc: true, doseUnit: "mcg/kg/min", dosingRange: { min: 0.08, usualMax: 1, max: 2 },
    standardDose: "ตารางอัตราหยด 0.08–1 mcg/kg/min • ขนาดยาสูงสุดโดยปกติไม่เกิน 2 mcg/kg/min ในกรณี refractory shock • ตารางปรับขนาด 2–90 mcg/min (Low 2–14, Moderate 16–30, High 32–90 mcg/min)",
    formulations: [
      { ratio: "Peripheral standard", concText: "16 mcg/mL (4 mg/250 mL)", concNumber: 16, recipe: "Norepinephrine 4 mg (1 vial) up to D5W หรือ 5DS 250 mL", totalVolume: "250 mL", route: "both", routeNote: "Peripheral (≤ 16 mcg/mL) / Central" },
      { ratio: "Central (concentrated)", concText: "64 mcg/mL (8 mg/125 mL)", concNumber: 64, recipe: "Norepinephrine 8 mg (2 vial) up to D5W หรือ 5DS 125 mL", totalVolume: "125 mL", route: "central" }
    ],
    indications: ["Refractory shock (ขนาดยาสูงสุด 2 mcg/kg/min)"],
    safetyAlerts: [
      "ความเข้มข้นมาตรฐานทาง peripheral line ≤ 16 mcg/mL (4 mg/250 mL) หากต้องการเข้มข้นกว่านี้ให้ทาง central venous line ได้ถึง 64 mcg/mL (8 mg/125 mL)",
      "ควรให้ยาในเส้นเลือดดำขนาดใหญ่: peripheral line แนะนำหลอดเลือดดำเหนือข้อพับ หรือ central line และระวังการเกิด extravasation",
      "ห้ามผสมหรือให้ร่วมกับสารละลายที่มีฤทธิ์เป็นด่าง เช่น sodium bicarbonate, whole blood ผ่านสายยางที่ให้ยานี้",
      "การใช้ยาขนาดสูง (> 0.2 mcg/kg/min) แนะนำให้ NPO และให้ยากลุ่ม PPIs และติดตามอาการ bowel ischemia",
      "หากผู้ป่วยอาการยังไม่คงที่ แพทย์ต้องร่วมประเมินผู้ป่วยอย่างใกล้ชิด"
    ],
    stability: "ควรเก็บยาให้พ้นแสง หากยามีสีชมพู น้ำตาล หรือเหลือง ไม่ควรใช้ยา",
    compat: "ห้ามผสมใน NSS • ห้ามผสม/ให้ร่วมกับสารละลายด่าง (sodium bicarbonate) และ whole blood",
    monitoring: [
      { param: "Heart rate", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 4 ชม.", criticalPoint: "< 60 หรือ > 100 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 4 ชม.", criticalPoint: "< 90/60 หรือ > 140/90 mmHg" },
      { param: "IV site", timing: "ทุก 4 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" }
    ],
    adverseEffects: ["ผิวซีดเย็นหรือเขียว", "การอักเสบที่ IV site", "ปวดศีรษะ/เหงื่อออก", "คลื่นไส้ อาเจียน/ปวดท้อง ถ่ายเป็นเลือด", "แน่นหน้าอก/หายใจหอบเหนื่อย", "ปลายมือ ปลายเท้าเขียว"],
    antidote: null, management: null, errata: []
  },
  {
    id: "dopamine", sd: "SD-3.17-05/12", post: 306,
    name: "Dopamine", nameTh: "โดพามีน",
    category: "vasoactive", categoryLabel: "Vasopressor / Inotrope",
    strength: "250 mg/10 mL (1 amp)",
    diluent: "D5W หรือ NSS",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "mcg/kg/min", dosingRange: { min: 3, usualMax: 20, max: 20 },
    standardDose: "IV infusion ผ่าน infusion pump อัตราเร็วสูงสุด 20 mcg/kg/min (ตารางอัตราหยด 3–20 mcg/kg/min, น้ำหนัก 35–90 kg)",
    formulations: [
      { ratio: "1 mg/mL แบบที่ 1", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 100 mg (4 mL) up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "1 mg/mL แบบที่ 2", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 250 mg (10 mL = 1 amp) up to 250 mL", totalVolume: "250 mL", route: "iv" },
      { ratio: "1 mg/mL แบบที่ 3", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 500 mg (20 mL = 2 amp) up to 500 mL", totalVolume: "500 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 1", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 200 mg (8 mL) up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 2", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 500 mg (20 mL = 2 amp) up to 250 mL", totalVolume: "250 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 3", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 1000 mg (40 mL = 4 amp) up to 500 mL", totalVolume: "500 mL", route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ควรให้ IV infusion ผ่าน infusion pump อัตราเร็วสูงสุด 20 mcg/kg/min",
      "การเพิ่ม/ลดขนาดยาควรปรับอย่างช้าๆ เพราะอาจมีผลต่อความดันโลหิตอย่างทันทีทันใด",
      "ห้ามผสมกับสารละลายด่าง เช่น Sodium bicarbonate"
    ],
    stability: "ยาผสมแล้วใช้ภายใน 24 ชม. ถ้าเกิดสีเหลืองอ่อนๆ เป็นสีเข้มขึ้น หรือชมพู ไม่ควรใช้ยา",
    compat: "ห้ามผสมกับสารละลายด่าง (Sodium bicarbonate)",
    monitoring: [
      { param: "Heart rate", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 70 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 90/60 หรือ > 140/90 mmHg" },
      { param: "Urine output", timing: "ตามแพทย์สั่ง", criticalPoint: "< 25 cc/hr" },
      { param: "IV site", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" }
    ],
    adverseEffects: ["Cardiac arrhythmia", "คลื่นไส้ อาเจียน", "หายใจลำบาก/เหนื่อยหอบ", "ปลายมือ ปลายเท้าเขียว"],
    antidote: null, management: null,
    errata: ["ตาราง 1 mg/mL: ช่อง 20 mcg/kg/min น้ำหนัก 80 kg พิมพ์ว่า 48 mL/hr — คำนวณได้ 96 mL/hr (ช่องข้างเคียง 90 และ 102)"]
  },
  {
    id: "dobutamine", sd: "SD-3.17-05/11", post: 306,
    name: "Dobutamine", nameTh: "โดบูทามีน",
    category: "vasoactive", categoryLabel: "Inotrope",
    strength: "250 mg/20 mL (1 vial)",
    diluent: "D5W หรือ NSS",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "mcg/kg/min", dosingRange: { min: 3, usualMax: 20, max: 40 },
    standardDose: "IV infusion ผ่าน infusion pump เท่านั้น ขนาดยาสูงสุด ≤ 40 mcg/kg/min, ความเข้มข้นสูงสุด ≤ 5 mg/mL (ตารางอัตราหยด 3–20 mcg/kg/min)",
    formulations: [
      { ratio: "1 mg/mL แบบที่ 1", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 100 mg (8 mL) up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "1 mg/mL แบบที่ 2", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 250 mg (20 mL = 1 vial) up to 250 mL", totalVolume: "250 mL", route: "iv" },
      { ratio: "1 mg/mL แบบที่ 3", concText: "1 mg/mL", concNumber: 1000, recipe: "ยา 500 mg (40 mL = 2 vial) up to 500 mL", totalVolume: "500 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 1", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 200 mg (16 mL) up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 2", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 500 mg (40 mL = 2 vial) up to 250 mL", totalVolume: "250 mL", route: "iv" },
      { ratio: "2 mg/mL แบบที่ 3", concText: "2 mg/mL", concNumber: 2000, recipe: "ยา 1000 mg (80 mL = 4 vial) up to 500 mL", totalVolume: "500 mL", route: "iv" },
      { ratio: "4 mg/mL แบบที่ 1", concText: "4 mg/mL", concNumber: 4000, recipe: "ยา 400 mg (32 mL) up to 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "4 mg/mL แบบที่ 2", concText: "4 mg/mL", concNumber: 4000, recipe: "ยา 1000 mg (80 mL = 4 vial) up to 250 mL", totalVolume: "250 mL", route: "iv" },
      { ratio: "4 mg/mL แบบที่ 3", concText: "4 mg/mL", concNumber: 4000, recipe: "ยา 2000 mg (160 mL = 8 vial) up to 500 mL", totalVolume: "500 mL", route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ควรให้ IV infusion ผ่าน infusion pump เท่านั้น ขนาดยาสูงสุด ≤ 40 mcg/kg/min และความเข้มข้นสูงสุด ≤ 5 mg/mL",
      "การเพิ่ม/ลดขนาดยาควรปรับอย่างช้าๆ เพราะอาจมีผลต่อความดันโลหิตอย่างทันทีทันใด",
      "ห้ามผสมกับสารละลายด่าง ได้แก่ Sodium bicarbonate"
    ],
    stability: "ยาผสมแล้วใช้ภายใน 24 ชม. สารละลายอาจเกิดสีชมพูซึ่งเข้มขึ้นเรื่อยๆ เมื่อเวลาผ่านไป แต่ไม่มีผลต่อความแรงของยา หากเป็นสีน้ำตาลเข้มไม่ควรใช้ยา",
    compat: "ห้ามผสมกับสารละลายด่าง (Sodium bicarbonate)",
    monitoring: [
      { param: "Heart rate", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 70 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 15 นาที x 4 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 90/60 หรือ > 140/90 mmHg" },
      { param: "Urine output", timing: "ตามแพทย์สั่ง", criticalPoint: "< 25 cc/hr" },
      { param: "IV site", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" }
    ],
    adverseEffects: ["Cardiac arrhythmia", "คลื่นไส้ อาเจียน", "หายใจลำบาก/เหนื่อยหอบ", "ปลายมือ ปลายเท้าเขียว"],
    antidote: null, management: null,
    errata: ["ตาราง 1 mg/mL: ช่อง 20 mcg/kg/min น้ำหนัก 80 kg พิมพ์ว่า 48 mL/hr — คำนวณได้ 96 mL/hr (ช่องข้างเคียง 90 และ 102)"]
  },
  {
    id: "nicardipine", sd: "SD-3.17-05/21", post: 307,
    name: "Nicardipine", nameTh: "นิคาร์ดิพีน",
    category: "vasoactive", categoryLabel: "Vasodilator (IV)",
    strength: "Injection 2 mg/2 mL, 10 mg/10 mL",
    diluent: "NSS, D5W, D5S, D5S/2 (ตารางผสม: D5W, D5NSS, D5-1/2S, NSS, NSS/2) • ห้ามผสมใน Lactate ringer, NaHCO3",
    d5wOnly: false, lightProtected: true,
    calc: true, doseUnit: "mg/hr", dosingRange: { min: 1, usualMax: 15, max: 15 },
    standardDose: "IV infusion (pump): Start 2–5 mg/hr ค่อยๆ เพิ่ม 2.5 mg/hr ทุก 15 นาที, Max 15 mg/hr • เมื่อถึงเป้าหมาย (BP) ลดขนาดยาเป็น 3 mg/hr • IV bolus: 2 mg + SWI/NSS 2 mL (dose 10–30 mcg/kg) ฉีด IV 1–2 mL นาน 1–2 นาที ซ้ำได้ทุก 15 นาที",
    formulations: [
      { ratio: "0.1 mg/mL (1:10)", concText: "0.1 mg/mL (10 mg/100 mL)", concNumber: 100, recipe: "สารน้ำ 100 mL ดูดออก 10 mL แล้วเติม Nicardipine 1 amp (10 mg) พลิกไปมาให้เข้ากัน", totalVolume: "100 mL", route: "peripheral" },
      { ratio: "0.2 mg/mL (1:5)", concText: "0.2 mg/mL (20 mg/100 mL)", concNumber: 200, recipe: "สารน้ำ 100 mL ดูดออก 20 mL แล้วเติม Nicardipine 2 amp (20 mg) พลิกไปมาให้เข้ากัน", totalVolume: "100 mL", route: "iv" },
      { ratio: "0.5 mg/mL (fluid restricted)", concText: "0.5 mg/mL", concNumber: 500, recipe: "แนวทางระบุความเข้มข้นสำหรับ central line (fluid restricted) แต่ไม่ระบุวิธีผสม", totalVolume: null, route: "central" },
      { ratio: "IV bolus", concText: "0.5 mg/mL (2 mg/4 mL)", concNumber: 500, calc: false, recipe: "2 mg (2 mL) + SWI หรือ NSS 2 mL → ฉีด IV 1–2 mL นาน 1–2 นาที ซ้ำได้ทุก 15 นาที", totalVolume: "4 mL", route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ห้ามให้ในผู้ป่วย Advance aortic stenosis และผู้ที่ไวต่อตัวยานี้",
      "Nicardipine 0.1 mg/mL สำหรับ peripheral line; 0.5 mg/mL สำหรับ central line (fluid restricted)",
      "ให้ยาตำแหน่งเส้นเลือดดำที่แขน หรือเส้นเลือดดำใหญ่; ระวัง phlebitis, extravasation — เส้นเลือดดำที่แขนควรเปลี่ยนตำแหน่งเมื่อครบ 12 ชั่วโมง, เส้นเลือดดำใหญ่เปลี่ยนเมื่อเกิด phlebitis",
      "ห้ามผสมใน Lactate ringer, NaHCO3"
    ],
    stability: "สารละลายสีเหลืองอ่อน ใส • ความคงตัวหลังผสม: Protect from light 24 ชม., Non-protect from light 14 ชม.",
    compat: "ผสมได้ใน NSS, D5W, D5S, D5S/2 • ห้ามผสมใน Lactate ringer, NaHCO3",
    monitoring: [
      { param: "Blood pressure", timing: "ก่อนให้ยาฉีด, ทุก 15 นาที x 4 ครั้ง และต่อไปทุก 30 นาที", criticalPoint: "< 100/60 mmHg" },
      { param: "Heart rate", timing: "ก่อนให้ยาฉีด, ทุก 15 นาที x 4 ครั้ง และต่อไปทุก 30 นาที", criticalPoint: "> 120 ครั้ง/นาที" },
      { param: "IV site", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบอาการอักเสบ (ให้หยุดยา, เปลี่ยนตำแหน่ง, ประคบร้อน)" }
    ],
    adverseEffects: ["ปวดศีรษะ", "หน้ามืด/วิงเวียน", "ใจสั่น", "คลื่นไส้/อาเจียน", "หน้าแดง/ร้อนวูบวาบ"],
    antidote: null, management: null, errata: []
  },
  {
    id: "nitroglycerin", sd: "SD-3.17-05/22", post: 307,
    name: "Nitroglycerin (NTG)", nameTh: "ไนโตรกลีเซอรีน",
    category: "vasoactive", categoryLabel: "Vasodilator (IV)",
    strength: "50 mg/10 mL",
    diluent: "D5W หรือ NSS",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "mcg/min", dosingRange: { min: 5, usualMax: 200, max: 640 },
    standardDose: "ผู้ใหญ่เริ่ม 5–20 mcg/min ค่อยๆ เพิ่มจนถึง 200 mcg/min (กรณีฉุกเฉินอาจให้ได้ถึง 640 mcg/min) • เด็ก 1–5 mcg/kg/min",
    formulations: [
      { ratio: "1:5 (0.2 mg/mL) แบบ 100 mL", concText: "0.2 mg/mL (200 mcg/mL)", concNumber: 200, recipe: "ยา 20 mg (4 mL) up to D5W หรือ NSS 100 mL", totalVolume: "100 mL", route: "iv" },
      { ratio: "1:5 (0.2 mg/mL) แบบ 250 mL", concText: "0.2 mg/mL (200 mcg/mL)", concNumber: 200, recipe: "ยา 50 mg (10 mL = 1 amp) up to D5W หรือ NSS 250 mL", totalVolume: "250 mL", route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ห้าม IV push",
      "IV infusion ความเข้มข้น ≤ 400 mcg/mL (กรณีจำกัดน้ำ ความเข้มข้นสูงสุด 1 mg/mL)",
      "ไม่ควรให้ยานานเกิน 24–48 ชั่วโมง เพราะทำให้เกิดการดื้อยา (ความดันสูง เจ็บหน้าอก ปวดศีรษะ)",
      "ขนาดสูงเป็นเวลานานทำให้เกิด methemoglobinemia (เวียนศีรษะ ซึม ปวดศีรษะ หายใจถี่รัว Cyanosis)",
      "ห้ามใช้ Epinephrine, Dopamine เพื่อรักษาภาวะความดันต่ำจากยา NTG"
    ],
    stability: null,
    compat: null,
    monitoring: [
      { param: "Blood pressure", timing: "ทุก 5 นาที x 3 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 100/60 mmHg" },
      { param: "Heart rate", timing: "ทุก 5 นาที x 3 ครั้ง จากนั้นทุก 1 ชม.", criticalPoint: "< 70 หรือ > 120 ครั้ง/นาที" },
      { param: "Pulmonary wedge pressure (ปกติ 6–12 mmHg)", timing: "เฉพาะหอผู้ป่วยวิกฤต ตามแพทย์สั่ง", criticalPoint: "< 6 mmHg" },
      { param: "อาการทางคลินิก (ประสิทธิภาพยา)", timing: "ตลอดระยะเวลาที่ให้ยา", criticalPoint: "เจ็บหน้าอก, เหนื่อย/นอนราบไม่ได้" }
    ],
    adverseEffects: ["ใจสั่น", "หน้าแดง", "ปวดศีรษะมาก", "คลื่นไส้/อาเจียน", "สับสน", "หอบ", "Cyanosis (สีคล้ำที่ปลายมือปลายเท้า เยื่อบุ ริมฝีปากด้านใน)"],
    antidote: null,
    management: "Reflex tachycardia: ลดอัตราเร็วการให้ยาหรือหยุดชั่วคราว ให้นอนหงาย ปรับศีรษะต่ำลง ให้ IV fluid, Oxygen และ/หรือเครื่องช่วยหายใจ • ห้ามใช้ Epinephrine, Dopamine รักษาความดันต่ำจาก NTG",
    errata: []
  },
  {
    id: "terlipressin", sd: "SD-3.17-05/28", post: 307,
    name: "Terlipressin", nameTh: "เทอร์ลิเพรสซิน",
    category: "vasoactive", categoryLabel: "Vasopressor (V1)",
    strength: "0.2 mg/mL (1 vial = 1 mg/5 mL)",
    diluent: "NSS หรือ 5DW (ความเข้มข้นมาตรฐาน 0.002–0.02 mg/mL)",
    d5wOnly: false, lightProtected: false,
    calc: true, doseUnit: "mcg/hr", dosingRange: { min: 20, usualMax: 80, max: 160 },
    standardDose: "Refractory septic shock: เริ่ม 20–80 mcg/hr titrate ทีละ 20 mcg/hr ทุก 15–30 นาที (สูงสุด 160 mcg/hr) • HRS-AKI: เริ่ม 0.5 mg q 6 hr titrate ทีละ 0.5 mg ทุก 6–12 hr (สูงสุด 2 mg q 6 hr)",
    formulations: [
      { ratio: "Septic shock infusion", concText: "10 mcg/mL", concNumber: 10, recipe: "Terlipressin 1 mg (5 mL) ใน NSS หรือ 5DW 95 mL", totalVolume: "100 mL", route: "both", routeNote: "Peripheral (เส้นใหญ่เหนือข้อพับ) / Central" },
      { ratio: "HRS-AKI: IV bolus", concText: "ตามขนาดยา (0.5–2 mg/10 mL)", concNumber: null, calc: false, recipe: "ผสมสารน้ำให้เป็น 10 mL IV slowly push in 10 นาที q 6 hr", totalVolume: "10 mL", route: "both", routeNote: "Peripheral (เส้นใหญ่เหนือข้อพับ) / Central" },
      { ratio: "HRS-AKI: continuous", concText: "ตามขนาดยา (0.5–2 mg/100 mL)", concNumber: null, calc: false, recipe: "ผสมสารน้ำให้เป็น 100 mL IV drip in 6 hr q 6 hr", totalVolume: "100 mL", route: "both", routeNote: "Peripheral (เส้นใหญ่เหนือข้อพับ) / Central" }
    ],
    indications: [
      "Hepatorenal syndrome (HRS-AKI): outcome SCr ลดลง > 25% จาก baseline ที่ 72 hr; ให้ไม่เกิน 14 วัน",
      "Refractory septic shock (Norepinephrine > 0.25–0.5 mcg/kg/min, SVRI < 1,500 dynes/s/cm5): outcome MAP เพิ่ม > 10% จาก baseline; ให้ไม่เกิน 2 วัน หรือจนหยุด norepinephrine/adrenaline ได้"
    ],
    safetyAlerts: [
      "ห้ามใช้ในผู้ป่วยที่ตั้งครรภ์ มีภาวะโรคหัวใจขาดเลือด และผู้ที่แพ้ Terlipressin หรือส่วนประกอบอื่นในตำรับ",
      "ให้ทาง IV เท่านั้น: peripheral line ในเส้นเลือดดำขนาดใหญ่เหนือข้อพับ หรือ central line และระวังการเกิด extravasation",
      "แนะนำให้ NPO และให้ยากลุ่ม PPIs พร้อมติดตามอาการ bowel ischemia",
      "หากผู้ป่วยอาการยังไม่คงที่ แพทย์ต้องร่วมประเมินผู้ป่วยอย่างใกล้ชิด"
    ],
    stability: "เก็บในตู้เย็น (2–8 °C) ห้ามแช่แข็ง • ใช้ยาหลังผสมทันทีและใช้ให้หมดภายใน 24 hr",
    compat: null,
    monitoring: [
      { param: "Heart rate", timing: "ทุก 1 ชั่วโมง", criticalPoint: "< 60 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ทุก 1 ชั่วโมง", criticalPoint: "< 90/60 หรือ > 160/100 mmHg" },
      { param: "ผิวซีดเย็น หรือเขียว", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบผิวซีดเย็น หรือเขียว" },
      { param: "IV site", timing: "ทุก 1 ชั่วโมง", criticalPoint: "พบรอยแดง บวม เจ็บ ให้เปลี่ยนตำแหน่งให้ยา" }
    ],
    adverseEffects: ["คลื่นไส้ อาเจียน/ปวดท้อง ถ่ายเป็นเลือด", "แน่นหน้าอก/หายใจหอบเหนื่อย", "ปลายมือ ปลายเท้าเขียว"],
    antidote: null, management: null, errata: []
  },
  {
    id: "amiodarone", sd: "SD-3.17-05/03", post: 306,
    name: "Amiodarone", nameTh: "อะมิโอดาโรน",
    category: "cardiac", categoryLabel: "Antiarrhythmic",
    strength: "Injection 150 mg/3 mL • Tablet 200 mg",
    diluent: "5%DW เท่านั้น (ห้ามผสมใน NSS)",
    d5wOnly: true, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "IV push slowly: 150 mg ฉีดช้าๆ ภายใน 10 นาที (≤ 30 mg/min) ยกเว้นกรณีกู้ชีวิต • ขนาดยาสูงสุด 2.2 g/day",
    formulations: [
      { ratio: "Peripheral infusion", concText: "≤ 2 mg/mL", concNumber: null, recipe: "ผสมใน 5%DW ความเข้มข้น ≤ 2 mg/mL บริหารนาน 1–2 ชั่วโมง (แนวทางไม่ระบุปริมาตร)", totalVolume: null, route: "peripheral" },
      { ratio: "Central infusion", concText: "≤ 6 mg/mL", concNumber: null, recipe: "ผสมใน 5%DW ความเข้มข้นสูงสุดไม่เกิน 6 mg/mL (แนวทางไม่ระบุปริมาตร)", totalVolume: null, route: "central" },
      { ratio: "Tablet", concText: "200 mg", concNumber: null, recipe: "ยารับประทาน", totalVolume: null, route: "oral" }
    ],
    indications: [],
    safetyAlerts: [
      "ระมัดระวังในผู้ป่วยที่มีการทำงานของ thyroid ผิดปกติ, หญิงตั้งครรภ์ (ยกเว้นกรณีที่มีความจำเป็น เช่น CPR)",
      "IV push slowly (150 mg ภายใน 10 นาที อัตราเร็ว ≤ 30 mg/min); ยกเว้นกรณีที่ต้องทำการกู้ชีวิต",
      "ยามีฤทธิ์ยาวนานแม้หยุดยาไปแล้ว 7–50 วัน จึงควรระมัดระวังการใช้ร่วมกับยาที่มีปฏิกิริยาระหว่างยา",
      "ยาที่เพิ่ม/ลดฤทธิ์ amiodarone: Phenytoin (ลดฤทธิ์ 30%), Quinolone (เพิ่มฤทธิ์: QT prolongation, torsades de pointes, cardiac arrest), Ritonavir และ protease inhibitor (เพิ่มฤทธิ์)",
      "Amiodarone เพิ่มฤทธิ์ยาที่ให้ร่วม: Digoxin (2 เท่า), Phenytoin (2–3 เท่า), Warfarin (ควรลดขนาด warfarin 35–65%), Fentanyl (bradycardia, hypotension, cardiac output ลดลง; รายงาน complete heart block ร้อยละ 66)",
      "ต้องแจ้งแพทย์ทันทีเมื่อมีการสั่งใช้ยาที่มีปฏิกิริยาร่วมกัน หรือมีการปรับขนาดยา",
      "ผู้ป่วยที่รับประทานยาเป็นเวลานาน: หลีกเลี่ยงแสงแดด (ผิวไวต่อแสง) และตรวจตา, Thyroid hormone, Liver function, Chest x-ray อย่างน้อยทุก 6 เดือน"
    ],
    stability: null,
    compat: "IV infusion ผสมใน 5%DW เท่านั้น (ห้ามผสมใน NSS)",
    monitoring: [
      { param: "Heart rate (ยาฉีด: ตลอดการให้ยา และหลังหยุด 24 ชม.)", timing: "ก่อนให้ยาฉีด, ทุก 15 นาที x 3 ครั้ง", criticalPoint: "< 70 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "ก่อนให้ยาฉีด, ทุก 15 นาที x 3 ครั้ง", criticalPoint: "< 90/60 mmHg" },
      { param: "IV site", timing: "ทุก 1 ชั่วโมง (6 ชั่วโมงแรก)", criticalPoint: "พบอาการปวด (ให้ลดอัตราเร็วการให้ยาหรือหยุดยา)" },
      { param: "ECG", timing: "ตามแพทย์สั่ง", criticalPoint: "AV block, bradycardia, paradoxical arrhythmias, prolonged QT" }
    ],
    adverseEffects: ["(ยารับประทาน ติดตามทุก 7 วัน) คลื่นไส้/อาเจียน", "ไอแห้ง หายใจขัด", "เดินเซ/ลำบาก แขนขาอ่อนแรง ชาบริเวณนิ้วเท้า", "ตาหรือผิวหนังมีสีเหลือง", "วิงเวียน เป็นลม หมดสติ", "ตามัว ตาแห้ง ตาแพ้แสง มองเห็นแสงสีน้ำเงิน-เขียวรอบวัตถุ"],
    antidote: null, management: null, errata: []
  },
  {
    id: "alteplase", sd: "SD-3.17-05/02", post: 306,
    name: "Alteplase (rt-PA)", nameTh: "อัลทีเพลส",
    category: "antithrombotic", categoryLabel: "Thrombolytic",
    strength: "50 mg/50 mL",
    diluent: "ละลายยาใน sterile water; เจือจางด้วย NSS (PVC bag หรือขวดแก้ว)",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "0.9 mg/kg (สูงสุดไม่เกิน 90 mg): IV bolus 10% ภายใน 1 นาที จากนั้น IV drip ภายใน 1 ชั่วโมง",
    formulations: [
      { ratio: "Reconstituted", concText: "≤ 1 mg/mL", concNumber: null, recipe: "ละลายใน sterile water แล้วเจือจางด้วย NSS ความเข้มข้นหลังผสมไม่เกิน 1 mg/mL", totalVolume: null, route: "iv" }
    ],
    indications: [],
    safetyAlerts: [
      "ห้ามใช้ในคนที่มีประวัติแพ้ alteplase หรือ gentamycin",
      "หลีกเลี่ยงการให้ยาทาง SC หรือ IM เพราะอาจทำให้เกิด bleeding",
      "หลังให้ rt-PA ห้ามให้ยาต้านเกล็ดเลือด (Aspirin, Clopidogrel, Prasugrel, Ticagrelor) หรือยาต้านการแข็งตัวของเลือด (Heparin, Enoxaparin, Fondaparinux, Warfarin, Apixaban, Edoxaban, Rivaroxaban, Dabigatran) ภายใน 24 ชม.",
      "หลีกเลี่ยงการใส่ catheter การแทงหลอดเลือดดำใหญ่หรือหลอดเลือดแดงทุกชนิด",
      "ระวังยาที่เพิ่มฤทธิ์: antiplatelet (Aspirin, Clopidogrel, Prasugrel, Ticagrelor), Herb, NSAIDs • ยาที่ลดฤทธิ์: Nitroglycerine, Aprotinin"
    ],
    stability: "หลังเจือจางด้วย NSS เก็บในตู้เย็น 24 ชั่วโมง, ที่อุณหภูมิห้องไม่เกิน 30 °C ได้ 8 ชั่วโมง • ไม่ควรใช้เมื่อสารละลายมีตะกอน",
    compat: null,
    monitoring: [
      { param: "Respiratory rate", timing: "ทุก 15 นาที x 2 ชั่วโมงแรก, ทุก 30 นาที x 6 ชั่วโมง, จากนั้นทุก 1 ชั่วโมงจนครบ 24 ชั่วโมง", criticalPoint: "> 16 ครั้ง/นาที" },
      { param: "Heart rate", timing: "เช่นเดียวกับ Respiratory rate", criticalPoint: "< 60 หรือ > 120 ครั้ง/นาที" },
      { param: "Blood pressure", timing: "เช่นเดียวกับ Respiratory rate", criticalPoint: "< 90/60 หรือ > 180/105 mmHg" }
    ],
    adverseEffects: [
      "Anaphylaxis — Skin: ผื่น คัน ลิ้นบวม/ปากบวม Flushing; Respiratory: หายใจลำบาก/Wheezing เสียงเปลี่ยน เยื่อบุจมูกอักเสบ; CVS: Hypotension ใจสั่น ซึม/สับสน เป็นลม ชัก; GI: คลื่นไส้/อาเจียน ปวดท้อง ท้องเสีย",
      "Major bleeding: ปวดศีรษะรุนแรง อาเจียนพุ่ง อาเจียนเป็น coffee ground ชัก",
      "Minor bleeding: อุจจาระสีดำยางมะตอย เลือดออกทางช่องคลอด เลือดกำเดาไหล เลือดออกตามไรฟัน จ้ำเลือดใต้ผิวหนัง",
      "Hypotensive: วิงเวียน เหงื่อออกมาก มือเท้าเย็น หน้าซีด"
    ],
    antidote: null,
    management: "1. Bleeding: Transamine 1,000 mg IV stat • Fibrinogen level หลังให้ cryoprecipitate 4–6 hrs (keep > 100 mg/dL) และที่ 12 หรือ 24 hr • CPP (เริ่ม 10 U) IV drip free flow หรือ FFP (2–4 U หรือ 10 mL/kg) unit ละ 30 นาที (ไม่ต้องรอ INR) • ถ้าได้ antiplatelet: platelet concentrate 6–8 U 2 doses หรือ single donor platelet 2 U (เตรียม 1 dose สำหรับ OR) / platelet concentrate 6–8 U หรือ SDP 1 U free flow; DDAVP 0.4 mcg/kg IV stat (optional) • ถ้าได้ warfarin (target INR 1.4): Vitamin K 5 mg IV (INR < 3) หรือ 10 mg IV (INR > 3), FFP 2 U unit ละ 30 นาที, repeat INR หลังได้เลือด<br>2. Hypotensive episode: IV 0.9% NaCl หากยังมี hypotension พิจารณา vasopressor<br>3. Anaphylaxis: หยุดยา ให้ Chlorpheniramine 10 mg IV stat และ dexamethasone 4–10 mg IV (max 16 mg) ถ้ารุนแรงพิจารณา adrenaline 0.05–0.1 mg IV slowly push ทุก 10–15 นาที จนอาการดีขึ้น (max 1 mg)",
    errata: []
  },
  {
    id: "digoxin", sd: "SD-3.17-05/09", post: 306,
    name: "Digoxin", nameTh: "ดิจ็อกซิน",
    category: "cardiac", categoryLabel: "Cardiac glycoside",
    strength: "Inj 0.5 mg/2 mL • Tablet 0.25 mg (ขาว), 0.0625 mg (ฟ้า) • Elixir 0.05 mg/mL",
    diluent: "IV bolus ไม่ต้องเจือจาง (ช้าๆ > 5 นาที) หรือเจือจางด้วย Sterile water, NSS, 5%DW มากกว่า 4 เท่า",
    d5wOnly: false, lightProtected: false,
    calc: false, doseUnit: null, dosingRange: null,
    standardDose: "HF: oral maintenance 0.125–0.25 mg วันละ 1 ครั้ง • AF: TDD IV 8–12 mcg/kg/24 hr (ครึ่งหนึ่งก่อน ที่เหลือครั้งละ 25% ทุก 4–8 ชม.; ACLS 2010) หรือ 0.25 mg ซ้ำได้จนถึง max 1.5 mg/24 hr ตามด้วย oral 0.125–0.25 mg OD • SVT: Oral 0.5 mg loading แล้ว 0.125–0.25 mg ทุก 6–8 ชม. (max 8–12 mcg/kg/24 hr); IV 0.25–0.5 mg bolus ซ้ำ 0.25 mg ทุก 6–8 ชม. (max 1 mg/24 hr หรือ 8–12 mcg/kg/24 hr); maintenance oral 0.125–0.25 mg OD • ผู้ใหญ่: TDD PO 0.75–1.5 mg, IV/IM 0.5–1 mg; DMD PO 0.125–0.5 mg, IV/IM 0.1–0.4 mg • ไต: CrCl 10–50 mL/min ให้ 25–75% ของขนาดปกติหรือทุก 36 ชม.; CrCl < 10 mL/min ให้ 10–25% หรือทุก 48 ชม. • ขนาดยาเด็กตามอายุ: ดูตารางในเอกสาร SD-3.17-05/09",
    formulations: [
      { ratio: "Injection", concText: "0.25 mg/mL (0.5 mg/2 mL)", concNumber: null, recipe: "IV bolus ช้าๆ > 5 นาที ไม่ต้องเจือจาง หรือเจือจางด้วยสารละลาย > 4 เท่า ใช้ทันทีที่ผสม", totalVolume: null, route: "iv" },
      { ratio: "Tablet / Elixir", concText: "0.25 mg, 0.0625 mg / 0.05 mg/mL", concNumber: null, recipe: "ยารับประทาน", totalVolume: null, route: "oral" }
    ],
    indications: ["Heart failure", "Atrial fibrillation", "Supraventricular tachycardia (SVT)"],
    safetyAlerts: [
      "ห้ามให้ในผู้ป่วยที่มี Heart rate < 60 ครั้ง/นาที",
      "ระมัดระวังในผู้ป่วยกล้ามเนื้อหัวใจตาย ไทรอยด์ ไตวายเฉียบพลันและไตวายระยะรุนแรง ภาวะโปแตสเซียมต่ำ (K < 3.5 mEq/L) เพราะทำให้เกิดพิษจากยา และควรปรับขนาดตามการทำงานของไต",
      "เปลี่ยนวิธีให้ยาต้องปรับขนาด: เปลี่ยนจากยากินหรือฉีดกล้ามเนื้อเป็นฉีดเข้าเส้นเลือดต้องลดขนาดลง 20–25%",
      "หลีกเลี่ยงการฉีด IM (ระคายเคืองมาก) หากจำเป็นฉีดกล้ามเนื้อลึกๆ ปริมาณไม่เกิน 2 mL แล้วนวดบริเวณที่ฉีด",
      "ยาเม็ดในผู้ใหญ่ถ้าให้เกินวันละ 1 ครั้ง ควรยืนยันกับแพทย์ก่อน (เด็กอาจให้วันละ 2 ครั้ง)",
      "ยาที่ลดการดูดซึมยาเม็ด: นม, ยาน้ำลดกรด, cholestyramine, calcium carbonate — ให้ห่างกัน 2 ชั่วโมง",
      "เพิ่มฤทธิ์ Digoxin: beta-blocker, verapamil, diltiazem, itraconazole, erythromycin, clarithromycin, tetracycline, methimazole, amiodarone; diuretic, lithium, corticosteroids (ทำให้โพแทสเซียมต่ำ)",
      "ลดฤทธิ์ Digoxin: metoclopramide, sulfasalazine, rifampicin, phenytoin"
    ],
    stability: "เมื่อเจือจางควรใช้ทันทีที่ผสม",
    compat: "เจือจางได้ด้วย Sterile water, NSS, 5%DW (มากกว่า 4 เท่า เพื่อป้องกันตกตะกอน)",
    monitoring: [
      { param: "Heart rate (ยาฉีดเริ่มให้ยา)", timing: "ก่อนให้ยา, ทุก 1 ชม. x 4 ครั้ง", criticalPoint: "เด็ก < 1 ปี: < 100; เด็ก 1–6 ปี: < 80; ผู้ใหญ่และเด็ก > 6 ปี: < 70 ครั้ง/นาที" },
      { param: "EKG (ยาฉีดเริ่มให้ยา)", timing: "ก่อนฉีด (baseline) และหลังฉีด 6 ชม.", criticalPoint: "frequent PVCs, bigeminy PVCs หรือ atrial tachycardia" },
      { param: "Heart rate (ให้ต่อเนื่อง)", timing: "ก่อนให้ยาทุกวัน", criticalPoint: "เด็ก < 1 ปี: < 100; เด็ก 1–6 ปี: < 80; ผู้ใหญ่และเด็ก > 6 ปี: < 70 ครั้ง/นาที" },
      { param: "K level", timing: "ก่อนให้ยา และสัปดาห์ละ 1 ครั้ง", criticalPoint: "< 3.5 mEq/L" },
      { param: "Serum Cr", timing: "ก่อนให้ยา และสัปดาห์ละ 1 ครั้ง", criticalPoint: "เพิ่มขึ้นเท่าตัว (ปกติ 0.6–1.3 mg/dL)" },
      { param: "Digoxin level", timing: "ตามแพทย์สั่งกรณีสงสัย toxic", criticalPoint: "> 2 ng/mL (CHF: 0.8–2) และ > 2.5 ng/mL (Arrhythmia: 1.5–2.5)" }
    ],
    adverseEffects: ["มองเห็นแสงสีเขียวเหลือง", "วิงเวียน หรือเป็นลมหมดสติ"],
    antidote: null,
    management: "การรักษาความเสี่ยง: Bradycardia/heart block ให้ Atropine 0.5–2 mg IV • Ventricular tachycardia ให้ Lidocaine หรือ Phenytoin • พิจารณา MgSO4 ในผู้ป่วย VT หรือ VF: เริ่ม 2 g IV ตามด้วย maintenance infusion 1–2 g/hr",
    errata: ["SVT maintenance IV พิมพ์ว่า \"2.4–3.6 mg/kg วันละ 1 ครั้ง\" — หน่วย mg/kg สูงกว่าขนาด IV ผู้ใหญ่ในตารางเดียวกัน (0.1–0.4 mg) หลายร้อยเท่า; ยืนยันกับเภสัชกรก่อนใช้"]
  }
];
