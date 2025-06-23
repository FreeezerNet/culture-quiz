# Quiz Full Stack Application

Une application de quiz complète avec authentification, gestion des catégories et historique des scores.

## 🚀 Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Base de données
- **Sequelize** - ORM pour MySQL
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe
- **Swagger** - Documentation API

### Frontend
- **React** - Framework JavaScript
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS
- **Axios** - Client HTTP
- **React Router** - Navigation
- **Heroicons** - Icônes

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** (généralement installé avec Node.js)
- **MySQL** (version 8.0 ou supérieure)

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <URL_DU_REPO>
cd quiz_full_stack_Adenan_Remi\ 23:06:2025
```

### 2. Configuration de la base de données

1. Créer une base de données MySQL :
```sql
CREATE DATABASE quiz_app;
```

2. Configurer les paramètres de connexion dans `server/config/db.config.js` :
```javascript
module.exports = {
  HOST: "localhost",
  USER: "votre_utilisateur",
  PASSWORD: "votre_mot_de_passe",
  DB: "quiz_app",
  dialect: "mysql"
};
```

### 3. Installation des dépendances

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 4. Installation globale de Vite (nécessaire pour npx vite)

```bash
sudo npm install -g vite
```

### 5. Initialisation de la base de données

```bash
cd server
npm run init-db
```

## 🚀 Lancement de l'application

### Option 1 : Lancement séparé (recommandé pour le développement)

#### Terminal 1 - Backend
```bash
cd server
npm start
```
Le serveur backend sera accessible sur `http://localhost:3000`

#### Terminal 2 - Frontend
```bash
cd client
npx vite
```
Le frontend sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
quiz_full_stack_Adenan_Remi 23:06:2025/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/         # Pages de l'application
│   │   ├── context/       # Contextes React
│   │   ├── api/           # Configuration Axios
│   │   └── assets/        # Ressources statiques
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Node.js
│   ├── config/            # Configuration (DB, Auth)
│   ├── controllers/       # Contrôleurs API
│   ├── middleware/        # Middlewares Express
│   ├── models/            # Modèles Sequelize
│   ├── routes/            # Routes API
│   ├── scripts/           # Scripts d'initialisation
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔧 Scripts disponibles

### Backend (`server/package.json`)
- `npm start` - Lance le serveur en production
- `npm run dev` - Lance le serveur avec nodemon (rechargement automatique)
- `npm run init-db` - Initialise la base de données avec les données de test

### Frontend (`client/package.json`)
- `npm run dev` - Lance le serveur de développement Vite (peut ne pas fonctionner selon la configuration)
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Lance ESLint

**Note :** Pour le frontend, utilisez `npx vite` au lieu de `npm run dev` si ce dernier ne fonctionne pas.

## 🔐 Fonctionnalités

- **Authentification** : Inscription, connexion, déconnexion
- **Gestion des profils** : Modification des informations utilisateur
- **Catégories de quiz** : Différentes thématiques disponibles
- **Quiz interactifs** : Questions à choix multiples
- **Historique des scores** : Suivi des performances
- **Interface responsive** : Compatible mobile et desktop

## 📚 API Documentation

Une fois le serveur lancé, la documentation Swagger est disponible sur :
`http://localhost:3000/api-docs`

## 🐛 Résolution des problèmes

### Problème avec Vite
Si `npx vite` ne fonctionne pas :
```bash
sudo npm install -g vite
```

### Problème avec nodemon
Si `npm run dev` (backend) ne fonctionne pas :
```bash
cd server
npm install nodemon --save-dev
```

### Problème de permissions MySQL
Vérifiez que votre utilisateur MySQL a les droits sur la base de données :
```sql
GRANT ALL PRIVILEGES ON quiz_app.* TO 'votre_utilisateur'@'localhost';
FLUSH PRIVILEGES;
```

### Problème de port déjà utilisé
Si le port 3000 ou 5173 est déjà utilisé, modifiez la configuration dans :
- Backend : `server/server.js`
- Frontend : `client/vite.config.js`

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Adenan** - *Développement*
- **Remi** - *Développement*
