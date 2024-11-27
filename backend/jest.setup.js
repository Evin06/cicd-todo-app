const mongoose = require('mongoose');
require('dotenv').config();  // Charge le fichier .env
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = undefined;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// Déconnexion de la base de données après tous les tests
afterAll(async () => {
    await mongoose.disconnect();
});