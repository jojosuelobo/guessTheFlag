declare namespace Cypress {
    interface Chainable<Subject = any> {
        api_getAllUsers(): Chainable<any>;
        api_deletePlayers(): Chainable<any>;
    }
}


Cypress.Commands.add('api_getAllUsers', () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3000/ranking',
    })
})

Cypress.Commands.add('api_deletePlayers', () => {
    cy.api_getAllUsers().then(res => {
      const players = Array.isArray(res.body) ? res.body : [res.body];
  
      players.forEach(player => {
        if (player.id !== '1') {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/ranking/${player.id}`,
          });
        }
      });
    });
  });
  