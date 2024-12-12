describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Gregor Foitzik',
      username: 'testUser',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Gregor Foitzik logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testUser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    
      cy.get('html').should('not.contain', 'Gregor Foitzik logged-in')
    
    })
  })
})