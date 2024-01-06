/// <reference types="cypress" />

describe('Game integration tests', () => {
    beforeEach(() => {
        cy.visit('')
        cy.startGameInHomepage('cypress')
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
    it('get a point after guess the answer by hint', () => {
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.contains(`${answer}`).should('exist').click()
            });
        });
        cy.contains('Pontuação: 1').should('be.visible')
    });
    it('give the correct answer after guessing by hint', () => {
        let answer
        cy.wait('@AnswerFetch').then((interception) => {
            answer = interception.request.headers.answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()

                cy.contains(`${answer}`).click()
                cy.get('.formsHint button').contains(`${answer}`).should('have.css', 'background-color', 'rgb(0, 128, 0)')
            });
        });
    })

    it('give the INCORRECT answer after guessing by hint', () => {
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
    })

    it('loses a heart after guess the incorrect flag', () => {
        const guessTheFlagIncorrectly = () => {
            let answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.get('.formsHint button').then((buttons) => {
                    const correctButton = buttons.filter(`:contains("${answer}")`);
                    const incorrectButton = buttons.not(correctButton);
                    cy.wrap(incorrectButton).first().click().should('have.css', 'background-color', 'rgb(255, 0, 0)')
                });
            });
        }

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

        cy.get('[name="heart"]').should('have.length', 2)
        cy.get('[name="heartless"]').should('have.length', 1)

        guessTheFlagIncorrectly()
        cy.get('[name="heart"]').should('have.length', 1)
        cy.get('[name="heartless"]').should('have.length', 2)
    });

    it.only('loses the game after guess wrong for 3 times', () => {
        const guessTheFlagIncorrectly = () => {
            let answer
            cy.wait('@AnswerFetch').then((interception) => {
                answer = interception.request.headers.answer
                cy.get('[name="hint"]').click()
                cy.get('.formsHint button').then((buttons) => {
                    const correctButton = buttons.filter(`:contains("${answer}")`);
                    const incorrectButton = buttons.not(correctButton);
                    cy.wrap(incorrectButton).first().click().should('have.css', 'background-color', 'rgb(255, 0, 0)')
                });
            });
        }

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
        cy.url().should('include', '/end')
        cy.contains('cypress').should('exist').and('be.visible')

    });
})