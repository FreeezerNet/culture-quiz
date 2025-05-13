## 📅 Phase 1 – Analyse & conception (1 semaine)

1. **Lecture du cahier des charges**

   * Relever toutes les fonctionnalités et les critères de notation.
2. **Modélisation de la base de données**

   * Tables : `users` (id, email, mot\_de\_passe, …), `categories` (id, nom), `questions` (id, catégorie\_id, énoncé), `answers` (id, question\_id, texte, is\_correct).
   * Diagramme entité-relation (ERD).
3. **Wireframes & design system**

   * Esquisser l’UX mobile-first : accueil, inscription/connexion, sélection, quiz, résultats.
   * Choisir palette de couleurs, typographies, style des boutons…
4. **Spécification de l’API**

   * Auth : `POST /auth/register`, `POST /auth/login` (JWT).
   * Catégories : `GET /categories`.
   * Quiz :

     * `POST /quiz/start` → nouvelle session (10 questions aléatoires).
     * `GET /quiz/:quizId/question/:n` → nᵉ question + 4 réponses aléatoires.
     * `POST /quiz/:quizId/answer` → enregistrement réponse.
   * Résultats : `GET /quiz/:quizId/result`.

---

## 🔧 Phase 2 – Backend & base de données (1 semaine)

1. **Initialisation du projet**

   * `npm init` + installation d’Express, JWT, bcrypt, cors, dotenv.
2. **Connexion à MySQL**

   * Utiliser un ORM (Sequelize/TypeORM) ou `mysql2`.
   * Créer migrations et seeders pour catégories, questions+réponses.
3. **Implémentation de l’authentification**

   * Gestion des tokens, middleware `authenticate`.
4. **Endpoints CRUD**

   * `GET /categories` → liste des catégories.
   * Quiz : génération aléatoire, stockage des réponses, calcul du score.
5. **Tests unitaires**

   * Utiliser Jest ou Mocha pour valider chaque route.

---

## ⚛️ Phase 3 – Front-end React (1 semaine)

1. **Scaffold React**

   * `create-react-app` ou Vite + TypeScript (optionnel).
   * Installer React Router, Axios (ou fetch), Context API ou Redux.
2. **Structure des dossiers**

   ```
   src/
   ├─ api/           # appels HTTP
   ├─ components/    # Button, Timer, Card…
   ├─ pages/         # Home, Auth, Categories, Quiz, Results
   ├─ context/       # AuthContext, QuizContext
   ├─ styles/        # variables SCSS ou tailwind.config.js
   └─ App.jsx
   ```
3. **Mobile-first & design**

   * Configurer Tailwind CSS ou SCSS + media queries.
   * Créer un thème (couleurs, polices) et des composants UI réutilisables.

---

## 🚀 Phase 4 – Implémentation des features (2 semaines)

1. **Auth**

   * Pages Inscription/Connexion, validation des formulaires, redirection.
2. **Accueil & logo**

   * Générer un logo (IA ou simple SVG), afficher le titre “Culture Quiz”.
3. **Sélection de catégorie**

   * Récupérer `GET /categories`, afficher en grille ou liste.
4. **Quiz**

   * **Timer** de 30 s (hook `useTimer`) visible en haut.
   * **Question + réponses** : récupérer via `GET /quiz/:id/q/1`, mélanger 4 choix.
   * Gestion du clic :

     * Bonne réponse → fond vert pendant 1 s, incrément score.
     * Mauvaise → fond rouge pendant 1 s.
     * Pas de clic → auto-next après 30 s.
5. **Résultats**

   * Après 10 questions, afficher le score et un bouton “Rejouer” ou “Accueil”.

---

## 🧪 Phase 5 – Tests, QA & accessibilité (1 semaine)

1. **Tests fonctionnels**

   * React Testing Library pour les composants critiques (Timer, Quiz).
   * Postman pour tester l’API manuellement.
2. **E2E**

   * Cypress : scénario complet (inscription → quiz → résultat).
3. **Responsive & accessibilité**

   * Vérifier sur mobile, tablette et desktop.
   * Contraste, focus states, labels ARIA…

---

## 📦 Phase 6 – Documentation & déploiement (1 semaine)

1. **README & guide d’installation**

   * Comment démarrer le back (`npm start`), la DB (script SQL), le front (`npm run dev`).
2. **Swagger/OpenAPI**

   * Générer une doc interactive pour vos endpoints.
3. **Export de la base**

   * Fichier `.sql` avec structure + données de seed.
4. **Déploiement**

   * Back : Heroku/Render (variables d’environnement).
   * Front : Netlify/Vercel.
   * Configurer CI (GitHub Actions) pour tests + déploiement automatique.
5. **Préparation de la présentation (20 min)**

   * Slides couvrant :

   > - choix graphique
   > - endpoints et technologie du back
   > - stockage MySQL (particularités)
   > - architecture React (pages, composants, routing)
   > - extrait de code clé
   > - défis rencontrés + solutions
   > - démo live de l’application

---

## 🤝 Répartition des rôles en équipe

| Rôle               | Personne A                             | Personne B        | Personne C      |
| ------------------ | -------------------------------------- | ----------------- | --------------- |
| UI / Design        | Couleurs, wireframes, charte graphique |                   |                 |
| Front-end React    | Pages Auth, Résultats                  | Quiz + Timer      | Intégration API |
| Back-end Node.js   | Auth & sécurité                        | Endpoints Quiz    | DB & migrations |
| Tests & CI/CD      | Jest + RTL                             | Cypress + Postman | GitHub Actions  |
| Doc & Présentation | README & Swagger                       | Slides & démo     | Export DB       |

---

**Conseils clés :**

* Adoptez Git Flow (feature branches).
* Faites des revues de code régulières.
* Commencez toujours mobile-first, puis adaptez au desktop.
* Automatisez vos seeders pour remplir 10 catégories × 10 questions.
* Mettez en place un linter (ESLint + Prettier) pour un code propre.
