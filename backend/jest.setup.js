const mongoose = require('mongoose');
require('dotenv').config();  // Charge le fichier .env

// Connexion à une base de données temporaire (utilisée uniquement pour les tests)
beforeAll(async () => {
    const url = process.env.DB_URL; // Base de données pour les tests
    await mongoose.connect(url);
});

// Déconnexion de la base de données après tous les tests
afterAll(async () => {
    await mongoose.disconnect();
});