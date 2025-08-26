describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.intercept('POST', '**/auth/validate').as('loginRequest')
  })

  it('TC01 - Login dengan username dan password valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode')
    .should('be.oneOf', [200, 302])

    cy.url().should('include', '/dashboard')
  })


  it('TC02 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('TC03 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
  })

  it('TC04 - Login dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

  it('TC05 - Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

  it('TC06 - Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

})
