# API Endpoints - ProfilPro 5D

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.profilpro5d.com/api
```

## Authentication

Tous les endpoints (sauf `/auth/*`) nécessitent un token JWT dans le header :
```
Authorization: Bearer <jwt_token>
```

---

## Endpoints d'Authentification

### `POST /api/auth/register`
Créer un nouveau compte utilisateur.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "Jean",
  "lastName": "Dupont",
  "birthDate": "1990-05-15",
  "birthTime": "14:30:00",
  "birthCity": "Geneva",
  "birthCountry": "Switzerland",
  "currentJob": "Développeur Web",
  "desiredJob": "Lead Developer"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Jean",
      "lastName": "Dupont"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `POST /api/auth/login`
Connexion utilisateur existant.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Jean",
      "lastName": "Dupont",
      "questionnaireCompleted": false,
      "profileGenerated": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `GET /api/auth/me`
Récupérer les informations de l'utilisateur connecté.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Jean",
    "lastName": "Dupont",
    "currentJob": "Développeur Web",
    "desiredJob": "Lead Developer",
    "birthDate": "1990-05-15",
    "questionnaireCompleted": true,
    "profileGenerated": true
  }
}
```

---

### `POST /api/auth/logout`
Déconnexion (invalidation du token côté client).

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Endpoints du Questionnaire

### `GET /api/questionnaire`
Récupérer le questionnaire actif.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "questionnaire-uuid",
    "version": "1.0",
    "totalQuestions": 35,
    "estimatedDurationMinutes": 15,
    "questions": [
      {
        "id": 1,
        "text": "Face à un projet ambitieux avec un délai serré, comment réagissez-vous naturellement ?",
        "type": "single_choice",
        "options": [
          {
            "id": "a",
            "text": "Je prends immédiatement les choses en main et organise l'équipe"
          },
          {
            "id": "b",
            "text": "J'analyse d'abord tous les aspects pour créer un plan détaillé"
          },
          {
            "id": "c",
            "text": "Je rassemble l'équipe pour discuter des meilleures approches ensemble"
          },
          {
            "id": "d",
            "text": "Je me concentre sur les détails techniques et la précision"
          }
        ]
      }
    ]
  }
}
```

---

### `POST /api/questionnaire/submit`
Soumettre les réponses au questionnaire.

**Request Body:**
```json
{
  "questionnaireId": "questionnaire-uuid",
  "responses": {
    "1": "a",
    "2": "c",
    "3": "b",
    "4": "d",
    "5": "a"
  },
  "timeSpentSeconds": 720
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "answerId": "answer-uuid",
    "scores": {
      "disc": {
        "D": 72,
        "I": 45,
        "S": 38,
        "C": 61
      },
      "riasec": {
        "R": 25,
        "I": 68,
        "A": 42,
        "S": 55,
        "E": 78,
        "C": 48
      },
      "enneagram": {
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
    },
    "message": "Questionnaire submitted successfully. Generating your profile..."
  }
}
```

---

### `GET /api/questionnaire/progress`
Récupérer la progression du questionnaire (si sauvegarde intermédiaire).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "questionnaireId": "questionnaire-uuid",
    "completedQuestions": 15,
    "totalQuestions": 35,
    "percentComplete": 42.86,
    "lastSaved": "2025-10-24T10:30:00Z"
  }
}
```

---

## Endpoints du Profil

### `POST /api/profile/generate`
Générer le profil 5D (déclenché automatiquement après soumission du questionnaire).

**Request Body:**
```json
{
  "answerId": "answer-uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "profileId": "profile-uuid",
    "status": "generated",
    "message": "Profile generated successfully"
  }
}
```

---

### `GET /api/profile`
Récupérer le profil complet de l'utilisateur.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "profile-uuid",
    "createdAt": "2025-10-24T10:45:00Z",

    "executiveSummary": "Jean Dupont présente un profil professionnel dynamique et orienté résultats...",

    "disc": {
      "profile": "DI",
      "scores": {
        "D": 72,
        "I": 45,
        "S": 38,
        "C": 61
      },
      "analysis": "Votre profil DISC révèle une dominance claire du facteur D (Dominance)..."
    },

    "riasec": {
      "code": "EIA",
      "scores": {
        "R": 25,
        "I": 68,
        "A": 42,
        "S": 55,
        "E": 78,
        "C": 48
      },
      "analysis": "Selon le modèle RIASEC, vous êtes principalement Entreprenant (E)..."
    },

    "enneagram": {
      "type": 3,
      "wing": "3w2",
      "scores": {
        "1": 42,
        "2": 35,
        "3": 78,
        "4": 28,
        "5": 52,
        "6": 45,
        "7": 38,
        "8": 65,
        "9": 30
      },
      "analysis": "Votre type Ennéagramme 3 (Le Battant) avec aile 2..."
    },

    "astrology": {
      "sunSign": "Taurus",
      "moonSign": "Leo",
      "risingSign": "Virgo",
      "dominantElement": "Earth",
      "analysis": "Né sous le signe du Taureau avec une Lune en Lion..."
    },

    "tibetan": {
      "element": "Metal",
      "animal": "Horse",
      "analysis": "L'astrologie tibétaine vous classe dans l'élément Métal..."
    },

    "strengths": [
      "Leadership naturel et capacité à prendre des décisions rapides",
      "Excellent communicateur avec une vision stratégique",
      "Capacité d'adaptation et résilience face aux défis"
    ],

    "areasForDevelopment": [
      "Patience dans les processus longs et méthodiques",
      "Écoute active et prise en compte des émotions d'autrui",
      "Gestion du stress et tendance au perfectionnisme"
    ],

    "careerRecommendations": [
      "Postes de management et de direction",
      "Entrepreneuriat et création d'entreprise",
      "Conseil stratégique et consulting",
      "Roles de transformation digitale"
    ],

    "idealWorkEnvironment": "Un environnement dynamique et innovant où l'autonomie est valorisée...",

    "wordCount": 2847,
    "confidenceScore": 0.89
  }
}
```

---

### `GET /api/profile/history`
Récupérer l'historique des profils générés.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "profile-uuid-1",
      "createdAt": "2025-10-24T10:45:00Z",
      "version": "1.0",
      "executiveSummary": "Jean Dupont présente un profil..."
    },
    {
      "id": "profile-uuid-2",
      "createdAt": "2025-09-15T08:30:00Z",
      "version": "1.0",
      "executiveSummary": "Profil antérieur..."
    }
  ]
}
```

---

### `GET /api/profile/:profileId`
Récupérer un profil spécifique par ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "profile-uuid",
    "createdAt": "2025-10-24T10:45:00Z",
    ...
  }
}
```

---

## Endpoints d'Export

### `POST /api/export/pdf`
Exporter le profil en PDF.

**Request Body:**
```json
{
  "profileId": "profile-uuid",
  "options": {
    "includeCharts": true,
    "colorScheme": "professional",
    "fontSize": 12
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://api.profilpro5d.com/downloads/profile-uuid.pdf",
    "expiresAt": "2025-10-24T12:00:00Z",
    "fileSize": 2458624
  }
}
```

---

### `POST /api/export/word`
Exporter le profil en Word (.docx).

**Request Body:**
```json
{
  "profileId": "profile-uuid",
  "options": {
    "includeCharts": true,
    "template": "modern"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://api.profilpro5d.com/downloads/profile-uuid.docx",
    "expiresAt": "2025-10-24T12:00:00Z",
    "fileSize": 1245678
  }
}
```

---

### `POST /api/export/markdown`
Exporter le profil en Markdown (.md).

**Request Body:**
```json
{
  "profileId": "profile-uuid"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://api.profilpro5d.com/downloads/profile-uuid.md",
    "expiresAt": "2025-10-24T12:00:00Z",
    "fileSize": 45678
  }
}
```

---

### `GET /api/export/download/:filename`
Télécharger un fichier exporté.

**Response (200):**
Binary file download avec headers appropriés :
```
Content-Type: application/pdf | application/vnd.openxmlformats-officedocument.wordprocessingml.document | text/markdown
Content-Disposition: attachment; filename="ProfilPro5D_Jean_Dupont.pdf"
```

---

## Codes d'Erreur

### 400 - Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "birthDate",
        "message": "Birth date is required"
      }
    ]
  }
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 - Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Profile not found"
  }
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req_12345"
  }
}
```

---

## Rate Limiting

**Limites:**
- Authentication endpoints: 5 requêtes / minute
- Questionnaire endpoints: 10 requêtes / minute
- Profile endpoints: 20 requêtes / minute
- Export endpoints: 3 requêtes / minute

**Headers de réponse:**
```
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 15
X-RateLimit-Reset: 1635174000
```

---

## Webhooks (Future)

### Profile Generation Complete
```
POST <your_webhook_url>
```

**Payload:**
```json
{
  "event": "profile.generated",
  "timestamp": "2025-10-24T10:45:00Z",
  "data": {
    "userId": "user-uuid",
    "profileId": "profile-uuid"
  }
}
```

---

## Versioning

L'API utilise le versioning dans l'URL :
- v1: `/api/v1/*` (actuel)
- v2: `/api/v2/*` (future)

La version par défaut (sans préfixe) pointe vers la dernière version stable.
