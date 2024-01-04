/// <reference types="cypress" />

describe('Homepage integration tests', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('renders the logo image', () => {
        cy.get('.logo').should('exist').and('be.visible')
    });

    context('Buttons on Homepage', () => {
        it('opens username input after JOGAR', () => {
            //cy.get('[name="jogar"]').click()
            cy.clickInJogarButton()
            cy.get('[name="usernameInput"]').should('exist').and('be.visible')
            cy.get('[name="start"]').should('be.disabled')
        });

        it('go back to homepage after VOLTAR', () => {
            cy.clickInJogarButton()
            cy.get('[name="back"]').click()
            cy.get('[name="usernameInput"]').should('not.exist')
            cy.get('.logo').should('exist').and('be.visible')
        });

        it('validate the username input', () => {
            cy.clickInJogarButton()
            cy.get('[name="usernameInput"]').type('username', { delay: 0 })
            cy.get('[name="start"]').should('not.be.disabled')
        });

        it('goes to ranking page', () => {
            cy.get('[name="ranking"]').click()
            cy.url().should('include', '/ranking')
        });

        it('goes to game page', () => {
            cy.startGameInHomepage('username')
            cy.url().should('include', '/play')
        });
    })
})