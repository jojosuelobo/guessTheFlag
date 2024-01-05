/// <reference types="cypress" />

describe('Game integration tests', () => {
    beforeEach(() => {
        cy.visit('')
        cy.startGameInHomepage('username')
        cy.intercept({
            method: 'GET',
            url: '**/gameAwnser',
        }).as('AnswerFetch');
    })

    it('gets a flag', () => {
        cy.intercept('GET', '**flagcdn.com/**', {
            statusCode: 200,
        })
    });

    it('get a point after type answer', () => {
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="inputCountry"]').type(`${answer}`, { delay: 0 })
            });
        });
        cy.contains('Pontuação: 1').should('be.visible')
    })

    it('opens four hints after click HINT button', () => {
        cy.get('[name="hint"]').click()
        cy.get('.formsHint').should('exist').and('be.visible')
        cy.get('[name="inputCountry"]').should('be.disabled')
    });

    it.only('get a point after guess the answer by hint', () => {
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()

            });
        });
        //cy.contains('Pontuação: 1').should('be.visible')
    });
})