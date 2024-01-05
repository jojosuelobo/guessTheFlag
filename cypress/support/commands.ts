/// <reference types="cypress" />

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

declare namespace Cypress {
    interface Chainable<Subject = any> {
        clickInJogarButton(): Chainable<any>;
        startGameInHomepage(username: string): Chainable<any>;
        guessTheFirstFlagCorrectly(): Chainable<any>;
        guessTheFlagCorrectly(): Chainable<any>;
    }
}

Cypress.Commands.add('clickInJogarButton', () => {
    cy.get('[name="jogar"]').click()
})

Cypress.Commands.add('startGameInHomepage', (
    username: string = 'username'
) => {
    cy.clickInJogarButton()
    cy.get('[name="usernameInput"]').type(username, { delay: 0 })
    cy.get('[name="start"]').click()
})

Cypress.Commands.add('guessTheFlagCorrectly', () => {
    cy.intercept({
        method: 'GET',
        url: '**/gameAwnser',
    }).as('AnswerFetch');

    cy.wait('@AnswerFetch').then((interception) => {
        const answer = interception.request.headers.answer
        cy.get('[name="inputCountry"]').should('be.visible').clear().type(`${answer}`, { delay: 0 })
    });
})
