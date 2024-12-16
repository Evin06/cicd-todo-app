//Login pour tout les tests
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/')
});

// Créer un compte
describe('Sign Up Test', () => {
  it('should not sign up wrong password ', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2ada@example.com')
    cy.get('input[name="password"]').type('passwords123')
    cy.get('input[name="confirmation"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.contains('Les mots de passe ne correspondent pas').should('be.visible')
  })
  it('should not sign up wrong mail ', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2adaexample.com')
    cy.contains('Format email incorrect').should('be.visible')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmation"]').type('password123')
    cy.get('button[type="submit"]').click()
  })
  it('should not sign up short password ', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2adaexample.com')
    cy.get('input[name="password"]').type('passw')
    cy.contains('Le mot de passe doit faire au moins 8 caractères').should('be.visible')
    cy.get('input[name="confirmation"]').type('passw')
    cy.contains('Le mot de passe doit faire au moins 8 caractères').should('be.visible')
    cy.get('button[type="submit"]').click()
  })
  it('should sign up successfully with valid information', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmation"]').type('password123')
    cy.get('button[type="submit"]').click()
  })
})

describe('fail login test', () => {
  it('should not connect with non-existent mail ', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('new@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.contains('Utilisateur non trouvé').should('be.visible')
    cy.url().should('include', '/')
  })
  it('should not connect with wrong password ', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('newuser2@example.com')
    cy.get('input[name="password"]').type('passw123')
    cy.get('button[type="submit"]').click()
    cy.contains('Mauvais email ou mot de passe!').should('be.visible')
    cy.url().should('include', '/')
  })
})


//Gestion des tasks
describe('Gestion Todo Test', () => {
  it('Cant add task bcs no name', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.login('newuser2@example.com', 'password123')

    cy.get('button[type="submit"]').click()  
    cy.contains('Vous devez renseigner ce champ').should('be.visible')

  })
 
  it('should add new task after login', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.login('newuser2@example.com', 'password123')


    // Ajouter une tâche
    cy.get('input[name="text"]').type('add task')  
    cy.get('button[type="submit"]').click()  
    cy.contains('add task').should('be.visible')

    cy.get('input[type="checkbox"]').first().check() 
    cy.get('input[type="checkbox"]').first().should('be.checked')

    cy.get('input[type="checkbox"]:checked')  
    .parents('li')                         
    .find('svg')                       
    .click()                                                

  })
})

//Changer de mode de couleur 
describe('change coulor theme', () => {
  it('should change to night mode and come back to clear mode', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.login('newuser2@example.com', 'password123')        
    
    cy.get('#theme-toggle').click()
    cy.get('html').should('have.class', 'dark')
    cy.get('#theme-toggle').click()
    cy.get('html').should('not.have.class', 'dark')
  })
})

//Modification du profile
describe('Gestion profiles Test', () => {
  it('should add new task after login and go to profile page', () => {
    // Se connecter avant d'ajouter une tâche
    cy.visit('http://localhost:5173/login')
    cy.login('newuser2@example.com', 'password123')        

    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click()

    // Modifier le profil
    cy.get('input[name="name"]').clear().type('User ') /
    cy.get('input[name="address"]').clear().type('123') 
    cy.get('input[name="zip"]').clear().type('123') 
    cy.get('input[name="location"]').clear().type(' Location') 
    cy.get('button[type="submit"]').click()
    cy.contains('Supprimer votre compte').click()
    cy.visit('http://localhost:5173/register')
  })
  
})

describe('logout Test', () => {
  it('should logout successfully ', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]').type('newuser2@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmation"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    cy.login('newuser2@example.com', 'password123')        


    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Déconnection').click()

    cy.visit('http://localhost:5173/login')
    cy.url().should('include', '/login')

  })
})


