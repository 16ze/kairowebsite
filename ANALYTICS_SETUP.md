# Guide de configuration des outils d'analyse pour KAIRO Digital

Ce guide explique comment configurer Google Analytics 4 (GA4) et Google Search Console pour le site KAIRO Digital.

## Table des matières

1. [Configuration de Google Analytics 4](#configuration-de-google-analytics-4)
2. [Configuration de Google Search Console](#configuration-de-google-search-console)
3. [Intégration de GA4 avec la Search Console](#intégration-de-ga4-avec-la-search-console)
4. [Suivi des événements personnalisés](#suivi-des-événements-personnalisés)
5. [Rapports et tableaux de bord](#rapports-et-tableaux-de-bord)

## Configuration de Google Analytics 4

### Étape 1 : Créer un compte Google Analytics

1. Rendez-vous sur [Google Analytics](https://analytics.google.com/)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Admin" dans le menu de gauche
4. Cliquez sur "Créer un compte"
5. Remplissez les informations du compte :
   - Nom du compte : KAIRO Digital
   - Paramètres de partage des données (selon vos préférences)
   - Cliquez sur "Suivant"

### Étape 2 : Configurer une propriété

1. Nom de la propriété : Site KAIRO Digital
2. Fuseau horaire : France
3. Devise : EUR
4. Cliquez sur "Suivant"
5. Remplissez les informations sur votre entreprise
6. Cliquez sur "Créer"

### Étape 3 : Configurer un flux de données

1. Dans la section "Flux de données", sélectionnez "Web"
2. URL du site : https://www.kairo-digital.fr
3. Nom du flux : Site web KAIRO Digital
4. Cliquez sur "Créer un flux"

### Étape 4 : Récupérer l'ID de mesure

1. Après avoir créé le flux, vous verrez un ID de mesure au format "G-XXXXXXXXXX"
2. Notez cet ID, vous en aurez besoin pour configurer l'intégration

### Étape 5 : Mettre à jour le code d'analyse

1. Ouvrez le fichier `src/lib/analytics.tsx`
2. Remplacez la constante `GA_MEASUREMENT_ID` par votre ID de mesure :
   ```typescript
   const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Remplacer par votre ID
   ```

## Configuration de Google Search Console

### Étape 1 : Accéder à Google Search Console

1. Rendez-vous sur [Google Search Console](https://search.google.com/search-console)
2. Connectez-vous avec le même compte Google que pour Analytics

### Étape 2 : Ajouter une propriété

1. Sélectionnez "Préfixe d'URL" comme type de propriété
2. Entrez l'URL de votre site : https://www.kairo-digital.fr/
3. Cliquez sur "Continuer"

### Étape 3 : Vérifier la propriété

Vous avez plusieurs méthodes pour vérifier que vous êtes propriétaire du domaine :

#### Option 1 : Fichier HTML (recommandée)

1. Téléchargez le fichier HTML fourni par Google
2. Placez ce fichier dans le dossier `public` de votre projet Next.js
3. Déployez le site
4. Retournez à la Search Console et cliquez sur "Vérifier"

#### Option 2 : Balise meta HTML

1. Copiez la balise meta fournie par Google
2. Ouvrez le fichier `src/app/layout.tsx`
3. Ajoutez cette balise dans la section `<head>` :
   ```jsx
   <meta name="google-site-verification" content="VOTRE_CODE_DE_VERIFICATION" />
   ```
4. Mettez à jour la propriété de vérification dans les métadonnées :
   ```typescript
   verification: {
     google: "VOTRE_CODE_DE_VERIFICATION",
   },
   ```
5. Déployez le site
6. Retournez à la Search Console et cliquez sur "Vérifier"

### Étape 4 : Soumettre le sitemap

1. Une fois la propriété vérifiée, allez dans le menu "Sitemaps" dans la barre latérale
2. Entrez l'URL de votre sitemap : sitemap.xml
3. Cliquez sur "Soumettre"

## Intégration de GA4 avec la Search Console

### Étape 1 : Lier les comptes

1. Dans Google Analytics, allez dans "Admin"
2. Dans la colonne "Propriété", cliquez sur "Liens avec les produits"
3. Sélectionnez "Search Console"
4. Cliquez sur "Lier"
5. Sélectionnez votre propriété Search Console
6. Cliquez sur "Continuer", puis "Lier"

## Suivi des événements personnalisés

Pour suivre des événements spécifiques sur votre site (clics sur des boutons, soumissions de formulaires, etc.), vous pouvez utiliser la fonction `event` exportée par le fichier `analytics.tsx` :

```typescript
import { event } from "@/lib/analytics";

// Exemple d'utilisation
function handleContactSubmit() {
  // Logique de soumission du formulaire...

  // Envoyer l'événement à GA4
  event({
    action: "contact_form_submit",
    category: "engagement",
    label: "Formulaire de contact",
  });
}
```

### Événements recommandés à suivre

- Soumissions de formulaires de contact
- Clics sur les CTA principaux
- Téléchargements de documents (s'il y en a)
- Navigation entre les sections principales

## Rapports et tableaux de bord

### Créer un tableau de bord personnalisé dans GA4

1. Dans Google Analytics, allez à "Rapports"
2. Cliquez sur "Tableaux de bord" dans le menu de gauche
3. Cliquez sur "Créer un tableau de bord"
4. Sélectionnez "Tableau de bord vierge"
5. Ajoutez des widgets pour suivre :
   - Utilisateurs actifs
   - Nouveaux utilisateurs
   - Sessions par source/support
   - Pages les plus consultées
   - Taux de conversion des objectifs
   - Événements principaux

### Configurer des rapports automatiques

1. Dans Google Analytics, allez à "Admin"
2. Dans la colonne "Affichage", cliquez sur "Rapports programmés"
3. Cliquez sur "Planifier un rapport"
4. Configurez :
   - Nom : Rapport mensuel KAIRO Digital
   - Planning : Mensuel
   - Jour : 1
   - Type : Email
   - Destinataires : Ajoutez les adresses email pertinentes
5. Cliquez sur "Planifier"

---

**Important** : Une fois que vous avez configuré Google Analytics, attendez 24 à 48 heures pour commencer à voir des données dans vos rapports.

Pour toute question ou assistance supplémentaire, consultez les ressources officielles :

- [Documentation Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Centre d'aide Search Console](https://support.google.com/webmasters)
