/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('End integration tests', () => {
    beforeEach(() => {
        cy.visit('')
        cy.intercept({
            method: 'GET',
            url: '**/gameAwnser',
        }).as('AnswerFetch');
        cy.intercept({
            method: 'POST',
            url: '**/ranking',
        }).as('rankingFetch');
        cy.api_deletePlayers()
    })

    after(() => {
        cy.api_deletePlayers()
    });

    const guessTheFlagIncorrectly = () => {
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.get('[name="hint"]').click()
            cy.get('.formsHint button').then((buttons) => {
                const correctButton = buttons.filter(`:contains("${answer}")`);
                const incorrectButton = buttons.not(correctButton);
                cy.wrap(incorrectButton).first().click()
            });
        });
    }

    it('takes player to homepage after click MENU PRINCIPAL', () => {
        cy.startGameInHomepage('cypress')

        cy.get('[name="heart"]').should('have.length', 3)
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.get('.formsHint button').then((buttons) => {
                    const correctButton = buttons.filter(`:contains("${answer}")`);
                    const incorrectButton = buttons.not(correctButton);
                    cy.wrap(incorrectButton).first().click()
                });
            });
        });
        guessTheFlagIncorrectly()
        guessTheFlagIncorrectly()
        cy.contains('Menu Principal').click()
        cy.get('.logo').should('exist').and('be.visible')
    });
    Cypress._.times(50, () => {

        it.only('takes player back to game after click JOGAR NOVAMENTE', () => {
            cy.startGameInHomepage('cypress')

            cy.get('[name="heart"]').should('have.length', 3)
            let answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.wait('@AnswerFetch').then((interception) => {
                    answer = interception.request.headers.answer
                    cy.get('[name="hint"]').click()
                    cy.get('.formsHint button').then((buttons) => {
                        const correctButton = buttons.filter(`:contains("${answer}")`);
                        const incorrectButton = buttons.not(correctButton);
                        cy.wrap(incorrectButton).first().click().should('have.css', 'background-color', 'rgb(255, 0, 0)')
                    });
                });
            });
            guessTheFlagIncorrectly()
            guessTheFlagIncorrectly()
            cy.contains('Jogar Novamente').click()
            cy.contains('Pontuação: 0').should('be.visible')
        });
    })
    it('gets tha username correctly', () => {
        const username = faker.internet.userName()
        cy.startGameInHomepage(username)

        cy.get('[name="heart"]').should('have.length', 3)
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.get('.formsHint button').then((buttons) => {
                    const correctButton = buttons.filter(`:contains("${answer}")`);
                    const incorrectButton = buttons.not(correctButton);
                    cy.wrap(incorrectButton).first().click()
                });
            });
        });
        guessTheFlagIncorrectly()
        guessTheFlagIncorrectly()
        cy.contains(username).should('exist').and('be.visible')
    });
    it('sends score to ranking', () => {
        const username = faker.internet.userName()
        cy.startGameInHomepage(username)

        cy.get('[name="heart"]').should('have.length', 3)
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.get('.formsHint button').then((buttons) => {
                    const correctButton = buttons.filter(`:contains("${answer}")`);
                    const incorrectButton = buttons.not(correctButton);
                    cy.wrap(incorrectButton).first().click()
                });
            });
        });
        guessTheFlagIncorrectly()
        guessTheFlagIncorrectly()
        cy.wait('@rankingFetch')
        cy.visit('/ranking')
        cy.contains(username).should('exist').and('be.visible')
    });
})