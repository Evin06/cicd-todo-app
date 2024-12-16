describe('Gestion Todo Test', () => {
    it('Cannot add task because no name is provided', () => {
      cy.login('newuser2@example.com', 'password123'); 
      cy.get('button[type="submit"]').click();
      cy.contains('Vous devez renseigner ce champ').should('be.visible');
    });
  
    it('should add new task after login', () => {
      cy.login('newuser2@example.com', 'password123'); 
      cy.get('input[name="text"]').type('add task');
      cy.get('button[type="submit"]').click();
      cy.contains('add task').should('be.visible');
  
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').first().should('be.checked');
  
      cy.get('input[type="checkbox"]:checked')
        .parents('li')
        .find('svg')
        .click();
    });
  });
  