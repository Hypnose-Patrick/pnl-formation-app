# Architecture ProfilPro 5D

## Vue d'ensemble

ProfilPro 5D est une application web SaaS qui génère des profils professionnels multidimensionnels basés sur 5 modèles de profiling distincts :

1. **Astrologie Occidentale** - Analyse du thème astral
2. **DISC** - Profil comportemental
3. **RIASEC (Codes Holland)** - Typologie des intérêts professionnels
4. **Ennéagramme** - Système de personnalité à 9 types
5. **Astrologie Tibétaine (Byung-rtsis)** - Analyse des éléments

## Stack Technique

### Frontend
- **Framework**: React 18 avec Vite.js
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API Style**: RESTful

### Services Externes
- **Database & Auth**: Supabase
- **Document Generation**:
  - PDF: pdf-lib ou Puppeteer
  - Word: docx
  - Markdown: native

## Architecture du Projet

```
pnl-formation-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Configuration Supabase
│   │   │   └── constants.js          # Constantes de l'application
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentification
│   │   │   ├── questionnaireController.js
│   │   │   ├── profileController.js
│   │   │   └── exportController.js
│   │   ├── middleware/
│   │   │   ├── auth.js               # Middleware d'authentification
│   │   │   ├── errorHandler.js       # Gestion des erreurs
│   │   │   └── validation.js         # Validation des données
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Questionnaire.js
│   │   │   ├── Answer.js
│   │   │   └── Profile.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── questionnaire.js
│   │   │   ├── profile.js
│   │   │   └── export.js
│   │   ├── services/
│   │   │   ├── profileGeneration/
│   │   │   │   ├── discAnalyzer.js
│   │   │   │   ├── riasecAnalyzer.js
│   │   │   │   ├── enneagramAnalyzer.js
│   │   │   │   ├── astroAnalyzer.js
│   │   │   │   ├── tibetanAnalyzer.js
│   │   │   │   └── profileSynthesizer.js
│   │   │   ├── documentGeneration/
│   │   │   │   ├── pdfGenerator.js
│   │   │   │   ├── wordGenerator.js
│   │   │   │   └── markdownGenerator.js
│   │   │   └── questionnaireService.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── helpers.js
│   │   └── server.js                 # Point d'entrée
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ProgressBar.jsx
│   │   │   ├── questionnaire/
│   │   │   │   ├── QuestionnaireIntro.jsx
│   │   │   │   ├── QuestionCard.jsx
│   │   │   │   ├── QuestionnaireProgress.jsx
│   │   │   │   └── QuestionnaireForm.jsx
│   │   │   ├── profile/
│   │   │   │   ├── ProfileDashboard.jsx
│   │   │   │   ├── ProfileSummary.jsx
│   │   │   │   ├── DISCChart.jsx
│   │   │   │   ├── RIASECChart.jsx
│   │   │   │   ├── EnneagramChart.jsx
│   │   │   │   ├── AstroChart.jsx
│   │   │   │   └── TibetanChart.jsx
│   │   │   └── export/
│   │   │       ├── ExportButtons.jsx
│   │   │       └── ExportModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Questionnaire.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useQuestionnaire.js
│   │   │   └── useProfile.js
│   │   ├── services/
│   │   │   ├── api.js               # Configuration Axios
│   │   │   ├── authService.js
│   │   │   ├── questionnaireService.js
│   │   │   ├── profileService.js
│   │   │   └── exportService.js
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── questionnaireStore.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── types/
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql
│
└── docs/
    ├── ARCHITECTURE.md              # Ce fichier
    ├── API_ENDPOINTS.md             # Documentation des endpoints
    ├── DATABASE_SCHEMA.md           # Schémas de base de données
    ├── QUESTIONNAIRE_LOGIC.md       # Logique du questionnaire
    └── COMPONENTS.md                # Plan des composants React
```

## Flux de Données

### 1. Inscription / Connexion
```
User → Frontend (Login/Register)
     → Backend (authController)
     → Supabase Auth
     → JWT Token → Frontend (Store)
```

### 2. Complétion du Questionnaire
```
User → Frontend (QuestionnaireForm)
     → Backend (questionnaireController.submit)
     → Supabase (answers table)
     → Success Response
```

### 3. Génération du Profil
```
Trigger → Backend (profileController.generate)
        → Profile Generation Services:
            - discAnalyzer
            - riasecAnalyzer
            - enneagramAnalyzer
            - astroAnalyzer
            - tibetanAnalyzer
        → profileSynthesizer (synthèse globale)
        → Supabase (profiles table)
        → Frontend (ProfileDashboard)
```

### 4. Export du Profil
```
User → Frontend (ExportButtons)
     → Backend (exportController)
     → Document Generation Service (PDF/Word/MD)
     → File Download
```

## Principes de Conception

### 1. Séparation des Préoccupations
- **Frontend**: UI/UX, collecte de données, visualisation
- **Backend**: Logique métier, génération de profils, persistance
- **Database**: Stockage structuré, authentification

### 2. Modularité
- Chaque analyseur de profil est un module indépendant
- Les services de génération de documents sont isolés
- Les composants React sont réutilisables

### 3. Scalabilité
- API RESTful stateless
- Cache possible pour les profils générés
- Queue pour la génération de profils (future évolution)

### 4. Sécurité
- Authentication JWT via Supabase
- Validation des données côté backend
- Sanitization des inputs
- HTTPS obligatoire en production

### 5. Expérience Utilisateur
- Interface progressive (étape par étape)
- Feedback immédiat
- Visualisations claires et engageantes
- Export facile dans plusieurs formats

## Décisions Techniques

### Pourquoi Supabase ?
- PostgreSQL robuste et scalable
- Authentication intégrée
- Real-time capabilities (future)
- API auto-générée
- Gratuit pour commencer

### Pourquoi Vite.js ?
- Build ultra-rapide
- Hot Module Replacement (HMR)
- Configuration minimale
- Support ESM natif

### Pourquoi Zustand ?
- API simple et intuitive
- Pas de boilerplate
- Performance excellente
- TypeScript ready

## Évolutions Futures

### Phase 1 (MVP)
- [x] Architecture de base
- [ ] Questionnaire complet (35 questions)
- [ ] Génération de profil basique
- [ ] Export PDF/Word/MD
- [ ] Interface utilisateur responsive

### Phase 2 (Améliorations)
- [ ] Visualisations avancées (D3.js)
- [ ] IA pour affiner les profils (OpenAI)
- [ ] Recommendations de carrière
- [ ] Historique des profils
- [ ] Comparaison de profils

### Phase 3 (Monétisation)
- [ ] Plans premium
- [ ] Profils détaillés avancés
- [ ] Coaching personnalisé
- [ ] API pour recruteurs
- [ ] Marketplace de services

## Performance

### Objectifs
- Time to Interactive < 3s
- First Contentful Paint < 1.5s
- Génération de profil < 5s
- Export de document < 3s

### Optimisations Prévues
- Code splitting (React.lazy)
- Image optimization
- CDN pour assets statiques
- Database indexing
- Response caching

## Monitoring et Logging

### Métriques Clés
- Temps de génération de profil
- Taux de complétion du questionnaire
- Taux d'export
- Erreurs serveur
- Performance frontend

### Outils
- Console logging (développement)
- Winston (production backend)
- Sentry (error tracking - futur)
- Google Analytics (usage - futur)
