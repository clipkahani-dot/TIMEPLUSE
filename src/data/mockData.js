// Central Data Store for TIME PLUS Educational Demo App
export const INITIAL_USER = {
  id: 'TP-8842',
  name: 'Aman Sharma',
  phone: '+91 9229840686',
  email: 'aman.student@timeplus.in',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  enrolledBatches: ['b1']
};

export const INITIAL_BATCHES = [
  {
    id: 'b1',
    title: 'Railway (NTPC/ALP/Tech) & Bihar SI Science Master Batch',
    faculty: 'Science by Dheeraj Sir',
    badge: 'Trending Batch 🔥',
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    price: 799,
    originalPrice: 1999,
    discount: '60% OFF',
    enrolled: true,
    totalLectures: 48,
    completedLectures: 14,
    rating: 4.9,
    studentsCount: '18,420+ Students'
  },
  {
    id: 'b2',
    title: 'Bihar Police Constable & Daroga 2026 Special Science Batch',
    faculty: 'Science by Dheeraj Sir',
    badge: 'New Launch 🚀',
    banner: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80',
    price: 699,
    originalPrice: 1499,
    discount: '53% OFF',
    enrolled: false,
    totalLectures: 40,
    completedLectures: 0,
    rating: 4.8,
    studentsCount: '9,850+ Students'
  },
  {
    id: 'b3',
    title: 'SSC CGL / CHSL / GD General Science Foundation 2026',
    faculty: 'Science by Dheeraj Sir',
    badge: 'Foundation Course 📚',
    banner: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    price: 899,
    originalPrice: 2499,
    discount: '64% OFF',
    enrolled: false,
    totalLectures: 65,
    completedLectures: 0,
    rating: 4.9,
    studentsCount: '14,200+ Students'
  }
];

export const INITIAL_LIVE_CLASSES = [
  {
    id: 'live-1',
    batchId: 'b1',
    title: 'अध्याय 01: मात्रक तथा विमा — Live Doubt Solving & PYQ Marathon',
    faculty: 'Science by Dheeraj Sir',
    isLive: true,
    viewers: 1482,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    startedAt: '10:00 AM',
    chapter: 'मात्रक तथा विमा (Unit & Dimension)'
  },
  {
    id: 'live-2',
    batchId: 'b1',
    title: 'कल सुबह 08:00 AM: अध्याय 02 - सदिश एवं अदिश राशियाँ (Vectors & Scalars)',
    faculty: 'Science by Dheeraj Sir',
    isLive: false,
    viewers: 0,
    scheduledFor: 'कल सुबह 08:00 AM',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    chapter: 'सदिश एवं अदिश (Vectors & Scalars)'
  }
];

export const INITIAL_VOD_LECTURES = [
  {
    id: 'vod-1',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'Class 01: भौतिक राशियाँ, मापन का नियम (Q = n × u) एवं ऐतिहासिक पद्धतियाँ',
    duration: '42:15 min',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    views: '12.4K',
    date: '10 Sep 2026',
    isDownloaded: true,
    fileSize: '148 MB',
    pdfId: 'pdf-1'
  },
  {
    id: 'vod-2',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'Class 02: अंतर्राष्ट्रीय S.I. पद्धति (7 मूल + 2 पूरक मात्रक) एवं विमाहीन नियम',
    duration: '48:30 min',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80',
    views: '9.8K',
    date: '11 Sep 2026',
    isDownloaded: false,
    fileSize: '162 MB',
    pdfId: 'pdf-1'
  },
  {
    id: 'vod-3',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'Class 03: सार्थक अंक (Significant Figures) के 6 नियम एवं Rounding Off',
    duration: '39:50 min',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    views: '8.2K',
    date: '12 Sep 2026',
    isDownloaded: false,
    fileSize: '135 MB',
    pdfId: 'pdf-1'
  },
  {
    id: 'vod-4',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'Class 04: 28 व्युत्पन्न मात्रक, विमीय सूत्र एवं Twin Pairs हॉट-स्पॉट',
    duration: '55:10 min',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    views: '11.1K',
    date: '13 Sep 2026',
    isDownloaded: false,
    fileSize: '190 MB',
    pdfId: 'pdf-1'
  }
];

export const INITIAL_PDFS = [
  {
    id: 'pdf-1',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'अध्याय 01: मात्रक तथा विमा — डिजिटल बोर्ड मास्टर क्लास नोट्स (30 Slides Full PDF)',
    pages: 30,
    size: '5.8 MB',
    faculty: 'Science by Dheeraj Sir',
    isDownloaded: true,
    downloadDate: '12 Sep 2026',
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  {
    id: 'pdf-2',
    batchId: 'b1',
    chapter: 'अध्याय 01: मात्रक तथा विमा',
    title: 'मात्रक तथा विमा — 10-Minute Rapid Fire Exam Booster Formula Chart',
    pages: 4,
    size: '1.4 MB',
    faculty: 'Science by Dheeraj Sir',
    isDownloaded: false,
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  }
];

export const INITIAL_TESTS = [
  {
    id: 'test-1',
    batchId: 'b1',
    title: 'ऑल इंडिया लाइव टेस्ट 01: मात्रक तथा विमा (Unit & Dimension CBT)',
    durationMinutes: 10,
    totalQuestions: 7,
    positiveMarks: 2,
    negativeMarks: 0.66,
    totalMarks: 14,
    status: 'ACTIVE',
    questions: [
      {
        id: 'q1',
        q: '1. इनमें से कौन-सा मूल मात्रक (Fundamental Unit) नहीं है? [RRB NTPC]',
        opts: ['(A) मोल (Mole)', '(B) टेस्ला (Tesla)', '(C) एम्पियर (Ampere)', '(D) मीटर (Metre)'],
        ans: 1,
        exp: 'मूल मात्रक केवल 7 होते हैं (m, kg, s, K, A, cd, mol)। टेस्ला चुंबकीय क्षेत्र का व्युत्पन्न मात्रक है।'
      },
      {
        id: 'q2',
        q: '2. पूरक मात्रक (Supplementary Unit) के संदर्भ में कौन-सा कथन सत्य है? [BPSC / Bihar SI]',
        opts: [
          '(A) इनका न मात्रक होता है न विमा',
          '(B) इनका मात्रक होता है परंतु विमा नहीं',
          '(C) इनकी विमा होती है परंतु मात्रक नहीं',
          '(D) ये मूल मात्रक की श्रेणी में आते हैं'
        ],
        ans: 1,
        exp: 'समतल कोण (rad) और ठोस कोण (sr) मात्रक रखते हैं, परंतु विमाहीन ([M⁰L⁰T⁰]) होते हैं।'
      },
      {
        id: 'q3',
        q: '3. 1 पारसेक (Parsec) कितने प्रकाश वर्ष के बराबर होता है? [RRB Group D]',
        opts: ['(A) 9.46 × 10¹⁵', '(B) 3.26 प्रकाश वर्ष', '(C) 1.496 × 10¹¹', '(D) 4.8 प्रकाश वर्ष'],
        ans: 1,
        exp: '1 Parsec = 3.08 × 10¹⁶ m = 3.26 Light Year (खगोलीय दूरी का सबसे बड़ा मात्रक)।'
      },
      {
        id: 'q4',
        q: '4. निम्नलिखित में से किस युग्म की विमाएँ समान नहीं हैं? [RRB ALP]',
        opts: ['(A) संवेग और आवेग', '(B) कार्य और ऊर्जा', '(C) प्रतिबल और दाब', '(D) बल और कार्य'],
        ans: 3,
        exp: 'बल की विमा [MLT⁻²] तथा कार्य की विमा [ML²T⁻²] होती है, जो भिन्न हैं।'
      },
      {
        id: 'q5',
        q: '5. संख्या 0.005080 में कुल कितने सार्थक अंक (Significant Figures) हैं? [SSC CGL]',
        opts: ['(A) 3', '(B) 4', '(C) 6', '(D) 7'],
        ans: 1,
        exp: 'आरंभिक शून्य सार्थक नहीं होते। 5, 0, 8 और दशमलव के बाद का अंतिम 0 मिलाकर कुल 4 सार्थक अंक हैं।'
      },
      {
        id: 'q6',
        q: '6. वोल्ट (Volt) निम्नलिखित में से किसका SI मात्रक है? [Bihar Police Constable]',
        opts: ['(A) विद्युत धारा', '(B) विद्युत विभव / विभवान्तर', '(C) विद्युत आवेश', '(D) विद्युत प्रतिरोध'],
        ans: 1,
        exp: 'विद्युत विभव / विभवान्तर का SI मात्रक वोल्ट होता है।'
      },
      {
        id: 'q7',
        q: '7. प्लांक नियतांक (Planck\'s Constant) का विमीय सूत्र किसके समान होता है? [RRB JE / Tech]',
        opts: ['(A) रेखीय संवेग', '(B) कोणीय संवेग', '(C) बल आघूर्ण', '(D) ऊर्जा'],
        ans: 1,
        exp: 'प्लांक नियतांक और कोणीय संवेग दोनों का विमीय सूत्र [ML²T⁻¹] होता है।'
      }
    ]
  }
];

export const INITIAL_CHAT_MESSAGES = [
  { id: 'c1', user: 'Rakesh Yadav', time: '10:02 AM', text: 'Good morning Dheeraj Sir! 🙏', isTeacher: false },
  { id: 'c2', user: 'Science by Dheeraj Sir', time: '10:03 AM', text: 'नमस्कार बच्चों! आज मात्रक तथा विमा के टॉप PYQs हल करेंगे, ध्यान से समझिए।', isTeacher: true, isPinned: true },
  { id: 'c3', user: 'Pooja Kumari', time: '10:04 AM', text: 'Sir CGS me aur MKS me time second hi kyu rehta hai?', isTeacher: false },
  { id: 'c4', user: 'Science by Dheeraj Sir', time: '10:05 AM', text: 'क्योंकि समय एक सार्वभौमिक स्वतंत्र राशि है, तीनों ऐतिहासिक पद्धतियों में सेकंड को ही आधार माना गया।', isTeacher: true },
  { id: 'c5', user: 'Vikram Singh', time: '10:06 AM', text: 'Sir digital board notes ki pdf kab tak upload hogi?', isTeacher: false },
  { id: 'c6', user: 'Amit Kumar', time: '10:07 AM', text: 'Sir app me offline download ka feature bahut mast hai! 🚀', isTeacher: false }
];
