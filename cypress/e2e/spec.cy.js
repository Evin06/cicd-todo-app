describe('Sign Up Test', () => {
  it('should sign up successfully with valid information', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmation"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')  // Vérifier la redirection vers la page de login après l'inscription
  })
})

describe('Todo Add Test', () => {
  it('should add new task after login', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('newuser2@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    // Vérifier que l'utilisateur est redirigé vers la page d'accueil
    cy.url().should('include', '/')

    // Ajouter une tâche
    cy.get('input[name="text"]').type('add task')  // Saisir le texte de la tâche
    cy.get('button[type="submit"]').click()  // Soumettre la tâche

    // Vérifier que la tâche est bien visible sur la page
    cy.contains('add task').should('be.visible')
  })
})
