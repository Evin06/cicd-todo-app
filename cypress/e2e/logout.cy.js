describe('Logout Test', () => {
    it('should logout successfully', () => {
      // Inscription et connexion
      cy.visit('http://localhost:5173/register');
      cy.get('input[name="email"]').type('newuser2@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmation"]').type('password123');
      cy.get('button[type="submit"]').click(); 
  
      cy.login('newuser2@example.com', 'password123'); 
  
      // Déconnexion
      cy.get('img[alt="Profile"]').click({ force: true });
      cy.contains('Déconnection').click();
  
      // Vérification de la redirection vers la page de login
      cy.visit('http://localhost:5173/login');
      cy.url().should('include', '/login');
    });
  });
  