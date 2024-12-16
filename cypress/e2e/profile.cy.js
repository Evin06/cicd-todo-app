describe('Gestion profiles Test', () => {
    it('should modify the profile and delete the account', () => {
      cy.login('newuser2@example.com', 'password123'); 
  
      cy.profilePage(); 
  
      // Modifier les informations du profil
      cy.get('input[name="name"]').clear().type('User');
      cy.get('input[name="address"]').clear().type('123');
      cy.get('input[name="zip"]').clear().type('123');
      cy.get('input[name="location"]').clear().type('Location');
      cy.get('button[type="submit"]').click(); 
  
      // Supprimer le compte
      cy.contains('Supprimer votre compte').click();
      cy.visit('http://localhost:5173/register'); 
    });
  });
  