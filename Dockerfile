# Étape 1: Utiliser une image Node pour builder le frontend
FROM node:18 as build

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Utiliser une image alpine légère pour garder uniquement les fichiers dist
FROM alpine:3.16

# Copier les fichiers dist du premier conteneur
COPY --from=build /app/dist /dist

# Le répertoire /dist est maintenant prêt pour être partagé avec le backend
