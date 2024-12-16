describe('Sign Up Test', () => {
    it('should not sign up with wrong password', () => {
      cy.registerPage(); 
      cy.get('input[name="email"]').type('newuser2ada@example.com');
      cy.get('input[name="password"]').type('passwords123');
      cy.get('input[name="confirmation"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
    });
  
    it('should not sign up with wrong email format', () => {
      cy.registerPage();
      cy.get('input[name="email"]').type('newuser2adaexample.com');
      cy.contains('Format email incorrect').should('be.visible');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmation"]').type('password123');
      cy.get('button[type="submit"]').click();
    });
  
    it('should sign up successfully with valid information', () => {
      cy.registerPage(); 
      cy.get('input[name="email"]').type('newuser2@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmation"]').type('password123');
      cy.get('button[type="submit"]').click();
    });
  });
  