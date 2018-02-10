describe('Basic functionality test', function () {
    it('Load the page, check settings drawer', function () {
        cy.visit('http://localhost:3000/');
        cy.contains('Bitcoin Price');
        cy.contains('Settings').click();
        cy.wait(1000);
        cy.contains('JSON API');
        cy.contains('Settings').click();
    })
})