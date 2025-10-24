-- ProfilPro 5D Initial Schema Migration
-- Creates all necessary tables for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Table: users
-- ==========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic profile
  first_name VARCHAR(100),
  last_name VARCHAR(100),

  -- Professional information
  current_job VARCHAR(200),
  desired_job VARCHAR(200),
  industry VARCHAR(100),
  years_experience INTEGER,

  -- Birth data (for astrology)
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_city VARCHAR(200),
  birth_country VARCHAR(100),
  birth_latitude DECIMAL(10, 8),
  birth_longitude DECIMAL(11, 8),

  -- Progress flags
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  profile_generated BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- ==========================================
-- Table: questionnaires
-- ==========================================
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version VARCHAR(10) NOT NULL DEFAULT '1.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,

  -- Questions stored as JSON
  questions JSONB NOT NULL,

  -- Metadata
  total_questions INTEGER NOT NULL,
  estimated_duration_minutes INTEGER DEFAULT 15,
  description TEXT
);

-- ==========================================
-- Table: answers
-- ==========================================
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  questionnaire_id UUID NOT NULL REFERENCES questionnaires(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Responses stored as JSON
  responses JSONB NOT NULL,

  -- Calculated scores
  disc_scores JSONB,
  riasec_scores JSONB,
  enneagram_scores JSONB,

  -- Metadata
  time_spent_seconds INTEGER,
  is_completed BOOLEAN DEFAULT FALSE
);

-- ==========================================
-- Table: profiles
-- ==========================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES answers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Individual analyses (generated text)
  disc_analysis TEXT,
  riasec_analysis TEXT,
  enneagram_analysis TEXT,
  astro_analysis TEXT,
  tibetan_analysis TEXT,

  -- Global synthesis
  executive_summary TEXT,
  strengths TEXT[],
  areas_for_development TEXT[],
  career_recommendations TEXT[],
  ideal_work_environment TEXT,

  -- Calculated astrological data
  sun_sign VARCHAR(20),
  moon_sign VARCHAR(20),
  rising_sign VARCHAR(20),
  dominant_element VARCHAR(20),
  tibetan_element VARCHAR(20),
  tibetan_animal VARCHAR(20),

  -- Dominant profiles
  disc_profile VARCHAR(10), -- Ex: "DI", "SC"
  riasec_code VARCHAR(10),  -- Ex: "EIA", "RSI"
  enneagram_type INTEGER,   -- 1-9
  enneagram_wing VARCHAR(5), -- Ex: "3w2"

  -- Metadata
  generation_version VARCHAR(10) DEFAULT '1.0',
  word_count INTEGER,
  confidence_score DECIMAL(3, 2)
);

-- ==========================================
-- Indexes
-- ==========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_questionnaires_version ON questionnaires(version);
CREATE INDEX idx_questionnaires_is_active ON questionnaires(is_active);
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_questionnaire_id ON answers(questionnaire_id);
CREATE INDEX idx_answers_completed ON answers(is_completed);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_answer_id ON profiles(answer_id);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- ==========================================
-- Row Level Security (RLS) Policies
-- ==========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only view/update their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only view/insert their own answers
CREATE POLICY "Users can view own answers" ON answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers" ON answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only view their own profiles
CREATE POLICY "Users can view own profiles" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Questionnaires are publicly readable
CREATE POLICY "Questionnaires are viewable by all" ON questionnaires
  FOR SELECT USING (TRUE);

-- ==========================================
-- Seed Data: Sample Questionnaire
-- ==========================================
INSERT INTO questionnaires (version, total_questions, description, questions) VALUES (
  '1.0',
  5,
  'ProfilPro 5D Questionnaire v1.0 - Sample with 5 questions',
  '[
    {
      "id": 1,
      "text": "Face à un projet ambitieux avec un délai serré, comment réagissez-vous naturellement ?",
      "type": "single_choice",
      "options": [
        {
          "id": "a",
          "text": "Je prends immédiatement les choses en main et organise l''équipe",
          "scoring": {
            "disc": { "D": 3, "I": 0, "S": 0, "C": 1 },
            "riasec": { "E": 3, "C": 1 },
            "enneagram": { "3": 2, "8": 3 }
          }
        },
        {
          "id": "b",
          "text": "J''analyse d''abord tous les aspects pour créer un plan détaillé",
          "scoring": {
            "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
            "riasec": { "I": 2, "C": 3 },
            "enneagram": { "1": 2, "5": 3 }
          }
        },
        {
          "id": "c",
          "text": "Je rassemble l''équipe pour discuter des meilleures approches",
          "scoring": {
            "disc": { "D": 0, "I": 2, "S": 3, "C": 0 },
            "riasec": { "S": 3, "E": 1 },
            "enneagram": { "2": 3, "9": 2 }
          }
        },
        {
          "id": "d",
          "text": "Je me lance avec enthousiasme en créant une dynamique positive",
          "scoring": {
            "disc": { "D": 1, "I": 3, "S": 0, "C": 0 },
            "riasec": { "A": 2, "E": 2 },
            "enneagram": { "3": 2, "7": 3 }
          }
        }
      ]
    },
    {
      "id": 2,
      "text": "Lorsque vous êtes confronté à un problème complexe au travail, quelle est votre première réaction ?",
      "type": "single_choice",
      "options": [
        {
          "id": "a",
          "text": "Je cherche rapidement une solution pratique",
          "scoring": {
            "disc": { "D": 3, "I": 1, "S": 0, "C": 0 },
            "riasec": { "R": 2, "E": 2 },
            "enneagram": { "3": 2, "8": 2 }
          }
        },
        {
          "id": "b",
          "text": "Je recherche des données et des exemples similaires",
          "scoring": {
            "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
            "riasec": { "I": 3, "C": 2 },
            "enneagram": { "5": 3, "6": 1 }
          }
        },
        {
          "id": "c",
          "text": "Je consulte mes collègues pour différentes perspectives",
          "scoring": {
            "disc": { "D": 0, "I": 2, "S": 3, "C": 0 },
            "riasec": { "S": 3 },
            "enneagram": { "2": 2, "6": 2, "9": 2 }
          }
        },
        {
          "id": "d",
          "text": "J''explore des solutions créatives et non conventionnelles",
          "scoring": {
            "disc": { "D": 1, "I": 2, "S": 0, "C": 0 },
            "riasec": { "A": 3, "I": 1 },
            "enneagram": { "4": 2, "7": 2 }
          }
        }
      ]
    }
  ]'::jsonb
);

-- ==========================================
-- Success Message
-- ==========================================
DO $$
BEGIN
  RAISE NOTICE '✅ ProfilPro 5D schema initialized successfully!';
END $$;
