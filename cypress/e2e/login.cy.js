describe('Fail Login Test', () => {
    it('should not connect with non-existent email', () => {
      cy.loginPage(); 
      cy.get('input[name="email"]').type('new@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Utilisateur non trouvé').should('be.visible');
      cy.url().should('include', '/');
    });
  
    it('should not connect with wrong password', () => {
      cy.loginPage();
      cy.get('input[name="email"]').type('newuser2@example.com');
      cy.get('input[name="password"]').type('passw123');
      cy.get('button[type="submit"]').click();
      cy.contains('Mauvais email ou mot de passe!').should('be.visible');
      cy.url().should('include', '/');
    });
  });
  