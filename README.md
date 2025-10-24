# ProfilPro 5D - Application de Profiling Professionnel Multidimensionnel

![ProfilPro 5D](https://img.shields.io/badge/ProfilPro-5D-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## 📖 Description

**ProfilPro 5D** est une application web SaaS innovante qui génère des profils professionnels complets et multidimensionnels pour les chercheurs d'emploi. L'application analyse la personnalité des utilisateurs à travers **5 modèles distincts** :

1. **Astrologie Occidentale** - Analyse du thème astral (signe solaire, lunaire, ascendant)
2. **DISC** - Profil comportemental au travail (Dominance, Influence, Stabilité, Conformité)
3. **RIASEC (Codes Holland)** - Typologie des intérêts professionnels
4. **Ennéagramme** - Système de personnalité à 9 types
5. **Astrologie Tibétaine (Byung-rtsis)** - Analyse des éléments et énergies

Le résultat est un **rapport détaillé de 2 pages** exportable en PDF, Word et Markdown, offrant une vision holistique du profil professionnel de l'utilisateur.

---

## 🎯 Fonctionnalités

### ✅ Fonctionnalités Principales

- **Questionnaire Intelligent** : 35 questions de mise en situation professionnelle
- **Analyse Multidimensionnelle** : Génération de profil basée sur 5 modèles
- **Tableau de Bord Visuel** : Interface élégante avec graphiques interactifs
- **Export Multi-Format** : PDF, Word (.docx) et Markdown (.md)
- **Authentification Sécurisée** : Gestion des utilisateurs via Supabase
- **Design Responsive** : Compatible desktop, tablette et mobile

### 🎨 Interface Utilisateur

- Design moderne avec Tailwind CSS
- Visualisations de données avec Recharts
- Animations fluides et intuitives
- Thème professionnel et élégant

---

## 🛠 Stack Technique

### Frontend
- **Framework** : React 18 avec Vite.js
- **Styling** : Tailwind CSS
- **Routing** : React Router v6
- **State Management** : Zustand (persist)
- **Forms** : React Hook Form + Zod
- **Charts** : Recharts
- **HTTP Client** : Axios
- **Icons** : Lucide React

### Backend
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Database** : Supabase (PostgreSQL)
- **Authentication** : Supabase Auth (JWT)
- **API Style** : RESTful

### Services & Outils
- **Database** : Supabase (PostgreSQL + Auth)
- **Document Generation** :
  - PDF : pdf-lib
  - Word : docx
  - Markdown : natif
- **Deployment** : Docker ready

---

## 📁 Structure du Projet

```
pnl-formation-app/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration (DB, constantes)
│   │   ├── controllers/      # Contrôleurs API
│   │   ├── middleware/       # Auth, validation, erreurs
│   │   ├── models/           # Modèles de données
│   │   ├── routes/           # Routes API
│   │   ├── services/         # Logique métier
│   │   │   ├── profileGeneration/    # Analyseurs DISC, RIASEC, etc.
│   │   │   └── documentGeneration/   # Générateurs PDF, Word, MD
│   │   └── server.js         # Point d'entrée
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Composants réutilisables
│   │   │   ├── questionnaire/# Composants du questionnaire
│   │   │   ├── profile/      # Composants du profil
│   │   │   └── export/       # Composants d'export
│   │   ├── pages/            # Pages de l'application
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API calls
│   │   ├── store/            # Zustand stores
│   │   ├── App.jsx           # Composant principal
│   │   └── main.jsx          # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql
│
├── docs/
│   ├── ARCHITECTURE.md       # Documentation architecture
│   ├── API_ENDPOINTS.md      # Endpoints API
│   ├── DATABASE_SCHEMA.md    # Schémas de base de données
│   ├── QUESTIONNAIRE_LOGIC.md# Logique du questionnaire
│   └── COMPONENTS.md         # Plan des composants React
│
├── .gitignore
├── Dockerfile
└── README.md
```

---

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Compte Supabase** (gratuit)

### 1. Cloner le Repository

```bash
git clone https://github.com/Hypnose-Patrick/pnl-formation-app.git
cd pnl-formation-app
```

### 2. Configuration de Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Exécutez la migration SQL : `supabase/migrations/001_init_schema.sql`
4. Récupérez vos clés API (URL + Anon Key)

### 3. Installation du Backend

```bash
cd backend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase
```

**Variables d'environnement requises** (`.env`) :
```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Démarrer le serveur backend :**
```bash
npm run dev
# Serveur lancé sur http://localhost:5000
```

### 4. Installation du Frontend

```bash
cd ../frontend
npm install

# Démarrer le serveur de développement
npm run dev
# Application lancée sur http://localhost:3000
```

### 5. Accéder à l'Application

Ouvrez votre navigateur à l'adresse : **http://localhost:3000**

---

## 📚 Documentation

### Documentation Technique Complète

Consultez le dossier `docs/` pour la documentation détaillée :

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Architecture complète du système
- **[API_ENDPOINTS.md](docs/API_ENDPOINTS.md)** - Documentation de tous les endpoints API
- **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Schémas de base de données détaillés
- **[QUESTIONNAIRE_LOGIC.md](docs/QUESTIONNAIRE_LOGIC.md)** - 5 exemples de questions + logique de scoring
- **[COMPONENTS.md](docs/COMPONENTS.md)** - Plan complet des composants React

### Endpoints API Principaux

**Base URL** : `http://localhost:5000/api`

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

#### Questionnaire
- `GET /api/questionnaire` - Récupérer le questionnaire actif
- `POST /api/questionnaire/submit` - Soumettre les réponses

#### Profil
- `GET /api/profile` - Récupérer le profil complet
- `POST /api/profile/generate` - Générer le profil 5D

#### Export
- `POST /api/export/pdf` - Exporter en PDF
- `POST /api/export/word` - Exporter en Word
- `POST /api/export/markdown` - Exporter en Markdown

---

## 🧪 Tests

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test
```

---

## 🐳 Docker

**Construire l'image Docker :**
```bash
docker build -t profilpro5d .
```

**Lancer le conteneur :**
```bash
docker run -d -p 3000:3000 -p 5000:5000 --env-file .env profilpro5d
```

---

## 📦 Build Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

---

## 🎨 Exemples de Questions du Questionnaire

Voici un aperçu des questions posées :

### Question 1 : Style de Leadership
> "Face à un projet ambitieux avec un délai serré, comment réagissez-vous naturellement ?"

**Options :**
- A) Je prends immédiatement les choses en main → **DISC : D=3, RIASEC : E=3, Enneagram : 8=3**
- B) J'analyse d'abord tous les aspects → **DISC : C=3, RIASEC : C=3, Enneagram : 5=3**
- C) Je rassemble l'équipe pour discuter → **DISC : S=3, RIASEC : S=3, Enneagram : 2=3**
- D) Je me lance avec enthousiasme → **DISC : I=3, RIASEC : A=2, Enneagram : 7=3**

**Plus de détails** : Consultez [QUESTIONNAIRE_LOGIC.md](docs/QUESTIONNAIRE_LOGIC.md)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

### Guidelines
- Respecter les conventions de code (ESLint)
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les changements importants

---

## 📋 Roadmap

### Phase 1 - MVP ✅
- [x] Architecture de base
- [x] Documentation complète
- [x] Code de démarrage (backend + frontend)
- [ ] Questionnaire complet (35 questions)
- [ ] Génération de profil basique
- [ ] Export PDF/Word/Markdown

### Phase 2 - Améliorations
- [ ] Visualisations avancées (graphiques interactifs)
- [ ] IA pour affiner les profils (OpenAI GPT)
- [ ] Recommandations de carrière personnalisées
- [ ] Historique des profils
- [ ] Mode comparaison de profils

### Phase 3 - Monétisation
- [ ] Plans premium (profils détaillés avancés)
- [ ] Coaching personnalisé
- [ ] API pour recruteurs
- [ ] Marketplace de services

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Équipe

**ProfilPro 5D Team**

- Architecture & Développement : Claude (Anthropic)
- Product Owner : Hypnose-Patrick

---

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/Hypnose-Patrick/pnl-formation-app/issues)
- **Email** : support@profilpro5d.com (à configurer)

---

## 🙏 Remerciements

- Modèles de profiling : DISC, RIASEC, Ennéagramme
- Stack technique : React, Express, Supabase, Tailwind CSS
- Inspiration : Recherche en psychologie et développement de carrière

---

**Développé avec ❤️ pour révéler le potentiel professionnel de chacun**

🚀 **Prêt à créer votre profil 5D ?**
