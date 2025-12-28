<div align="center">

# 🎓 School App - Écosystème Multi-Plateforme

### **Application de Gestion Scolaire & E-Commerce Éducatif**

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

<br/>

*Une solution complète combinant **application mobile native** et **application web progressive** avec une architecture partagée et une expérience utilisateur cohérente.*

---

</div>

## 📋 Table des Matières

- [🎯 Aperçu du Projet](#-aperçu-du-projet)
- [🏗️ Architecture Globale](#️-architecture-globale)
- [📱 Application Mobile (React Native)](#-application-mobile-react-native)
- [🌐 Application Web (React JS)](#-application-web-react-js)
- [⚙️ Fonctionnalités Communes](#️-fonctionnalités-communes)
- [🚀 Installation & Démarrage](#-installation--démarrage)
- [📊 Statistiques du Projet](#-statistiques-du-projet)
- [🛡️ Sécurité](#️-sécurité)
- [👨‍💻 Auteur](#-auteur)

---

## 🎯 Aperçu du Projet

Ce monorepo contient deux applications partageant la **même logique métier** et offrant une expérience utilisateur native sur chaque plateforme :

| Plateforme | Technologie | Répertoire | Status |
|:---:|:---:|:---:|:---:|
| 📱 **Mobile** | React Native + Expo | `REACT NATIVE/` | ✅ Production |
| 🌐 **Web** | React + Vite | `React JS/school-app/` | ✅ Production |

---

## 🏗️ Architecture Globale

```mermaid
flowchart TB
    subgraph Client["🖥️ Applications Client"]
        direction LR
        Mobile["📱 React Native<br/><i>iOS & Android</i>"]
        Web["🌐 React JS<br/><i>Navigateur Web</i>"]
    end
    
    subgraph Core["⚡ Logique Partagée"]
        direction TB
        Auth["🔐 Authentification"]
        Catalog["📚 Catalogue Produits"]
        Cart["🛒 Gestion Panier"]
        DB["💾 Base de Données"]
    end
    
    subgraph Navigation["🧭 Navigation"]
        direction LR
        DrawerNav["React Navigation<br/><i>Mobile</i>"]
        RouterNav["React Router<br/><i>Web</i>"]
    end
    
    Mobile --> DrawerNav
    Web --> RouterNav
    DrawerNav --> Core
    RouterNav --> Core
    
    style Mobile fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style Web fill:#646CFF,stroke:#333,stroke-width:2px,color:#fff
    style Auth fill:#10B981,stroke:#333,stroke-width:2px,color:#fff
    style Catalog fill:#F59E0B,stroke:#333,stroke-width:2px,color:#000
    style Cart fill:#EF4444,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#8B5CF6,stroke:#333,stroke-width:2px,color:#fff
```

---

## 📱 Application Mobile (React Native)

### 📂 Structure du Projet

```
REACT NATIVE/MyProject/
├── 📁 MainApp/
│   ├── 📁 Screen/           # Écrans principaux
│   │   ├── Catalogue.jsx    # Liste des produits
│   │   ├── Connexion.jsx    # Authentification
│   │   ├── Inscription.jsx  # Création de compte
│   │   ├── Menu.jsx         # Accueil
│   │   └── Panier.js        # Panier d'achat
│   ├── 📁 Database/         # Gestion SQLite
│   │   ├── initdb.js        # Initialisation
│   │   ├── db.js            # Connexion
│   │   └── Task.js          # Opérations CRUD
│   ├── 📁 Composant/        # Composants réutilisables
│   ├── 📁 Style/            # Feuilles de style
│   ├── 📁 Data/             # Données statiques
│   └── 📁 context/          # Contextes React
├── App.js                   # Point d'entrée
└── package.json
```

### 🛠️ Stack Technique Mobile

```mermaid
graph LR
    subgraph Frontend["📱 Frontend Mobile"]
        RN["React Native 0.81"]
        Expo["Expo 54"]
    end
    
    subgraph Navigation["🧭 Navigation"]
        Stack["Native Stack"]
        Drawer["Drawer Navigator"]
        Tabs["Bottom Tabs"]
    end
    
    subgraph Storage["💾 Stockage"]
        SQLite["Expo SQLite"]
    end
    
    subgraph Animation["✨ Animations"]
        Reanimated["Reanimated 4"]
        Gesture["Gesture Handler"]
    end
    
    Frontend --> Navigation
    Frontend --> Storage
    Frontend --> Animation
    
    style RN fill:#61DAFB,stroke:#333,color:#000
    style Expo fill:#000020,stroke:#fff,color:#fff
    style SQLite fill:#003B57,stroke:#333,color:#fff
    style Reanimated fill:#FF6B6B,stroke:#333,color:#fff
```

### 📦 Dépendances Principales

| Package | Version | Description |
|---------|---------|-------------|
| `expo` | 54.0.23 | Framework de développement |
| `react-native` | 0.81.5 | Core React Native |
| `@react-navigation/native` | 7.1.20 | Navigation principale |
| `@react-navigation/drawer` | 7.7.3 | Menu latéral |
| `@react-navigation/bottom-tabs` | 7.8.5 | Navigation par onglets |
| `expo-sqlite` | 16.0.9 | Base de données locale |
| `react-native-reanimated` | 4.1.1 | Animations fluides |

---

## 🌐 Application Web (React JS)

### 📂 Structure du Projet

```
React JS/school-app/
├── 📁 src/
│   ├── 📁 MainApp/
│   │   ├── AppNavigator.jsx  # Router principal + Sidebar
│   │   ├── 📁 Screen/        # Pages de l'application
│   │   │   ├── Catalogue.jsx
│   │   │   ├── Connexion.jsx
│   │   │   ├── Inscription.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── Panier.jsx
│   │   ├── 📁 Database/      # Gestion des données
│   │   ├── 📁 Composant/     # Composants UI
│   │   ├── 📁 Style/         # CSS personnalisé
│   │   └── 📁 context/       # State management
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

### 🛠️ Stack Technique Web

```mermaid
graph TB
    subgraph Build["⚡ Build & Dev"]
        Vite["Vite 7.1"]
        ESLint["ESLint 9"]
    end
    
    subgraph Core["⚛️ Core"]
        React["React 19.1"]
        ReactDOM["React DOM"]
    end
    
    subgraph Routing["🔀 Routing"]
        Router["React Router 7.9"]
    end
    
    subgraph UI["🎨 Interface"]
        Icons["React Icons"]
        CSS["CSS Modules"]
    end
    
    Build --> Core
    Core --> Routing
    Core --> UI
    
    style Vite fill:#646CFF,stroke:#333,color:#fff
    style React fill:#61DAFB,stroke:#333,color:#000
    style Router fill:#CA4245,stroke:#333,color:#fff
    style Icons fill:#E91E63,stroke:#333,color:#fff
```

### 📦 Dépendances Principales

| Package | Version | Description |
|---------|---------|-------------|
| `react` | 19.1.1 | Bibliothèque UI |
| `react-dom` | 19.1.1 | Rendu DOM |
| `react-router-dom` | 7.9.4 | Routing SPA |
| `react-icons` | 5.5.0 | Icônes vectorielles |
| `vite` | 7.1.7 | Bundler ultra-rapide |
| `eslint` | 9.36.0 | Qualité du code |

---



### 🔐 Système d'Authentification

| Fonctionnalité | Description |
|----------------|-------------|
| **Validation Email** | Format email vérifié (`@` et `.` requis) |
| **Mot de passe fort** | Minimum 12 caractères |
| **Protection Brute-Force** | Blocage après 5 tentatives (30s) |
| **Messages d'erreur** | Retour utilisateur en temps réel |
| **État de chargement** | Indicateur visuel pendant les requêtes |

### 🛒 Gestion du Panier

```mermaid
stateDiagram-v2
    [*] --> Vide: Initialisation
    Vide --> AvecArticles: Ajouter produit
    AvecArticles --> AvecArticles: Modifier quantité
    AvecArticles --> Vide: Supprimer tout
    AvecArticles --> Validation: Valider commande
    Validation --> [*]: Confirmation
    
    state AvecArticles {
        [*] --> Calcul
        Calcul --> AffichageTotal
        AffichageTotal --> [*]
    }
```

---

## 🚀 Installation & Démarrage

### 📱 Application Mobile

```bash
# 1. Accéder au répertoire
cd "REACT NATIVE/MyProject"

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm start

# 4. Options de lancement
npm run android    # Émulateur Android
npm run ios        # Simulateur iOS (macOS uniquement)
npm run web        # Version web via Expo
```

### 🌐 Application Web

```bash
# 1. Accéder au répertoire
cd "React JS/school-app"

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Autres commandes
npm run build      # Build production
npm run preview    # Prévisualiser le build
npm run lint       # Vérifier le code
```

---

## 📊 Statistiques du Projet

```mermaid
pie showData
    title Répartition du Code par Fonctionnalité
    "Écrans/Pages" : 35
    "Navigation" : 20
    "Composants UI" : 15
    "Gestion État" : 12
    "Base de données" : 10
    "Styles" : 8
```

### 📈 Métriques

| Métrique | Mobile | Web |
|----------|:------:|:---:|
| **Écrans** | 5 | 5 |
| **Composants** | 4+ | 4+ |
| **Fichiers DB** | 3 | 3 |
| **Dépendances** | 12 | 10 |
| **Version React** | 19.1 | 19.1 |

---

## 🛡️ Sécurité

<table>
<tr>
<td width="50%">

### ✅ Implémenté

- 🔒 Validation côté client
- 🛡️ Protection brute-force
- 📝 Sanitization des entrées
- 🔐 Mots de passe hashés
- ⏱️ Timeout de session

</td>
<td width="50%">

### 🎯 Bonnes Pratiques

- ⚠️ Validation côté serveur requise
- 🔑 Utiliser HTTPS en production
- 🍪 Tokens JWT recommandés
- 📊 Logging des tentatives
- 🔄 Rotation des clés

</td>
</tr>
</table>

---

## 🗺️ Roadmap

```mermaid
timeline
    title Évolution du Projet
    section Phase 1 ✅
        Déc 2024 : Authentification : Catalogue produits : Panier basique
    section Phase 2 🔄
        Jan 2025 : Paiement intégré : Notifications push : Mode hors-ligne
    section Phase 3 📋
        Fév 2025 : Dashboard admin : Analytics : API Backend
```

---

## 👨‍💻 Auteur

<div align="center">

**Développé avec ❤️ par [iitsh](https://github.com/iitsh)**

[![GitHub](https://img.shields.io/badge/GitHub-iitsh-181717?style=for-the-badge&logo=github)](https://github.com/iitsh)

---

<sub>📅 Dernière mise à jour : Décembre 2024 • 39 commits</sub>

</div>
