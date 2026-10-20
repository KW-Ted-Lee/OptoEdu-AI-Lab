/* =========================================================
   實驗室首頁資料（CONFIG）
   網站上所有文字內容都在這裡修改，不需要動 HTML。
   - 新增一門課：在 courses 陣列加一筆
   - 新增一個學習平台：在 platforms 陣列加一筆
   - 新增一篇發表：在 publications 陣列加一筆
   欄位留空字串 "" 或刪除，該欄位就不會顯示。
   標示「TODO」的地方是目前資料不足、需要您補上的內容。
   英文、日文翻譯在 site-data.en.js、site-data.ja.js；
   這裡新增或修改內容後，記得也到那兩個檔案補上翻譯（沒補的欄位會顯示中文）。
   ========================================================= */
window.LAB_CONFIG = {
  lab: {
    nameZh: "視光智慧教學實驗室",           // TODO：實驗室中文名稱（暫定）
    nameEn: "Optometry Education & AI Lab", // TODO：實驗室英文名稱（暫定）
    short: "OptoEdu AI Lab",
    tagline: "讓視光學看得見、摸得到、練得會",
    intro: "我們把視光課程裡抽象的光學與臨床流程，做成學生可以親手操作的互動教材，並用人工智慧發展新的臨床教學與評量方式。",
    unit: "馬偕醫護管理專科學校 視光學科",
  },

  /* 課程：tag = 學制或班別（多個學制都有開就用陣列，例如 ["二專在職", "五專"]）；platforms 填學習平台的 id（見下方 platforms） */
  courses: [
    {
      id: "optometry-1", code: "01056", tag: "二專在職", semester: "",   // TODO：本學期是否開課、學期別
      zh: "視光學（一）", en: "Optometry I",
      desc: "上學期課程，下學期接續視光學（二）。驗光流程的第一門課：從視力與視標系統、近視、遠視、散光，到最大正度數最佳視力（MPMVA）、交叉圓柱鏡（JCC）、雙眼平衡與最終處方。",
      time: "", room: "", status: "",
      credits: "2 學分",
      topics: ["視標與視力換算", "MAR / LogMAR", "光學十字", "MPMVA", "鐘面圖", "JCC", "裂孔板", "雙眼平衡"],
      platforms: ["optics-bench", "optometry-lab-bench", "phoropter", "record-ai"],
    },
    {
      id: "optometry-lab-1", code: "01058", tag: "二專在職", semester: "",
      zh: "視光學實驗（一）", en: "Optometry Laboratory I",
      desc: "上學期課程，下學期接續視光學實驗（二）。與視光學（一）逐週對應的實作課：問診與記錄、瞳孔距離、綜合驗光儀操作、電腦驗光、主利眼、針孔、雲霧法、單眼自覺式驗光與紅綠雙色法。",
      time: "", room: "", status: "",
      credits: "1 學分",
      topics: ["問診與記錄", "瞳孔距離", "綜合驗光儀", "電腦驗光", "雲霧法", "紅綠雙色"],
      platforms: ["optics-bench", "optometry-lab-bench", "phoropter", "record-ai"],
    },
    {
      id: "optometry-2", code: "", tag: "二專在職", semester: "",        // TODO：課號、學分、重點主題
      zh: "視光學（二）", en: "Optometry II",
      desc: "視光學（一）的下學期課程，延續驗光流程與臨床判斷的訓練。",
      time: "", room: "", status: "",
      credits: "",
      topics: [],
      platforms: ["optics-bench", "optometry-lab-bench", "phoropter", "record-ai"],
    },
    {
      id: "optometry-lab-2", code: "", tag: "二專在職", semester: "",    // TODO：課號、學分、重點主題
      zh: "視光學實驗（二）", en: "Optometry Laboratory II",
      desc: "視光學實驗（一）的下學期課程，與視光學（二）逐週對應的實作課。",
      time: "", room: "", status: "",
      credits: "",
      topics: [],
      platforms: ["optics-bench", "optometry-lab-bench", "phoropter", "record-ai"],
    },
    {
      id: "optometry-lab-3", code: "01065", tag: "二專在職", semester: "",
      zh: "視光學實驗（三）", en: "Optometry Laboratory III",
      desc: "眼初步檢查與雙眼視功能的操作與判讀：從 Amsler 方格、色覺、立體視，到遮蓋測試、各種隱斜位量測、融像範圍與 ZCSBV 分析。",
      time: "", room: "", status: "",
      credits: "1 學分",
      topics: ["Amsler / 色覺 / 立體視", "NPC / NPA", "Worth 4 Dot", "Cover test", "von Graefe", "馬篤式鏡", "Vergence range", "ZCSBV"],
      platforms: ["optics-bench", "optometry-lab-bench", "record-ai", "zcsbv"],
    },
    {
      id: "ophthalmic-optics-integration", code: "", tag: "二專在職", semester: "三年級下學期",   // TODO：課號、學分、重點主題
      zh: "眼鏡光學技術整合", en: "Integrated Ophthalmic Optics & Dispensing",
      desc: "二專在職三年級下學期的課程，整合眼鏡光學理論與配鏡技術實務。",
      time: "", room: "", status: "",
      credits: "",
      topics: [],
      platforms: ["optics-bench", "optometry-lab-bench"],
    },
    {
      id: "optometry-terms", code: "", tag: "五專", semester: "",
      zh: "視光常用術語概論", en: "Introduction to Optometric Terminology",
      desc: "五專一年級的第一門視光專業課：眼球構造、屈光異常、老花與調節、視光學的未來發展，並搭配紙黏土眼球模型、光學臺與 VR 眼鏡製作等實作。",
      time: "", room: "", status: "",
      credits: "",
      topics: ["眼球構造", "近視 / 遠視 / 散光", "老花與調節", "聚散度", "Prentice 法則", "視光學未來發展"],
      platforms: ["intro-optometry-lab", "optics-bench", "optometry-lab-bench"],
    },
    {
      id: "optometry-english", code: "", tag: ["二專在職", "五專"], semester: "",
      zh: "視光檢查常用英文", en: "English for Optometric Examination",
      desc: "視光檢查與臨床溝通常用的英文術語與句型，從問診、檢查指令到結果說明。",
      time: "", room: "", status: "",
      credits: "",
      topics: ["問診英文", "檢查指令", "術語對照", "病例紀錄"],
      platforms: ["optquest"],
    },
  ],

  /* 學習平台：short 是課程卡片上的簡稱；url 用相對於網站根目錄的路徑（例如 "/optics-bench/"），外部網址也可以
     status：live 上線中／soon 即將上線／dev 開發中／campus 校內使用（不顯示連結）；note 會顯示在說明下方 */
  platforms: [
    {
      id: "optics-bench", short: "光學實驗台", zh: "視光光學實驗台", en: "Optics Bench",
      desc: "幾何與視覺光學 15 章、30 個可拖曳操作的光學實驗，搭配先預測再驗證、觀念檢核與隨機數字練習題。",
      url: "/optics-bench/", status: "live",
      tags: ["幾何光學", "視覺光學", "互動實驗"],
      stats: "15 章・30 實驗・83 種練習題型",
    },
    {
      id: "optometry-lab-bench", short: "臨床實驗台", zh: "視光學臨床實驗台", en: "Clinical Optometry Bench",
      desc: "視光學（一）（二）的互動教材：把視力表、驗光流程與雙眼視覺檢查做成可操作的模擬，每章先建立觀念、預測結果，再動手驗證，搭配觀念檢核與隨機數字練習題。",
      url: "https://kw-ted-lee.github.io/general.optometry-lab/", status: "live",
      tags: ["驗光流程", "臨床模擬", "互動實驗"],
      stats: "序章＋9 章",
    },
    {
      id: "phoropter", short: "驗光儀模擬", zh: "綜合驗光儀模擬", en: "Phoropter Simulator",
      desc: "一台可以完整操作的綜合驗光儀：轉旋鈕、換輔助鏡、擺入 JCC 與旋轉稜鏡，問病人、聽回答、自己判斷終點，從儀器設定一路做到雙眼平衡與近用加入度。",
      url: "https://kw-ted-lee.github.io/general.optometry-lab/phoropter.html", status: "live",
      tags: ["綜合驗光儀", "驗光流程", "模擬操作"],
      stats: "引導練習・自由操作・考核",
    },
    {
      id: "intro-optometry-lab", short: "概論實驗台", zh: "視光概論實驗台", en: "Intro to Optometry Bench",
      desc: "五專一年級視光概論的線上學習平台：16 週內容和上課投影片一一對應，每週有觀念卡、互動模擬、觀念檢核、★ 必會計算與中英名詞，另有計算練功房、綜合挑戰與名詞字卡。",
      url: "https://kw-ted-lee.github.io/intro.optometry-lab/", status: "live",
      tags: ["視光概論", "互動實驗", "中英名詞"],
      stats: "16 授課週・9 項 ★ 必會計算",
    },
    {
      id: "optquest", short: "OptQuest II", zh: "OptQuest II", en: "Optometry RPG",
      desc: "以馬偕校園為場景的視光 RPG 遊戲：解開臨床案例、收集裝備、完成任務，最後挑戰期末魔王考試；教師後台可匯出成績。",
      url: "", status: "campus",                          // 校內使用：不公開網址
      note: "限本校學生使用",
      tags: ["遊戲式學習", "臨床案例"],
      stats: "11 個臨床案例・17 個任務",
    },
    {
      id: "record-ai", short: "AI 驗光紀錄", zh: "AI 驗光紀錄輔助學習系統", en: "Refraction Record Coach",
      desc: "拍下紙本驗光紀錄表，系統辨識內容後檢查記錄完整性與臨床合理性，即時給學生學習回饋。",
      url: "", status: "campus",                          // 校內使用：不公開網址
      note: "限本校學生使用",
      tags: ["影像辨識", "實作回饋"],
      stats: "",
    },
    {
      id: "zcsbv", short: "ZCSBV 圖解", zh: "ZCSBV 圖解教學程式", en: "ZCSBV Plotter",
      desc: "輸入雙眼視覺檢查數據，自動繪出 ZCSBV 圖，幫助學生判讀內聚不足、開散過度等六種常見雙眼視覺問題。",
      url: "", status: "campus",                          // 校內使用：不公開網址
      note: "限本校學生使用",
      tags: ["雙眼視覺", "圖解法"],
      stats: "",
    },
    {
      id: "blinklearn", short: "BlinkLearn", zh: "BlinkLearn EduAI", en: "Blink & Gaze Learning Platform",
      desc: "運用電腦視覺分析學習時的用眼狀態，提供個人化護眼提醒，讓學生在學習的同時照顧視力健康。",
      url: "", status: "campus",                          // 校內使用：不公開網址
      note: "限本校學生使用",
      tags: ["電腦視覺", "護眼", "教育科技"],
      stats: "",
      usedFor: ["專題開發"],                            // 不是課程的用途，直接寫文字
    },
  ],

  /* 影音：YouTube 播放清單或單支影片；預覽圖自動用第一支影片，也可用 cover 指定任一支影片的 ID；list 填播放清單 ID（網址中 list= 後面那一段）；courses 填對應課程的 id（可多個） */
  videos: [
    {
      id: "admissions", zh: "招生說明會", en: "Admissions Information Session",
      desc: "馬偕視光的線上招生說明會錄影。想多認識科系、課程與未來出路，也歡迎追蹤招生社群「睛來馬偕｜視光情報所」。",
      videos: [
        { id: "5HJf_G4bx9I", title: "1217 線上說明會" },
      ],
      links: [   // 其他連結（社群等），會跟影片按鈕排在一起
        { label: "Instagram｜睛來馬偕｜視光情報所", url: "https://www.instagram.com/recruit.mkcopt/" },
        { label: "Threads｜睛來馬偕｜視光情報所", url: "https://www.threads.com/@recruit.mkcopt" },
      ],
      tags: ["招生", "線上說明會"], courses: [],
    },
    {
      id: "basic-optics", zh: "基礎光學實驗", en: "Basic Optics Experiments",
      desc: "課堂基礎光學實驗的操作示範影片，學生課前預習、課後複習都可以反覆觀看。",
      list: "PL3eFAW4LA9ehHvV1qDvWRg1IkMDPquGAf", count: 6,
      tags: ["實驗示範", "基礎光學"],
      courses: ["optometry-terms", "optometry-lab-1", "optometry-lab-2", "optometry-lab-3"],
    },
    {
      /* 單支影片：用 videos 列出影片 ID（網址中 v= 後面那一段），不用 list */
      id: "free-clinic", zh: "公益篩檢", en: "Community Vision Screening",
      desc: "帶領視光科學生走出校園參與公益視力篩檢，提供視力檢查與用眼衛教的活動紀錄。",
      videos: [
        { id: "5vEMJWYRuFg", title: "20230901 平等國小公益篩檢" },
        { id: "CVwSmzpdX8Y", title: "20230729 深坑公益篩檢" },
      ],
      tags: ["公益篩檢", "視力檢查", "用眼衛教"], courses: [],
    },
    {
      id: "optometrist-conf", zh: "驗光師年會", en: "Taiwan Optometrist Annual Conference",
      desc: "參加台灣驗光師年會的活動紀錄。",
      videos: [
        { id: "CCtGsjkmyyo", title: "驗光師年會紀錄" },   // TODO：換成影片正式標題
      ],
      tags: ["驗光師年會", "專業交流"], courses: [],
    },
    {
      id: "usr-north", zh: "USR 大學社會責任計畫", en: "University Social Responsibility (USR)",
      desc: "大學社會責任計畫的成果紀錄，包含北區聯展等活動。",
      videos: [
        { id: "3icj8nH5yYA", title: "聊聊我們的USR吧！" },
        { id: "PoJYw3VZVx0", title: "USR學生培訓計畫" },
      ],
      list: "PL3eFAW4LA9egFUU0m4akLDZTwj2eSBDVD",   // 有 videos 時，list 只顯示為「完整播放清單」連結
      tags: ["USR", "成果展"], courses: [],
    },
  ],

  /* 研究方向 */
  research: [
    {
      zh: "AI 標準病人與 OSCE 問診訓練", en: "AI Standardized Patients for OSCE",
      desc: "運用生成式 AI 建構虛擬標準病人，讓學生在課堂之外也能反覆練習視光問診，並探討其作為臨床技能教學與評量工具的可行性。",
      tags: ["生成式 AI", "醫學教育"],
      note: "",
    },
    {
      zh: "糖尿病視網膜病變眼底影像分級", en: "Diabetic Retinopathy Grading",
      desc: "以預訓練後的模型與公開資料集進行微調，建立眼底影像的病變分級模型，並從臨床處置的角度檢視判讀結果，探討醫療 AI 的安全性與可信任度。",
      tags: ["電腦視覺", "深度學習", "醫療 AI"],
      note: "",
    },
    {
      zh: "眼動與護眼學習平台", en: "BlinkLearn EduAI",
      desc: "運用電腦視覺分析學習時的用眼狀態，提供個人化的護眼提醒，結合視光專業與教育科技。",
      tags: ["電腦視覺", "教育科技"],
      note: "",
    },
    {
      zh: "教育大數據與預警模型", en: "Educational Data Analytics",
      desc: "運用公開教育資料與機器學習方法，建構校務相關議題的預警模型，作為教育決策的參考。",
      tags: ["資料科學", "機器學習"],
      note: "",
    },
    {
      zh: "評量規準的可學習性", en: "Rubric Learnability",
      desc: "從機器學習的觀點，探討評量規準的設計方式與學習成效之間的關係。",
      tags: ["機器學習", "評量設計"],
      note: "",
    },
  ],

  /* 發表：type = poster / journal / book / talk */
  publications: [
    { year: 2026, type: "poster", authors: "林敬順、李冠緯*", title: "結合數據與健康科技之國家公園風景區突發疾病風險預測研究", venue: "2026 休閒產業與健康促進學術研討會，國立臺北護理健康大學" },
    { year: 2026, type: "poster", authors: "林敬順、李冠緯*", title: "運用生成式AI與教育財務大數據建構大專校院財務預警模型", venue: "2026 健康與科技研討會，美和科技大學" },
    { year: 2026, type: "poster", authors: "林敬順、李冠緯*", title: "教育大數據分析學生懷孕事件之風險因子與預警模型", venue: "2026 健康與科技研討會，美和科技大學" },
    { year: 2025, type: "poster", authors: "李冠緯 等", title: "現實與虛擬的交織：從專業眼鏡設計看美學趨勢與動漫角色於商業管理行銷之比較", venue: "2025 美容科學研討會（論文海報佳作）" },
    { year: 2023, type: "poster", authors: "李冠緯 等", title: "視覺能力的改變與生命尊嚴的連結", venue: "2023 生命關懷與社會責任實踐學術研討會" },
    { year: 2023, type: "poster", authors: "李冠緯 等", title: "眼鏡造型設計喜好度探討", venue: "2023 TICCPA 流行藝術技術研討會" },
    { year: 2023, type: "book", authors: "李冠緯 等（合譯）", title: "Bennett & Rabbetts' 臨床視覺光學", venue: "金名圖書" },
  ],

  /* 主持人 */
  pi: {
    nameZh: "李冠緯", nameEn: "Kuan-Wei Lee",
    title: ["視光學科", "專任講師｜驗光師"],   // 每個元素一行
    unit: "馬偕醫護管理專科學校",
    photo: "assets/pi.jpg",   // 大頭照；留空會顯示姓名縮寫
    bio: "驗光師出身，具備眼鏡門市與臨床經驗，也做過產業研發、繼續教育與產學合作。2019 年起在馬偕視光任教，目前同時攻讀人工智慧碩士，專注於把 AI 帶進視光臨床教學與眼底影像分析。同時擔任馬偕視光的招生窗口，以及公益視力篩檢的策劃召集人與對外窗口。",
    highlights: [],     // 主持人卡片下方的數字（目前不使用）
    current: [
      "馬偕醫護管理專科學校 視光學科 招生窗口",
      "馬偕視光 公益視力篩檢 策劃召集人／對外窗口",
      "第四期大學社會責任（USR）萌芽型計畫 共同主持人",
      "新北市驗光師公會 第三屆監事、繼續教育組召集人",
    ],
    education: [
      "國立臺北科技大學 人工智慧科技碩士學位學程（2025–2027，就讀中）",
      "美國德州大學阿靈頓分校（UTA）高階主管經營管理碩士 EMBA（2025–2027，就讀中）",
      "中山醫學大學 視光學系 學士（2015–2018）",
    ],
    experience: [
      "2022– 馬偕醫護管理專科學校 視光學科 專任講師（2024 兼任大學社會責任計畫辦公室 專案經理）",
      "2022 亨泰光學 研發中心 專業技術主任",
      "2019–2022 小林鐘錶眼鏡 人力發展部 副課長／驗光師（建立全台 91% 視光相關科系產學合作）",
      "2019–2022 馬偕醫護管理專科學校 視光學科 兼任講師",
    ],
    /* 專業證照：依類別分組；note 為補充說明 */
    licenses: [
      { group: "醫事專業", items: [
        { name: "驗光師", note: "專門職業及技術人員高等考試及格・衛生福利部驗光師證書（2018）" },
        { name: "長照服務人員證明（醫事人員）", note: "新北市政府核發・效期至 2032 年" },
      ] },
      { group: "人工智慧", items: [
        { name: "iPAS AI 應用規劃師", note: "經濟部產業人才能力鑑定" },
        { name: "大型語言模型講師認證", note: "台灣人工智慧協會 第一屆・第一名結業" },
        { name: "Google 數位技能認證（多項）", note: "含 Google 數位人才探索計畫 AI for Generalists 等" },
      ] },
      { group: "急救醫療", items: [
        { name: "BLS Instructor", note: "基本救命術指導員" },
        { name: "ACLS", note: "高級心臟救命術" },
        { name: "EMT-1", note: "初級救護技術員" },
      ] },
      { group: "管理與永續", items: [
        { name: "人力資源管理師", note: "ATS" },
        { name: "中階 ESG 管理師", note: "TISDA" },
      ] },
      { group: "研究倫理", items: [
        { name: "學術研究倫理教育課程", note: "臺灣學術倫理教育資源中心・12 小時，含人工智慧研究倫理（2025）" },
      ] },
    ],
    service: [
      "新北市驗光師公會 第三屆監事、繼續教育組召集人（2023–）",
      "新北市驗光師公會 第二屆理事、繼續教育組委員（2020–2023）",
      "第三屆台灣驗光師年會 學術委員",
      "新北市驗光師公會 繼續教育講師：視光檢查常用英文（2025）",
      "國際隱形眼鏡教育者協會（IACLE）會員",
      "台灣人工智慧協會 會員",
    ],
    projects: [
      "第四期大學社會責任（USR）萌芽型計畫 共同主持人",
      "第三期大學社會責任（USR）校務發展計畫 協同主持人",
      "第三期大學社會責任（USR）萌芽型計畫 協同主持人",
    ],
    awards: [
      "2025 美容科學研討會 論文海報佳作",
      "2024 年度創新教學競賽 佳作",
      "2024 年度教材教具計畫 佳作",
      "2023 年度教材教具計畫 優等",
      "台灣人工智慧協會 第一屆大型語言模型講師認證班 第一名結業",
    ],
    outreach: {
      title: "公益視力篩檢",
      text: "擔任馬偕視光公益視力篩檢的策劃召集人與對外窗口，每年帶領視光科學生走出校園，提供視力篩檢與用眼衛教，至今已累積數十場、服務超過千人次。歡迎有需要的單位來信洽詢合作。",
    },
  },

  contact: {
    email: "s674@mail.mkc.edu.tw",
    phone: ["02-2858-4180", "分機 2415 / 2250"],
    address: ["台北市北投區聖景路92號", "馬偕醫護管理專科學校", "視光學科"],   // 每個元素一行
    topics: "招生諮詢、公益視力篩檢合作、課程與教材交流",
  },

  copyright: {
    year: 2026,
    holder: "Kuan-Wei Lee（李冠緯）",
    note: "版權所有。網站內容與教材供教學使用，未經授權請勿轉載或作商業用途。",
  },
};
