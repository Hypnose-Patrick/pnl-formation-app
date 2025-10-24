# Schémas de Base de Données - ProfilPro 5D

## Vue d'ensemble

Base de données PostgreSQL via Supabase avec 4 tables principales :
- `users` - Informations utilisateurs et données natales
- `questionnaires` - Définition des questionnaires
- `answers` - Réponses des utilisateurs
- `profiles` - Profils générés

## Schémas des Tables

### Table: `users`

Stocke les informations utilisateur et données natales nécessaires pour l'astrologie.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Profil basique
  first_name VARCHAR(100),
  last_name VARCHAR(100),

  -- Informations professionnelles
  current_job VARCHAR(200),
  desired_job VARCHAR(200),
  industry VARCHAR(100),
  years_experience INTEGER,

  -- Données natales (pour astrologie)
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_city VARCHAR(200),
  birth_country VARCHAR(100),
  birth_latitude DECIMAL(10, 8),
  birth_longitude DECIMAL(11, 8),

  -- Métadonnées
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  profile_generated BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Champs clés** :
- `birth_date`, `birth_time`, `birth_city` : Pour calculs astrologiques
- `current_job`, `desired_job` : Pour personnaliser les questions
- `questionnaire_completed` : Flag de progression

---

### Table: `questionnaires`

Définit les questions et options de réponse.

```sql
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version VARCHAR(10) NOT NULL DEFAULT '1.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,

  -- Questions stockées en JSON
  questions JSONB NOT NULL,

  -- Métadonnées
  total_questions INTEGER NOT NULL,
  estimated_duration_minutes INTEGER DEFAULT 15,
  description TEXT
);

CREATE INDEX idx_questionnaires_version ON questionnaires(version);
CREATE INDEX idx_questionnaires_is_active ON questionnaires(is_active);
```

**Structure du champ `questions` (JSONB)** :
```json
[
  {
    "id": 1,
    "text": "Face à un projet ambitieux avec un délai serré, comment réagissez-vous naturellement ?",
    "type": "single_choice",
    "options": [
      {
        "id": "a",
        "text": "Je prends immédiatement les choses en main et organise l'équipe",
        "scoring": {
          "disc": { "D": 3, "I": 0, "S": 0, "C": 0 },
          "riasec": { "E": 2, "C": 1 },
          "enneagram": { "3": 2, "8": 2 }
        }
      },
      {
        "id": "b",
        "text": "J'analyse d'abord tous les aspects pour créer un plan détaillé",
        "scoring": {
          "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
          "riasec": { "I": 2, "C": 2 },
          "enneagram": { "1": 2, "5": 2 }
        }
      }
    ]
  }
]
```

---

### Table: `answers`

Stocke les réponses individuelles des utilisateurs.

```sql
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  questionnaire_id UUID NOT NULL REFERENCES questionnaires(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Réponses stockées en JSON
  responses JSONB NOT NULL,

  -- Scores calculés
  disc_scores JSONB,
  riasec_scores JSONB,
  enneagram_scores JSONB,

  -- Métadonnées
  time_spent_seconds INTEGER,
  is_completed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_questionnaire_id ON answers(questionnaire_id);
CREATE INDEX idx_answers_completed ON answers(is_completed);
```

**Structure du champ `responses` (JSONB)** :
```json
{
  "1": "a",
  "2": "c",
  "3": "b",
  ...
}
```

**Structure des `disc_scores` (JSONB)** :
```json
{
  "D": 72,
  "I": 45,
  "S": 38,
  "C": 61
}
```

**Structure des `riasec_scores` (JSONB)** :
```json
{
  "R": 25,
  "I": 68,
  "A": 42,
  "S": 55,
  "E": 78,
  "C": 48
}
```

**Structure des `enneagram_scores` (JSONB)** :
```json
{
  "1": 42,
  "2": 35,
  "3": 78,
  "4": 28,
  "5": 52,
  "6": 45,
  "7": 38,
  "8": 65,
  "9": 30
}
```

---

### Table: `profiles`

Stocke les profils générés avec analyse complète.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES answers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Analyses individuelles (texte généré)
  disc_analysis TEXT,
  riasec_analysis TEXT,
  enneagram_analysis TEXT,
  astro_analysis TEXT,
  tibetan_analysis TEXT,

  -- Synthèse globale
  executive_summary TEXT,
  strengths TEXT[],
  areas_for_development TEXT[],
  career_recommendations TEXT[],
  ideal_work_environment TEXT,

  -- Données astrologiques calculées
  sun_sign VARCHAR(20),
  moon_sign VARCHAR(20),
  rising_sign VARCHAR(20),
  dominant_element VARCHAR(20),
  tibetan_element VARCHAR(20),
  tibetan_animal VARCHAR(20),

  -- Profils dominants
  disc_profile VARCHAR(10), -- Ex: "DI", "SC"
  riasec_code VARCHAR(10),  -- Ex: "EIA", "RSI"
  enneagram_type INTEGER,   -- 1-9
  enneagram_wing VARCHAR(5), -- Ex: "3w2"

  -- Métadonnées
  generation_version VARCHAR(10) DEFAULT '1.0',
  word_count INTEGER,
  confidence_score DECIMAL(3, 2)
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_answer_id ON profiles(answer_id);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);
```

**Champs clés** :
- `*_analysis` : Texte narratif pour chaque modèle
- `executive_summary` : Synthèse de 2-3 paragraphes
- `strengths` / `areas_for_development` : Arrays de points clés
- `*_sign` / `*_element` : Résultats astrologiques
- `disc_profile` / `riasec_code` : Codes dominants

---

## Relations entre Tables

```
users (1) ----< (N) answers
  |                    |
  |                    |
  +----< (N) profiles -+

questionnaires (1) ----< (N) answers
```

### Cascade Deletion
- Si un `user` est supprimé → tous ses `answers` et `profiles` sont supprimés
- Si un `answer` est supprimé → les `profiles` associés restent (pour historique)

---

## Requêtes SQL Courantes

### 1. Créer un nouvel utilisateur
```sql
INSERT INTO users (email, first_name, last_name, birth_date, birth_time, birth_city, current_job)
VALUES ('user@example.com', 'Jean', 'Dupont', '1990-05-15', '14:30:00', 'Geneva', 'Développeur Web');
```

### 2. Récupérer le questionnaire actif
```sql
SELECT * FROM questionnaires
WHERE is_active = TRUE
ORDER BY created_at DESC
LIMIT 1;
```

### 3. Sauvegarder les réponses d'un utilisateur
```sql
INSERT INTO answers (user_id, questionnaire_id, responses, is_completed)
VALUES (
  'user-uuid',
  'questionnaire-uuid',
  '{"1":"a","2":"c","3":"b"}',
  TRUE
);
```

### 4. Récupérer le profil complet d'un utilisateur
```sql
SELECT
  u.*,
  p.*
FROM users u
JOIN profiles p ON p.user_id = u.id
WHERE u.id = 'user-uuid'
ORDER BY p.created_at DESC
LIMIT 1;
```

### 5. Calculer les statistiques globales
```sql
SELECT
  COUNT(*) as total_users,
  COUNT(CASE WHEN questionnaire_completed THEN 1 END) as completed_questionnaires,
  COUNT(CASE WHEN profile_generated THEN 1 END) as generated_profiles,
  AVG(CASE WHEN questionnaire_completed THEN 1.0 ELSE 0.0 END) * 100 as completion_rate
FROM users;
```

---

## Migration Initiale (Supabase)

Fichier : `supabase/migrations/001_init_schema.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  current_job VARCHAR(200),
  desired_job VARCHAR(200),
  industry VARCHAR(100),
  years_experience INTEGER,
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_city VARCHAR(200),
  birth_country VARCHAR(100),
  birth_latitude DECIMAL(10, 8),
  birth_longitude DECIMAL(11, 8),
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  profile_generated BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Table questionnaires
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version VARCHAR(10) NOT NULL DEFAULT '1.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  questions JSONB NOT NULL,
  total_questions INTEGER NOT NULL,
  estimated_duration_minutes INTEGER DEFAULT 15,
  description TEXT
);

-- Table answers
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  questionnaire_id UUID NOT NULL REFERENCES questionnaires(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  responses JSONB NOT NULL,
  disc_scores JSONB,
  riasec_scores JSONB,
  enneagram_scores JSONB,
  time_spent_seconds INTEGER,
  is_completed BOOLEAN DEFAULT FALSE
);

-- Table profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES answers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  disc_analysis TEXT,
  riasec_analysis TEXT,
  enneagram_analysis TEXT,
  astro_analysis TEXT,
  tibetan_analysis TEXT,
  executive_summary TEXT,
  strengths TEXT[],
  areas_for_development TEXT[],
  career_recommendations TEXT[],
  ideal_work_environment TEXT,
  sun_sign VARCHAR(20),
  moon_sign VARCHAR(20),
  rising_sign VARCHAR(20),
  dominant_element VARCHAR(20),
  tibetan_element VARCHAR(20),
  tibetan_animal VARCHAR(20),
  disc_profile VARCHAR(10),
  riasec_code VARCHAR(10),
  enneagram_type INTEGER,
  enneagram_wing VARCHAR(5),
  generation_version VARCHAR(10) DEFAULT '1.0',
  word_count INTEGER,
  confidence_score DECIMAL(3, 2)
);

-- Indexes
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

-- RLS (Row Level Security) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only read/write their own answers
CREATE POLICY "Users can view own answers" ON answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers" ON answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only read their own profiles
CREATE POLICY "Users can view own profiles" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Questionnaires are publicly readable
CREATE POLICY "Questionnaires are viewable by all" ON questionnaires
  FOR SELECT USING (TRUE);
```

---

## Évolutions Futures

### Phase 2
- Table `profile_history` pour tracking des changements
- Table `exports` pour historique des exports
- Table `sessions` pour analytics détaillés

### Phase 3
- Table `payments` pour monétisation
- Table `recommendations` pour suggestions IA
- Table `shared_profiles` pour partage avec recruteurs
