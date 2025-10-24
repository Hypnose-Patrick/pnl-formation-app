# Logique du Questionnaire - ProfilPro 5D

## Vue d'ensemble

Le questionnaire ProfilPro 5D comprend **35 questions** de mise en situation professionnelle à choix multiples. Chaque question est conçue pour révéler des traits de personnalité mesurables selon les 5 modèles :

1. **DISC** - Comportement au travail
2. **RIASEC** - Intérêts professionnels
3. **Ennéagramme** - Motivations profondes

Les données natales (date, heure, lieu de naissance) permettent de calculer les composantes astrologiques (occidentale et tibétaine) indépendamment du questionnaire.

---

## Principes de Conception des Questions

### 1. Mises en Situation Réalistes
Chaque question présente un scénario professionnel concret et authentique.

### 2. Options Équilibrées
Chaque question propose 4 options (A, B, C, D) représentant différents profils.

### 3. Scoring Multi-Dimensionnel
Chaque réponse contribue aux scores de plusieurs modèles simultanément.

### 4. Neutralité Linguistique
Les options évitent les jugements de valeur (bon/mauvais) pour encourager l'honnêteté.

### 5. Adaptabilité Contextuelle
Les questions peuvent être légèrement adaptées selon le métier actuel/visé de l'utilisateur.

---

## Système de Scoring

### Structure du Score
Chaque option de réponse contient un objet `scoring` :

```json
{
  "disc": { "D": 3, "I": 0, "S": 0, "C": 1 },
  "riasec": { "E": 2, "C": 1 },
  "enneagram": { "3": 2, "8": 2 }
}
```

### Pondération
- **Score 0** : Trait non représenté
- **Score 1** : Trait légèrement présent
- **Score 2** : Trait modérément présent
- **Score 3** : Trait fortement présent

### Calcul Final
Après les 35 questions, les scores bruts sont :
1. **Sommés** par catégorie (ex: tous les "D" du DISC)
2. **Normalisés** sur 100 (pourcentage)
3. **Analysés** pour déterminer les profils dominants

---

## Exemples de Questions (5 Questions Détaillées)

### Question 1 : Style de Leadership

**Contexte d'adaptation :** Si métier = "Manager" → "Dans votre équipe actuelle..."

**Question :**
> Face à un projet ambitieux avec un délai serré, comment réagissez-vous naturellement ?

**Options :**

#### Option A
**Texte :** "Je prends immédiatement les choses en main, définis les priorités et distribue les tâches avec fermeté."

**Scoring :**
```json
{
  "disc": { "D": 3, "I": 0, "S": 0, "C": 1 },
  "riasec": { "E": 3, "C": 1 },
  "enneagram": { "3": 2, "8": 3 }
}
```

**Analyse :**
- **DISC** : Dominance élevée (D=3) - Leadership directif, prise de décision rapide
- **RIASEC** : Entreprenant (E=3) - Aime diriger et organiser
- **Ennéagramme** : Type 8 (Le Chef) - Contrôle, assertivité, protection du groupe

---

#### Option B
**Texte :** "J'analyse d'abord tous les aspects du projet, crée un plan détaillé avec des étapes précises et des métriques."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
  "riasec": { "I": 2, "C": 3 },
  "enneagram": { "1": 2, "5": 3 }
}
```

**Analyse :**
- **DISC** : Conformité élevée (C=3) - Méthodique, précis, analytique
- **RIASEC** : Conventionnel (C=3) - Aime la structure et l'organisation systématique
- **Ennéagramme** : Type 5 (L'Observateur) - Analyse approfondie, besoin de comprendre

---

#### Option C
**Texte :** "Je rassemble l'équipe pour discuter ensemble des meilleures approches et m'assurer que chacun se sente engagé."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 2, "S": 3, "C": 0 },
  "riasec": { "S": 3, "E": 1 },
  "enneagram": { "2": 3, "9": 2 }
}
```

**Analyse :**
- **DISC** : Stabilité élevée (S=3) - Coopération, harmonie, support de l'équipe
- **RIASEC** : Social (S=3) - Orientation vers les personnes, collaboration
- **Ennéagramme** : Type 2 (L'Altruiste) - Besoin d'aider et de créer des liens

---

#### Option D
**Texte :** "Je me lance avec enthousiasme en mobilisant les énergies, créant une dynamique positive et innovante."

**Scoring :**
```json
{
  "disc": { "D": 1, "I": 3, "S": 0, "C": 0 },
  "riasec": { "A": 2, "E": 2 },
  "enneagram": { "3": 2, "7": 3 }
}
```

**Analyse :**
- **DISC** : Influence élevée (I=3) - Enthousiasme, persuasion, optimisme
- **RIASEC** : Artistique/Entreprenant - Innovation, créativité appliquée
- **Ennéagramme** : Type 7 (L'Enthousiaste) - Énergie, positivité, spontanéité

---

### Question 2 : Résolution de Problèmes

**Question :**
> Lorsque vous êtes confronté à un problème complexe au travail, quelle est votre première réaction ?

**Options :**

#### Option A
**Texte :** "Je cherche rapidement une solution pratique, quitte à prendre des risques calculés."

**Scoring :**
```json
{
  "disc": { "D": 3, "I": 1, "S": 0, "C": 0 },
  "riasec": { "R": 2, "E": 2 },
  "enneagram": { "3": 2, "8": 2 }
}
```

**Analyse :**
- **DISC** : D=3 - Action immédiate, prise de risque
- **RIASEC** : Réaliste + Entreprenant - Solution concrète et pragmatique
- **Ennéagramme** : 3/8 - Efficacité et contrôle

---

#### Option B
**Texte :** "Je recherche des données, des études ou des exemples similaires pour m'inspirer."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
  "riasec": { "I": 3, "C": 2 },
  "enneagram": { "5": 3, "6": 1 }
}
```

**Analyse :**
- **DISC** : C=3 - Recherche rigoureuse, basée sur les faits
- **RIASEC** : Investigateur (I=3) - Curiosité intellectuelle, analyse
- **Ennéagramme** : Type 5 - Accumulation de connaissances

---

#### Option C
**Texte :** "Je consulte mes collègues pour bénéficier de différentes perspectives."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 2, "S": 3, "C": 0 },
  "riasec": { "S": 3 },
  "enneagram": { "2": 2, "6": 2, "9": 2 }
}
```

**Analyse :**
- **DISC** : S=3 - Approche collaborative et consensuelle
- **RIASEC** : Social (S=3) - Valorisation des relations humaines
- **Ennéagramme** : 2/6/9 - Besoin de sécurité et d'harmonie

---

#### Option D
**Texte :** "J'explore des solutions créatives et non conventionnelles."

**Scoring :**
```json
{
  "disc": { "D": 1, "I": 2, "S": 0, "C": 0 },
  "riasec": { "A": 3, "I": 1 },
  "enneagram": { "4": 2, "7": 2 }
}
```

**Analyse :**
- **DISC** : I=2 - Innovation et pensée divergente
- **RIASEC** : Artistique (A=3) - Originalité, créativité
- **Ennéagramme** : 4/7 - Unicité et possibilités

---

### Question 3 : Environnement de Travail Préféré

**Question :**
> Dans quel type d'environnement de travail vous sentez-vous le plus épanoui ?

**Options :**

#### Option A
**Texte :** "Un environnement dynamique et compétitif où je peux prouver ma valeur et atteindre des objectifs ambitieux."

**Scoring :**
```json
{
  "disc": { "D": 3, "I": 1, "S": 0, "C": 0 },
  "riasec": { "E": 3 },
  "enneagram": { "3": 3, "8": 2 }
}
```

**Analyse :**
- **DISC** : D=3 - Compétition, défi, résultats
- **RIASEC** : Entreprenant (E=3) - Ambition, leadership
- **Ennéagramme** : Type 3 - Réussite et reconnaissance

---

#### Option B
**Texte :** "Un lieu calme et structuré où je peux me concentrer sur des tâches précises avec des standards élevés."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 0, "S": 2, "C": 3 },
  "riasec": { "C": 3, "I": 1 },
  "enneagram": { "1": 3, "5": 2 }
}
```

**Analyse :**
- **DISC** : C=3 - Ordre, précision, qualité
- **RIASEC** : Conventionnel (C=3) - Structure et systèmes
- **Ennéagramme** : Type 1 - Perfectionnisme

---

#### Option C
**Texte :** "Un espace collaboratif et convivial où les relations humaines sont valorisées."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 2, "S": 3, "C": 0 },
  "riasec": { "S": 3 },
  "enneagram": { "2": 3, "9": 2 }
}
```

**Analyse :**
- **DISC** : S=3 - Harmonie, stabilité, équipe
- **RIASEC** : Social (S=3) - Interactions humaines
- **Ennéagramme** : Type 2 - Aide et connexion

---

#### Option D
**Texte :** "Un cadre flexible et stimulant où je peux exprimer ma créativité et expérimenter."

**Scoring :**
```json
{
  "disc": { "D": 1, "I": 2, "S": 0, "C": 0 },
  "riasec": { "A": 3 },
  "enneagram": { "4": 2, "7": 2 }
}
```

**Analyse :**
- **DISC** : I=2 - Variété, nouveauté
- **RIASEC** : Artistique (A=3) - Expression personnelle
- **Ennéagramme** : 4/7 - Liberté et originalité

---

### Question 4 : Gestion du Stress

**Question :**
> Lorsque la pression monte au travail, comment gérez-vous la situation ?

**Options :**

#### Option A
**Texte :** "Je redouble d'efforts et de détermination, le stress me stimule et me pousse à donner le meilleur."

**Scoring :**
```json
{
  "disc": { "D": 3, "I": 0, "S": 0, "C": 1 },
  "riasec": { "E": 2 },
  "enneagram": { "3": 3, "8": 2 }
}
```

**Analyse :**
- **DISC** : D=3 - Résilience, capacité sous pression
- **RIASEC** : Entreprenant - Transformation du stress en action
- **Ennéagramme** : Type 3 - Performance maintenue

---

#### Option B
**Texte :** "Je prends du recul, j'organise mes priorités et j'établis un plan méthodique."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
  "riasec": { "C": 2, "I": 1 },
  "enneagram": { "1": 2, "5": 2, "6": 2 }
}
```

**Analyse :**
- **DISC** : C=3 - Logique, organisation face au chaos
- **RIASEC** : Conventionnel - Systématisation
- **Ennéagramme** : 1/5/6 - Contrôle par la préparation

---

#### Option C
**Texte :** "Je cherche du soutien auprès de mes collègues et partage mes préoccupations."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 1, "S": 3, "C": 0 },
  "riasec": { "S": 3 },
  "enneagram": { "2": 2, "6": 2, "9": 2 }
}
```

**Analyse :**
- **DISC** : S=3 - Recherche de stabilité par les relations
- **RIASEC** : Social - Besoin de connexion humaine
- **Ennéagramme** : 2/6/9 - Sécurité par l'attachement

---

#### Option D
**Texte :** "Je me déconnecte mentalement, visualise des solutions positives et garde mon optimisme."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 3, "S": 1, "C": 0 },
  "riasec": { "A": 1 },
  "enneagram": { "7": 3, "9": 1 }
}
```

**Analyse :**
- **DISC** : I=3 - Optimisme, positivité
- **RIASEC** : Faible corrélation (adaptation mentale)
- **Ennéagramme** : Type 7 - Évitement par le positif

---

### Question 5 : Prise de Décision

**Question :**
> Vous devez prendre une décision importante qui affectera votre équipe. Quelle approche privilégiez-vous ?

**Options :**

#### Option A
**Texte :** "Je décide rapidement en me fiant à mon instinct et à mon expérience, puis j'assume pleinement."

**Scoring :**
```json
{
  "disc": { "D": 3, "I": 1, "S": 0, "C": 0 },
  "riasec": { "E": 3 },
  "enneagram": { "3": 1, "8": 3 }
}
```

**Analyse :**
- **DISC** : D=3 - Décision rapide, confiance en soi
- **RIASEC** : Entreprenant - Leadership décisionnel
- **Ennéagramme** : Type 8 - Autorité et responsabilité

---

#### Option B
**Texte :** "J'analyse tous les faits, compare les options et choisis la solution la plus logique."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 0, "S": 1, "C": 3 },
  "riasec": { "I": 2, "C": 3 },
  "enneagram": { "5": 3, "6": 2 }
}
```

**Analyse :**
- **DISC** : C=3 - Décision basée sur les données
- **RIASEC** : Investigateur + Conventionnel - Rationalité
- **Ennéagramme** : Type 5 - Compréhension avant action

---

#### Option C
**Texte :** "Je consulte l'équipe pour prendre une décision collective qui préserve l'harmonie."

**Scoring :**
```json
{
  "disc": { "D": 0, "I": 1, "S": 3, "C": 0 },
  "riasec": { "S": 3 },
  "enneagram": { "2": 2, "9": 3 }
}
```

**Analyse :**
- **DISC** : S=3 - Consensus, stabilité
- **RIASEC** : Social - Décision participative
- **Ennéagramme** : Type 9 - Paix et unité

---

#### Option D
**Texte :** "J'explore des alternatives créatives qui pourraient surprendre positivement."

**Scoring :**
```json
{
  "disc": { "D": 1, "I": 2, "S": 0, "C": 0 },
  "riasec": { "A": 3, "E": 1 },
  "enneagram": { "4": 2, "7": 2 }
}
```

**Analyse :**
- **DISC** : I=2 - Innovation, originalité
- **RIASEC** : Artistique - Solutions non conventionnelles
- **Ennéagramme** : 4/7 - Unicité et exploration

---

## Thématiques Couvertes (35 Questions)

Pour un questionnaire complet, les questions doivent couvrir :

1. **Leadership et autorité** (Questions 1, 5) - 4 questions
2. **Résolution de problèmes** (Question 2) - 4 questions
3. **Environnement de travail** (Question 3) - 3 questions
4. **Gestion du stress** (Question 4) - 3 questions
5. **Relations interpersonnelles** - 4 questions
6. **Motivation et valeurs** - 4 questions
7. **Organisation et planification** - 3 questions
8. **Innovation et créativité** - 3 questions
9. **Communication** - 3 questions
10. **Adaptabilité au changement** - 4 questions

**Total : 35 questions**

---

## Algorithme de Scoring

```javascript
// Pseudo-code
function calculateScores(responses, questionnaire) {
  const scores = {
    disc: { D: 0, I: 0, S: 0, C: 0 },
    riasec: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    enneagram: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  };

  // Pour chaque réponse
  for (let questionId in responses) {
    const answerId = responses[questionId];
    const question = questionnaire.questions.find(q => q.id === questionId);
    const option = question.options.find(o => o.id === answerId);

    // Ajouter les scores
    if (option.scoring.disc) {
      for (let key in option.scoring.disc) {
        scores.disc[key] += option.scoring.disc[key];
      }
    }
    // Répéter pour riasec et enneagram
  }

  // Normaliser sur 100
  scores.disc = normalizeScores(scores.disc);
  scores.riasec = normalizeScores(scores.riasec);
  scores.enneagram = normalizeScores(scores.enneagram);

  return scores;
}

function normalizeScores(rawScores) {
  const total = Object.values(rawScores).reduce((sum, val) => sum + val, 0);
  const normalized = {};
  for (let key in rawScores) {
    normalized[key] = Math.round((rawScores[key] / total) * 100);
  }
  return normalized;
}
```

---

## Détermination des Profils Dominants

### DISC Profile
- **Profil simple** : Le facteur le plus élevé (ex: "D" si D=72)
- **Profil combiné** : Les 2 facteurs les plus élevés si proches (ex: "DI" si D=72, I=68)

### RIASEC Code
- Les 3 lettres avec les scores les plus élevés, par ordre décroissant
- Exemple : E=78, I=68, A=55 → Code "EIA"

### Ennéagramme
- Type principal : Le numéro avec le score le plus élevé
- Aile : Le type adjacent (±1) avec le score le plus élevé
- Exemple : Si 3=78 et 2=65 → "3w2" (Type 3 avec aile 2)

---

## Validation et Qualité

### Cohérence Interne
- Vérifier que les scores sont cohérents entre modèles
- Exemple : Un profil DISC "D" élevé devrait avoir un RIASEC "E" élevé

### Fiabilité
- Test-retest : Un utilisateur devrait obtenir des résultats similaires à 2 semaines d'intervalle

### Feedback Utilisateur
- À la fin du questionnaire, demander si les questions étaient claires et pertinentes
