/// <reference types="cypress" />

describe('Game integration tests', () => {
    beforeEach(() => {
        cy.visit('')
        cy.startGameInHomepage('username')
    })
    it('', () => {
        cy.get('#hint')
    });
})