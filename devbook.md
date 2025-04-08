# DevBook - Projet KAIRO

## Table des matières

1. [Introduction](#introduction)
2. [Configuration initiale](#configuration-initiale)
3. [Problèmes rencontrés et solutions](#problèmes-rencontrés-et-solutions)
4. [Décisions architecturales](#décisions-architecturales)
5. [Fonctionnalités implémentées](#fonctionnalités-implémentées)
6. [Tests automatisés](#tests-automatisés)
7. [Dépendances et versions](#dépendances-et-versions)
8. [Documentation officielle](#documentation-officielle)
9. [Index des problèmes](#index-des-problèmes)

## Introduction

Ce DevBook documente l'ensemble du processus de développement du site web KAIRO, une plateforme vitrine pour une agence de développement web et d'optimisation SEO. Ce journal servira de référence pour suivre les décisions, problèmes et solutions rencontrés tout au long du projet.

## Configuration initiale

### Date: 04/04/2023

#### Initialisation du projet

- Création du projet Next.js avec TypeScript, Tailwind CSS et ESLint
- Configuration du dépôt Git distant
- Mise en place de la structure de base du projet
- Intégration de Shadcn/UI

#### Technologies et versions

- Next.js: 14.0.1
- React: 18.2.0
- Node.js: 20.x
- TypeScript: 5.x
- Tailwind CSS: 3.3.0
- Shadcn/UI: dernière version

## Problèmes rencontrés et solutions

### P001: Problème d'initialisation du projet

**Description:** Lors de la tentative d'initialisation du projet avec create-next-app, des conflits sont apparus avec les fichiers existants.

**Solution:** Nous avons dû recréer le répertoire du projet depuis zéro pour éviter les conflits.

### P002: Conflit entre "use client" et métadonnées d'exportation

**Description:** Lors de l'implémentation du formulaire de contact interactif, nous avons dû transformer le composant en client component avec "use client", ce qui crée un conflit avec l'export des métadonnées statiques.

**Solution:** Nous avons extrait les métadonnées dans un fichier séparé `metadata.ts` dans le même dossier que le composant page. Next.js peut importer automatiquement les métadonnées à partir de ce fichier.

### P003: Gestion des erreurs TypeScript dans le formulaire

**Description:** Des erreurs TypeScript sont apparues lors de l'implémentation du formulaire, notamment concernant les événements et les types d'objets d'erreur.

**Solution:** Nous avons créé des interfaces TypeScript spécifiques pour le formulaire :

- `FormData` pour les données du formulaire
- `FormErrors` pour les erreurs de validation
  De plus, nous avons typé correctement les gestionnaires d'événements avec `ChangeEvent<HTMLInputElement | HTMLTextAreaElement>` et `FormEvent<HTMLFormElement>`.

### P004: Problèmes avec les tests d'accessibilité au clavier

**Description:** Lors de l'exécution des tests d'accessibilité au clavier, nous avons rencontré des problèmes avec la navigation par tabulation et la vérification de la navigation vers une autre page.

**Solution:** Nous avons modifié le test pour vérifier la visibilité du focus et nous avons ajusté le nombre de pressions de touche Tab en fonction de la structure réelle de la page.

## Décisions architecturales

### Structure du projet

Nous suivons la structure standard de Next.js avec App Router:

```
/
├── src/
│   ├── app/                # App Router (Next.js 14+)
│   │   ├── (routes)/       # Regroupement de routes
│   │   ├── api/            # API Routes
│   │   │   └── contact/    # API pour le formulaire de contact
│   │   └── layout.tsx      # Layout racine
│   ├── components/         # Composants réutilisables
│   │   ├── ui/             # Composants UI (Shadcn)
│   │   └── [fonctionnalité]/ # Composants par fonctionnalité
│   ├── lib/                # Fonctions utilitaires et configurations
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Fonctions utilitaires génériques
├── public/                 # Assets statiques
└── ...
```

## Fonctionnalités implémentées

### Date: 04/04/2023

#### Formulaire de contact fonctionnel

**Description:**
Implémentation d'un formulaire de contact complet avec validation et traitement des soumissions :

1. **Interface utilisateur** :

   - Champs requis et optionnels clairement indiqués
   - Validation côté client en temps réel
   - Affichage des erreurs sous chaque champ
   - État de chargement pendant la soumission
   - Notifications de succès/erreur

2. **Validation** :

   - Validation côté client pour une meilleure expérience utilisateur

   - Double validation côté serveur pour la sécurité
   - Vérification des champs obligatoires
   - Validation du format d'email

3. **API Route** :

   - Endpoint `/api/contact` pour traiter les soumissions
   - Validation des données entrantes
   - Structure prête pour l'intégration de services d'envoi d'emails
   - Gestion d'erreurs robuste

4. **Sécurité** :
   - Prévention contre les soumissions multiples
   - Validation du consentement RGPD
   - Protection contre les attaques par injection via validation

**Décisions techniques:**

- Utilisation d'un composant client pour la gestion d'état
- Séparation des métadonnées dans un fichier distinct pour compatibilité
- Simulation du temps de traitement pour tester l'état de chargement

**Points d'amélioration future:**

- Intégration d'un service d'envoi d'emails réel (SendGrid, Mailgun, etc.)
- Mise en place de reCAPTCHA pour prévenir les spams
- Stockage des soumissions dans une base de données

## Tests automatisés

### Date: 08/04/2023

#### Mise en place de Playwright pour les tests end-to-end

**Description:**
Implémentation d'une suite de tests automatisés avec Playwright pour valider les fonctionnalités principales du site :

1. **Configuration** :

   - Installation de Playwright : `@playwright/test`
   - Configuration des navigateurs : Chromium, Firefox, WebKit
   - Adaptation pour les tests sur appareils mobiles (Pixel 5, iPhone 12)
   - Configuration du serveur de développement pour les tests

2. **Tests de la page d'accueil** :

   - Vérification du titre et de la méta description
   - Validation de l'affichage des éléments principaux
   - Test des liens de navigation
   - Vérification de la responsive sur mobile

3. **Tests du formulaire de contact** :

   - Validation de l'affichage du formulaire
   - Test des messages d'erreur pour champs vides
   - Validation du format d'email
   - Test de soumission réussie avec mock de l'API
   - Gestion des erreurs serveur

4. **Tests du système de réservation** :

   - Vérification de la page de réservation
   - Test des types de consultation disponibles
   - Validation de la sélection de date et créneau
   - Test de soumission du formulaire
   - Gestion des erreurs

5. **Tests d'accessibilité et SEO** :
   - Vérification des balises méta SEO
   - Validation de la structure des headings
   - Test des attributs alt des images
   - Navigation au clavier
   - Accessibilité des formulaires
   - Contraste des couleurs

**Commandes de test ajoutées au package.json** :

```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "test:report": "playwright show-report"
}
```

**Points d'amélioration future** :

- Augmenter la couverture de test pour les fonctionnalités avancées
- Intégrer les tests dans un pipeline CI/CD
- Ajouter des tests de performance plus approfondis
- Mettre en place des tests de régression visuelle

## Dépendances et versions

```json
{
  "dependencies": {
    "next": "14.0.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "sonner": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@playwright/test": "^1.34.3",
    "typescript": "^5",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.0.1"
  }
}
```

## Documentation officielle

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Node.js](https://nodejs.org/en/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Playwright](https://playwright.dev/docs/intro)

## Index des problèmes

- [P001: Problème d'initialisation du projet](#p001-problème-dinitialisation-du-projet)
- [P002: Conflit entre "use client" et métadonnées d'exportation](#p002-conflit-entre-use-client-et-métadonnées-dexportation)
- [P003: Gestion des erreurs TypeScript dans le formulaire](#p003-gestion-des-erreurs-typescript-dans-le-formulaire)
- [P004: Problèmes avec les tests d'accessibilité au clavier](#p004-problèmes-avec-les-tests-daccessibilité-au-clavier)

---

_Ce DevBook sera mis à jour régulièrement tout au long du développement du projet._
