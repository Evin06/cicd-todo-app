// e2e/theme.spec.js

describe('Change color theme', () => {
    it('should change to night mode and come back to clear mode', () => {
      cy.login('newuser2@example.com', 'password123'); 
      cy.get('#theme-toggle').click(); 
      cy.get('html').should('have.class', 'dark');
      cy.get('#theme-toggle').click(); 
      cy.get('html').should('not.have.class', 'dark');
    });
  });
  