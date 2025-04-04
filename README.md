This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Configuration des emails

Pour que le formulaire de contact fonctionne correctement, vous devez configurer les variables d'environnement d'email.

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Configuration du serveur SMTP
EMAIL_SERVER_HOST=smtp.votreserveur.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=votre-email@exemple.com
EMAIL_SERVER_PASSWORD=votre_mot_de_passe
EMAIL_SERVER_SECURE=false  # true pour le port 465, false pour les autres ports

# Adresses email
EMAIL_FROM=contact@votredomaine.com     # Adresse qui apparaîtra comme expéditeur
EMAIL_RECIPIENT=vous@votredomaine.com   # Adresse qui recevra les messages
```

### Options de service SMTP

Vous pouvez utiliser différents services SMTP :

1. **Gmail** : Nécessite un "mot de passe d'application" si l'authentification à deux facteurs est activée

   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   ```

2. **Outlook/Office365** :

   ```
   EMAIL_SERVER_HOST=smtp.office365.com
   EMAIL_SERVER_PORT=587
   ```

3. **Services tiers** comme SendGrid, Mailgun, etc. qui fournissent leurs propres informations SMTP.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
