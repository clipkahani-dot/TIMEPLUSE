-- ==============================================================
-- TIME PLUS Educational App - Database Schema & Seed Data
-- ==============================================================

-- 1. Batches Table
CREATE TABLE IF NOT EXISTS public.batches (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    faculty TEXT NOT NULL DEFAULT 'Science by Dheeraj Sir',
    badge TEXT DEFAULT 'Trending Batch 🔥',
    banner TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    discount TEXT,
    total_lectures INT DEFAULT 48,
    rating NUMERIC DEFAULT 4.9,
    students_count TEXT DEFAULT '18,420+ Students',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Live Classes Table
CREATE TABLE IF NOT EXISTS public.live_classes (
    id TEXT PRIMARY KEY,
    batch_id TEXT REFERENCES public.batches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    faculty TEXT NOT NULL DEFAULT 'Science by Dheeraj Sir',
    is_live BOOLEAN DEFAULT false,
    viewers INT DEFAULT 0,
    stream_url TEXT,
    thumbnail TEXT,
    chapter TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VOD Lectures Table
CREATE TABLE IF NOT EXISTS public.vod_lectures (
    id TEXT PRIMARY KEY,
    batch_id TEXT REFERENCES public.batches(id) ON DELETE CASCADE,
    chapter TEXT NOT NULL,
    title TEXT NOT NULL,
    duration TEXT,
    video_url TEXT,
    thumbnail TEXT,
    views TEXT DEFAULT '10.5K',
    date TEXT DEFAULT 'Recent',
    file_size TEXT DEFAULT '148 MB',
    pdf_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PDF Notes Table
CREATE TABLE IF NOT EXISTS public.pdf_notes (
    id TEXT PRIMARY KEY,
    batch_id TEXT REFERENCES public.batches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    chapter TEXT NOT NULL,
    pages INT DEFAULT 30,
    file_size TEXT DEFAULT '8.4 MB',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tests Table
CREATE TABLE IF NOT EXISTS public.tests (
    id TEXT PRIMARY KEY,
    batch_id TEXT REFERENCES public.batches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    total_marks INT DEFAULT 14,
    duration_minutes INT DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    test_id TEXT REFERENCES public.tests(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Live Chat Messages Table
CREATE TABLE IF NOT EXISTS public.live_chat (
    id BIGSERIAL PRIMARY KEY,
    live_class_id TEXT REFERENCES public.live_classes(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_phone TEXT,
    badge TEXT DEFAULT 'Student',
    is_teacher BOOLEAN DEFAULT false,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================
-- Initial Seed Data (मात्रक तथा विमा - Dheeraj Sir)
-- ==============================================================

INSERT INTO public.batches (id, title, faculty, badge, banner, price, original_price, discount, total_lectures, rating, students_count)
VALUES 
('b1', 'Railway (NTPC/ALP/Tech) & Bihar SI Science Master Batch', 'Science by Dheeraj Sir', 'Trending Batch 🔥', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80', 799, 1999, '60% OFF', 48, 4.9, '18,420+ Students'),
('b2', 'Bihar Police Constable & Daroga 2026 Special Science Batch', 'Science by Dheeraj Sir', 'New Launch 🚀', 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80', 699, 1499, '53% OFF', 40, 4.8, '9,850+ Students'),
('b3', 'SSC CGL / CHSL / GD General Science Foundation 2026', 'Science by Dheeraj Sir', 'Foundation Course 📚', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80', 899, 2499, '64% OFF', 65, 4.9, '14,200+ Students')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.live_classes (id, batch_id, title, faculty, is_live, viewers, stream_url, thumbnail, chapter)
VALUES 
('live-1', 'b1', 'अध्याय 01: मात्रक तथा विमा — Live Doubt Solving & PYQ Marathon', 'Science by Dheeraj Sir', true, 1482, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80', 'मात्रक तथा विमा (Unit & Dimension)')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.tests (id, batch_id, title, total_marks, duration_minutes)
VALUES 
('test-1', 'b1', 'अध्याय 01: मात्रक तथा विमा (Unit & Dimension) — CBT Mock Test 01', 14, 15)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.questions (id, test_id, question, options, correct_answer, explanation)
VALUES 
('q1', 'test-1', 'प्रकाश वर्ष (Light Year) निम्नलिखित में से किस भौतिक राशि का मात्रक है?', '["समय (Time)", "दूरी (Distance)", "प्रकाश की तीव्रता", "ऊर्जा (Energy)"]'::jsonb, 1, 'प्रकाश वर्ष निर्वात में प्रकाश द्वारा 1 वर्ष में तय की गई दूरी है। 1 Light Year = 9.46 x 10^15 m। यह दूरी का मात्रक है।'),
('q2', 'test-1', 'यदि किसी भौतिक राशि Q = n × u में मात्रक (u) का मान बढ़ा दिया जाए, तो संख्यात्मक मान (n) पर क्या प्रभाव पड़ेगा?', '["बढ़ेगा", "घटेगा", "अपरिवर्तित रहेगा", "शून्य हो जाएगा"]'::jsonb, 1, 'गोल्डन नियम: n ∝ 1/u। यदि मात्रक बड़ा लिया जाए तो संख्यात्मक मान घट जाता है (उदा: 1 m = 100 cm)।'),
('q3', 'test-1', 'SI पद्धति में मूल मात्रकों (Fundamental Units) तथा पूरक मात्रकों (Supplementary Units) की संख्या क्रमशः कितनी है?', '["7 और 2", "6 और 3", "7 और 3", "5 और 2"]'::jsonb, 0, 'SI पद्धति में 7 मूल मात्रक (लंबाई, द्रव्यमान, समय, ताप, विद्युत धारा, ज्योति तीव्रता, पदार्थ की मात्रा) एवं 2 पूरक मात्रक (रेडियन, स्टेरेडियन) होते हैं।')
ON CONFLICT (id) DO NOTHING;
