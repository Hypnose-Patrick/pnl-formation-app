# Plan des Composants React - ProfilPro 5D

## Architecture Frontend

L'application utilise une architecture basée sur :
- **Pages** : Composants de haut niveau représentant des routes
- **Composants Métier** : Logique spécifique au domaine (questionnaire, profile, export)
- **Composants Communs** : Éléments réutilisables (buttons, cards, inputs)
- **Hooks Personnalisés** : Logique partagée et gestion d'état
- **Services** : Communication avec l'API backend

---

## Arborescence des Composants

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Loading.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Modal.jsx
│   ├── questionnaire/
│   │   ├── QuestionnaireIntro.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── QuestionnaireProgress.jsx
│   │   └── QuestionnaireForm.jsx
│   ├── profile/
│   │   ├── ProfileDashboard.jsx
│   │   ├── ProfileSummary.jsx
│   │   ├── DISCChart.jsx
│   │   ├── RIASECChart.jsx
│   │   ├── EnneagramChart.jsx
│   │   ├── AstroChart.jsx
│   │   └── TibetanChart.jsx
│   └── export/
│       ├── ExportButtons.jsx
│       └── ExportModal.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Questionnaire.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useQuestionnaire.js
│   └── useProfile.js
└── App.jsx
```

---

## 1. Composants Communs (`components/common/`)

### `Button.jsx`

Bouton réutilisable avec variants.

**Props :**
```javascript
{
  variant: 'primary' | 'secondary' | 'outline' | 'danger',
  size: 'sm' | 'md' | 'lg',
  onClick: Function,
  disabled: Boolean,
  loading: Boolean,
  children: ReactNode,
  fullWidth: Boolean,
  icon: ReactNode
}
```

**Exemple d'utilisation :**
```jsx
<Button
  variant="primary"
  size="lg"
  onClick={handleSubmit}
  loading={isLoading}
>
  Soumettre le questionnaire
</Button>
```

---

### `Card.jsx`

Conteneur avec ombre et bordure.

**Props :**
```javascript
{
  title: String,
  subtitle: String,
  children: ReactNode,
  footer: ReactNode,
  className: String,
  hoverable: Boolean
}
```

**Exemple :**
```jsx
<Card
  title="Votre Profil DISC"
  subtitle="Analyse comportementale"
>
  <DISCChart data={discScores} />
</Card>
```

---

### `Input.jsx`

Champ de saisie avec validation.

**Props :**
```javascript
{
  type: 'text' | 'email' | 'password' | 'date' | 'time',
  label: String,
  placeholder: String,
  value: String,
  onChange: Function,
  error: String,
  required: Boolean,
  icon: ReactNode
}
```

**Exemple :**
```jsx
<Input
  type="email"
  label="Adresse email"
  placeholder="votre@email.com"
  value={email}
  onChange={setEmail}
  error={emailError}
  required
/>
```

---

### `Select.jsx`

Menu déroulant.

**Props :**
```javascript
{
  label: String,
  options: Array<{value: String, label: String}>,
  value: String,
  onChange: Function,
  placeholder: String,
  error: String
}
```

---

### `Loading.jsx`

Indicateur de chargement.

**Props :**
```javascript
{
  size: 'sm' | 'md' | 'lg',
  text: String,
  fullscreen: Boolean
}
```

---

### `ProgressBar.jsx`

Barre de progression.

**Props :**
```javascript
{
  current: Number,
  total: Number,
  showPercentage: Boolean,
  label: String,
  color: String
}
```

**Exemple :**
```jsx
<ProgressBar
  current={15}
  total={35}
  showPercentage
  label="Questions complétées"
/>
```

---

### `Modal.jsx`

Fenêtre modale.

**Props :**
```javascript
{
  isOpen: Boolean,
  onClose: Function,
  title: String,
  children: ReactNode,
  footer: ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl'
}
```

---

## 2. Composants Questionnaire (`components/questionnaire/`)

### `QuestionnaireIntro.jsx`

Page d'introduction au questionnaire.

**Props :**
```javascript
{
  onStart: Function,
  estimatedTime: Number,
  totalQuestions: Number
}
```

**Contenu :**
- Titre et description
- Informations sur le questionnaire
- Instructions
- Bouton "Commencer"

---

### `QuestionCard.jsx`

Carte affichant une question individuelle.

**Props :**
```javascript
{
  question: {
    id: Number,
    text: String,
    options: Array<{id: String, text: String}>
  },
  selectedAnswer: String,
  onSelect: Function,
  showValidation: Boolean
}
```

**Structure :**
```jsx
<Card>
  <div className="question-number">Question {question.id}/35</div>
  <h3 className="question-text">{question.text}</h3>

  <div className="options">
    {question.options.map(option => (
      <div
        key={option.id}
        className={`option ${selectedAnswer === option.id ? 'selected' : ''}`}
        onClick={() => onSelect(option.id)}
      >
        <span className="option-letter">{option.id.toUpperCase()}</span>
        <span className="option-text">{option.text}</span>
      </div>
    ))}
  </div>
</Card>
```

---

### `QuestionnaireProgress.jsx`

Affichage de la progression.

**Props :**
```javascript
{
  currentQuestion: Number,
  totalQuestions: Number,
  answeredQuestions: Array<Number>
}
```

**Contenu :**
- Barre de progression
- Numéro de question actuelle
- Indicateurs de questions complétées

---

### `QuestionnaireForm.jsx`

Composant principal orchestrant le questionnaire.

**État interne :**
```javascript
{
  currentQuestionIndex: Number,
  responses: Object,
  isSubmitting: Boolean,
  startTime: Date
}
```

**Fonctions :**
- `handleAnswer(questionId, answerId)`
- `goToNext()`
- `goToPrevious()`
- `submitQuestionnaire()`

**Structure :**
```jsx
<div className="questionnaire-container">
  <QuestionnaireProgress {...progressProps} />

  <QuestionCard
    question={currentQuestion}
    selectedAnswer={responses[currentQuestion.id]}
    onSelect={handleAnswer}
  />

  <div className="navigation">
    <Button onClick={goToPrevious} disabled={currentQuestionIndex === 0}>
      Précédent
    </Button>

    {currentQuestionIndex < totalQuestions - 1 ? (
      <Button onClick={goToNext} variant="primary">
        Suivant
      </Button>
    ) : (
      <Button onClick={submitQuestionnaire} variant="primary" loading={isSubmitting}>
        Terminer
      </Button>
    )}
  </div>
</div>
```

---

## 3. Composants Profil (`components/profile/`)

### `ProfileDashboard.jsx`

Tableau de bord principal du profil.

**Props :**
```javascript
{
  profile: Object
}
```

**Structure :**
```jsx
<div className="profile-dashboard">
  <header>
    <h1>Votre ProfilPro 5D</h1>
    <ExportButtons profileId={profile.id} />
  </header>

  <ProfileSummary summary={profile.executiveSummary} />

  <div className="charts-grid">
    <DISCChart data={profile.disc} />
    <RIASECChart data={profile.riasec} />
    <EnneagramChart data={profile.enneagram} />
    <AstroChart data={profile.astrology} />
    <TibetanChart data={profile.tibetan} />
  </div>

  <section className="insights">
    <Card title="Points Forts">
      <ul>
        {profile.strengths.map((strength, idx) => (
          <li key={idx}>{strength}</li>
        ))}
      </ul>
    </Card>

    <Card title="Axes de Développement">
      <ul>
        {profile.areasForDevelopment.map((area, idx) => (
          <li key={idx}>{area}</li>
        ))}
      </ul>
    </Card>

    <Card title="Recommandations de Carrière">
      <ul>
        {profile.careerRecommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </Card>
  </section>
</div>
```

---

### `ProfileSummary.jsx`

Résumé exécutif du profil.

**Props :**
```javascript
{
  summary: String,
  user: Object
}
```

**Contenu :**
- Nom de l'utilisateur
- Date de génération du profil
- Texte du résumé exécutif
- Badges des profils dominants (DISC, RIASEC, Ennéagramme)

---

### `DISCChart.jsx`

Graphique radar pour le profil DISC.

**Props :**
```javascript
{
  data: {
    scores: { D: Number, I: Number, S: Number, C: Number },
    profile: String,
    analysis: String
  }
}
```

**Utilise Recharts :**
```jsx
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

<Card title="Profil DISC" subtitle={`Type : ${data.profile}`}>
  <RadarChart data={chartData}>
    <PolarGrid />
    <PolarAngleAxis dataKey="axis" />
    <Radar dataKey="score" fill="#8884d8" />
  </RadarChart>

  <p className="analysis">{data.analysis}</p>
</Card>
```

---

### `RIASECChart.jsx`

Graphique hexagonal pour RIASEC.

**Props :**
```javascript
{
  data: {
    scores: { R, I, A, S, E, C },
    code: String,
    analysis: String
  }
}
```

**Similar à DISCChart avec 6 axes.**

---

### `EnneagramChart.jsx`

Graphique circulaire pour l'Ennéagramme.

**Props :**
```javascript
{
  data: {
    scores: { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
    type: Number,
    wing: String,
    analysis: String
  }
}
```

**Visualisation :**
- Graphique en barres horizontales ou radar à 9 axes
- Mise en évidence du type dominant

---

### `AstroChart.jsx`

Visualisation astrologie occidentale.

**Props :**
```javascript
{
  data: {
    sunSign: String,
    moonSign: String,
    risingSign: String,
    dominantElement: String,
    analysis: String
  }
}
```

**Contenu :**
- Signes zodiacaux avec icônes
- Élément dominant
- Texte d'analyse

---

### `TibetanChart.jsx`

Visualisation astrologie tibétaine.

**Props :**
```javascript
{
  data: {
    element: String,
    animal: String,
    analysis: String
  }
}
```

---

## 4. Composants Export (`components/export/`)

### `ExportButtons.jsx`

Boutons d'export multiformats.

**Props :**
```javascript
{
  profileId: String
}
```

**Structure :**
```jsx
<div className="export-buttons">
  <Button
    icon={<FileTextIcon />}
    onClick={() => handleExport('pdf')}
    loading={exportingPdf}
  >
    Export PDF
  </Button>

  <Button
    icon={<FileIcon />}
    onClick={() => handleExport('word')}
    loading={exportingWord}
  >
    Export Word
  </Button>

  <Button
    icon={<CodeIcon />}
    onClick={() => handleExport('markdown')}
    loading={exportingMd}
  >
    Export Markdown
  </Button>
</div>
```

---

### `ExportModal.jsx`

Modale de confirmation et options d'export.

**Props :**
```javascript
{
  isOpen: Boolean,
  onClose: Function,
  format: 'pdf' | 'word' | 'markdown',
  onExport: Function
}
```

**Contenu :**
- Options de personnalisation (inclusion des graphiques, format, etc.)
- Bouton de confirmation

---

## 5. Pages (`pages/`)

### `Home.jsx`

Page d'accueil.

**Contenu :**
- Hero section avec description de l'application
- CTA "Créer mon profil 5D"
- Présentation des 5 modèles
- Exemples de profils (anonymisés)

---

### `Login.jsx` & `Register.jsx`

Pages d'authentification.

**Utilise :**
- `Input` pour les champs
- `Button` pour la soumission
- `useAuth` hook

---

### `Questionnaire.jsx`

Page du questionnaire.

**Utilise :**
- `QuestionnaireIntro` (si pas commencé)
- `QuestionnaireForm` (questionnaire en cours)
- `useQuestionnaire` hook

---

### `Profile.jsx`

Page du profil utilisateur.

**Utilise :**
- `ProfileDashboard`
- `Loading` (pendant la génération)
- `useProfile` hook

---

### `NotFound.jsx`

Page 404.

---

## 6. Hooks Personnalisés (`hooks/`)

### `useAuth.js`

Gestion de l'authentification.

**Retourne :**
```javascript
{
  user: Object | null,
  isAuthenticated: Boolean,
  isLoading: Boolean,
  login: Function,
  register: Function,
  logout: Function
}
```

---

### `useQuestionnaire.js`

Gestion du questionnaire.

**Retourne :**
```javascript
{
  questionnaire: Object,
  isLoading: Boolean,
  submitQuestionnaire: Function,
  saveProgress: Function
}
```

---

### `useProfile.js`

Gestion du profil.

**Retourne :**
```javascript
{
  profile: Object,
  isLoading: Boolean,
  isGenerating: Boolean,
  fetchProfile: Function,
  generateProfile: Function
}
```

---

## 7. Composant Principal (`App.jsx`)

**Structure :**
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading fullscreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/questionnaire"
          element={isAuthenticated ? <Questionnaire /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Patterns et Bonnes Pratiques

### 1. Composition
Favoriser les petits composants composables plutôt que des gros composants monolithiques.

### 2. Props Destructuring
```javascript
function Button({ variant = 'primary', size = 'md', children, ...rest }) {
  // ...
}
```

### 3. Custom Hooks pour la Logique
Extraire la logique complexe dans des hooks réutilisables.

### 4. PropTypes ou TypeScript
Documenter les props attendues (future migration vers TypeScript).

### 5. Styled Components ou Tailwind
Utiliser Tailwind CSS pour le styling avec des classes utilitaires.

### 6. Lazy Loading
```javascript
const Profile = lazy(() => import('./pages/Profile'));
```

---

## Gestion d'État

### Local State (useState)
Pour l'état des composants individuels.

### Zustand Stores
Pour l'état global partagé (auth, questionnaire progress).

```javascript
// store/authStore.js
import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null })
}));
```

---

## Styling avec Tailwind CSS

Exemple de classe pour une Card :
```jsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  {children}
</div>
```

Convention de couleurs :
- **Primary** : Bleu (`blue-600`)
- **Secondary** : Gris (`gray-600`)
- **Success** : Vert (`green-600`)
- **Danger** : Rouge (`red-600`)

---

## Tests (Future)

### Unit Tests (Vitest)
```javascript
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Integration Tests (React Testing Library)
Tester les interactions entre composants.

### E2E Tests (Playwright)
Tester le parcours complet utilisateur.
