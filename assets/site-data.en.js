/* =========================================================
   English translation（英文版內容）
   - 結構和 site-data.js 一樣；只寫需要翻譯的欄位，沒寫的會沿用中文資料
   - 課程、平台、影音用 id 對應；研究、發表、證照等清單用「順序」對應
   - zh 欄位 = 卡片上的主要名稱，en 欄位 = 名稱下方的小字（英文版放中文原名）
   ========================================================= */
window.LAB_I18N = window.LAB_I18N || {};
window.LAB_I18N.en = {
  lab: {
    nameZh: "Optometry Education & AI Lab",
    nameEn: "視光智慧教學實驗室",
    tagline: "Making optometry visible, hands-on, and learnable",
    intro: "We turn the abstract optics and clinical procedures of optometry courses into interactive materials that students can operate with their own hands, and we use artificial intelligence to develop new ways of teaching and assessing clinical skills.",
    unit: "Department of Optometry, Mackay Junior College of Medicine, Nursing, and Management",
  },

  courses: [
    {
      id: "optometry-1", tag: "2-Year In-Service", zh: "Optometry I", en: "視光學（一）", credits: "2 credits",
      desc: "Fall semester, continued by Optometry II in the spring. The first course in the refraction sequence: visual acuity and chart systems, myopia, hyperopia and astigmatism, through maximum plus to maximum visual acuity (MPMVA), the Jackson cross cylinder (JCC), binocular balance and the final prescription.",
      topics: ["Optotypes & VA conversion", "MAR / LogMAR", "Optical cross", "MPMVA", "Clock dial", "JCC", "Stenopaic slit", "Binocular balance"],
    },
    {
      id: "optometry-lab-1", tag: "2-Year In-Service", zh: "Optometry Laboratory I", en: "視光學實驗（一）", credits: "1 credit",
      desc: "Fall semester, continued by Optometry Laboratory II in the spring. A hands-on lab paired week by week with Optometry I: case history and recording, pupillary distance, phoropter operation, autorefraction, ocular dominance, pinhole, fogging, monocular subjective refraction and the duochrome test.",
      topics: ["Case history & records", "Pupillary distance", "Phoropter", "Autorefraction", "Fogging", "Duochrome"],
    },
    {
      id: "optometry-2", tag: "2-Year In-Service", zh: "Optometry II", en: "視光學（二）",
      desc: "The spring-semester continuation of Optometry I, extending training in refraction procedures and clinical judgment.",
    },
    {
      id: "optometry-lab-2", tag: "2-Year In-Service", zh: "Optometry Laboratory II", en: "視光學實驗（二）",
      desc: "The spring-semester continuation of Optometry Laboratory I, paired week by week with Optometry II.",
    },
    {
      id: "optometry-lab-3", tag: "2-Year In-Service", zh: "Optometry Laboratory III", en: "視光學實驗（三）", credits: "1 credit",
      desc: "Performing and interpreting preliminary eye examinations and binocular vision tests: from the Amsler grid, color vision and stereopsis to the cover test, phoria measurements, fusional vergence ranges and ZCSBV analysis.",
      topics: ["Amsler / Color vision / Stereopsis", "NPC / NPA", "Worth 4 Dot", "Cover test", "von Graefe", "Maddox rod", "Vergence range", "ZCSBV"],
    },
    {
      id: "ophthalmic-optics-integration", tag: "2-Year In-Service", semester: "Year 3, Spring", zh: "Integrated Ophthalmic Optics & Dispensing", en: "眼鏡光學技術整合",
      desc: "A third-year spring course in the 2-year in-service program that integrates ophthalmic optics theory with practical dispensing skills.",
    },
    {
      id: "optometry-terms", tag: "5-Year Program", zh: "Introduction to Optometric Terminology", en: "視光常用術語概論",
      desc: "The first optometry course for first-year students in the 5-year program: anatomy of the eye, refractive errors, presbyopia and accommodation, and the future of optometry, with hands-on projects such as clay eye models, an optical bench and building VR glasses.",
      topics: ["Anatomy of the eye", "Myopia / Hyperopia / Astigmatism", "Presbyopia & accommodation", "Vergence", "Prentice's rule", "Future of optometry"],
    },
    {
      id: "optometry-english", tag: ["2-Year In-Service", "5-Year Program"], zh: "English for Optometric Examination", en: "視光檢查常用英文",
      desc: "Common English terms and phrases for optometric examinations and clinical communication, from case history and test instructions to explaining results.",
      topics: ["History taking", "Test instructions", "Terminology", "Clinical records"],
    },
  ],

  platforms: [
    {
      id: "optics-bench", short: "Optics Bench", zh: "Optics Bench", en: "視光光學實驗台",
      desc: "15 chapters of geometric and visual optics with 30 draggable optics experiments, built around predict-then-verify, concept checks and practice problems with randomized numbers.",
      tags: ["Geometric optics", "Visual optics", "Interactive labs"],
      stats: "15 chapters · 30 labs · 83 problem types",
    },
    {
      id: "optometry-lab-bench", short: "Clinical Bench", zh: "Clinical Optometry Bench", en: "視光學臨床實驗台",
      desc: "Interactive materials for Optometry I and II: visual acuity charts, refraction procedures and binocular vision tests turned into simulations. Each chapter builds the concept, asks students to predict, then lets them verify by hand, with concept checks and randomized practice problems.",
      tags: ["Refraction", "Clinical simulation", "Interactive labs"],
      stats: "Prologue + 9 chapters",
    },
    {
      id: "optquest", zh: "OptQuest II", en: "Optometry RPG",
      desc: "An optometry RPG set on the Mackay campus: solve clinical cases, collect equipment, complete quests and finally face the end-of-term boss exam. Teachers can export scores from the dashboard.",
      note: "For Mackay students only",
      tags: ["Game-based learning", "Clinical cases"],
      stats: "11 clinical cases · 17 quests",
    },
    {
      id: "record-ai", short: "Record Coach", zh: "Refraction Record Coach", en: "AI 驗光紀錄輔助學習系統",
      desc: "Students photograph their paper refraction records; the system reads them, checks completeness and clinical plausibility, and gives instant learning feedback.",
      note: "For Mackay students only",
      tags: ["Image recognition", "Practice feedback"],
    },
    {
      id: "zcsbv", short: "ZCSBV Plotter", zh: "ZCSBV Plotter", en: "ZCSBV 圖解教學程式",
      desc: "Enter binocular vision test data and the ZCSBV graph is drawn automatically, helping students identify six common binocular vision problems such as convergence insufficiency and divergence excess.",
      note: "For Mackay students only",
      tags: ["Binocular vision", "Graphical analysis"],
    },
    {
      id: "blinklearn", short: "BlinkLearn", zh: "BlinkLearn EduAI", en: "Blink & Gaze Learning Platform",
      desc: "Uses computer vision to analyze how students use their eyes while studying and gives personalized eye-care reminders, so they can look after their vision while they learn.",
      note: "For Mackay students only",
      tags: ["Computer vision", "Eye care", "EdTech"],
      usedFor: ["Student projects"],
    },
  ],

  videos: [
    {
      id: "admissions", zh: "Admissions Information Session", en: "招生說明會",
      desc: "Recording of Mackay Optometry's online admissions session. To learn more about the program, courses and careers, follow our admissions accounts, 睛來馬偕｜視光情報所.",
      videos: [{ id: "5HJf_G4bx9I", title: "Online session (Dec 17)" }],
      tags: ["Admissions", "Online session"],
    },
    {
      id: "basic-optics", zh: "Basic Optics Experiments", en: "基礎光學實驗",
      desc: "Demonstrations of the basic optics experiments done in class, for students to watch before class and review afterwards.",
      tags: ["Lab demos", "Basic optics"],
    },
    {
      id: "free-clinic", zh: "Community Vision Screening", en: "公益篩檢",
      desc: "Highlights from community vision screenings, where our optometry students leave campus to provide vision checks and eye-health education.",
      videos: [
        { id: "5vEMJWYRuFg", title: "2023-09-01 Pingdeng Elementary School screening" },
        { id: "CVwSmzpdX8Y", title: "2023-07-29 Shenkeng screening" },
      ],
      tags: ["Vision screening", "Eye exams", "Eye-health education"],
    },
    {
      id: "optometrist-conf", zh: "Taiwan Optometrist Annual Conference", en: "驗光師年會",
      desc: "Highlights from our participation in the Taiwan Optometrist Annual Conference.",
      videos: [{ id: "CCtGsjkmyyo", title: "Conference highlights" }],
      tags: ["Annual conference", "Professional exchange"],
    },
    {
      id: "usr-north", zh: "University Social Responsibility (USR)", en: "USR 大學社會責任計畫",
      desc: "Outcomes of our University Social Responsibility projects, including the Northern Taiwan USR Exhibition.",
      videos: [
        { id: "3icj8nH5yYA", title: "Let's talk about our USR!" },
        { id: "PoJYw3VZVx0", title: "USR student training program" },
      ],
      tags: ["USR", "Exhibition"],
    },
  ],

  research: [
    {
      zh: "AI Standardized Patients for OSCE", en: "AI 標準病人與 OSCE 問診訓練",
      desc: "Using generative AI to build virtual standardized patients so students can practice optometric history taking beyond the classroom, and exploring their feasibility as tools for teaching and assessing clinical skills.",
      tags: ["Generative AI", "Medical education"],
    },
    {
      zh: "Diabetic Retinopathy Grading", en: "糖尿病視網膜病變眼底影像分級",
      desc: "Fine-tuning pretrained models on public datasets to grade lesions in fundus images, and reviewing the results from the perspective of clinical management to study the safety and trustworthiness of medical AI.",
      tags: ["Computer vision", "Deep learning", "Medical AI"],
    },
    {
      zh: "BlinkLearn EduAI", en: "眼動與護眼學習平台",
      desc: "Using computer vision to analyze eye use during study and provide personalized eye-care reminders, combining optometric expertise with educational technology.",
      tags: ["Computer vision", "EdTech"],
    },
    {
      zh: "Educational Data Analytics", en: "教育大數據與預警模型",
      desc: "Applying public education data and machine learning to build early-warning models for institutional issues, as a reference for educational decision-making.",
      tags: ["Data science", "Machine learning"],
    },
    {
      zh: "Rubric Learnability", en: "評量規準的可學習性",
      desc: "Examining, from a machine-learning perspective, how the design of assessment rubrics relates to learning outcomes.",
      tags: ["Machine learning", "Assessment design"],
    },
  ],

  /* 發表：保留中文原題，titleTr 為翻譯題目（依順序對應） */
  publications: [
    { titleTr: "Predicting the risk of sudden illness at national park scenic areas by combining data and health technology" },
    { titleTr: "Building a financial early-warning model for colleges and universities with generative AI and educational finance big data" },
    { titleTr: "Risk factors and an early-warning model for student pregnancy using educational big data" },
    { titleTr: "Where reality meets the virtual: comparing aesthetic trends in professional eyewear design and anime characters in business marketing", venue: "2025 Beauty Science Conference (Poster Award, Honorable Mention)" },
    { titleTr: "Linking changes in visual ability with the dignity of life" },
    { titleTr: "Preferences in eyewear frame design" },
    { titleTr: "Bennett & Rabbetts' Clinical Visual Optics (Chinese translation)", authors: "Kuan-Wei Lee et al. (co-translators)" },
  ],

  pi: {
    nameZh: "Kuan-Wei Lee", nameEn: "李冠緯",
    title: ["Department of Optometry", "Lecturer | Licensed Optometrist"],
    unit: "Mackay Junior College of Medicine, Nursing, and Management",
    bio: "Trained as an optometrist, with experience in optical retail and clinical practice as well as industry R&D, continuing education and industry–academia collaboration. Has taught at Mackay Optometry since 2019 and is currently pursuing a master's degree in artificial intelligence, focusing on bringing AI into clinical optometry education and fundus image analysis. Also serves as Mackay Optometry's admissions contact and as organizer and external contact for its community vision screening program.",
    current: [
      "Admissions Contact, Department of Optometry, Mackay Junior College",
      "Organizer & External Contact, Mackay Optometry Community Vision Screening",
      "Co-Principal Investigator, 4th-phase University Social Responsibility (USR) Seed Project",
      "Supervisor (3rd term) & Continuing Education Convener, New Taipei City Optometrists Association",
    ],
    education: [
      "M.S. Program in Artificial Intelligence Technology, National Taipei University of Technology (2025–2027, in progress)",
      "Executive MBA, The University of Texas at Arlington (UTA) (2025–2027, in progress)",
      "B.S., Department of Optometry, Chung Shan Medical University (2015–2018)",
    ],
    experience: [
      "2022– Lecturer, Department of Optometry, Mackay Junior College (2024: also Project Manager, USR Office)",
      "2022 Technical Director, R&D Center, Brighten Optix",
      "2019–2022 Deputy Section Chief, Human Resource Development / Optometrist, Kobayashi Optical (built industry–academia partnerships with 91% of optometry programs in Taiwan)",
      "2019–2022 Adjunct Lecturer, Department of Optometry, Mackay Junior College",
    ],
    licenses: [
      { group: "Healthcare", items: [
        { name: "Licensed Optometrist (Taiwan)", note: "Passed the national professional licensing examination · license issued by the Ministry of Health and Welfare (2018)" },
        { name: "Long-term Care Personnel Certificate (Healthcare Professional)", note: "Issued by New Taipei City Government · valid through 2032" },
      ] },
      { group: "Artificial Intelligence", items: [
        { name: "iPAS AI Application Planner", note: "Industry competency certification, Ministry of Economic Affairs" },
        { name: "Large Language Model Instructor Certification", note: "Taiwan AI Association, 1st cohort · graduated first in class" },
        { name: "Google digital skills certificates (multiple)", note: "Including AI for Generalists (Google Digital Talent program) and others" },
      ] },
      { group: "Emergency Care", items: [
        { name: "BLS Instructor", note: "Basic Life Support Instructor" },
        { name: "ACLS", note: "Advanced Cardiovascular Life Support" },
        { name: "EMT-1", note: "Emergency Medical Technician – Basic" },
      ] },
      { group: "Management & Sustainability", items: [
        { name: "Human Resource Management Specialist", note: "ATS" },
        { name: "Intermediate ESG Manager", note: "TISDA" },
      ] },
      { group: "Research Ethics", items: [
        { name: "Academic Research Ethics Course", note: "Center for Taiwan Academic Research Ethics Education · 12 hours, including AI research ethics (2025)" },
      ] },
    ],
    service: [
      "Supervisor & Continuing Education Convener (3rd term), New Taipei City Optometrists Association (2023–)",
      "Director & Continuing Education Committee Member (2nd term), New Taipei City Optometrists Association (2020–2023)",
      "Academic Committee Member, 3rd Taiwan Optometrist Annual Conference",
      "Continuing Education Instructor, New Taipei City Optometrists Association: English for Optometric Examination (2025)",
      "Member, International Association of Contact Lens Educators (IACLE)",
      "Member, Taiwan AI Association",
    ],
    projects: [
      "Co-Principal Investigator, 4th-phase USR Seed Project",
      "Co-Investigator, 3rd-phase USR Institutional Development Project",
      "Co-Investigator, 3rd-phase USR Seed Project",
    ],
    awards: [
      "Poster Award (Honorable Mention), 2025 Beauty Science Conference",
      "Innovative Teaching Competition, Honorable Mention (2024)",
      "Teaching Materials & Aids Project, Honorable Mention (2024)",
      "Teaching Materials & Aids Project, Excellence Award (2023)",
      "First in class, 1st LLM Instructor Certification Program, Taiwan AI Association",
    ],
    outreach: {
      title: "Community Vision Screening",
      text: "As organizer and external contact for Mackay Optometry's community vision screening, he leads optometry students off campus every year to provide vision screening and eye-health education — dozens of events serving well over a thousand people so far. Organizations interested in partnering are welcome to get in touch by email.",
    },
  },

  contact: {
    phone: ["+886-2-2858-4180", "ext. 2415 / 2250"],
    address: ["No. 92, Shengjing Rd., Beitou Dist., Taipei City, Taiwan", "Mackay Junior College of Medicine, Nursing, and Management", "Department of Optometry"],
    topics: "Admissions inquiries, community vision screening partnerships, course and teaching-material exchange",
  },

  copyright: {
    note: "All rights reserved. Site content and teaching materials are for educational use; please do not reproduce them or use them commercially without permission.",
  },
};
