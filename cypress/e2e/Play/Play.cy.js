/// <reference types="cypress" />

describe('Game integration tests', () => {
    let answer
    beforeEach(() => {
        cy.visit('')
        cy.startGameInHomepage('username')
        cy.intercept({
            method: 'GET',
            url: '**/gameAwnser',
        }).as('AnswerFetch');
    })

    it('TESTE', () => {
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.log(answer)
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.log(answer)
                cy.get('[name="inputCountry"]').type(`TESTE ${answer}`)
            });
        });

        //cy.get('[name="inputCountry"]').type(answer)



    });


})