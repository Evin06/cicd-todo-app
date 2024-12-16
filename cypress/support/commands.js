// Commande pour se connecter
Cypress.Commands.add('loginPage', () => {
    cy.visit('http://localhost:5173/login'); 
  });
  
  Cypress.Commands.add('registerPage', () => {
    cy.visit('http://localhost:5173/register'); 
  });
  
  Cypress.Commands.add('profilePage', () => {
    cy.get('img[alt="Profile"]').click({ force: true });
    cy.contains('Mon Profile').click();
  });
  
  Cypress.Commands.add('login', (email, password) => {
    cy.loginPage(); 
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });
  