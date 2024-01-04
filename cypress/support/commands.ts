/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        clickInJogarButton(): Chainable<any>;
        startGameInHomepage(username: string): Chainable<any>;
    }
}

Cypress.Commands.add('clickInJogarButton', () => {
    cy.get('[name="jogar"]').click()
})

Cypress.Commands.add('startGameInHomepage', (
    username: string = 'username'
) => {
    cy.clickInJogarButton()
    cy.get('[name="usernameInput"]').type(username, {delay: 0})
    cy.get('[name="start"]').click()
})