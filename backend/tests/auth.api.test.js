const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');
const app = express();
const router = require('../routes/index');  // Remplacez par le chemin de votre fichier router

// Utiliser votre routeur
app.use(express.json());
app.use(router);

// Nettoyage de la base de données après chaque test
afterEach(async () => {
  await UserModel.deleteMany();
});

// Test de la connexion avec des identifiants valides
describe('POST /api/auth', () => {
  it('devrait se connecter avec des identifiants valides', async () => {
    // Créer un utilisateur de test
    const password = 'TestPassword123';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({
      email: 'test@example.com',
      password: hashedPassword,
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth')
      .send({
        email: 'test@example.com',
        password: password,
      });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('test@example.com');
    expect(response.body).toBeDefined(); // L'ID de l'utilisateur doit être retourné
    expect(response.header['set-cookie']).toBeDefined(); // Le cookie doit être présent
  });

  // Test de la connexion avec des identifiants invalides
  it('devrait échouer avec des identifiants incorrects', async () => {
    const response = await request(app)
      .post('/api/auth')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toBe('Utilisateur non trouvé');
  });

  // Test du mot de passe incorrect
  it('devrait échouer avec un mot de passe incorrect', async () => {
    // Créer un utilisateur de test
    const password = 'TestPassword123';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({
      email: 'test@example.com',
      password: hashedPassword,
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword', // Mot de passe incorrect
      });

    expect(response.status).toBe(400);
    expect(response.body).toBe('Mauvais email ou mot de passe!');
  });
});
