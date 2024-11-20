const mongoose = require('mongoose');

// Connexion à une base de données temporaire (utilisée uniquement pour les tests)
beforeAll(async () => {
    const url = 'mongodb://localhost:27017/test_db'; // Base de données pour les tests
    await mongoose.connect(url);
});

// Déconnexion de la base de données après tous les tests
afterAll(async () => {
    await mongoose.disconnect();
});