// ── STATE ──────────────────────────────────────────────────
const State = {
  currentUser: null,
  role: null, // 'family' | 'helper' | 'admin'
  bookings: [],
  notifications: [],
};

// ── PACKAGES (from mentor updated pricing) ─────────────────
// name/duration/badge/desc/bestFor are resolved via t() at render time
const PACKAGES = [
  {
    id: 'pkg1', nameKey: 'Standard 4 Hours', durKey: '4 hrs', hours: 4,
    price: 1190, helperShare: 780, caregoShare: 410, overtime: 200,
    icon: '🕐', badgeKey: 'Most Popular', badgeColor: 'badge-blue',
    descKey: 'Perfect for routine OPD checkups and short hospital visits', bestForKeys: ['OPD checkup', 'Blood test & results', 'Short consultations'],
  },
  {
    id: 'pkg2', nameKey: 'Extended 6 Hours', durKey: '6 hrs', hours: 6,
    price: 1590, helperShare: 1050, caregoShare: 540, overtime: 200,
    icon: '🕕', badgeKey: 'Best Value', badgeColor: 'badge-teal',
    descKey: 'Ideal for chronic disease follow-ups and multi-department visits', bestForKeys: ['Chronic disease follow-up', 'Multiple departments', 'Lab + pharmacy'],
  },
  {
    id: 'pkg3', nameKey: 'Full Day Package 8 Hours', durKey: '8 hrs', hours: 8,
    price: 1990, helperShare: 1350, caregoShare: 640, overtime: 200,
    icon: '🌅', badgeKey: 'Full Coverage', badgeColor: 'badge-amber',
    descKey: 'Complete care for complex cases, dialysis, and full-day hospital stays', bestForKeys: ['Surgery follow-up', 'Regular dialysis', 'Complex multi-step visits'],
  },
];
// Helpers to get translated package fields at render time
function pkgName(pkg) { return t(pkg.nameKey); }
function pkgDur(pkg)  { return t(pkg.durKey); }
function pkgBadge(pkg){ return t(pkg.badgeKey); }
function pkgDesc(pkg) { return t(pkg.descKey); }
function pkgBest(pkg) { return pkg.bestForKeys.map(k => t(k)); }

// ── ADD-ONS ────────────────────────────────────────────────
const ADDONS = [
  { id: 'transport',  nameKey: 'Transportation', icon: '🚗', price: 300, descKey: 'Pick up & drop off elderly parent' },
  { id: 'wheelchair', nameKey: 'Wheelchair Support',icon: '♿', price: 100, descKey: 'Full wheelchair assistance throughout visit' },
  { id: 'multidept',  nameKey: 'Multiple Departments', icon: '🏥', price: 200, descKey: 'Navigation across 2+ hospital departments' },
  { id: 'medicine',   nameKey: 'Medicine Pickup',  icon: '💊', price: 100, descKey: 'Collect & deliver prescriptions from pharmacy' },
];
function addonName(a) { return t(a.nameKey); }
function addonDesc(a) { return t(a.descKey); }

// ── SUBSCRIPTION PLANS ─────────────────────────────────────
const SUBSCRIPTIONS = [
  {
    id: 'silver', nameKey: 'Silver Plan', icon: '🥈', bookings: 3, period: 'month',
    discount: 10, price: 2700, color: 'gray',
    descKey: '3 bookings/ month - 10% discount', bestForKey: 'Best for: Monthly checkup visits',
  },
  {
    id: 'gold', nameKey: 'Gold Plan', icon: '🥇', bookings: 8, period: 'month',
    discount: 15, price: 6800, color: 'amber', priority: true,
    descKey: '8 bookings/month + priority booking', bestForKey: 'Best for: Weekly dialysis or chronic care',
  },
];
function subName(s) { return t(s.nameKey); }
function subDesc(s) { return t(s.descKey); }
function subBest(s) { return t(s.bestForKey); }

// ── HELPERS (CPR-certified KKU students) ───────────────────
const HELPERS = [
  {
    id: 'h1', name: 'Siriporn K.', initials: 'SK',
    faculty: 'Faculty of Nursing, Year 3', university: 'Khon Kaen University',
    rating: 4.9, reviews: 124, languages: ['Thai', 'English'],
    specialties: ['Dialysis Support', 'Cardiology', 'OPD Navigation'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Certified CareGo Helper with elderly care specialisation. 2 years volunteering at Srinagarind. Expert in dialysis visits and chronic disease support.',
    available: true, gender: 'Female', color: 'blue',
    completedBookings: 124, joinedDate: 'Feb 2024',
    cScore: 95, pScore: 92, rScore: 98,
  },
  {
    id: 'h2', name: 'Thanawat P.', initials: 'TP',
    faculty: 'Faculty of Medicine, Year 4', university: 'Khon Kaen University',
    rating: 4.9, reviews: 89, languages: ['Thai', 'English', 'Chinese'],
    specialties: ['Orthopedics', 'Neurology', 'Post-Surgery'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Medical student with deep clinical knowledge. Excellent at explaining medical info to worried families clearly. Handles complex multi-department visits.',
    available: true, gender: 'Male', color: 'teal',
    completedBookings: 89, joinedDate: 'Jan 2024',
    cScore: 93, pScore: 97, rScore: 94,
  },
  {
    id: 'h3', name: 'Ploy N.', initials: 'PN',
    faculty: 'Faculty of Nursing, Year 2', university: 'Khon Kaen University',
    rating: 4.7, reviews: 56, languages: ['Thai'],
    specialties: ['General OPD', 'Wheelchair Assistance', 'Elderly Mobility'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Gentle and patient helper specialising in elderly mobility. Knows every route and counter at Srinagarind. Families trust her completely with their parents.',
    available: true, gender: 'Female', color: 'amber',
    completedBookings: 56, joinedDate: 'May 2024',
    cScore: 91, pScore: 88, rScore: 96,
  },
  {
    id: 'h4', name: 'Natthapong S.', initials: 'NS',
    faculty: 'Faculty of Allied Health, Year 3', university: 'Khon Kaen University',
    rating: 4.8, reviews: 71, languages: ['Thai', 'English'],
    specialties: ['Chronic Disease', 'Dialysis', 'Internal Medicine'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Allied health student with dialysis expertise. Handles recurring elderly patients with chronic conditions efficiently and sends live family updates.',
    available: false, gender: 'Male', color: 'blue',
    completedBookings: 71, joinedDate: 'Mar 2024',
    cScore: 90, pScore: 94, rScore: 93,
  },
  {
    id: 'h5', name: 'Warisa M.', initials: 'WM',
    faculty: 'Faculty of Nursing, Year 4', university: 'Khon Kaen University',
    rating: 4.9, reviews: 103, languages: ['Thai', 'English', 'Japanese'],
    specialties: ['Oncology', 'Long-stay Care', 'Family Updates'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Senior nursing student with oncology experience. Proactively sends live updates to working families. Highest trust rating on platform.',
    available: true, gender: 'Female', color: 'teal',
    completedBookings: 103, joinedDate: 'Dec 2023',
    cScore: 96, pScore: 95, rScore: 97,
  },
  {
    id: 'h6', name: 'Krit T.', initials: 'KT',
    faculty: 'Faculty of Medicine, Year 3', university: 'Khon Kaen University',
    rating: 4.6, reviews: 38, languages: ['Thai', 'English'],
    specialties: ['Emergency Response', 'Pharmacy Navigation', 'Visit Reporting'],
    elderlyExp: true, cprCertified: true, verified: true,
    bio: 'Quick thinker in stressful environments. Certified CPR & First Aid. Sends detailed visit summary reports after each session.',
    available: true, gender: 'Male', color: 'amber',
    completedBookings: 38, joinedDate: 'Jun 2024',
    cScore: 88, pScore: 91, rScore: 90,
  },
];

// ── HOSPITALS ──────────────────────────────────────────────
const HOSPITALS = [
  'Srinagarind Hospital',
  'Khon Kaen Hospital',
  'KKU Medical Center',
  'Mittraphap Hospital',
  'Ram Khon Kaen Hospital',
];

// ── DEPARTMENTS ────────────────────────────────────────────
const DEPARTMENTS = [
  'Nephrology (Dialysis)', 'Cardiology', 'Orthopedics',
  'Neurology', 'Oncology', 'Internal Medicine',
  'General OPD', 'Endocrinology', 'Rehabilitation',
  'Surgery', 'Radiology', 'Pharmacy Only',
];

// ── SAMPLE BOOKINGS ────────────────────────────────────────
const SAMPLE_BOOKINGS = [
  {
    id: 'b001', helperId: 'h1', helperName: 'Siriporn K.', helperInitials: 'SK',
    patient: 'Khun Malee (Mother, 72)', patientInitials: 'KM', patientAge: 72,
    bookedBy: 'Somchai W.', bookedByInitials: 'SW',
    hospital: 'Srinagarind Hospital', department: 'Nephrology (Dialysis)',
    date: '2025-07-15', packageId: 'pkg1', addons: ['wheelchair'],
    status: 'active', price: 1290, createdAt: '2025-07-14 09:00',
    progressStep: 1,
    updates: [
      { time: '9:15 AM', msg: 'Helper arrived at patient home', icon: '🏠' },
      { time: '9:45 AM', msg: 'On the way to Srinagarind Hospital', icon: '🚗' },
    ],
  },
  {
    id: 'b002', helperId: 'h2', helperName: 'Thanawat P.', helperInitials: 'TP',
    patient: 'Khun Prasert (Father, 68)', patientInitials: 'KP', patientAge: 68,
    bookedBy: 'Malee S.', bookedByInitials: 'MS',
    hospital: 'Srinagarind Hospital', department: 'Orthopedics',
    date: '2025-07-14', packageId: 'pkg2', addons: ['multidept'],
    status: 'completed', price: 1790, createdAt: '2025-07-13 14:00',
    progressStep: 4, rating: 5,
    summary: { doctorNotes: 'Continue physiotherapy 2x/week', nextAppointment: '2025-08-14', medicinePickedUp: true },
  },
  {
    id: 'b003', helperId: 'h5', helperName: 'Warisa M.', helperInitials: 'WM',
    patient: 'Khun Somjai (Mother, 75)', patientInitials: 'KS', patientAge: 75,
    bookedBy: 'Tanaka Y.', bookedByInitials: 'TY',
    hospital: 'KKU Medical Center', department: 'Oncology',
    date: '2025-07-16', packageId: 'pkg3', addons: ['transport', 'medicine'],
    status: 'confirmed', price: 2390, createdAt: '2025-07-15 11:00',
    progressStep: 0,
  },
];

// ── SAMPLE REVIEWS ─────────────────────────────────────────
const REVIEWS = [
  { id: 'r1', helperId: 'h1', patient: 'Somchai W.', role: 'Government Officer', rating: 5, date: 'Jul 10, 2025',
    text: 'Could not take leave from my government job but was worried about my 72-year-old mother\'s dialysis. Siriporn handled everything and sent updates every hour. Worth every baht.' },
  { id: 'r2', helperId: 'h1', patient: 'Kanokwan P.', role: 'Bank Manager', rating: 5, date: 'Jul 3, 2025',
    text: 'My father refused to go alone and I was in meetings all day. The visit summary they sent was incredibly detailed. This service is a lifesaver for working families.' },
  { id: 'r3', helperId: 'h2', patient: 'Malee S.', role: 'Engineer', rating: 5, date: 'Jul 8, 2025',
    text: 'My mother cannot walk well. Thanawat arranged a wheelchair and navigated 3 departments without any issues. I felt completely at ease the whole day.' },
  { id: 'r4', helperId: 'h5', patient: 'Nattapong R.', role: 'Business Owner', rating: 5, date: 'Jun 28, 2025',
    text: 'I travel frequently for work. CareGo gives me peace of mind that my elderly parents are properly cared for. Outstanding service every time.' },
  { id: 'r5', helperId: 'h3', patient: 'Supansa T.', role: 'Teacher', rating: 5, date: 'Jul 1, 2025',
    text: 'Ploy was so patient with my 80-year-old father. She even helped him understand what the doctor said and held his hand the whole time.' },
];

// ── ADMIN STATS ────────────────────────────────────────────
const ADMIN_STATS = {
  totalBookings: 247, activeToday: 18, totalHelpers: 31,
  revenue: 312500, avgRating: 4.86, completionRate: 98.2,
};

// ── UTILITIES ──────────────────────────────────────────────
function getPackageById(id) { return PACKAGES.find(p => p.id === id); }
function getHelperById(id)  { return HELPERS.find(h => h.id === id); }
function getAddonById(id)   { return ADDONS.find(a => a.id === id); }
function formatPrice(p)     { return '฿' + Number(p).toLocaleString(); }

function starsHTML(rating, max = 5) {
  let s = '';
  for (let i = 1; i <= max; i++) s += i <= Math.round(rating) ? '★' : '☆';
  return `<span class="stars">${s}</span>`;
}

function packageLabel(pkgId) {
  const p = getPackageById(pkgId);
  return p ? t(p.nameKey) : t('book.package');
}

function calcTotalPrice(pkgId, addonIds = []) {
  const pkg  = getPackageById(pkgId);
  const base = pkg ? pkg.price : 1190;
  const extra = (addonIds || []).reduce((sum, aid) => {
    const a = getAddonById(aid); return sum + (a ? a.price : 0);
  }, 0);
  return base + extra;
}

function statusBadge(status) {
  const map = {
    active:    ['badge-green',  'status.active'],
    confirmed: ['badge-blue',   'status.confirmed'],
    completed: ['badge-gray',   'status.completed'],
    cancelled: ['badge-red',    'status.cancelled'],
    pending:   ['badge-amber',  'status.pending'],
  };
  const [cls, key] = map[status] || ['badge-gray', null];
  const label = key ? t(key) : status;
  return `<span class="badge ${cls}">${label}</span>`;
}

function avatarColor(helper) {
  const map = { blue: 'avatar-blue', teal: 'avatar-teal', amber: 'avatar-amber' };
  return map[helper.color] || 'avatar-blue';
}

function cprScoreBar(helper) {
  const avg = Math.round(helper.cScore * 0.4 + helper.pScore * 0.4 + helper.rScore * 0.2);
  return `
    <div style="margin-top:10px">
      <div class="flex-between mb-1">
        <span class="text-xs text-muted">CPR Trust Score (C·P·R)</span>
        <span style="font-size:12px;font-weight:600;color:var(--blue)">${avg}/100</span>
      </div>
      <div style="height:5px;background:var(--gray-100);border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${avg}%;background:linear-gradient(90deg,var(--blue),var(--teal));border-radius:3px"></div>
      </div>
      <div class="flex-center gap-3 mt-1" style="font-size:10px;color:var(--gray-400)">
        <span>Credibility: ${helper.cScore}</span>
        <span>Professionalism: ${helper.pScore}</span>
        <span>Responsibility: ${helper.rScore}</span>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════
//  CareGo i18n — English · Thai · Chinese
// ══════════════════════════════════════════════════════════

const I18N = {
  current: 'en',

  set(lang) {
    this.current = lang;
    try { localStorage.setItem('carego_lang', lang); } catch(e) {}
    // Full re-render so every t() call picks up the new language
    App.render();
  },

  init() {
    try {
      const saved = localStorage.getItem('carego_lang');
      if (saved && ['en','th','cn'].includes(saved)) this.current = saved;
    } catch(e) {}
  },

  t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.current] || entry['en'] || key;
  },
};

// shorthand
function t(key) { return I18N.t(key); }

// ── TRANSLATIONS ───────────────────────────────────────────
const TRANSLATIONS = {

  // ── NAV ──
  'nav.home':        { en: 'Home',        th: 'หน้าแรก',         cn: '首页' },
  'nav.findHelper':  { en: 'Find Helper', th: 'ค้นหาผู้ช่วย',    cn: '寻找助手' },
  'nav.myBookings':  { en: 'My Bookings', th: 'การจองของฉัน',    cn: '我的预约' },
  'nav.dashboard':   { en: 'Dashboard',   th: 'แดชบอร์ด',        cn: '仪表板' },
  'nav.helpers':     { en: 'Helpers',     th: 'ผู้ช่วย',          cn: '助手列表' },
  'nav.login':       { en: 'Login',       th: 'เข้าสู่ระบบ',     cn: '登录' },
  'nav.signup':      { en: 'Sign Up',     th: 'สมัครสมาชิก',     cn: '注册' },
  'nav.signout':     { en: 'Sign out',    th: 'ออกจากระบบ',      cn: '退出登录' },
  'nav.myDashboard': { en: 'My Dashboard', th: 'แดชบอร์ดของฉัน', cn: '我的仪表板' },
  'nav.browseHelpers':{ en: 'Browse Helpers', th: 'ดูผู้ช่วย',   cn: '浏览助手' },

  // ── ROLES ──
  'role.admin':   { en: '🛡 Admin',   th: '🛡 ผู้ดูแล',      cn: '🛡 管理员' },
  'role.helper':  { en: '🏥 Helper',  th: '🏥 ผู้ช่วย',      cn: '🏥 助手' },
  'role.family':  { en: '👤 Family',  th: '👤 ครอบครัว',    cn: '👤 家属' },

  // ── HERO ──
  'hero.badge':   { en: '🏥 On-Demand Healthcare Companion — Khon Kaen', th: '🏥 บริการผู้ช่วยดูแลผู้สูงอายุ — ขอนแก่น', cn: '🏥 按需医疗陪护服务 — 孔敬' },
  'hero.h1a':     { en: "Your elderly parent's visit.", th: 'การไปโรงพยาบาลของผู้ปกครอง', cn: '您年迈父母的就医之旅。' },
  'hero.h1b':     { en: 'Handled with care.',           th: 'ดูแลด้วยใจ',                  cn: '由我们用心守护。' },
  'hero.sub':     {
    en: 'You cannot take leave from work — but your parent needs hospital today. CareGo sends a trained, verified university student to accompany them safely, and keeps you updated in real time.',
    th: 'คุณลางานไม่ได้ — แต่ผู้ปกครองต้องไปโรงพยาบาลวันนี้ CareGo ส่งนิสิตมหาวิทยาลัยที่ผ่านการฝึกอบรมและตรวจสอบแล้วไปดูแลอย่างปลอดภัย พร้อมอัปเดตให้คุณทราบแบบเรียลไทม์',
    cn: '您无法请假，但您的父母今天需要去医院。CareGo 派遣经过培训和核实的大学生安全陪伴，并实时向您更新情况。',
  },
  'hero.cta1':    { en: 'Book a Companion →', th: 'จองผู้ช่วยดูแล →', cn: '立即预约 →' },
  'hero.cta2':    { en: 'View Packages',       th: 'ดูแพ็กเกจ',        cn: '查看套餐' },

  // ── WHO THIS IS FOR ──
  'who.badge':    { en: 'Who this is for',                       th: 'บริการนี้เหมาะสำหรับใคร',             cn: '适合人群' },
  'who.title':    { en: 'Built for busy working families',       th: 'สร้างขึ้นสำหรับครอบครัวที่ยุ่งอยู่กับงาน', cn: '专为忙碌职场家庭打造' },
  'who.sub':      { en: 'Adult children aged 30–55 with stable income who love their parents but simply cannot always be there.', th: 'บุตรหลานวัยทำงานอายุ 30–55 ปี ที่มีรายได้มั่นคง รักผู้ปกครอง แต่ไม่สามารถไปด้วยได้เสมอ', cn: '30-55岁有稳定收入的在职子女，爱父母却无法时刻陪伴。' },
  'who.gov':      { en: 'Government Officers',    th: 'ข้าราชการ',            cn: '政府公务员' },
  'who.gov.desc': { en: 'Cannot take leave but need someone trustworthy for their parents.', th: 'ลางานไม่ได้ แต่ต้องการคนที่ไว้ใจได้ดูแลผู้ปกครอง', cn: '无法请假，却需要可靠的人照看父母。' },
  'who.pro':      { en: 'High-Income Professionals', th: 'มืออาชีพรายได้สูง',  cn: '高收入专业人士' },
  'who.pro.desc': { en: 'Value time. Happy to pay for convenience and peace of mind.', th: 'ให้คุณค่ากับเวลา ยินดีจ่ายเพื่อความสะดวกและความสบายใจ', cn: '珍视时间，愿意为便利和安心付费。' },
  'who.biz':      { en: 'Business Owners',        th: 'เจ้าของธุรกิจ',        cn: '企业主' },
  'who.biz.desc': { en: 'Frequent travel makes it impossible to accompany elderly parents.', th: 'เดินทางบ่อยจนไม่สามารถพาผู้ปกครองสูงอายุไปโรงพยาบาลได้', cn: '频繁出差使其无法陪伴年迈父母。' },
  'who.econ':     { en: 'The Convenience Economy principle', th: 'หลักการ Convenience Economy', cn: '便利经济学原则' },
  'who.econ.desc':{ en: 'If taking one day off work costs you more than ฿1,000 — CareGo already pays for itself. You pay for time saved and peace of mind.', th: 'ถ้าการลางานหนึ่งวันทำให้คุณเสียค่าเสียโอกาสมากกว่า 1,000 บาท — CareGo คุ้มค่าตั้งแต่ครั้งแรก คุณจ่ายเพื่อเวลาและความสบายใจ', cn: '如果请一天假的机会成本超过1,000泰铢，CareGo 物超所值。您为节省时间和安心购单。' },

  // ── STATS ──
  'stat.helpers':    { en: 'Certified Helpers',  th: 'ผู้ช่วยผ่านการรับรอง', cn: '认证助手' },
  'stat.starting':   { en: 'Starting Package',   th: 'แพ็กเกจเริ่มต้น',       cn: '起步套餐' },
  'stat.rating':     { en: 'Average Rating',     th: 'คะแนนเฉลี่ย',           cn: '平均评分' },
  'stat.completion': { en: 'Completion Rate',    th: 'อัตราสำเร็จ',            cn: '完成率' },

  // ── USE CASES ──
  'use.badge':       { en: 'For elderly parents aged 60+', th: 'สำหรับผู้สูงอายุ 60 ปีขึ้นไป', cn: '适用于60岁以上老人' },
  'use.title':       { en: 'Common situations we handle',  th: 'สถานการณ์ทั่วไปที่เราดูแล',    cn: '我们处理的常见情况' },
  'use.sub':         { en: 'Your parent deserves dignity and care — even when you cannot be there', th: 'ผู้ปกครองของคุณสมควรได้รับการดูแลด้วยศักดิ์ศรี — แม้คุณจะไปด้วยไม่ได้', cn: '您的父母值得被有尊严地照顾 — 即使您不在场' },
  'use.dialysis':    { en: 'Regular Dialysis',          th: 'ฟอกไต',                      cn: '定期透析' },
  'use.chronic':     { en: 'Chronic Disease Follow-up', th: 'ติดตามโรคเรื้อรัง',          cn: '慢性病复诊' },
  'use.mobility':    { en: 'Mobility Difficulty',       th: 'ปัญหาการเคลื่อนไหว',        cn: '行动不便' },
  'use.medicine':    { en: 'Medication Pickup',         th: 'รับยา',                       cn: '取药' },
  'use.lab':         { en: 'Lab Tests & Results',       th: 'ตรวจเลือดและรับผล',          cn: '化验及取结果' },
  'use.surgery':     { en: 'Post-Surgery Follow-up',    th: 'ติดตามหลังผ่าตัด',           cn: '术后复查' },

  // ── PACKAGES ──
  'pkg.badge':       { en: 'Pricing packages',          th: 'แพ็กเกจบริการ',              cn: '收费套餐' },
  'pkg.title':       { en: 'Clear, transparent pricing', th: 'ราคาชัดเจน โปร่งใส',        cn: '明确透明的定价' },
  'pkg.sub':         { en: 'No hidden fees. Add-ons available. Overtime at ฿200/hour.', th: 'ไม่มีค่าใช้จ่ายซ่อนเร้น มีบริการเสริม ค่าล่วงเวลา 200 บาท/ชั่วโมง', cn: '无隐藏费用。可加购服务。加班费200铢/小时。' },
  'pkg.book':        { en: 'Book This Package',         th: 'จองแพ็กเกจนี้',               cn: '预约此套餐' },
  'pkg.helper':      { en: 'Helper receives',           th: 'ผู้ช่วยได้รับ',               cn: '助手获得' },
  'pkg.overtime':    { en: 'Overtime',                  th: 'ล่วงเวลา',                   cn: '加班费' },
  'pkg.addons':      { en: 'Available Add-Ons',         th: 'บริการเสริม',                 cn: '可选附加服务' },

  // ── SUBSCRIPTIONS ──
  'sub.badge':       { en: 'For recurring visits',      th: 'สำหรับการเยี่ยมซ้ำ',         cn: '适合定期就诊' },
  'sub.title':       { en: 'Subscription Plans',        th: 'แผนสมาชิก',                   cn: '订阅计划' },
  'sub.sub':         { en: 'Save more on dialysis and regular chronic care bookings', th: 'ประหยัดมากขึ้นสำหรับการฟอกไตและการดูแลเรื้อรัง', cn: '透析及慢性病定期就诊更划算' },
  'sub.month':       { en: '/month',                    th: '/เดือน',                      cn: '/月' },
  'sub.get':         { en: 'Get',                       th: 'รับ',                          cn: '选择' },
  'sub.priority':    { en: '⚡ Priority booking included', th: '⚡ มีสิทธิ์จองก่อน',       cn: '⚡ 含优先预约权' },

  // ── TRUST ──
  'trust.badge':     { en: 'Safety & Trust',            th: 'ความปลอดภัยและความน่าเชื่อถือ', cn: '安全与信任' },
  'trust.title':     { en: 'Why families trust CareGo', th: 'ทำไมครอบครัวถึงไว้วางใจ CareGo', cn: '为什么家庭信任 CareGo' },
  'trust.sub':       { en: 'The biggest concern is trust. We address every worry a family has.', th: 'ความกังวลหลักคือความไว้ใจ เราตอบทุกความกังวลของครอบครัว', cn: '最大顾虑是信任。我们解答家庭的每一个担忧。' },
  'trust.id':        { en: 'National ID Verified',      th: 'ตรวจสอบบัตรประชาชน',          cn: '身份证核实' },
  'trust.id.desc':   { en: "Every helper's identity is verified before joining.", th: 'ตรวจสอบตัวตนผู้ช่วยทุกคนก่อนเข้าร่วม', cn: '每位助手加入前均经过身份核实。' },
  'trust.student':   { en: 'Student ID Confirmed',      th: 'ยืนยันบัตรนิสิต',             cn: '学生证确认' },
  'trust.student.desc':{ en: 'All helpers are active KKU students in nursing, medicine, or allied health.', th: 'ผู้ช่วยทุกคนเป็นนิสิต KKU ที่กำลังศึกษาด้านพยาบาล แพทย์ หรือสาธารณสุข', cn: '所有助手均为KKU在读护理、医学或医疗卫生专业学生。' },
  'trust.cpr':       { en: 'CPR Certified',             th: 'ผ่านการฝึก CPR',               cn: 'CPR认证' },
  'trust.cpr.desc':  { en: 'Minimum 2-hour onboarding including CPR awareness and elderly communication.', th: 'อบรมขั้นต่ำ 2 ชั่วโมง รวมถึงการปฐมพยาบาลและการสื่อสารกับผู้สูงอายุ', cn: '最少2小时入职培训，包含CPR意识和老年人沟通技巧。' },
  'trust.nda':       { en: 'NDA Signed',                th: 'เซ็น NDA',                     cn: '签署保密协议' },
  'trust.nda.desc':  { en: "All helpers sign a service agreement protecting your family's privacy.", th: 'ผู้ช่วยทุกคนเซ็นสัญญาบริการเพื่อปกป้องความเป็นส่วนตัวของครอบครัว', cn: '所有助手均签署服务协议，保护您的家庭隐私。' },
  'trust.updates':   { en: 'Real-Time Updates',         th: 'อัปเดตแบบเรียลไทม์',          cn: '实时更新' },
  'trust.updates.desc':{ en: 'Families receive live updates — arrived, waiting, got medicine, returning home.', th: 'ครอบครัวได้รับอัปเดตสด — ถึงแล้ว รอหมอ รับยา กำลังกลับบ้าน', cn: '家属实时获得更新——到达、等待、取药、返家。' },
  'trust.summary':   { en: 'Visit Summary Report',      th: 'รายงานสรุปการเยี่ยม',         cn: '就诊总结报告' },
  'trust.summary.desc':{ en: 'After every visit: doctor notes, next appointment, cost breakdown.', th: 'หลังทุกการเยี่ยม: บันทึกแพทย์ นัดครั้งต่อไป รายละเอียดค่าใช้จ่าย', cn: '每次就诊后：医生记录、下次预约、费用明细。' },

  // ── CPR FRAMEWORK ──
  'cpr.standard':    { en: 'Our Quality Standard',      th: 'มาตรฐานคุณภาพของเรา',         cn: '我们的质量标准' },
  'cpr.title':       { en: 'The CPR Framework',         th: 'กรอบ CPR',                    cn: 'CPR 框架' },
  'cpr.sub':         { en: 'Every helper is scored on three dimensions before each booking', th: 'ผู้ช่วยทุกคนได้รับการประเมิน 3 มิติก่อนรับงาน', cn: '每位助手在每次预约前均从三个维度进行评分' },
  'cpr.c':           { en: 'Credibility',               th: 'ความน่าเชื่อถือ',              cn: '可信度' },
  'cpr.p':           { en: 'Professionalism',           th: 'ความเป็นมืออาชีพ',            cn: '专业性' },
  'cpr.r':           { en: 'Responsibility',            th: 'ความรับผิดชอบ',                cn: '责任感' },

  // ── FIND HELPERS PAGE ──
  'helpers.title':   { en: 'Find a Companion',          th: 'ค้นหาผู้ช่วยดูแล',            cn: '寻找陪护助手' },
  'helpers.sub':     { en: 'All helpers are verified KKU students — CPR certified & elderly care trained', th: 'ผู้ช่วยทุกคนเป็นนิสิต KKU ที่ผ่านการรับรอง CPR และฝึกดูแลผู้สูงอายุ', cn: '所有助手均为KKU认证学生，持有CPR证书，接受老年护理培训' },
  'helpers.search':  { en: 'Search name or specialty…', th: 'ค้นหาชื่อหรือความเชี่ยวชาญ…', cn: '搜索姓名或专业…' },
  'helpers.lang':    { en: 'Language',                  th: 'ภาษา',                        cn: '语言' },
  'helpers.spec':    { en: 'Specialty',                 th: 'ความเชี่ยวชาญ',               cn: '专业' },
  'helpers.avail':   { en: 'Available now',             th: 'ว่างตอนนี้',                  cn: '当前可用' },
  'helpers.reset':   { en: 'Reset',                     th: 'รีเซ็ต',                      cn: '重置' },
  'helpers.found':   { en: 'helpers found',             th: 'ผู้ช่วย',                     cn: '位助手' },
  'helpers.from':    { en: 'Packages from',             th: 'แพ็กเกจเริ่ม',               cn: '套餐起价' },
  'helpers.none':    { en: 'No helpers found',          th: 'ไม่พบผู้ช่วย',               cn: '未找到助手' },
  'helpers.adjust':  { en: 'Try adjusting your filters', th: 'ลองปรับตัวกรอง',            cn: '请调整筛选条件' },
  'helpers.book':    { en: 'Book Now',                  th: 'จองเลย',                      cn: '立即预约' },
  'helpers.profile': { en: 'Profile',                   th: 'โปรไฟล์',                    cn: '查看资料' },

  // ── BOOKING ──
  'book.title':      { en: 'Book a Companion',          th: 'จองผู้ช่วยดูแล',              cn: '预约陪护' },
  'book.sub':        { en: 'For your elderly parent — you stay updated every step', th: 'สำหรับผู้ปกครองสูงอายุ — คุณจะได้รับอัปเดตทุกขั้นตอน', cn: '为您的年迈父母——您将随时获得更新' },
  'book.parent':     { en: 'Elderly Parent Details',    th: 'ข้อมูลผู้ปกครองสูงอายุ',     cn: '老人信息' },
  'book.pname':      { en: "Parent's name",             th: 'ชื่อผู้ปกครอง',               cn: '父母姓名' },
  'book.age':        { en: 'Age',                       th: 'อายุ',                        cn: '年龄' },
  'book.visit':      { en: 'Visit Details',             th: 'รายละเอียดการไปโรงพยาบาล',    cn: '就诊详情' },
  'book.hospital':   { en: 'Hospital',                  th: 'โรงพยาบาล',                  cn: '医院' },
  'book.dept':       { en: 'Department / Purpose',      th: 'แผนก / วัตถุประสงค์',        cn: '科室/目的' },
  'book.date':       { en: 'Visit date',                th: 'วันที่ไปโรงพยาบาล',           cn: '就诊日期' },
  'book.package':    { en: 'Select Package',            th: 'เลือกแพ็กเกจ',               cn: '选择套餐' },
  'book.addons':     { en: 'Add-Ons (optional)',        th: 'บริการเสริม (ไม่บังคับ)',     cn: '附加服务（可选）' },
  'book.notes':      { en: 'Special Notes',             th: 'หมายเหตุพิเศษ',              cn: '特别说明' },
  'book.notes.ph':   { en: 'Medical conditions, mobility needs, medications…', th: 'โรคประจำตัว ความต้องการพิเศษ ยาที่ใช้…', cn: '病情、行动需求、用药情况…' },
  'book.confirm':    { en: 'Confirm Booking',           th: 'ยืนยันการจอง',               cn: '确认预约' },
  'book.summary':    { en: 'Booking Summary',           th: 'สรุปการจอง',                 cn: '预约摘要' },
  'book.total':      { en: 'Total',                     th: 'รวม',                         cn: '合计' },
  'book.helper':     { en: 'Helper',                    th: 'ผู้ช่วย',                     cn: '助手' },
  'book.dept2':      { en: 'Department',                th: 'แผนก',                       cn: '科室' },
  'book.pkg2':       { en: 'Package',                   th: 'แพ็กเกจ',                    cn: '套餐' },
  'book.what':       { en: 'What your family gets',     th: 'สิ่งที่ครอบครัวได้รับ',       cn: '您的家庭将获得' },
  'book.what.desc':  { en: 'Live updates · Visit summary report · Helper contact · Peace of mind', th: 'อัปเดตสด · รายงานสรุป · ติดต่อผู้ช่วย · ความสบายใจ', cn: '实时更新·就诊总结·助手联系方式·安心保障' },
  'book.cancel':     { en: 'Payment on arrival · Cancel up to 2 hrs before', th: 'ชำระเงินวันนับ · ยกเลิกก่อน 2 ชั่วโมง', cn: '到达付款 · 可提前2小时取消' },

  // ── TRACKING ──
  'track.title':     { en: 'Live Tracking',             th: 'ติดตามสด',                   cn: '实时追踪' },
  'track.booking':   { en: 'Booking',                   th: 'การจอง',                     cn: '预约' },
  'track.progress':  { en: 'Progress',                  th: 'ความคืบหน้า',                cn: '进度' },
  'track.step1':     { en: 'On the way',                th: 'กำลังเดินทาง',               cn: '正在前往' },
  'track.step2':     { en: 'Arrived',                   th: 'ถึงแล้ว',                    cn: '已到达' },
  'track.step3':     { en: 'In service',                th: 'กำลังให้บริการ',             cn: '服务中' },
  'track.step4':     { en: 'Completed',                 th: 'เสร็จสิ้น',                  cn: '已完成' },
  'track.live':      { en: 'Live Chat',                 th: 'แชทสด',                      cn: '实时聊天' },
  'track.call':      { en: 'Call Helper',               th: 'โทรหาผู้ช่วย',              cn: '致电助手' },
  'track.share':     { en: 'Share Progress with Family', th: 'แชร์ความคืบหน้ากับครอบครัว', cn: '与家人分享进度' },
  'track.rate':      { en: '⭐ Rate Your Experience',   th: '⭐ ให้คะแนนประสบการณ์',       cn: '⭐ 评价体验' },
  'track.map':       { en: 'Meeting Point',             th: 'จุดนัดพบ',                   cn: '集合地点' },
  'track.details':   { en: 'Booking Details',           th: 'รายละเอียดการจอง',           cn: '预约详情' },
  'track.advance':   { en: 'Advance to next step →',   th: 'ไปขั้นตอนถัดไป →',           cn: '进入下一步 →' },
  'track.done':      { en: 'Rate your experience →',   th: 'ให้คะแนนประสบการณ์ →',        cn: '评价体验 →' },

  // ── DASHBOARD ──
  'dash.title':      { en: 'My Bookings',               th: 'การจองของฉัน',               cn: '我的预约' },
  'dash.sub':        { en: 'Track and manage all your CareGo visits', th: 'ติดตามและจัดการการไปโรงพยาบาลทุกครั้ง', cn: '追踪和管理您的所有 CareGo 就诊' },
  'dash.book':       { en: '+ Book a Helper',           th: '+ จองผู้ช่วย',               cn: '+ 预约助手' },
  'dash.total':      { en: 'Total Bookings',            th: 'การจองทั้งหมด',              cn: '总预约数' },
  'dash.active':     { en: 'Active Now',                th: 'กำลังดำเนินการ',             cn: '当前进行中' },
  'dash.completed':  { en: 'Completed',                 th: 'เสร็จสิ้น',                  cn: '已完成' },
  'dash.spent':      { en: 'Total Spent',               th: 'ยอดรวมที่จ่าย',              cn: '总支出' },
  'dash.none':       { en: 'No bookings yet',           th: 'ยังไม่มีการจอง',             cn: '暂无预约' },

  // ── LOGIN ──
  'auth.signin':     { en: 'Sign in to CareGo',         th: 'เข้าสู่ระบบ CareGo',         cn: '登录 CareGo' },
  'auth.create':     { en: 'Create account',            th: 'สร้างบัญชี',                 cn: '创建账户' },
  'auth.signin.sub': { en: 'Sign in to your CareGo account', th: 'เข้าสู่บัญชี CareGo ของคุณ', cn: '登录您的 CareGo 账户' },
  'auth.create.sub': { en: 'Create your CareGo account', th: 'สร้างบัญชี CareGo ของคุณ', cn: '创建您的 CareGo 账户' },
  'auth.name':       { en: 'Full name',                 th: 'ชื่อ-นามสกุล',               cn: '全名' },
  'auth.email':      { en: 'Email address',             th: 'อีเมล',                      cn: '电子邮箱' },
  'auth.send':       { en: 'Send OTP →',                th: 'ส่ง OTP →',                  cn: '发送验证码 →' },
  'auth.create.btn': { en: 'Create Account →',          th: 'สร้างบัญชี →',               cn: '创建账户 →' },
  'auth.no.account': { en: 'No account?',              th: 'ยังไม่มีบัญชี?',              cn: '没有账户？' },
  'auth.signup.link':{ en: 'Sign up free',              th: 'สมัครฟรี',                   cn: '免费注册' },
  'auth.have':       { en: 'Have an account?',          th: 'มีบัญชีแล้ว?',               cn: '已有账户？' },
  'auth.signin.link':{ en: 'Sign in',                   th: 'เข้าสู่ระบบ',                cn: '登录' },
  'auth.otp.check':  { en: 'Check your email',          th: 'ตรวจสอบอีเมลของคุณ',         cn: '检查您的邮箱' },
  'auth.otp.sent':   { en: 'We sent a 6-digit code to', th: 'เราส่งรหัส 6 หลักไปยัง',    cn: '我们已发送6位验证码至' },
  'auth.otp.enter':  { en: 'Enter 6-digit OTP code',   th: 'กรอกรหัส OTP 6 หลัก',        cn: '输入6位验证码' },
  'auth.otp.verify': { en: 'Verify & Sign In',          th: 'ยืนยันและเข้าสู่ระบบ',       cn: '验证并登录' },
  'auth.otp.resend': { en: 'Resend code',               th: 'ส่งรหัสใหม่',                cn: '重新发送' },
  'auth.otp.back':   { en: '← Back to email',          th: '← กลับไปใส่อีเมล',           cn: '← 返回邮箱' },
  'auth.demo':       { en: 'Demo accounts:',            th: 'บัญชีทดสอบ:',                cn: '演示账户:' },

  // ── CTA ──
  'cta.title':       { en: 'Your parent deserves care.\nYou deserve peace of mind.', th: 'ผู้ปกครองของคุณสมควรได้รับการดูแล\nคุณสมควรได้รับความสบายใจ', cn: '您的父母值得被照顾。\n您值得拥有安心。' },
  'cta.sub':         { en: 'Book a certified CareGo companion today — in minutes, via our app or LINE OA.', th: 'จองผู้ช่วย CareGo ที่ผ่านการรับรองวันนี้ — ภายในไม่กี่นาที ผ่านแอปหรือ LINE OA', cn: '今天就预约经过认证的 CareGo 陪护 — 几分钟内完成，通过应用或 LINE OA。' },
  'cta.btn1':        { en: 'Get Started Free →',        th: 'เริ่มต้นฟรี →',               cn: '免费开始 →' },
  'cta.btn2':        { en: 'Meet the Helpers',          th: 'พบกับผู้ช่วย',               cn: '认识助手' },
};

// ═══════════════════════════════════════════════════════════
//  CareGo Database — localStorage persistence layer
//  All user-generated data is stored here and survives
//  page refreshes / browser restarts.
// ═══════════════════════════════════════════════════════════

const DB = {

  // ── KEYS ──────────────────────────────────────────────────
  KEYS: {
    USERS:       'carego_users',
    SESSIONS:    'carego_session',
    BOOKINGS:    'carego_bookings',
    REVIEWS:     'carego_reviews',
    HELPERS:     'carego_helpers',
    NOTIFS:      'carego_notifs',
    AUDIT:       'carego_audit',
  },

  // ── LOW-LEVEL READ / WRITE ─────────────────────────────────
  _read(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch(e) { console.warn('[DB] read error', key, e); return null; }
  },

  _write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      console.warn('[DB] write error', key, e);
      if (e.name === 'QuotaExceededError') {
        Toast.error('Storage full — please clear old data in Admin panel.');
      }
      return false;
    }
  },

  _remove(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  },

  // ── INIT ──────────────────────────────────────────────────
  // Seeds demo data on first run, then loads persisted data
  // into the runtime arrays (HELPERS, SAMPLE_BOOKINGS, REVIEWS)
  init() {
    // Seed demo accounts if none exist
    if (!this._read(this.KEYS.USERS)) {
      const demoUsers = {
        'patient@carego.app': {
          email: 'patient@carego.app', name: 'Somchai W.',
          initials: 'SW', role: 'patient',
          createdAt: new Date().toISOString(), bookingCount: 3,
        },
        'helper@carego.app': {
          email: 'helper@carego.app', name: 'Siriporn K.',
          initials: 'SK', role: 'helper', helperId: 'h1',
          createdAt: new Date().toISOString(), bookingCount: 89,
        },
        'admin@carego.app': {
          email: 'admin@carego.app', name: 'Admin User',
          initials: 'AU', role: 'admin',
          createdAt: new Date().toISOString(), bookingCount: 0,
        },
      };
      this._write(this.KEYS.USERS, demoUsers);
    }

    // Seed demo bookings if none exist
    if (!this._read(this.KEYS.BOOKINGS)) {
      this._write(this.KEYS.BOOKINGS, SAMPLE_BOOKINGS);
    }

    // Seed demo reviews if none exist
    if (!this._read(this.KEYS.REVIEWS)) {
      this._write(this.KEYS.REVIEWS, REVIEWS);
    }

    // Seed helpers if none exist
    if (!this._read(this.KEYS.HELPERS)) {
      this._write(this.KEYS.HELPERS, HELPERS);
    }

    // Load persisted data into runtime arrays
    this._syncToRuntime();

    // Restore session
    this._restoreSession();

    console.log('[DB] Initialised. Storage usage:', this.storageUsed());
  },

  // ── SYNC persisted data → runtime arrays ──────────────────
  _syncToRuntime() {
    // Bookings
    const savedBookings = this._read(this.KEYS.BOOKINGS);
    if (savedBookings) {
      SAMPLE_BOOKINGS.length = 0;
      savedBookings.forEach(b => SAMPLE_BOOKINGS.push(b));
    }

    // Reviews
    const savedReviews = this._read(this.KEYS.REVIEWS);
    if (savedReviews) {
      REVIEWS.length = 0;
      savedReviews.forEach(r => REVIEWS.push(r));
    }

    // Helpers
    const savedHelpers = this._read(this.KEYS.HELPERS);
    if (savedHelpers) {
      HELPERS.length = 0;
      savedHelpers.forEach(h => HELPERS.push(h));
    }
  },

  // ── SESSION ───────────────────────────────────────────────
  saveSession(user) {
    this._write(this.KEYS.SESSIONS, {
      user,
      role: user.role,
      savedAt: new Date().toISOString(),
    });
    this.audit('LOGIN', { email: user.email, role: user.role });
  },

  _restoreSession() {
    const session = this._read(this.KEYS.SESSIONS);
    if (session && session.user) {
      State.role        = session.role;
      State.currentUser = session.user;
      console.log('[DB] Session restored:', session.user.email);
    }
  },

  clearSession() {
    const user = State.currentUser;
    if (user) this.audit('LOGOUT', { email: user.email });
    this._remove(this.KEYS.SESSIONS);
  },

  // ── USERS ─────────────────────────────────────────────────
  getUser(email) {
    const users = this._read(this.KEYS.USERS) || {};
    return users[email.toLowerCase()] || null;
  },

  saveUser(email, data) {
    const users = this._read(this.KEYS.USERS) || {};
    const key   = email.toLowerCase();
    const isNew = !users[key];
    users[key]  = { ...users[key], ...data, email: key, updatedAt: new Date().toISOString() };
    if (isNew) {
      users[key].createdAt  = new Date().toISOString();
      users[key].bookingCount = 0;
    }
    this._write(this.KEYS.USERS, users);
    this.audit(isNew ? 'REGISTER' : 'UPDATE_USER', { email: key, role: data.role });
    return users[key];
  },

  getAllUsers() {
    return Object.values(this._read(this.KEYS.USERS) || {});
  },

  deleteUser(email) {
    const users = this._read(this.KEYS.USERS) || {};
    delete users[email.toLowerCase()];
    this._write(this.KEYS.USERS, users);
    this.audit('DELETE_USER', { email });
  },

  // ── BOOKINGS ──────────────────────────────────────────────
  saveBooking(booking) {
    const bookings = this._read(this.KEYS.BOOKINGS) || [];
    const idx      = bookings.findIndex(b => b.id === booking.id);
    if (idx >= 0) {
      bookings[idx] = { ...bookings[idx], ...booking, updatedAt: new Date().toISOString() };
    } else {
      bookings.unshift({ ...booking, createdAt: new Date().toISOString() });
      // Increment user booking count
      if (booking.patientEmail) {
        const u = this.getUser(booking.patientEmail);
        if (u) this.saveUser(booking.patientEmail, { bookingCount: (u.bookingCount||0)+1 });
      }
    }
    this._write(this.KEYS.BOOKINGS, bookings);
    // Sync runtime array
    SAMPLE_BOOKINGS.length = 0;
    bookings.forEach(b => SAMPLE_BOOKINGS.push(b));
    this.audit('BOOKING', { id: booking.id, status: booking.status, price: booking.price });
    return booking;
  },

  updateBookingStatus(bookingId, status, extra = {}) {
    const bookings = this._read(this.KEYS.BOOKINGS) || [];
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx >= 0) {
      bookings[idx] = { ...bookings[idx], status, ...extra, updatedAt: new Date().toISOString() };
      this._write(this.KEYS.BOOKINGS, bookings);
      SAMPLE_BOOKINGS.length = 0;
      bookings.forEach(b => SAMPLE_BOOKINGS.push(b));
      this.audit('BOOKING_STATUS', { id: bookingId, status });
    }
  },

  getBookingsByUser(email) {
    const bookings = this._read(this.KEYS.BOOKINGS) || [];
    return bookings.filter(b => b.patientEmail === email.toLowerCase());
  },

  getBookingsByHelper(helperId) {
    const bookings = this._read(this.KEYS.BOOKINGS) || [];
    return bookings.filter(b => b.helperId === helperId);
  },

  getAllBookings() {
    return this._read(this.KEYS.BOOKINGS) || [];
  },

  // ── REVIEWS ───────────────────────────────────────────────
  saveReview(review) {
    const reviews = this._read(this.KEYS.REVIEWS) || [];
    const idx     = reviews.findIndex(r => r.id === review.id);
    if (idx >= 0) {
      reviews[idx] = { ...reviews[idx], ...review };
    } else {
      reviews.unshift({ ...review, createdAt: new Date().toISOString() });
    }
    this._write(this.KEYS.REVIEWS, reviews);
    REVIEWS.length = 0;
    reviews.forEach(r => REVIEWS.push(r));
    this.audit('REVIEW', { helperId: review.helperId, rating: review.rating });
    return review;
  },

  getReviewsByHelper(helperId) {
    const reviews = this._read(this.KEYS.REVIEWS) || [];
    return reviews.filter(r => r.helperId === helperId);
  },

  // ── HELPERS ───────────────────────────────────────────────
  saveHelper(helper) {
    const helpers = this._read(this.KEYS.HELPERS) || [];
    const idx     = helpers.findIndex(h => h.id === helper.id);
    if (idx >= 0) {
      helpers[idx] = { ...helpers[idx], ...helper, updatedAt: new Date().toISOString() };
    } else {
      helpers.push({ ...helper, createdAt: new Date().toISOString() });
    }
    this._write(this.KEYS.HELPERS, helpers);
    HELPERS.length = 0;
    helpers.forEach(h => HELPERS.push(h));
    this.audit('HELPER_UPDATE', { id: helper.id });
    return helper;
  },

  // ── NOTIFICATIONS ─────────────────────────────────────────
  addNotif(userEmail, message, type = 'info') {
    const notifs = this._read(this.KEYS.NOTIFS) || {};
    if (!notifs[userEmail]) notifs[userEmail] = [];
    notifs[userEmail].unshift({
      id: 'n' + Date.now(),
      message, type,
      read: false,
      createdAt: new Date().toISOString(),
    });
    // Keep max 50 per user
    notifs[userEmail] = notifs[userEmail].slice(0, 50);
    this._write(this.KEYS.NOTIFS, notifs);
  },

  getNotifs(userEmail) {
    const notifs = this._read(this.KEYS.NOTIFS) || {};
    return notifs[userEmail] || [];
  },

  markNotifsRead(userEmail) {
    const notifs = this._read(this.KEYS.NOTIFS) || {};
    if (notifs[userEmail]) {
      notifs[userEmail].forEach(n => n.read = true);
      this._write(this.KEYS.NOTIFS, notifs);
    }
  },

  unreadCount(userEmail) {
    return this.getNotifs(userEmail).filter(n => !n.read).length;
  },

  // ── AUDIT LOG ─────────────────────────────────────────────
  audit(action, data = {}) {
    try {
      const log  = this._read(this.KEYS.AUDIT) || [];
      log.unshift({
        action,
        data,
        user: State.currentUser?.email || 'anonymous',
        ts:   new Date().toISOString(),
      });
      // Keep last 200 entries
      this._write(this.KEYS.AUDIT, log.slice(0, 200));
    } catch(e) {}
  },

  getAuditLog() {
    return this._read(this.KEYS.AUDIT) || [];
  },

  // ── STORAGE STATS ─────────────────────────────────────────
  storageUsed() {
    let total = 0;
    for (const key of Object.values(this.KEYS)) {
      const val = localStorage.getItem(key);
      if (val) total += val.length * 2; // UTF-16 = 2 bytes per char
    }
    return (total / 1024).toFixed(1) + ' KB';
  },

  storageBreakdown() {
    const result = {};
    for (const [name, key] of Object.entries(this.KEYS)) {
      const val = localStorage.getItem(key);
      result[name] = val ? ((val.length * 2) / 1024).toFixed(2) + ' KB' : '0 KB';
    }
    return result;
  },

  // ── CLEAR ALL ─────────────────────────────────────────────
  clearAll() {
    for (const key of Object.values(this.KEYS)) {
      localStorage.removeItem(key);
    }
    console.log('[DB] All data cleared');
  },

  exportJSON() {
    const data = {};
    for (const [name, key] of Object.entries(this.KEYS)) {
      data[name] = this._read(key);
    }
    return JSON.stringify(data, null, 2);
  },
};

// ── ROUTER ─────────────────────────────────────────────────
const Router = {
  current: 'landing',
  params: {},

  go(page, params = {}) {
    this.current = page;
    this.params = params;
    App.render();
    window.scrollTo(0, 0);
  },
};

// ── TOAST ──────────────────────────────────────────────────
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(msg, type = 'info', duration = 3000) {
    const t = document.createElement('div');
    const icons = { info: 'ℹ', success: '✓', error: '✕' };
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
    this.container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(40px)';
      t.style.transition = '0.3s ease';
      setTimeout(() => t.remove(), 300);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  info(msg) { this.show(msg, 'info'); },
};

// ── MODAL ──────────────────────────────────────────────────
const Modal = {
  show(contentHTML, title = '') {
    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal slide-up">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="Modal.close(); event.stopPropagation()">×</button>
        </div>
        <div class="modal-body">${contentHTML}</div>
      </div>`;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) { e.stopPropagation(); Modal.close(); }
    });
    // Prevent inner modal clicks from bubbling to overlay
    overlay.querySelector('.modal').addEventListener('click', e => e.stopPropagation());
    document.body.appendChild(overlay);
    this._overlay = overlay;
  },

  close() {
    if (_timerInterval) clearInterval(_timerInterval);
    Auth.step = 'entry';
    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
  },
};

// ── NAVBAR ─────────────────────────────────────────────────
function renderNavbar() {
  const links = State.role === 'admin'
    ? [
        { id: 'admin',   label: t('nav.dashboard') },
        { id: 'helpers', label: t('nav.helpers') },
      ]
    : State.role === 'helper'
    ? [
        { id: 'helper-dashboard', label: t('nav.myDashboard') },
        { id: 'helpers',          label: t('nav.browseHelpers') },
      ]
    : [
        { id: 'landing',   label: t('nav.home') },
        { id: 'helpers',   label: t('nav.findHelper') },
        { id: 'dashboard', label: t('nav.myBookings') },
      ];

  const linksHTML = links.map(l => `
    <button class="nav-link ${Router.current === l.id ? 'active' : ''}" onclick="Router.go('${l.id}')">
      ${l.label}
    </button>`).join('');

  const roleHTML = State.role
    ? `<span class="role-badge">${
        State.role === 'admin'  ? t('role.admin') :
        State.role === 'helper' ? t('role.helper') : t('role.family')
      }</span>`
    : '';

  const authHTML = State.role
    ? `<button class="btn btn-secondary btn-sm" onclick="logout()">${t('nav.signout')}</button>`
    : `<button class="btn btn-secondary btn-sm" onclick="showLoginModal('login')">${t('nav.login')}</button>
       <button class="btn btn-primary btn-sm" onclick="showLoginModal('signup')">${t('nav.signup')}</button>`;

  const cur = (typeof I18N !== 'undefined') ? I18N.current : 'en';
  const langSwitcher = `
    <div class="lang-switcher">
      <button class="lang-btn ${cur === 'en' ? 'lang-active' : ''}" data-lang="en" onclick="I18N.set('en')">EN</button>
      <button class="lang-btn ${cur === 'th' ? 'lang-active' : ''}" data-lang="th" onclick="I18N.set('th')">TH</button>
      <button class="lang-btn ${cur === 'cn' ? 'lang-active' : ''}" data-lang="cn" onclick="I18N.set('cn')">CN</button>
    </div>`;

  return `
    <nav class="navbar">
      <a class="navbar-brand" onclick="Router.go('landing')">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.81 3.89 13.89 5.27C14.5 4.5 15.5 4 16.5 4C18.43 4 20 5.57 20 7.5C20 12.5 12 21 12 21Z" fill="white"/>
            <path d="M9 11h6M12 8v6" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        CareGo
      </a>
      <div class="navbar-links">${linksHTML}</div>
      <div class="navbar-actions">
        ${langSwitcher}
        ${roleHTML}
        ${authHTML}
      </div>
    </nav>`;
}

// ── HELPER CARD ─────────────────────────────────────────────
function renderHelperCard(helper, compact = false) {
  const langTags = helper.languages.map(l => `<span class="tag tag-blue">${l}</span>`).join('');
  const specTags = helper.specialties.map(s => `<span class="tag tag-gray">${s}</span>`).join('');
  const avail = helper.available
    ? `<span class="badge badge-green">Available</span>`
    : `<span class="badge badge-gray">Busy</span>`;

  return `
    <div class="helper-card fade-in" onclick="openHelperDetail('${helper.id}')">
      <div class="helper-top">
        <div class="avatar avatar-md ${avatarColor(helper)}">${helper.initials}</div>
        <div class="helper-meta">
          <div class="helper-name">${helper.name}</div>
          <div class="helper-faculty">${helper.faculty}</div>
          <div class="flex-center gap-2 mb-2">
            ${starsHTML(helper.rating)}
            <span class="text-sm text-muted">${helper.rating} (${helper.reviews} reviews)</span>
          </div>
          <div class="flex-center gap-2">
            ${avail}
            ${langTags}
          </div>
        </div>
        <div class="text-right" style="flex-shrink:0">
          <div class="helper-price">${formatPrice(helper.price)}<span>/hr</span></div>
        </div>
      </div>
      <div class="helper-specialties mb-3">${specTags}</div>
      ${!compact ? `<p class="text-sm text-muted mb-3" style="line-height:1.6">${helper.bio}</p>` : ''}
      <div class="helper-actions">
        <button class="btn btn-primary btn-sm flex-1" onclick="event.stopPropagation(); bookHelper('${helper.id}')">Book Now</button>
        <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openHelperDetail('${helper.id}')">Profile</button>
      </div>
    </div>`;
}

// ── REVIEW CARD ─────────────────────────────────────────────
function renderReviewCard(review) {
  const initials = review.patient.split(' ').map(n => n[0]).join('');
  return `
    <div class="review-card mb-3">
      <div class="review-header">
        <div class="avatar avatar-sm avatar-blue">${initials}</div>
        <div class="review-meta">
          <div class="review-name">${review.patient}</div>
          <div class="review-date">${review.date}</div>
        </div>
        <div>${starsHTML(review.rating)}</div>
      </div>
      <p class="review-text">${review.text}</p>
    </div>`;
}

// ── AUTH STATE ──────────────────────────────────────────────
const Auth = {
  step: 'entry',      // 'entry' | 'otp' | 'role'
  mode: 'login',      // 'login' | 'signup'
  email: '',
  name: '',
  generatedOTP: '',
  otpExpiry: 0,
  attempts: 0,

  // Demo accounts
  accounts: {
    'patient@carego.app':  { name: 'Somchai W.',  role: 'patient', initials: 'SW' },
    'helper@carego.app':   { name: 'Siriporn K.', role: 'helper',  initials: 'SK', helperId: 'h1' },
    'admin@carego.app':    { name: 'Admin User',  role: 'admin',   initials: 'AU' },
  },

  generateOTP() {
    this.generatedOTP = String(Math.floor(100000 + Math.random() * 900000));
    this.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    this.attempts = 0;
    return this.generatedOTP;
  },

  isExpired() { return Date.now() > this.otpExpiry; },
};

// ── SHOW LOGIN MODAL ────────────────────────────────────────
function showLoginModal(mode) {
  Auth.step = 'entry';
  Auth.mode = mode || 'login';
  Auth.email = '';
  Auth.name = '';
  _renderAuthModal();
}

function _renderAuthModal() {
  const isLogin = Auth.mode === 'login';

  if (Auth.step === 'entry') {
    Modal.show(`
      <div style="text-align:center;margin-bottom:20px">
        <div style="width:56px;height:56px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px">🏥</div>
        <p class="text-sm text-muted">${isLogin ? t('auth.signin.sub') : t('auth.create.sub')}</p>
      </div>

      ${!isLogin ? `
      <div class="form-group mb-3">
        <label class="form-label">Full name</label>
        <input class="form-input" id="auth-name" type="text" placeholder="e.g. Somchai Wongkul" autocomplete="name" />
      </div>` : ''}

      <div class="form-group mb-3">
        <label class="form-label">Email address</label>
        <input class="form-input" id="auth-email" type="email" placeholder="you@example.com" autocomplete="email"
          value="${Auth.email}"
          onkeydown="if(event.key==='Enter') _submitEmail()" />
      </div>

      <div class="alert alert-info mb-4" style="font-size:12px">
        <span>💡</span>
        <span>Demo accounts: <strong>patient@carego.app</strong> · <strong>helper@carego.app</strong> · <strong>admin@carego.app</strong></span>
      </div>

      <button class="btn btn-primary btn-full btn-lg" onclick="_submitEmail()">
        ${isLogin ? t('auth.send') : t('auth.create.btn')}
      </button>

      <div class="divider"></div>
      <p class="text-xs text-muted text-center">
        ${isLogin
          ? 'No account? <a href="#" onclick="showLoginModal(\'signup\')" style="color:var(--blue)">Sign up free</a>'
          : 'Have an account? <a href="#" onclick="showLoginModal(\'login\')" style="color:var(--blue)">Sign in</a>'}
      </p>`, isLogin ? t('auth.signin') : t('auth.create'));

    setTimeout(() => {
      const el = document.getElementById(Auth.mode === 'signup' ? 'auth-name' : 'auth-email');
      if (el) el.focus();
    }, 100);

  } else if (Auth.step === 'otp') {
    const otp = Auth.generatedOTP;
    Modal.show(`
      <div style="text-align:center;margin-bottom:20px">
        <div style="width:56px;height:56px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px">📧</div>
        <p style="font-size:14px;font-weight:500;margin-bottom:4px">Check your email</p>
        <p class="text-sm text-muted">We sent a 6-digit code to</p>
        <p style="font-size:14px;font-weight:600;color:var(--blue)">${Auth.email}</p>
      </div>

      <div class="alert alert-success mb-4" style="font-size:13px">
        <span>✉</span>
        <div>
          <div style="font-weight:500;margin-bottom:2px">Demo OTP (shown for testing)</div>
          <div style="font-size:20px;font-weight:700;letter-spacing:6px;color:var(--green)">${otp}</div>
        </div>
      </div>

      <div class="form-group mb-2">
        <label class="form-label">Enter 6-digit OTP code</label>
        <input class="form-input" id="otp-input" type="text" inputmode="numeric" maxlength="6"
          placeholder="_ _ _ _ _ _"
          style="font-size:22px;font-weight:600;letter-spacing:8px;text-align:center"
          oninput="this.value=this.value.replace(/[^0-9]/g,''); if(this.value.length===6) _submitOTP()"
          onkeydown="if(event.key==='Enter') _submitOTP()" />
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <span class="text-xs text-muted" id="otp-timer">Expires in 5:00</span>
        <button class="btn btn-ghost btn-sm" onclick="_resendOTP()">Resend code</button>
      </div>

      <button class="btn btn-primary btn-full btn-lg" onclick="_submitOTP()">
        Verify & Sign In
      </button>

      <div class="divider"></div>
      <button class="btn btn-ghost btn-full" onclick="showLoginModal()">← Back to email</button>`,
      'Verify your email');

    setTimeout(() => {
      const el = document.getElementById('otp-input');
      if (el) el.focus();
      _startOTPTimer();
    }, 100);
  }
}

// ── TIMER ───────────────────────────────────────────────────
let _timerInterval = null;
function _startOTPTimer() {
  if (_timerInterval) clearInterval(_timerInterval);
  _timerInterval = setInterval(() => {
    const el = document.getElementById('otp-timer');
    if (!el) { clearInterval(_timerInterval); return; }
    const remaining = Math.max(0, Auth.otpExpiry - Date.now());
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    el.textContent = remaining > 0
      ? `Expires in ${m}:${String(s).padStart(2,'0')}`
      : 'OTP expired';
    if (remaining === 0) {
      el.style.color = 'var(--red)';
      clearInterval(_timerInterval);
    }
  }, 1000);
}

// ── SUBMIT EMAIL ────────────────────────────────────────────
function _submitEmail() {
  const emailEl = document.getElementById('auth-email');
  const nameEl  = document.getElementById('auth-name');
  const email   = emailEl ? emailEl.value.trim().toLowerCase() : '';
  const name    = nameEl  ? nameEl.value.trim() : '';

  if (!email || !email.includes('@')) {
    _shake(emailEl);
    Toast.error('Please enter a valid email address');
    return;
  }

  if (Auth.mode === 'signup') {
    if (!name) { _shake(nameEl); Toast.error('Please enter your name'); return; }
    Auth.name = name;
    const existing = DB.getUser(email);
    if (!existing) {
      DB.saveUser(email, {
        name:     name,
        role:     'patient',
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2),
      });
    }
  }

  Auth.email = email;
  Auth.step  = 'otp';
  const otp  = Auth.generateOTP();
  console.log(`[CareGo Demo] OTP for ${email}: ${otp}`);
  _renderAuthModal();
  Toast.info('OTP sent to ' + email);
}

// ── SUBMIT OTP ──────────────────────────────────────────────
function _submitOTP() {
  const input = document.getElementById('otp-input');
  const entered = input ? input.value.trim() : '';

  if (Auth.isExpired()) {
    Toast.error('OTP has expired. Please request a new one.');
    if (input) { input.style.borderColor = 'var(--red)'; }
    return;
  }

  if (entered.length !== 6) {
    _shake(input); Toast.error('Please enter the full 6-digit code'); return;
  }

  Auth.attempts++;

  if (entered !== Auth.generatedOTP) {
    _shake(input);
    if (input) { input.value = ''; input.style.borderColor = 'var(--red)'; }
    const left = 3 - Auth.attempts;
    if (Auth.attempts >= 3) {
      Toast.error('Too many wrong attempts. Please request a new OTP.');
      setTimeout(() => showLoginModal(), 1500);
    } else {
      Toast.error(`Incorrect code. ${left} attempt${left !== 1 ? 's' : ''} left.`);
    }
    return;
  }

  // SUCCESS
  if (_timerInterval) clearInterval(_timerInterval);

  // Look up user in DB (falls back to new patient)
  let user = DB.getUser(Auth.email);
  if (!user) {
    user = DB.saveUser(Auth.email, {
      name:     Auth.name || Auth.email.split('@')[0],
      initials: (Auth.name || Auth.email).slice(0,2).toUpperCase(),
      role:     'patient',
    });
  }

  State.role        = user.role;
  State.currentUser = { ...user };

  // Persist session so page refresh keeps user logged in
  DB.saveSession(user);

  // Add welcome notification
  DB.addNotif(Auth.email, `Welcome back, ${user.name}! You are signed in.`, 'success');

  Modal.close();
  Toast.success(`Welcome, ${user.name}! ✓`);

  if (user.role === 'admin')       Router.go('admin');
  else if (user.role === 'helper') Router.go('helper-dashboard');
  else                             Router.go('helpers');
}

// ── RESEND OTP ──────────────────────────────────────────────
function _resendOTP() {
  const otp = Auth.generateOTP();
  console.log(`[CareGo Demo] New OTP for ${Auth.email}: ${otp}`);
  Toast.success('New OTP sent!');
  _renderAuthModal();
}

// ── SHAKE ANIMATION ─────────────────────────────────────────
function _shake(el) {
  if (!el) return;
  el.style.animation = 'none';
  el.style.borderColor = 'var(--red)';
  el.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.15)';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.animation = '';
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 500);
}

function logout() {
  DB.clearSession();
  State.role = null;
  State.currentUser = null;
  Toast.info(t('nav.signout'));
  Router.go('landing');
}

// ── BOOKING HELPER ──────────────────────────────────────────
function bookHelper(helperId) {
  if (!State.role || State.role !== 'patient') {
    if (!State.role) {
      showLoginModal('login');
      return;
    }
    Toast.error('Only patients can make bookings');
    return;
  }
  Router.go('booking', { helperId });
}

function openHelperDetail(helperId) {
  const helper = getHelperById(helperId);
  if (!helper) return;
  const reviews = REVIEWS.filter(r => r.helperId === helperId);
  const reviewsHTML = reviews.length
    ? reviews.map(renderReviewCard).join('')
    : `<p class="text-sm text-muted">No reviews yet.</p>`;

  Modal.show(`
    <div class="flex-center gap-3 mb-4">
      <div class="avatar avatar-lg ${avatarColor(helper)}">${helper.initials}</div>
      <div>
        <div style="font-size:20px;font-weight:600">${helper.name}</div>
        <div class="text-muted text-sm">${helper.faculty}</div>
        <div class="text-sm">${helper.university}</div>
        <div class="flex-center gap-2 mt-2">
          ${starsHTML(helper.rating)}
          <span class="text-sm text-muted">${helper.rating} (${helper.reviews} reviews)</span>
        </div>
      </div>
    </div>
    <div class="grid-2 mb-4" style="gap:12px">
      <div class="stat-card"><div class="stat-num" style="font-size:24px">${formatPrice(helper.price)}</div><div class="stat-label">Per hour</div></div>
      <div class="stat-card"><div class="stat-num" style="font-size:24px">${helper.completedBookings}</div><div class="stat-label">Completed</div></div>
    </div>
    <div class="mb-4">
      <div class="form-label mb-2">About</div>
      <p class="text-sm" style="line-height:1.7;color:var(--gray-600)">${helper.bio}</p>
    </div>
    <div class="mb-4">
      <div class="form-label mb-2">Languages</div>
      <div>${helper.languages.map(l => `<span class="tag tag-blue">${l}</span>`).join('')}</div>
    </div>
    <div class="mb-4">
      <div class="form-label mb-2">Specialties</div>
      <div>${helper.specialties.map(s => `<span class="tag tag-gray">${s}</span>`).join('')}</div>
    </div>
    <div class="mb-4">
      <div class="form-label mb-2">Patient Reviews</div>
      ${reviewsHTML}
    </div>
    <button class="btn btn-primary btn-full" onclick="Modal.close(); bookHelper('${helper.id}')">
      Book ${helper.name}
    </button>`, helper.name);
}

function renderLanding() {
  return `
    <div class="page fade-in">
      ${renderNavbar()}

      <!-- HERO -->
      <div class="hero" style="padding-top:120px;padding-bottom:100px">
        <div class="hero-content">
          <div class="hero-badge">${t('hero.badge')}</div>
          <h1>${t('hero.h1a')}<br><em>${t('hero.h1b')}</em></h1>
          <p style="font-size:18px;color:rgba(255,255,255,0.8);max-width:560px;margin:0 auto 36px;line-height:1.8">
            ${t('hero.sub')}
          </p>
          <div class="hero-actions">
            <button class="btn-hero-primary" onclick="showLoginModal('signup')">${t('hero.cta1')}</button>
            <button class="btn-hero-secondary" onclick="document.getElementById('packages').scrollIntoView({behavior:'smooth'})">${t('hero.cta2')}</button>
          </div>
        </div>
      </div>

      <!-- WHO IS THIS FOR -->
      <div style="background:var(--white);border-bottom:1px solid var(--gray-200);padding:48px 32px">
        <div style="max-width:900px;margin:0 auto;text-align:center">
          <div class="badge badge-blue mb-3">${t('who.badge')}</div>
          <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">${t('who.title')}</h2>
          <p class="text-muted mb-6" style="max-width:520px;margin:0 auto 36px">${t('who.sub')}</p>
          <div class="grid-3">
            <div class="card" style="text-align:center;padding:28px 20px">
              <div style="font-size:36px;margin-bottom:12px">🏛</div>
              <h3 style="font-weight:600;font-size:15px;margin-bottom:8px">${t('who.gov')}</h3>
              <p class="text-sm text-muted">${t('who.gov.desc')}</p>
            </div>
            <div class="card" style="text-align:center;padding:28px 20px">
              <div style="font-size:36px;margin-bottom:12px">💼</div>
              <h3 style="font-weight:600;font-size:15px;margin-bottom:8px">${t('who.pro')}</h3>
              <p class="text-sm text-muted">${t('who.pro.desc')}</p>
            </div>
            <div class="card" style="text-align:center;padding:28px 20px">
              <div style="font-size:36px;margin-bottom:12px">📊</div>
              <h3 style="font-weight:600;font-size:15px;margin-bottom:8px">${t('who.biz')}</h3>
              <p class="text-sm text-muted">${t('who.biz.desc')}</p>
            </div>
          </div>
          <div style="background:var(--blue-light);border:1px solid var(--blue-mid);border-radius:var(--radius-lg);padding:20px 28px;margin-top:32px;display:flex;align-items:center;gap:16px;text-align:left;max-width:680px;margin-left:auto;margin-right:auto">
            <div style="font-size:32px;flex-shrink:0">💡</div>
            <div>
              <div style="font-weight:600;margin-bottom:4px;color:var(--blue-dark)">${t('who.econ')}</div>
              <div style="font-size:13px;color:var(--blue-dark);opacity:0.85">${t('who.econ.desc')}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div style="background:var(--gray-900);padding:40px 32px">
        <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center">
          <div><div style="font-family:var(--font-display);font-size:40px;color:#93C5FD">31+</div><div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:4px">${t('stat.helpers')}</div></div>
          <div><div style="font-family:var(--font-display);font-size:40px;color:#93C5FD">฿1,190</div><div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:4px">${t('stat.starting')}</div></div>
          <div><div style="font-family:var(--font-display);font-size:40px;color:#93C5FD">4.86</div><div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:4px">${t('stat.rating')}</div></div>
          <div><div style="font-family:var(--font-display);font-size:40px;color:#93C5FD">98%</div><div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:4px">${t('stat.completion')}</div></div>
        </div>
      </div>

      <div class="page-content">

        <!-- USE CASES -->
        <div class="section">
          <div class="text-center mb-6">
            <div class="badge badge-teal mb-3">${t('use.badge')}</div>
            <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">${t('use.title')}</h2>
            <p class="text-muted">${t('use.sub')}</p>
          </div>
          <div class="grid-3">
            ${[
              { icon:'💉', key:'use.dialysis', freq:'3x/week',            color:'blue' },
              { icon:'🩺', key:'use.chronic',  freq:'3–6 months',         color:'teal' },
              { icon:'🦽', key:'use.mobility', freq:t('use.mob.freq'),     color:'amber'},
              { icon:'💊', key:'use.medicine', freq:t('use.med.freq'),     color:'blue' },
              { icon:'🔬', key:'use.lab',      freq:t('use.lab.freq'),     color:'teal' },
              { icon:'🏥', key:'use.surgery',  freq:t('use.surg.freq'),    color:'amber'},
            ].map(u => `
              <div class="card flex-center gap-3" style="padding:18px 20px">
                <div style="font-size:28px;flex-shrink:0">${u.icon}</div>
                <div>
                  <div style="font-weight:600;font-size:14px;margin-bottom:4px">${t(u.key)}</div>
                  <div class="badge badge-${u.color}" style="font-size:11px">${u.freq}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- PACKAGES -->
        <div class="section" id="packages">
          <div class="text-center mb-6">
            <div class="badge badge-blue mb-3">${t('pkg.badge')}</div>
            <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">${t('pkg.title')}</h2>
            <p class="text-muted">${t('pkg.sub')}</p>
          </div>
          <div class="grid-3 mb-4">
            ${PACKAGES.map(pkg => `
              <div class="card" style="position:relative;overflow:hidden;border:${pkg.id==='pkg2'?'2px solid var(--blue)':'1px solid var(--gray-200)'}">
                ${pkg.badgeKey ? `<div style="position:absolute;top:16px;right:16px"><span class="badge ${pkg.badgeColor}">${pkgBadge(pkg)}</span></div>` : ''}
                <div style="font-size:32px;margin-bottom:12px">${pkg.icon}</div>
                <h3 style="font-family:var(--font-display);font-size:20px;margin-bottom:4px">${pkgName(pkg)}</h3>
                <div class="text-sm text-muted mb-3">${pkgDur(pkg)}</div>
                <div style="font-family:var(--font-display);font-size:40px;color:var(--blue);margin-bottom:4px">${formatPrice(pkg.price)}</div>
                <div class="text-xs text-muted mb-4">${t('pkg.overtime')}: ${formatPrice(pkg.overtime)}/hr</div>
                <div class="divider"></div>
                <div style="font-size:12px;color:var(--gray-500);margin-bottom:10px">${pkgDesc(pkg)}</div>
                ${pkgBest(pkg).map(b => `<div class="flex-center gap-2 mb-1"><span style="color:var(--green);font-size:12px">✓</span><span class="text-xs">${b}</span></div>`).join('')}
                <div style="margin-top:14px;padding:10px;background:var(--gray-50);border-radius:var(--radius-md);font-size:11px;color:var(--gray-500)">
                  ${t('pkg.helper')} <strong style="color:var(--teal)">${formatPrice(pkg.helperShare)}</strong> · CareGo ${formatPrice(pkg.caregoShare)}
                </div>
                <button class="btn btn-primary btn-full mt-4" onclick="showLoginModal('login')">${t('pkg.book')}</button>
              </div>`).join('')}
          </div>
          <!-- ADD-ONS -->
          <div class="card">
            <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">${t('pkg.addons')}</h3>
            <div class="grid-4">
              ${ADDONS.map(a => `
                <div style="text-align:center;padding:14px;border:1px solid var(--gray-200);border-radius:var(--radius-md)">
                  <div style="font-size:24px;margin-bottom:8px">${a.icon}</div>
                  <div style="font-size:13px;font-weight:500;margin-bottom:4px">${addonName(a)}</div>
                  <div style="font-size:12px;color:var(--blue);font-weight:600">+${formatPrice(a.price)}</div>
                  <div style="font-size:11px;color:var(--gray-400);margin-top:4px">${addonDesc(a)}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- SUBSCRIPTIONS -->
        <div class="section">
          <div class="text-center mb-6">
            <div class="badge badge-amber mb-3">${t('sub.badge')}</div>
            <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">${t('sub.title')}</h2>
            <p class="text-muted">${t('sub.sub')}</p>
          </div>
          <div class="grid-2" style="max-width:600px;margin:0 auto">
            ${SUBSCRIPTIONS.map(s => `
              <div class="card" style="border:${s.id==='gold'?'2px solid var(--amber)':'1px solid var(--gray-200)'}">
                <div style="font-size:32px;margin-bottom:10px">${s.icon}</div>
                <h3 style="font-family:var(--font-display);font-size:20px;margin-bottom:6px">${subName(s)}</h3>
                <div style="font-family:var(--font-display);font-size:32px;color:var(--blue);margin-bottom:4px">${formatPrice(s.price)}<span style="font-size:14px;color:var(--gray-400)">${t('sub.month')}</span></div>
                <div class="badge badge-${s.id==='gold'?'amber':'gray'} mb-3">${s.discount}% · ${s.bookings} bookings</div>
                <p class="text-sm text-muted mb-3">${subDesc(s)}</p>
                <div class="text-xs text-muted">${subBest(s)}</div>
                ${s.priority ? `<div class="badge badge-amber mt-3">${t('sub.priority')}</div>` : ''}
                <button class="btn btn-${s.id==='gold'?'primary':'secondary'} btn-full mt-4" onclick="showLoginModal('login')">${t('sub.get')} ${subName(s)}</button>
              </div>`).join('')}
          </div>
        </div>

        <!-- TRUST -->
        <div class="section">
          <div class="text-center mb-6">
            <div class="badge badge-blue mb-3">${t('trust.badge')}</div>
            <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">${t('trust.title')}</h2>
            <p class="text-muted" style="max-width:480px;margin:0 auto">${t('trust.sub')}</p>
          </div>
          <div class="grid-3">
            ${[
              { icon:'🪪', title:t('trust.id'),      desc:t('trust.id.desc') },
              { icon:'🎓', title:t('trust.student'), desc:t('trust.student.desc') },
              { icon:'❤️', title:t('trust.cpr'),     desc:t('trust.cpr.desc') },
              { icon:'📋', title:t('trust.nda'),     desc:t('trust.nda.desc') },
              { icon:'📍', title:t('trust.updates'), desc:t('trust.updates.desc') },
              { icon:'📄', title:t('trust.summary'), desc:t('trust.summary.desc') },
            ].map(tp => `
              <div class="card">
                <div style="font-size:28px;margin-bottom:12px">${tp.icon}</div>
                <h3 style="font-weight:600;font-size:15px;margin-bottom:6px">${tp.title}</h3>
                <p class="text-sm text-muted">${tp.desc}</p>
              </div>`).join('')}
          </div>
        </div>

        <!-- CPR FRAMEWORK -->
        <div class="section">
          <div style="background:linear-gradient(135deg,#0D1B35,#0D4F9E);border-radius:var(--radius-xl);padding:48px 40px;color:white">
            <div class="text-center mb-8">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:20px;padding:6px 16px;font-size:13px;margin-bottom:16px">${t('cpr.standard')}</div>
              <h2 style="font-family:var(--font-display);font-size:32px;color:white;margin-bottom:8px">${t('cpr.title')}</h2>
              <p style="color:rgba(255,255,255,0.7);font-size:15px">${t('cpr.sub')}</p>
            </div>
            <div class="grid-3" style="gap:20px">
              ${[
                { letter:'C', nameKey:'cpr.c', weight:'40%', descKey:'cpr.c.desc' },
                { letter:'P', nameKey:'cpr.p', weight:'40%', descKey:'cpr.p.desc' },
                { letter:'R', nameKey:'cpr.r', weight:'20%', descKey:'cpr.r.desc' },
              ].map(c => `
                <div style="background:rgba(255,255,255,0.1);border-radius:var(--radius-lg);padding:24px;text-align:center">
                  <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:28px;color:white;margin:0 auto 12px">${c.letter}</div>
                  <div style="font-family:var(--font-display);font-size:18px;color:white;margin-bottom:4px">${t(c.nameKey)}</div>
                  <div style="background:rgba(255,255,255,0.2);border-radius:20px;padding:3px 12px;font-size:12px;color:white;display:inline-block;margin-bottom:10px">${c.weight}</div>
                  <p style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.6">${t(c.descKey)}</p>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- TESTIMONIALS -->
        <div class="section">
          <div class="text-center mb-6">
            <div class="badge badge-amber mb-3">${t('review.badge')}</div>
            <h2 style="font-family:var(--font-display);font-size:28px">${t('review.title')}</h2>
          </div>
          <div class="grid-3">
            ${REVIEWS.slice(0,3).map(r => `
              <div class="card">
                <div>${starsHTML(r.rating)}</div>
                <p class="text-sm mb-4" style="color:var(--gray-600);line-height:1.7;margin-top:12px">"${r.text}"</p>
                <div class="flex-center gap-2">
                  <div class="avatar avatar-sm avatar-blue">${r.patient.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div style="font-size:13px;font-weight:500">${r.patient}</div>
                    <div class="text-xs text-muted">${r.role}</div>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- CTA -->
        <div style="background:linear-gradient(135deg,#0D1B35,#1A6FD4);border-radius:var(--radius-xl);padding:56px 40px;text-align:center;margin-bottom:48px">
          <h2 style="font-family:var(--font-display);font-size:32px;margin-bottom:12px;color:white">${t('cta.title').replace('\n','<br>')}</h2>
          <p style="color:rgba(255,255,255,0.75);margin-bottom:28px;font-size:16px;max-width:480px;margin-left:auto;margin-right:auto">${t('cta.sub')}</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button class="btn-hero-primary" onclick="showLoginModal('signup')">${t('cta.btn1')}</button>
            <button class="btn-hero-secondary" onclick="Router.go('helpers')">${t('cta.btn2')}</button>
          </div>
          <div style="margin-top:20px;font-size:13px;color:rgba(255,255,255,0.5)">LINE OA: @821qxlbc</div>
        </div>

      </div>

      <!-- FOOTER -->
      <footer style="background:var(--gray-900);color:var(--gray-400);padding:48px 32px">
        <div style="max-width:1100px;margin:0 auto">
          <div class="grid-3 mb-6">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
                <div class="brand-icon"><svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.81 3.89 13.89 5.27C14.5 4.5 15.5 4 16.5 4C18.43 4 20 5.57 20 7.5C20 12.5 12 21 12 21Z" fill="white"/></svg></div>
                <span style="font-family:var(--font-display);font-size:20px;color:white">CareGo</span>
              </div>
              <p style="font-size:13px;line-height:1.7">${t('footer.desc')}</p>
            </div>
            <div>
              <div style="font-weight:500;color:white;margin-bottom:12px;font-size:14px">${t('footer.services')}</div>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
                ${PACKAGES.map(p => `<span>${pkgName(p)}</span>`).join('')}
                <span>${t('sub.title')}</span>
              </div>
            </div>
            <div>
              <div style="font-weight:500;color:white;margin-bottom:12px;font-size:14px">${t('footer.contact')}</div>
              <div style="font-size:13px;display:flex;flex-direction:column;gap:8px">
                <span>📍 Srinagarind Hospital, Khon Kaen</span>
                <span>📱 LINE OA: @821qxlbc</span>
                <span>🛡 PDPA ${t('footer.compliant')}</span>
                <span>🎓 KKU ${t('footer.students')}</span>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid var(--gray-700);padding-top:24px;text-align:center;font-size:13px">
            © 2025 CareGo. ${t('footer.copy')}
          </div>
        </div>
      </footer>
    </div>`;
}

let helperFilters = {
  language: 'all', specialty: 'all', available: false, search: '',
};
let _searchDebounceTimer = null;

function renderHelpers() {
  const allLangs = [...new Set(HELPERS.flatMap(h => h.languages))];
  const allSpecs = [...new Set(HELPERS.flatMap(h => h.specialties))];

  const langOptions = allLangs.map(l =>
    `<option value="${l}" ${helperFilters.language === l ? 'selected' : ''}>${l}</option>`).join('');
  const specOptions = allSpecs.map(s =>
    `<option value="${s}" ${helperFilters.specialty === s ? 'selected' : ''}>${s}</option>`).join('');

  const skeletonHTML = Array(6).fill(0).map(() => `
    <div class="helper-card" style="pointer-events:none">
      <div class="helper-top">
        <div class="avatar avatar-md" style="background:var(--gray-100)"></div>
        <div class="helper-meta" style="flex:1">
          <div style="height:14px;background:var(--gray-100);border-radius:4px;width:60%;margin-bottom:8px"></div>
          <div style="height:11px;background:var(--gray-100);border-radius:4px;width:80%;margin-bottom:8px"></div>
          <div style="height:11px;background:var(--gray-100);border-radius:4px;width:40%"></div>
        </div>
      </div>
      <div style="height:10px;background:var(--gray-100);border-radius:4px;width:50%;margin:10px 0 6px"></div>
      <div style="height:10px;background:var(--gray-100);border-radius:4px;width:90%;margin-bottom:6px"></div>
      <div style="height:10px;background:var(--gray-100);border-radius:4px;width:70%;margin-bottom:14px"></div>
      <div style="display:flex;gap:8px">
        <div style="flex:1;height:32px;background:var(--gray-100);border-radius:8px"></div>
        <div style="width:72px;height:32px;background:var(--gray-100);border-radius:8px"></div>
      </div>
    </div>`).join('');

  requestAnimationFrame(() => _updateResultsDOM(false));

  return `
    <div class="page fade-in">
      ${renderNavbar()}
      <div class="page-content">
        <div class="page-header">
          <h1 class="page-title">${t('helpers.title')}</h1>
          <p class="page-subtitle">${t('helpers.sub')}</p>
        </div>

        <div class="filter-bar mb-4" id="helpers-filter-bar">
          <div style="flex:1;min-width:200px">
            <input id="helpers-search-input" class="form-input" style="margin-bottom:0"
              placeholder="${t('helpers.search')}" value="${helperFilters.search}"
              autocomplete="off" oninput="_onSearchInput(this.value)"/>
          </div>
          <div class="filter-group">
            <span class="filter-label">${t('helpers.lang')}</span>
            <select class="form-select" style="margin-bottom:0;width:auto" onchange="_onFilterChange('language',this.value)">
              <option value="all">${t('helpers.all')}</option>${langOptions}
            </select>
          </div>
          <div class="filter-group">
            <span class="filter-label">${t('helpers.spec')}</span>
            <select class="form-select" style="margin-bottom:0;width:auto" onchange="_onFilterChange('specialty',this.value)">
              <option value="all">${t('helpers.all')}</option>${specOptions}
            </select>
          </div>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
            <input type="checkbox" ${helperFilters.available?'checked':''} onchange="_onFilterChange('available',this.checked)"/>
            ${t('helpers.avail')}
          </label>
          <button class="btn btn-ghost btn-sm" onclick="_resetFilters()">${t('helpers.reset')}</button>
        </div>

        <div class="flex-between mb-4">
          <span class="text-sm text-muted" id="helpers-count">${t('helpers.searching')}</span>
          <div class="flex-center gap-2 text-sm text-muted">
            <span>📦 ${t('helpers.from')}</span><strong class="text-blue">฿1,190</strong>
          </div>
        </div>

        <div id="helpers-results-grid" class="grid-auto">${skeletonHTML}</div>
      </div>
    </div>`;
}

function _onSearchInput(value) {
  helperFilters.search = value;
  const countEl = document.getElementById('helpers-count');
  if (countEl) countEl.textContent = t('helpers.searching');
  _showSkeletonShimmer();
  clearTimeout(_searchDebounceTimer);
  _searchDebounceTimer = setTimeout(() => _updateResultsDOM(true), 280);
}

function _onFilterChange(key, value) {
  helperFilters[key] = value;
  _updateResultsDOM(true);
}

function _resetFilters() {
  helperFilters = { language:'all', specialty:'all', available:false, search:'' };
  const input = document.getElementById('helpers-search-input');
  if (input) input.value = '';
  document.querySelectorAll('#helpers-filter-bar select').forEach(s => s.value = 'all');
  _updateResultsDOM(true);
}

function _showSkeletonShimmer() {
  const grid = document.getElementById('helpers-results-grid');
  if (!grid) return;
  grid.querySelectorAll('.helper-card').forEach(card => {
    card.style.opacity = '0.45';
    card.style.transition = 'opacity 0.15s ease';
    card.style.pointerEvents = 'none';
  });
}

function _updateResultsDOM(animate) {
  const grid    = document.getElementById('helpers-results-grid');
  const countEl = document.getElementById('helpers-count');
  if (!grid) return;

  const filtered = _applyFilters();

  if (countEl) {
    countEl.textContent = `${filtered.length} ${t('helpers.found')}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <h3>${t('helpers.none')}</h3>
        <p>${t('helpers.adjust')}</p>
      </div>`;
    return;
  }

  const existing = {};
  grid.querySelectorAll('.helper-card[data-id]').forEach(el => {
    existing[el.dataset.id] = el;
  });

  const fragment = document.createDocumentFragment();
  filtered.forEach(helper => {
    let card = existing[helper.id];
    if (card) {
      card.style.opacity = '';
      card.style.pointerEvents = '';
      card.style.transition = '';
      delete existing[helper.id];
    } else {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = _buildHelperCardHTML(helper);
      card = wrapper.firstElementChild;
      if (animate) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
      }
    }
    fragment.appendChild(card);
  });

  Object.values(existing).forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.15s ease';
    setTimeout(() => el.remove(), 150);
  });

  grid.appendChild(fragment);
}

function _applyFilters() {
  return HELPERS.filter(h => {
    if (helperFilters.available && !h.available) return false;
    if (helperFilters.language !== 'all' && !h.languages.includes(helperFilters.language)) return false;
    if (helperFilters.specialty !== 'all' && !h.specialties.includes(helperFilters.specialty)) return false;
    if (helperFilters.search) {
      const q = helperFilters.search.toLowerCase();
      const searchable = [h.name, h.faculty, ...h.specialties, ...h.languages].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });
}

function _buildHelperCardHTML(helper) {
  const langTags = helper.languages.map(l => `<span class="tag tag-blue">${l}</span>`).join('');
  const specTags = helper.specialties.map(s => `<span class="tag tag-gray">${s}</span>`).join('');
  const avail = helper.available
    ? `<span class="badge badge-green">${t('helpers.avail.yes')}</span>`
    : `<span class="badge badge-gray">${t('helpers.avail.no')}</span>`;
  return `
    <div class="helper-card" data-id="${helper.id}" onclick="openHelperDetail('${helper.id}')">
      <div class="helper-top">
        <div class="avatar avatar-md ${avatarColor(helper)}">${helper.initials}</div>
        <div class="helper-meta">
          <div class="helper-name">${helper.name}</div>
          <div class="helper-faculty">${helper.faculty}</div>
          <div class="flex-center gap-2 mb-2">${starsHTML(helper.rating)}<span class="text-sm text-muted">${helper.rating} (${helper.reviews})</span></div>
          <div class="flex-center gap-2 flex-wrap">
            ${avail}
            ${helper.cprCertified ? `<span class="badge badge-green" style="font-size:10px">❤️ CPR</span>` : ''}
            ${helper.verified     ? `<span class="badge badge-blue"  style="font-size:10px">🪪 ${t('trust.id')}</span>` : ''}
          </div>
        </div>
      </div>
      <div style="margin-bottom:10px">${langTags}${specTags}</div>
      <p class="text-sm text-muted mb-3" style="line-height:1.6">${helper.bio}</p>
      ${cprScoreBar(helper)}
      <div class="helper-actions" style="margin-top:14px">
        <button class="btn btn-primary btn-sm flex-1" onclick="event.stopPropagation(); bookHelper('${helper.id}')">${t('helpers.book')}</button>
        <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openHelperDetail('${helper.id}')">${t('helpers.profile')}</button>
      </div>
    </div>`;
}

function renderHelperCard(helper) { return _buildHelperCardHTML(helper); }

let bookingForm = {
  helperId: null,
  hospital: 'Srinagarind Hospital',
  department: 'Nephrology (Dialysis)',
  date: '',
  packageId: 'pkg1',
  addons: [],
  elderlyName: '',
  elderlyAge: '',
  notes: '',
};

function renderBooking() {
  const helper = getHelperById(Router.params.helperId || bookingForm.helperId);
  if (Router.params.helperId) bookingForm.helperId = Router.params.helperId;

  if (!helper) {
    return `<div class="page">${renderNavbar()}<div class="page-content">
      <div class="empty-state">
        <h3>No helper selected</h3>
        <p>Please choose a helper first</p>
        <button class="btn btn-primary mt-4" onclick="Router.go('helpers')">Browse Helpers</button>
      </div></div></div>`;
  }

  const selectedPkg = getPackageById(bookingForm.packageId) || PACKAGES[0];
  const total = calcTotalPrice(bookingForm.packageId, bookingForm.addons);
  const today = new Date().toISOString().split('T')[0];

  const hospitalOpts  = HOSPITALS.map(h   => `<option ${h===bookingForm.hospital?'selected':''}>${h}</option>`).join('');
  const deptOpts      = DEPARTMENTS.map(d => `<option ${d===bookingForm.department?'selected':''}>${d}</option>`).join('');

  const pkgCards = PACKAGES.map(pkg => `
    <div class="service-option ${bookingForm.packageId===pkg.id?'selected':''}" onclick="bookingForm.packageId='${pkg.id}'; App.render()" style="position:relative">
      ${pkg.badgeKey?`<div style="position:absolute;top:-6px;right:-6px"><span class="badge ${pkg.badgeColor}" style="font-size:10px">${pkgBadge(pkg)}</span></div>`:''}
      <div style="font-size:20px;margin-bottom:6px">${pkg.icon}</div>
      <div style="font-size:12px;font-weight:600">${pkgName(pkg)}</div>
      <div style="font-size:13px;font-weight:700;color:var(--blue)">${formatPrice(pkg.price)}</div>
      <div style="font-size:10px;color:var(--gray-400)">${pkgDur(pkg)}</div>
    </div>`).join('');

  const addonCards = ADDONS.map(a => `
    <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid ${bookingForm.addons.includes(a.id)?'var(--blue)':'var(--gray-200)'};border-radius:var(--radius-md);cursor:pointer;background:${bookingForm.addons.includes(a.id)?'var(--blue-light)':'var(--white)'};transition:all 0.15s">
      <input type="checkbox" style="display:none" ${bookingForm.addons.includes(a.id)?'checked':''} onchange="toggleAddon('${a.id}')"/>
      <span style="font-size:18px">${a.icon}</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500">${addonName(a)}</div>
        <div style="font-size:11px;color:var(--gray-400)">${addonDesc(a)}</div>
      </div>
      <div style="font-size:13px;font-weight:600;color:var(--blue)">+${formatPrice(a.price)}</div>
    </label>`).join('');

  return `
    <div class="page fade-in">
      ${renderNavbar()}
      <div class="page-content">
        <div class="page-header">
          <button class="btn btn-ghost btn-sm mb-3" onclick="Router.go('helpers')">← Back to helpers</button>
          <h1 class="page-title">Book a Companion</h1>
          <p class="page-subtitle">For your elderly parent — you stay updated every step</p>
        </div>

        <div class="grid-2" style="gap:28px;align-items:start">

          <!-- LEFT: FORM -->
          <div style="display:flex;flex-direction:column;gap:20px">

            <!-- Helper selected -->
            <div class="card" style="border:2px solid var(--blue-mid)">
              <div class="flex-center gap-3">
                <div class="avatar avatar-md ${avatarColor(helper)}">${helper.initials}</div>
                <div style="flex:1">
                  <div style="font-weight:600;font-size:16px">${helper.name}</div>
                  <div class="text-sm text-muted">${helper.faculty}</div>
                  <div class="flex-center gap-2 mt-1">${starsHTML(helper.rating)}<span class="text-xs text-muted">${helper.rating} · ${helper.reviews} reviews</span></div>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end">
                  ${helper.cprCertified ? '<span class="badge badge-green" style="font-size:10px">❤️ CPR</span>' : ''}
                  ${helper.verified     ? '<span class="badge badge-blue"  style="font-size:10px">🪪 Verified</span>' : ''}
                </div>
              </div>
              ${cprScoreBar(helper)}
            </div>

            <!-- Elderly parent info -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:16px;font-size:15px">👴 Elderly Parent Details</h3>
              <div class="grid-2" style="gap:12px">
                <div class="form-group">
                  <label class="form-label">Parent's name</label>
                  <input class="form-input" placeholder="e.g. Khun Somchai" value="${bookingForm.elderlyName}" oninput="bookingForm.elderlyName=this.value"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Age</label>
                  <input class="form-input" type="number" min="60" max="110" placeholder="e.g. 72" value="${bookingForm.elderlyAge}" oninput="bookingForm.elderlyAge=this.value"/>
                </div>
              </div>
            </div>

            <!-- Hospital & Department -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:16px;font-size:15px">🏥 Visit Details</h3>
              <div class="form-group mb-3">
                <label class="form-label">Hospital</label>
                <select class="form-select" onchange="bookingForm.hospital=this.value">${hospitalOpts}</select>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Department / Purpose</label>
                <select class="form-select" onchange="bookingForm.department=this.value">${deptOpts}</select>
              </div>
              <div class="form-group">
                <label class="form-label">Visit date</label>
                <input type="date" class="form-input" min="${today}" value="${bookingForm.date||today}" onchange="bookingForm.date=this.value"/>
              </div>
            </div>

            <!-- Package -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:16px;font-size:15px">📦 Select Package</h3>
              <div class="service-grid" style="grid-template-columns:repeat(3,1fr)">${pkgCards}</div>
              <div class="alert alert-info mt-3" style="font-size:12px">
                <span>ℹ</span><span>Overtime beyond package: <strong>฿200/hour</strong></span>
              </div>
            </div>

            <!-- Add-ons -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:16px;font-size:15px">➕ Add-Ons (optional)</h3>
              <div style="display:flex;flex-direction:column;gap:8px">${addonCards}</div>
            </div>

            <!-- Notes -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:12px;font-size:15px">📝 Special Notes</h3>
              <textarea class="form-textarea" placeholder="Medical conditions, mobility needs, medications, or anything the helper should know..." oninput="bookingForm.notes=this.value">${bookingForm.notes}</textarea>
            </div>

          </div>

          <!-- RIGHT: SUMMARY -->
          <div>
            <div class="card mb-4" style="position:sticky;top:80px">
              <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:20px">Booking Summary</h3>

              ${bookingForm.elderlyName ? `
                <div class="alert alert-info mb-4" style="font-size:13px">
                  <span>👴</span><span>${bookingForm.elderlyName}${bookingForm.elderlyAge?', age '+bookingForm.elderlyAge:''}</span>
                </div>` : ''}

              <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
                ${[
                  ['Helper',     helper.name],
                  [t('book.hospital'),   bookingForm.hospital],
                  ['Department', bookingForm.department],
                  ['Date',       bookingForm.date || today],
                  ['Package',    pkgName(selectedPkg) + ' (' + pkgDur(selectedPkg) + ')'],
                ].map(([l,v]) => `
                  <div class="flex-between" style="font-size:13px">
                    <span class="text-muted">${l}</span>
                    <span style="font-weight:500;text-align:right;max-width:200px">${v}</span>
                  </div>`).join('<div style="height:1px;background:var(--gray-100)"></div>')}
              </div>

              <div class="divider"></div>
              <div class="flex-between mb-2">
                <span class="text-sm text-muted">Base package</span>
                <span class="text-sm font-semibold">${formatPrice(selectedPkg.price)}</span>
              </div>
              ${bookingForm.addons.map(aid => {
                const a = getAddonById(aid);
                return a ? `<div class="flex-between mb-2"><span class="text-sm text-muted">${a.icon} ${addonName(a)}</span><span class="text-sm">+${formatPrice(a.price)}</span></div>` : '';
              }).join('')}
              <div class="divider"></div>
              <div class="flex-between mb-4">
                <span style="font-weight:600">Total</span>
                <span style="font-family:var(--font-display);font-size:32px;color:var(--blue)">${formatPrice(total)}</span>
              </div>

              <div style="background:var(--green-light);border-radius:var(--radius-md);padding:12px 14px;font-size:12px;color:#166534;margin-bottom:16px">
                <div style="font-weight:500;margin-bottom:4px">✓ What your family gets</div>
                <div>Live updates · Visit summary report · Helper contact · Peace of mind</div>
              </div>

              <button class="btn btn-primary btn-full btn-lg" onclick="confirmBooking()">
                Confirm Booking
              </button>
              <div class="text-xs text-muted text-center mt-2">Payment collected on arrival · Cancel up to 2 hrs before</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function toggleAddon(addonId) {
  const idx = bookingForm.addons.indexOf(addonId);
  if (idx >= 0) bookingForm.addons.splice(idx, 1);
  else bookingForm.addons.push(addonId);
  App.render();
}

function confirmBooking() {
  const helper = getHelperById(bookingForm.helperId);
  if (!helper) { Toast.error('No helper selected'); return; }
  if (!bookingForm.elderlyName) { Toast.error('Please enter your parent\'s name'); return; }

  const total = calcTotalPrice(bookingForm.packageId, bookingForm.addons);
  const newBooking = {
    id: 'b' + Date.now(),
    helperId: bookingForm.helperId,
    helperName: helper.name,
    helperInitials: helper.initials,
    patient: bookingForm.elderlyName + (bookingForm.elderlyAge ? ', age '+bookingForm.elderlyAge : ''),
    patientInitials: bookingForm.elderlyName.slice(0,2).toUpperCase(),
    patientAge: parseInt(bookingForm.elderlyAge) || null,
    bookedBy: State.currentUser?.name || 'Family',
    bookedByInitials: State.currentUser?.initials || 'F',
    patientEmail: State.currentUser?.email || '',
    hospital: bookingForm.hospital,
    department: bookingForm.department,
    date: bookingForm.date || new Date().toISOString().split('T')[0],
    packageId: bookingForm.packageId,
    addons: [...bookingForm.addons],
    notes: bookingForm.notes,
    status: 'confirmed',
    price: total,
    createdAt: new Date().toLocaleString(),
    progressStep: 0,
    updates: [],
  };

  DB.saveBooking(newBooking);
  DB.addNotif(
    State.currentUser?.email || '',
    `Booking confirmed! ${helper.name} will accompany ${bookingForm.elderlyName} at ${bookingForm.hospital}.`,
    'success'
  );
  Toast.success('Booking confirmed! You will receive live updates.');
  Router.go('tracking', { bookingId: newBooking.id });
}

// ═══════════════════════════════════════════════════════════
//  LIVE TRACKING PAGE — animated GPS map + real-time feed
// ═══════════════════════════════════════════════════════════

// ── TRACKING STATE ──────────────────────────────────────────
const TrackState = {
  interval:    null,   // main simulation interval
  mapInterval: null,   // map animation frame
  etaInterval: null,   // ETA countdown
  tick:        0,      // simulation tick (0–100)
  eta:         0,      // seconds remaining
  markerX:     0,      // helper marker position on map (%)
  markerY:     0,
  trail:       [],     // path trail dots
  feed:        [],     // live update messages
  step:        0,      // current journey step
  bookingId:   null,
};

// ── JOURNEY WAYPOINTS (% of map canvas) ────────────────────
const WAYPOINTS = [
  { x: 12, y: 75, label: 'Helper home', icon: '🏠' },
  { x: 28, y: 60, label: 'Pickup point',   icon: '📍' },
  { x: 45, y: 48, label: 'Route A',        icon: '' },
  { x: 62, y: 38, label: 'Route B',        icon: '' },
  { x: 78, y: 30, label: 'Hospital gate',  icon: '🏥' },
  { x: 85, y: 22, label: 'Srinagarind Hospital', icon: '🏥' },
];

// ── LIVE FEED MESSAGES ──────────────────────────────────────
const FEED_MESSAGES = [
  { at: 0,   icon: '📱', msg: 'Helper accepted your booking',         type: 'info' },
  { at: 8,   icon: '🏠', msg: 'Helper is leaving home',              type: 'info' },
  { at: 18,  icon: '🚗', msg: 'Helper arrived at pickup point',      type: 'success' },
  { at: 22,  icon: '👴', msg: 'Picked up — heading to hospital',     type: 'success' },
  { at: 40,  icon: '🛣',  msg: 'On Mittraphap Road, 8 min away',      type: 'info' },
  { at: 60,  icon: '🏥', msg: 'Approaching Srinagarind Hospital',    type: 'info' },
  { at: 72,  icon: '✅', msg: 'Arrived at hospital — checking in',   type: 'success' },
  { at: 80,  icon: '🩺', msg: 'At Nephrology dept — queue #14',      type: 'info' },
  { at: 90,  icon: '💊', msg: 'Collecting prescription from pharmacy', type: 'info' },
  { at: 98,  icon: '🎉', msg: 'Visit complete! Heading home safely', type: 'success' },
];

// ── INIT TRACKING ────────────────────────────────────────────
function initTracking(bookingId) {
  // Clear any previous intervals
  clearTrackingIntervals();

  const booking = SAMPLE_BOOKINGS.find(b => b.id === bookingId) || SAMPLE_BOOKINGS[0];

  // Set initial state
  TrackState.bookingId = bookingId;
  TrackState.tick      = (booking.progressStep || 0) * 25;
  TrackState.step      = booking.progressStep || 0;
  TrackState.markerX   = WAYPOINTS[0].x;
  TrackState.markerY   = WAYPOINTS[0].y;
  TrackState.trail     = [];
  TrackState.feed      = FEED_MESSAGES.filter(m => m.at <= TrackState.tick)
                          .map(m => ({ ...m, time: _fmtTime(-(TrackState.tick - m.at)) }));
  TrackState.eta       = Math.max(0, Math.round((100 - TrackState.tick) * 1.2)) * 60;

  // Start simulation — advances every 2 seconds
  TrackState.interval = setInterval(_simTick, 2000);

  // ETA countdown — every second
  TrackState.etaInterval = setInterval(_etaTick, 1000);
}

function clearTrackingIntervals() {
  clearInterval(TrackState.interval);
  clearInterval(TrackState.mapInterval);
  clearInterval(TrackState.etaInterval);
}

// ── SIMULATION TICK ──────────────────────────────────────────
function _simTick() {
  if (TrackState.tick >= 100) {
    clearTrackingIntervals();
    // Mark booking completed
    const b = SAMPLE_BOOKINGS.find(x => x.id === TrackState.bookingId);
    if (b) { b.progressStep = 4; b.status = 'completed'; DB.updateBookingStatus(b.id, 'completed', { progressStep: 4 }); }
    _refreshTrackDOM();
    return;
  }

  TrackState.tick = Math.min(100, TrackState.tick + 1.5);

  // Move marker along waypoint path
  const wpProgress = (TrackState.tick / 100) * (WAYPOINTS.length - 1);
  const wpIdx   = Math.floor(wpProgress);
  const wpFrac  = wpProgress - wpIdx;
  const fromWP  = WAYPOINTS[Math.min(wpIdx, WAYPOINTS.length - 1)];
  const toWP    = WAYPOINTS[Math.min(wpIdx + 1, WAYPOINTS.length - 1)];
  const newX    = fromWP.x + (toWP.x - fromWP.x) * wpFrac;
  const newY    = fromWP.y + (toWP.y - fromWP.y) * wpFrac;

  // Add trail dot every 5 ticks
  if (Math.round(TrackState.tick) % 5 === 0) {
    TrackState.trail.push({ x: newX, y: newY });
    if (TrackState.trail.length > 20) TrackState.trail.shift();
  }

  TrackState.markerX = newX;
  TrackState.markerY = newY;

  // Determine step
  const t = TrackState.tick;
  TrackState.step = t < 20 ? 0 : t < 65 ? 1 : t < 85 ? 2 : t < 100 ? 3 : 4;

  // Sync booking progress
  const b = SAMPLE_BOOKINGS.find(x => x.id === TrackState.bookingId);
  if (b && b.progressStep !== TrackState.step) {
    b.progressStep = TrackState.step;
    DB.updateBookingStatus(b.id, b.status, { progressStep: TrackState.step });
  }

  // Check for new feed messages
  FEED_MESSAGES.forEach(m => {
    const already = TrackState.feed.some(f => f.at === m.at);
    if (!already && TrackState.tick >= m.at) {
      TrackState.feed.unshift({ ...m, time: 'Just now' });
      if (TrackState.feed.length > 10) TrackState.feed.pop();
    }
  });

  TrackState.eta = Math.max(0, Math.round((100 - TrackState.tick) * 1.2)) * 60;

  _refreshTrackDOM();
}

function _etaTick() {
  if (TrackState.eta > 0) TrackState.eta--;
  const el = document.getElementById('track-eta-val');
  if (el) el.textContent = _fmtETA(TrackState.eta);
}

function _fmtETA(secs) {
  if (secs <= 0) return 'Arrived';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function _fmtTime(ticksAgo) {
  if (ticksAgo >= 0) return 'Just now';
  const mins = Math.abs(Math.round(ticksAgo * 1.2));
  return mins === 0 ? 'Just now' : `${mins} min ago`;
}

// ── IN-PLACE DOM REFRESH (no full App.render) ─────────────
function _refreshTrackDOM() {
  _updateMap();
  _updateProgress();
  _updateFeed();
  _updateEtaBadge();
}

function _updateMap() {
  const canvas = document.getElementById('track-map-canvas');
  if (!canvas) return;

  // Trail dots
  const trailHTML = TrackState.trail.map((pt, i) => `
    <div style="position:absolute;left:${pt.x}%;top:${pt.y}%;transform:translate(-50%,-50%);
      width:${4 + i*0.3}px;height:${4 + i*0.3}px;border-radius:50%;
      background:var(--blue);opacity:${0.15 + i*0.04}"></div>`).join('');

  // Route line SVG
  const pts = WAYPOINTS.map(w => `${w.x},${w.y}`).join(' ');

  // Waypoint markers
  const wpHTML = WAYPOINTS.filter(w => w.icon).map(w => `
    <div style="position:absolute;left:${w.x}%;top:${w.y}%;transform:translate(-50%,-50%);
      background:white;border:2px solid var(--blue);border-radius:50%;
      width:28px;height:28px;display:flex;align-items:center;justify-content:center;
      font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:2"
      title="${w.label}">${w.icon}</div>`).join('');

  // Helper marker (animated pulse)
  const helperMarker = `
    <div id="helper-marker" style="position:absolute;left:${TrackState.markerX}%;top:${TrackState.markerY}%;
      transform:translate(-50%,-50%);z-index:10;transition:left 1.8s ease,top 1.8s ease">
      <div style="position:relative">
        <div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(26,111,212,0.2);animation:pulse 1.5s infinite"></div>
        <div style="position:absolute;inset:-4px;border-radius:50%;background:rgba(26,111,212,0.3);animation:pulse 1.5s infinite 0.3s"></div>
        <div style="width:36px;height:36px;border-radius:50%;background:var(--blue);border:3px solid white;
          box-shadow:0 4px 12px rgba(26,111,212,0.5);display:flex;align-items:center;justify-content:center;
          font-size:16px;position:relative">🚗</div>
      </div>
    </div>`;

  canvas.innerHTML = `
    <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points="${pts}" fill="none" stroke="var(--blue)" stroke-width="0.5" stroke-dasharray="2,1" opacity="0.4"/>
      <polyline points="${WAYPOINTS.slice(0, Math.ceil(TrackState.tick/100*WAYPOINTS.length)).map(w=>`${w.x},${w.y}`).join(' ')}"
        fill="none" stroke="var(--blue)" stroke-width="1" opacity="0.8"/>
    </svg>
    ${trailHTML}
    ${wpHTML}
    ${helperMarker}`;
}

function _updateProgress() {
  const el = document.getElementById('track-progress-wrap');
  if (!el) return;
  const steps = [
    { label: t('track.step1'), icon: '🚗' },
    { label: t('track.step2'), icon: '📍' },
    { label: t('track.step3'), icon: '🏥' },
    { label: t('track.step4'), icon: '✅' },
  ];
  el.innerHTML = steps.map((step, i) => {
    const done   = i < TrackState.step;
    const active = i === TrackState.step;
    const cls    = done ? 'step-done' : active ? 'step-active' : 'step-pending';
    return `
      <div class="progress-step-item">
        <div class="progress-step-left">
          <div class="progress-step-dot ${cls}">${done ? '✓' : active ? step.icon : i+1}</div>
          ${i < steps.length-1 ? `<div class="progress-step-line${done?' done':''}"></div>` : ''}
        </div>
        <div class="progress-step-body">
          <div class="progress-step-title" style="color:${active?'var(--blue)':done?'var(--gray-800)':'var(--gray-400)'};font-weight:${active?'600':'400'}">
            ${step.label}${active ? ' <span style="font-size:11px;background:var(--blue);color:white;border-radius:10px;padding:1px 6px;margin-left:6px">Live</span>' : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function _updateFeed() {
  const el = document.getElementById('track-feed');
  if (!el) return;
  el.innerHTML = TrackState.feed.map((msg, i) => `
    <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 0;
      border-bottom:${i < TrackState.feed.length-1 ? '1px solid var(--gray-100)' : 'none'};
      ${i === 0 ? 'animation:slideUp 0.3s ease' : ''}">
      <div style="width:28px;height:28px;border-radius:50%;
        background:${msg.type==='success'?'var(--green-light)':'var(--blue-light)'};
        display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">${msg.icon}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500;color:var(--gray-800)">${msg.msg}</div>
        <div style="font-size:11px;color:var(--gray-400);margin-top:2px">${msg.time}</div>
      </div>
      ${msg.type==='success'?'<span style="color:var(--green);font-size:12px">✓</span>':''}
    </div>`).join('');
}

function _updateEtaBadge() {
  const el = document.getElementById('track-progress-bar');
  if (el) {
    el.style.width = TrackState.tick + '%';
    el.style.background = TrackState.tick >= 100 ? 'var(--green)' : 'var(--blue)';
  }
}

// ── MAIN RENDER ──────────────────────────────────────────────
function renderTracking() {
  const bookingId = Router.params.bookingId;
  const booking = SAMPLE_BOOKINGS.find(b => b.id === bookingId) || SAMPLE_BOOKINGS[0];
  const helper  = getHelperById(booking.helperId);

  // Start live simulation after render
  requestAnimationFrame(() => initTracking(booking.id));

  return `
    <div class="page fade-in">
      ${renderNavbar()}
      <div class="page-content">

        <!-- HEADER -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
          <div>
            <button class="btn btn-ghost btn-sm mb-2" onclick="clearTrackingIntervals(); Router.go('dashboard')">← ${t('dash.title')}</button>
            <h1 class="page-title">${t('track.title')}</h1>
            <p class="page-subtitle">Booking #${booking.id}</p>
          </div>
          <div style="text-align:right">
            <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--green);margin-bottom:6px">
              <div class="live-dot"></div> Live
            </div>
            <div style="font-size:24px;font-weight:700;color:var(--blue)" id="track-eta-val">
              ${_fmtETA(Math.max(0, Math.round((100 - TrackState.tick) * 1.2)) * 60)}
            </div>
            <div style="font-size:11px;color:var(--gray-400)">ETA remaining</div>
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div style="background:var(--gray-100);border-radius:4px;height:6px;margin-bottom:24px;overflow:hidden">
          <div id="track-progress-bar" style="height:100%;width:${TrackState.tick}%;background:var(--blue);border-radius:4px;transition:width 1.8s ease"></div>
        </div>

        <div class="grid-2" style="gap:24px;align-items:start">

          <!-- LEFT: MAP + PROGRESS + FEED -->
          <div>
            <!-- LIVE MAP -->
            <div class="card mb-4" style="padding:0;overflow:hidden">
              <div style="background:linear-gradient(135deg,#E8F2FD,#DBEAFE);padding:12px 16px;border-bottom:1px solid var(--gray-200);display:flex;align-items:center;justify-content:space-between">
                <div style="font-size:13px;font-weight:600;color:var(--blue)">📍 Live Location Map</div>
                <div style="font-size:11px;color:var(--gray-400)">Khon Kaen · Srinagarind Hospital route</div>
              </div>
              <!-- MAP CANVAS -->
              <div style="position:relative;height:260px;background:linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 40%,#EFF6FF 100%);overflow:hidden">
                <!-- Road grid background -->
                <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.12" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A6FD4" stroke-width="1"/></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
                  <!-- Main roads -->
                  <line x1="0" y1="60%" x2="100%" y2="30%" stroke="#1A6FD4" stroke-width="3" opacity="0.5"/>
                  <line x1="30%" y1="0" x2="50%" y2="100%" stroke="#1A6FD4" stroke-width="2" opacity="0.3"/>
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#64748B" stroke-width="1.5" opacity="0.3"/>
                  <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#64748B" stroke-width="1.5" opacity="0.3"/>
                </svg>
                <!-- Hospital marker (destination) -->
                <div style="position:absolute;left:85%;top:22%;transform:translate(-50%,-50%);z-index:5">
                  <div style="background:var(--blue);color:white;border-radius:8px;padding:4px 8px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:var(--shadow-md)">🏥 Srinagarind</div>
                  <div style="width:2px;height:10px;background:var(--blue);margin:0 auto"></div>
                </div>
                <!-- Home marker (origin) -->
                <div style="position:absolute;left:12%;top:75%;transform:translate(-50%,-50%);z-index:5">
                  <div style="background:var(--gray-700);color:white;border-radius:8px;padding:3px 7px;font-size:10px;font-weight:500">🏠 Start</div>
                </div>
                <!-- Dynamic canvas (trail + helper marker) -->
                <div id="track-map-canvas" style="position:absolute;inset:0"></div>
              </div>
              <!-- Speed & distance strip -->
              <div style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--gray-100);text-align:center">
                ${[
                  { label:'Speed',    val:'42 km/h', icon:'⚡' },
                  { label:'Distance', val:'3.2 km',  icon:'📏' },
                  { label:'Progress', val:Math.round(TrackState.tick)+'%', icon:'📊' },
                  { label:'Updated',  val:'Live',     icon:'🔄' },
                ].map(s => `
                  <div style="padding:10px 6px;border-right:1px solid var(--gray-100)">
                    <div style="font-size:11px;color:var(--gray-400);margin-bottom:2px">${s.icon} ${s.label}</div>
                    <div style="font-size:13px;font-weight:600;color:var(--gray-700)">${s.val}</div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- LIVE UPDATE FEED -->
            <div class="card">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
                <h3 style="font-weight:600;font-size:15px">📡 Live Updates</h3>
                <div style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--green)">
                  <div class="live-dot" style="width:6px;height:6px"></div>
                  Streaming
                </div>
              </div>
              <div id="track-feed" style="max-height:220px;overflow-y:auto">
                <div style="text-align:center;color:var(--gray-400);font-size:13px;padding:20px">Waiting for updates…</div>
              </div>
            </div>
          </div>

          <!-- RIGHT: PROGRESS STEPS + DETAILS + ACTIONS -->
          <div>
            <!-- Helper card -->
            <div class="card mb-4">
              <div class="flex-center gap-3">
                <div class="avatar avatar-md ${helper ? avatarColor(helper) : 'avatar-blue'}">${booking.helperInitials}</div>
                <div style="flex:1">
                  <div style="font-weight:600">${booking.helperName}</div>
                  <div class="text-sm text-muted">${helper?.faculty || 'Helper'}</div>
                  ${helper ? `<div class="text-sm">${starsHTML(helper.rating)} ${helper.rating}</div>` : ''}
                </div>
                ${statusBadge(booking.status)}
              </div>
              <!-- CPR score bar -->
              ${helper ? cprScoreBar(helper) : ''}
            </div>

            <!-- PROGRESS STEPS -->
            <div class="card mb-4">
              <h3 style="font-weight:600;margin-bottom:20px">${t('track.progress') || 'Progress'}</h3>
              <div class="progress-track" id="track-progress-wrap">
                <!-- Updated by _updateProgress() -->
              </div>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="card mb-4">
              <h3 style="font-weight:600;margin-bottom:14px">Quick Actions</h3>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary btn-full" onclick="Toast.info('Opening live chat…')">
                  💬 ${t('track.live')}
                </button>
                <button class="btn btn-secondary btn-full" onclick="Toast.info('Calling helper…')">
                  📞 ${t('track.call')}
                </button>
                <button class="btn btn-secondary btn-full" onclick="_shareProgress()">
                  📤 ${t('track.share')}
                </button>
                ${booking.status === 'completed'
                  ? `<button class="btn btn-success btn-full" onclick="showRatingModal('${booking.id}')">${t('track.rate')}</button>`
                  : ''}
                <button class="btn btn-ghost btn-sm btn-full" onclick="_advanceSimStep('${booking.id}')">
                  ${t('track.advance')}
                </button>
              </div>
            </div>

            <!-- BOOKING DETAILS -->
            <div class="card">
              <h3 style="font-weight:600;margin-bottom:14px">${t('track.details')}</h3>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
                ${[
                  ['📍', t('book.hospital'), booking.hospital],
                  ['🏥', t('book.dept'),     booking.department],
                  ['📅', t('book.date'),     booking.date],
                  ['📦', t('book.package'),  packageLabel(booking.packageId || 'pkg1')],
                  ['💰', t('book.total'),    formatPrice(booking.price)],
                ].map(([icon, label, val]) => `
                  <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--gray-100)">
                    <span style="color:var(--gray-500)">${icon} ${label}</span>
                    <span style="font-weight:500;text-align:right;max-width:180px">${val}</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── MANUAL STEP ADVANCE (demo button) ────────────────────────
function _advanceSimStep(bookingId) {
  TrackState.tick = Math.min(100, TrackState.tick + 20);
  _simTick();
  Toast.info('Step advanced');
}

function _shareProgress() {
  Modal.show(`
    <p class="text-sm text-muted mb-4">Share live tracking link with family:</p>
    <div style="background:var(--gray-100);border-radius:var(--radius-md);padding:12px;font-size:13px;font-family:monospace;word-break:break-all;margin-bottom:16px">
      https://carego.app/track/${TrackState.bookingId}?live=1
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary flex-1" onclick="Toast.success('Link copied!'); Modal.close()">📋 Copy Link</button>
      <button class="btn btn-secondary flex-1" onclick="Toast.info('Sharing via LINE…'); Modal.close()">LINE</button>
    </div>`, 'Share Progress');
}


// ── PATIENT DASHBOARD ───────────────────────────────────────
function renderDashboard() {
  const myBookings = SAMPLE_BOOKINGS;
  const tabs = ['All', 'Active', 'Confirmed', t('track.step4')];
  const activeTab = Router.params.dashTab || 'All';
  const filtered = activeTab === 'All' ? myBookings : myBookings.filter(b => b.status === activeTab.toLowerCase());

  return `
    <div class="page fade-in">
      ${renderNavbar()}
      <div class="page-content">
        <div class="flex-between page-header">
          <div>
            <h1 class="page-title">My Bookings</h1>
            <p class="page-subtitle">Track and manage all your CareGo visits</p>
          </div>
          <button class="btn btn-primary" onclick="Router.go('helpers')">+ Book a Helper</button>
        </div>

        <!-- STATS -->
        <div class="grid-4 mb-6">
          <div class="stat-card"><div class="stat-num">${myBookings.length}</div><div class="stat-label">Total Bookings</div></div>
          <div class="stat-card"><div class="stat-num">${myBookings.filter(b=>b.status==='active').length}</div><div class="stat-label">Active Now</div></div>
          <div class="stat-card"><div class="stat-num">${myBookings.filter(b=>b.status==='completed').length}</div><div class="stat-label">Completed</div></div>
          <div class="stat-card"><div class="stat-num">${formatPrice(myBookings.reduce((sum,b)=>sum+b.price,0))}</div><div class="stat-label">Total Spent</div></div>
        </div>

        <!-- TABS -->
        <div class="tabs">
          ${tabs.map(t => `<button class="tab ${activeTab===t?'active':''}" onclick="Router.go('dashboard',{dashTab:'${t}'})">${t}</button>`).join('')}
        </div>

        <!-- BOOKINGS LIST -->
        ${filtered.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:14px">
            ${filtered.map(b => {
              const helper = getHelperById(b.helperId);
              return `
                <div class="card card-hover" onclick="Router.go('tracking',{bookingId:'${b.id}'})">
                  <div class="flex-between mb-3">
                    <div class="flex-center gap-3">
                      <div class="avatar avatar-md ${helper ? avatarColor(helper) : 'avatar-blue'}">${b.helperInitials}</div>
                      <div>
                        <div style="font-weight:600">${b.helperName}</div>
                        <div class="text-sm text-muted">${b.hospital} — ${b.department}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      ${statusBadge(b.status)}
                      <div style="font-size:18px;font-weight:700;color:var(--blue);margin-top:4px">${formatPrice(b.price)}</div>
                    </div>
                  </div>
                  <div class="flex-center gap-4 text-sm text-muted">
                    <span>📅 ${b.date}</span>
                    <span>⏰ ${shiftLabel(b.shift)}</span>
                    <span>🤝 ${packageLabel(b.packageId || 'pkg1')}</span>
                  </div>
                  ${b.rating ? `<div class="mt-2">${starsHTML(b.rating)} <span class="text-xs text-muted">You rated ${b.rating}/5</span></div>` : ''}
                </div>`;
            }).join('')}
          </div>` : `
          <div class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
            <h3>No ${activeTab.toLowerCase()} bookings</h3>
            <p>Your ${activeTab.toLowerCase()} bookings will appear here</p>
            <button class="btn btn-primary mt-4" onclick="Router.go('helpers')">Book a Helper</button>
          </div>`}
      </div>
    </div>`;
}

function renderHelperDashboard() {
  const myHelper = HELPERS.find(h => h.id === State.currentUser?.helperId) || HELPERS[0];
  const myBookings = SAMPLE_BOOKINGS.filter(b => b.helperId === myHelper.id);
  const upcoming = myBookings.filter(b => b.status !== 'completed');
  const completed = myBookings.filter(b => b.status === 'completed');

  return `
    <div class="page fade-in">
      ${renderNavbar()}
      <div class="page-content">
        <div class="flex-between page-header">
          <div>
            <h1 class="page-title">Helper Dashboard</h1>
            <p class="page-subtitle">Welcome back, ${myHelper.name}</p>
          </div>
          <div class="flex-center gap-3">
            <span class="badge ${myHelper.available ? 'badge-green' : 'badge-gray'}">${myHelper.available ? '🟢 Available' : '🔴 Busy'}</span>
            <button class="btn btn-secondary btn-sm" onclick="toggleAvailability()">Toggle Status</button>
          </div>
        </div>

        <!-- STATS -->
        <div class="grid-4 mb-6">
          <div class="stat-card"><div class="stat-num">${myHelper.completedBookings}</div><div class="stat-label">Completed</div></div>
          <div class="stat-card"><div class="stat-num">${myHelper.rating}</div><div class="stat-label">Rating</div></div>
          <div class="stat-card"><div class="stat-num">${myHelper.reviews}</div><div class="stat-label">Reviews</div></div>
          <div class="stat-card"><div class="stat-num">${formatPrice(myHelper.price * myHelper.completedBookings * 3 * 0.85)}</div><div class="stat-label">Total Earned</div></div>
        </div>

        <div class="grid-2" style="gap:24px">
          <!-- UPCOMING BOOKINGS -->
          <div>
            <div class="section-header mb-3">
              <div class="section-title">Upcoming Bookings</div>
              <span class="badge badge-blue">${upcoming.length}</span>
            </div>
            ${upcoming.length > 0 ? upcoming.map(b => `
              <div class="card mb-3">
                <div class="flex-between mb-2">
                  <div class="flex-center gap-2">
                    <div class="avatar avatar-sm avatar-blue">${b.patientInitials}</div>
                    <div>
                      <div style="font-weight:500;font-size:14px">${b.patient}</div>
                      <div class="text-xs text-muted">${b.department}</div>
                    </div>
                  </div>
                  ${statusBadge(b.status)}
                </div>
                <div class="text-sm text-muted mb-3">📅 ${b.date} · ⏰ ${shiftLabel(b.shift)}</div>
                <div class="text-sm text-muted mb-3">🏥 ${b.hospital}</div>
                <div class="flex-between">
                  <span class="badge badge-blue">${getServiceById(b.service)?.name}</span>
                  <span style="font-weight:600;color:var(--blue)">${formatPrice(b.price * 0.85)}</span>
                </div>
                <div style="display:flex;gap:8px;margin-top:12px">
                  <button class="btn btn-primary btn-sm flex-1" onclick="Router.go('tracking',{bookingId:'${b.id}'})">Track</button>
                  <button class="btn btn-secondary btn-sm" onclick="Toast.info('Opening chat...')">Chat</button>
                  <button class="btn btn-danger btn-sm" onclick="Toast.error('Booking cancelled')">Cancel</button>
                </div>
              </div>`).join('') : `
              <div class="empty-state" style="padding:32px">
                <p>No upcoming bookings</p>
              </div>`}
          </div>

          <!-- PROFILE & EARNINGS -->
          <div>
            <div class="section-header mb-3"><div class="section-title">My Profile</div></div>
            <div class="card mb-4">
              <div class="flex-center gap-3 mb-4">
                <div class="avatar avatar-lg ${avatarColor(myHelper)}">${myHelper.initials}</div>
                <div>
                  <div style="font-weight:600;font-size:16px">${myHelper.name}</div>
                  <div class="text-sm text-muted">${myHelper.faculty}</div>
                  <div class="flex-center gap-2 mt-1">${starsHTML(myHelper.rating)}<span class="text-xs text-muted">${myHelper.rating}</span></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label mb-1">Languages</div>
                <div>${myHelper.languages.map(l=>`<span class="tag tag-blue">${l}</span>`).join('')}</div>
              </div>
              <div class="mb-3">
                <div class="form-label mb-1">Specialties</div>
                <div>${myHelper.specialties.map(s=>`<span class="tag tag-gray">${s}</span>`).join('')}</div>
              </div>
              <div class="mb-3">
                <div class="form-label mb-2">Hourly rate</div>
                <div style="font-family:var(--font-display);font-size:24px;color:var(--blue)">${formatPrice(myHelper.price)}<span style="font-size:14px;color:var(--gray-400)">/hr</span></div>
              </div>
              <button class="btn btn-secondary btn-full" onclick="Toast.info('Opening profile editor...')">Edit Profile</button>
            </div>

            <div class="section-header mb-3"><div class="section-title">Recent Earnings</div></div>
            <div class="card">
              ${completed.length > 0 ? completed.map(b => `
                <div class="flex-between mb-3 pb-3" style="border-bottom:1px solid var(--gray-100)">
                  <div>
                    <div style="font-size:13px;font-weight:500">${b.patient}</div>
                    <div class="text-xs text-muted">${b.date} · ${b.department}</div>
                  </div>
                  <span style="font-weight:600;color:var(--green)">+${formatPrice(Math.round(b.price * 0.85))}</span>
                </div>`).join('') : '<p class="text-sm text-muted">No completed bookings yet</p>'}
              <div class="flex-between mt-2 pt-2" style="border-top:1px solid var(--gray-200)">
                <span style="font-weight:600">Total this month</span>
                <span style="font-weight:700;color:var(--blue)">${formatPrice(completed.reduce((s,b)=>s+Math.round(b.price*0.85),0))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function toggleAvailability() {
  const h = HELPERS.find(x => x.id === (State.currentUser?.helperId || 'h1'));
  if (h) { h.available = !h.available; Toast.success(`Status: ${h.available ? 'Available' : 'Busy'}`); App.render(); }
}

let adminTab = 'overview';

function renderAdmin() {
  const sidebarItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'bookings', icon: '📋', label: 'All Bookings' },
    { id: 'helpers', icon: '👥', label: 'Helpers' },
    { id: 'users',   icon: '🗂', label: 'Users' },
    { id: 'revenue', icon: '💰', label: 'Revenue' },
    { id: 'database',icon: '🗄', label: 'Database' },
    { id: 'audit',   icon: '📜', label: 'Audit Log' },
  ];

  const sidebarHTML = sidebarItems.map(item => `
    <button class="sidebar-item ${adminTab === item.id ? 'active' : ''}" onclick="adminTab='${item.id}'; App.render()">
      <span class="sidebar-icon">${item.icon}</span>
      ${item.label}
    </button>`).join('');

  let content = '';
  if (adminTab === 'overview') content = renderAdminOverview();
  else if (adminTab === 'bookings') content = renderAdminBookings();
  else if (adminTab === 'helpers') content = renderAdminHelpers();
  else if (adminTab === 'users')   content = renderAdminUsers();
  else if (adminTab === 'revenue') content = renderAdminRevenue();
  else if (adminTab === 'database') content = renderAdminDatabase();
  else if (adminTab === 'audit')   content = renderAdminAudit();

  return `
    <div style="padding-top:64px;min-height:100vh" class="fade-in">
      ${renderNavbar()}
      <div class="dash-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-label">Admin Panel</div>
          ${sidebarHTML}
        </div>
        <div class="divider"></div>
        <div class="sidebar-section">
          <button class="sidebar-item" onclick="Router.go('landing')">
            <span class="sidebar-icon">🏠</span> Back to Site
          </button>
          <button class="sidebar-item" onclick="logout()">
            <span class="sidebar-icon">🚪</span> Sign out
          </button>
        </div>
      </div>
      <div class="dash-main">
        <div class="dash-content">${content}</div>
      </div>
    </div>`;
}

function renderAdminOverview() {
  const stats = ADMIN_STATS;
  return `
    <div class="page-header">
      <h1 class="page-title">Overview</h1>
      <p class="page-subtitle">CareGo platform stats — July 2025</p>
    </div>

    <div class="grid-3 mb-6">
      ${[
        { label: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: 'blue' },
        { label: 'Active Today', value: stats.activeToday, icon: '🔴', color: 'red' },
        { label: 'Total Helpers', value: stats.totalHelpers, icon: '👥', color: 'teal' },
        { label: 'Revenue', value: formatPrice(stats.revenue), icon: '💰', color: 'blue' },
        { label: 'Avg Rating', value: stats.avgRating, icon: '⭐', color: 'amber' },
        { label: 'Completion Rate', value: stats.completionRate + '%', icon: '✅', color: 'green' },
      ].map(s => `
        <div class="stat-card">
          <div style="font-size:28px;margin-bottom:4px">${s.icon}</div>
          <div style="font-family:var(--font-display);font-size:28px;color:var(--${s.color});line-height:1.1">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join('')}
    </div>

    <div class="grid-2 mb-6">
      <!-- Recent Bookings -->
      <div>
        <div class="section-header mb-3">
          <div class="section-title">Recent Bookings</div>
          <button class="btn btn-ghost btn-sm" onclick="adminTab='bookings'; App.render()">View all →</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>ID</th><th>Patient</th><th>Helper</th><th>Status</th><th>Price</th>
            </tr></thead>
            <tbody>
              ${SAMPLE_BOOKINGS.map(b => `<tr>
                <td><span class="text-xs text-muted">#${b.id}</span></td>
                <td style="font-weight:500">${b.patient}</td>
                <td>${b.helperName}</td>
                <td>${statusBadge(b.status)}</td>
                <td style="font-weight:600;color:var(--blue)">${formatPrice(b.price)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Helpers -->
      <div>
        <div class="section-header mb-3">
          <div class="section-title">Top Helpers</div>
          <button class="btn btn-ghost btn-sm" onclick="adminTab='helpers'; App.render()">View all →</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Helper</th><th>Rating</th><th>Jobs</th><th>Status</th></tr></thead>
            <tbody>
              ${HELPERS.slice(0,5).map(h => `<tr>
                <td><div class="flex-center gap-2"><div class="avatar avatar-sm ${avatarColor(h)}">${h.initials}</div><span style="font-weight:500">${h.name}</span></div></td>
                <td>${starsHTML(h.rating)} ${h.rating}</td>
                <td>${h.completedBookings}</td>
                <td><span class="badge ${h.available ? 'badge-green' : 'badge-gray'}">${h.available ? 'Active' : 'Busy'}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Phase progress -->
    <div class="card">
      <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">Project Phase Progress</h3>
      ${[
        { phase: 'Phase 0 — Preparation', done: 100, color: '#16A34A' },
        { phase: 'Phase 1 — MVP Launch', done: 100, color: '#16A34A' },
        { phase: 'Phase 2 — Expansion', done: 65, color: '#1A6FD4' },
        { phase: 'Phase 3 — Scaling', done: 15, color: '#F59E0B' },
      ].map(p => `
        <div class="mb-3">
          <div class="flex-between mb-1">
            <span class="text-sm">${p.phase}</span>
            <span class="text-sm font-semibold" style="color:${p.color}">${p.done}%</span>
          </div>
          <div style="height:8px;background:var(--gray-100);border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${p.done}%;background:${p.color};border-radius:4px;transition:width 1s ease"></div>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderAdminBookings() {
  return `
    <div class="page-header">
      <h1 class="page-title">All Bookings</h1>
      <p class="page-subtitle">${SAMPLE_BOOKINGS.length} bookings total</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Booking ID</th><th>Patient</th><th>Helper</th><th>Hospital</th>
          <th>Date</th><th>Service</th><th>Status</th><th>Price</th><th>Action</th>
        </tr></thead>
        <tbody>
          ${SAMPLE_BOOKINGS.map(b => `<tr>
            <td><span class="text-xs text-muted">#${b.id}</span></td>
            <td><div class="flex-center gap-2"><div class="avatar avatar-sm avatar-blue">${b.patientInitials}</div>${b.patient}</div></td>
            <td><div class="flex-center gap-2"><div class="avatar avatar-sm avatar-teal">${b.helperInitials}</div>${b.helperName}</div></td>
            <td class="text-sm text-muted">${b.hospital}</td>
            <td class="text-sm">${b.date}</td>
            <td><span class="badge badge-gray">${packageLabel(b.packageId || 'pkg1') || 'Basic'}</span></td>
            <td>${statusBadge(b.status)}</td>
            <td style="font-weight:600;color:var(--blue)">${formatPrice(b.price)}</td>
            <td><button class="btn btn-ghost btn-sm" onclick="Router.go('tracking',{bookingId:'${b.id}'})">View</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderAdminHelpers() {
  return `
    <div class="flex-between page-header">
      <div>
        <h1 class="page-title">Helpers</h1>
        <p class="page-subtitle">${HELPERS.length} registered helpers</p>
      </div>
      <button class="btn btn-primary" onclick="Toast.info('Opening helper registration form...')">+ Add Helper</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Helper</th><th>Faculty</th><th>Languages</th><th>Rating</th>
          <th>Completed</th><th>Price</th><th>Status</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${HELPERS.map(h => `<tr>
            <td><div class="flex-center gap-2"><div class="avatar avatar-sm ${avatarColor(h)}">${h.initials}</div><span style="font-weight:500">${h.name}</span></div></td>
            <td class="text-sm text-muted">${h.faculty}</td>
            <td>${h.languages.map(l => `<span class="tag tag-blue">${l}</span>`).join('')}</td>
            <td>${starsHTML(h.rating)} ${h.rating}</td>
            <td>${h.completedBookings}</td>
            <td style="font-weight:600;color:var(--blue)">${formatPrice(h.price)}/hr</td>
            <td><span class="badge ${h.available ? 'badge-green' : 'badge-gray'}">${h.available ? 'Available' : 'Busy'}</span></td>
            <td>
              <div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" onclick="openHelperDetail('${h.id}')">View</button>
                <button class="btn btn-danger btn-sm" onclick="Toast.error('Helper suspended')">Suspend</button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderAdminRevenue() {
  const monthlyData = [
    { month: 'Feb', amount: 4200 },
    { month: 'Mar', amount: 7800 },
    { month: 'Apr', amount: 11200 },
    { month: 'May', amount: 15600 },
    { month: 'Jun', amount: 22400 },
    { month: 'Jul', amount: 28220 },
  ];
  const maxVal = Math.max(...monthlyData.map(d => d.amount));

  return `
    <div class="page-header">
      <h1 class="page-title">Revenue</h1>
      <p class="page-subtitle">Financial overview — 2025</p>
    </div>

    <div class="grid-3 mb-6">
      ${[
        { label: 'Total Revenue', value: formatPrice(ADMIN_STATS.revenue), sub: '+32% from last month' },
        { label: 'This Month', value: formatPrice(28220), sub: '247 bookings' },
        { label: 'Avg per Booking', value: formatPrice(Math.round(ADMIN_STATS.revenue / ADMIN_STATS.totalBookings)), sub: 'Platform takes 15%' },
      ].map(s => `
        <div class="card text-center">
          <div style="font-family:var(--font-display);font-size:28px;color:var(--blue);margin-bottom:4px">${s.value}</div>
          <div style="font-weight:500;margin-bottom:4px">${s.label}</div>
          <div class="text-sm text-muted">${s.sub}</div>
        </div>`).join('')}
    </div>

    <div class="card mb-6">
      <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:20px">Monthly Revenue (2025)</h3>
      <div style="display:flex;align-items:flex-end;gap:12px;height:180px;padding-bottom:8px">
        ${monthlyData.map(d => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
            <div style="font-size:11px;color:var(--blue);font-weight:600">${formatPrice(d.amount)}</div>
            <div style="width:100%;background:var(--blue);border-radius:4px 4px 0 0;height:${Math.round((d.amount/maxVal)*130)}px;transition:height 0.5s ease;min-height:4px"></div>
            <div style="font-size:12px;color:var(--gray-500)">${d.month}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">Revenue by Service Type</h3>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr><th>Package</th><th>Bookings</th><th>Revenue</th><th>Share</th></tr></thead>
          <tbody>
            ${PACKAGES.map((pkg, i) => {
              const count = [89, 54, 38, 26, 21, 19][i] || 20;
              const rev = (pkg.price) * count;
              return `<tr>
                <td>${pkg.icon} ${pkgName(pkg)}</td>
                <td>${count}</td>
                <td style="font-weight:600;color:var(--blue)">${formatPrice(rev)}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="flex:1;height:6px;background:var(--gray-100);border-radius:3px;overflow:hidden">
                      <div style="height:100%;width:${Math.round((count/89)*100)}%;background:var(--blue);border-radius:3px"></div>
                    </div>
                    <span class="text-xs text-muted">${Math.round((count/247)*100)}%</span>
                  </div>
                </td>
              </tr>`;}).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ── ADMIN: USERS TABLE ──────────────────────────────────────
function renderAdminUsers() {
  const users = DB.getAllUsers();
  return `
    <div class="flex-between page-header">
      <div>
        <h1 class="page-title">Registered Users</h1>
        <p class="page-subtitle">${users.length} users in database</p>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Name</th><th>Email</th><th>Role</th>
          <th>Bookings</th><th>Joined</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${users.map(u => `<tr>
            <td><div class="flex-center gap-2">
              <div class="avatar avatar-sm avatar-blue">${u.initials||'?'}</div>
              <span style="font-weight:500">${u.name||'—'}</span>
            </div></td>
            <td class="text-sm text-muted">${u.email}</td>
            <td>${statusBadge(u.role==='admin'?'active':u.role==='helper'?'confirmed':'pending').replace('active','').replace('pending','')}
              <span class="badge ${u.role==='admin'?'badge-red':u.role==='helper'?'badge-teal':'badge-blue'}">${u.role}</span></td>
            <td>${u.bookingCount||0}</td>
            <td class="text-xs text-muted">${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
            <td><button class="btn btn-danger btn-sm" onclick="adminDeleteUser('${u.email}')">Delete</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function adminDeleteUser(email) {
  if (confirm(`Delete user ${email}? This cannot be undone.`)) {
    DB.deleteUser(email);
    Toast.success('User deleted');
    App.render();
  }
}

// ── ADMIN: DATABASE PANEL ───────────────────────────────────
function renderAdminDatabase() {
  const breakdown = DB.storageBreakdown();
  const total     = DB.storageUsed();
  const users     = DB.getAllUsers().length;
  const bookings  = DB.getAllBookings().length;
  const reviews   = (DB._read(DB.KEYS.REVIEWS)||[]).length;

  return `
    <div class="page-header">
      <h1 class="page-title">Database</h1>
      <p class="page-subtitle">localStorage storage — all data persists across sessions</p>
    </div>

    <div class="grid-3 mb-6">
      <div class="stat-card"><div class="stat-num">${users}</div><div class="stat-label">Registered users</div></div>
      <div class="stat-card"><div class="stat-num">${bookings}</div><div class="stat-label">Total bookings</div></div>
      <div class="stat-card"><div class="stat-num">${reviews}</div><div class="stat-label">Reviews saved</div></div>
    </div>

    <div class="grid-2 mb-6">
      <div class="card">
        <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">Storage Breakdown</h3>
        ${Object.entries(breakdown).map(([name, size]) => `
          <div class="flex-between mb-2 text-sm">
            <span class="text-muted">${name}</span>
            <span style="font-weight:500;font-family:var(--font-mono)">${size}</span>
          </div>`).join('')}
        <div class="divider"></div>
        <div class="flex-between">
          <span style="font-weight:600">Total used</span>
          <span style="font-weight:700;color:var(--blue);font-family:var(--font-mono)">${total}</span>
        </div>
      </div>

      <div class="card">
        <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">Actions</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          <button class="btn btn-secondary btn-full" onclick="adminExportDB()">
            📥 Export all data as JSON
          </button>
          <button class="btn btn-secondary btn-full" onclick="adminResetSeeds()">
            🔄 Re-seed demo data
          </button>
          <button class="btn btn-danger btn-full" onclick="adminClearDB()">
            🗑 Clear ALL database
          </button>
        </div>
        <div class="tip" style="margin-top:16px;border-left:2px solid var(--blue-mid);padding:8px 12px;background:var(--blue-light);border-radius:0 var(--radius-md) var(--radius-md) 0;font-size:12px;color:var(--blue-dark)">
          Data is stored in your browser's localStorage. It persists until you clear it or clear browser data.
        </div>
      </div>
    </div>

    <div class="card">
      <h3 style="font-family:var(--font-display);font-size:18px;margin-bottom:16px">Recent User Registrations</h3>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Joined</th></tr></thead>
          <tbody>
            ${DB.getAllUsers().slice(0,10).map(u=>`<tr>
              <td style="font-family:var(--font-mono);font-size:13px">${u.email}</td>
              <td style="font-weight:500">${u.name||'—'}</td>
              <td><span class="badge ${u.role==='admin'?'badge-red':u.role==='helper'?'badge-teal':'badge-blue'}">${u.role}</span></td>
              <td class="text-xs text-muted">${u.createdAt?new Date(u.createdAt).toLocaleString():'—'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function adminExportDB() {
  const json = DB.exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'carego_db_' + Date.now() + '.json';
  a.click(); URL.revokeObjectURL(url);
  Toast.success('Database exported as JSON');
}

function adminResetSeeds() {
  if (confirm('Re-seed demo data? This will not delete existing users.')) {
    DB._write(DB.KEYS.BOOKINGS, SAMPLE_BOOKINGS);
    DB._write(DB.KEYS.REVIEWS, REVIEWS);
    Toast.success('Demo data re-seeded');
    App.render();
  }
}

function adminClearDB() {
  if (confirm('WARNING: This will delete ALL users, bookings, and reviews. Are you sure?')) {
    DB.clearAll();
    Toast.error('All data cleared');
    setTimeout(() => { State.role=null; State.currentUser=null; Router.go('landing'); }, 1000);
  }
}

// ── ADMIN: AUDIT LOG ────────────────────────────────────────
function renderAdminAudit() {
  const log = DB.getAuditLog();
  const typeColors = {
    LOGIN:'badge-blue', LOGOUT:'badge-gray', REGISTER:'badge-green',
    BOOKING:'badge-teal', BOOKING_STATUS:'badge-amber',
    REVIEW:'badge-amber', HELPER_UPDATE:'badge-blue',
    DELETE_USER:'badge-red', UPDATE_USER:'badge-gray',
  };
  return `
    <div class="flex-between page-header">
      <div>
        <h1 class="page-title">Audit Log</h1>
        <p class="page-subtitle">${log.length} events recorded</p>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="DB._remove(DB.KEYS.AUDIT); Toast.info('Log cleared'); App.render()">Clear log</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Time</th><th>Action</th><th>User</th><th>Details</th></tr></thead>
        <tbody>
          ${log.slice(0,100).map(entry=>`<tr>
            <td class="text-xs text-muted" style="white-space:nowrap">${new Date(entry.ts).toLocaleString()}</td>
            <td><span class="badge ${typeColors[entry.action]||'badge-gray'}">${entry.action}</span></td>
            <td style="font-family:var(--font-mono);font-size:12px">${entry.user}</td>
            <td class="text-xs text-muted">${JSON.stringify(entry.data)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

const App = {
  render() {
    const app = document.getElementById('app');
    const page = Router.current;

    let html = '';
    if (page === 'landing')           html = renderLanding();
    else if (page === 'helpers')      html = renderHelpers();
    else if (page === 'booking')      html = renderBooking();
    else if (page === 'tracking')     html = renderTracking();
    else if (page === 'dashboard')    html = renderDashboard();
    else if (page === 'helper-dashboard') html = renderHelperDashboard();
    else if (page === 'admin')        html = renderAdmin();
    else html = renderLanding();

    app.innerHTML = html;
  },

  init() {
    Toast.init();
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', () => { I18N.init(); DB.init(); App.init(); });

  
