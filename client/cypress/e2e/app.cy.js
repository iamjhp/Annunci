describe('tests without login', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  describe('landing page', function() {
    it('landing page can be opened', function() {
      cy.contains('Annunci')
      cy.contains('Home')
      cy.contains('About')
      cy.contains('Sign in')
      cy.contains('Sign up')
      cy.contains('Entdecke die neuesten Inser')
      cy.contains('Inserat aufgeben')
    })
    it('login form can be opened', function() {
      cy.contains('Sign in').click()
    })
  })

  describe('about page', function() {
    beforeEach(function() {
      cy.contains('About').click()
    })

    it('about page can be opened', function() {
      cy.contains('Sicherheit')
      cy.contains('gefragt')
      cy.contains('Nachhaltigkeit')
    })

    it('faq questions can be opened', function() {
      cy.contains('Wie kann ich ein Inserat aufgeben?').click()
      cy.contains('Wo finde ich meine Inserate?').click()
      cy.contains('Wie ändere ich mein Inserat').click()
      cy.contains('Logg dich in deinen Account ein')
      cy.contains('Um all deine aktiven Inserat zu finden, logg')
      cy.contains('suche das zu bearbeitende')
    })

    it('faq questions can be closed', function() {
      cy.contains('Wie kann ich ein Inserat aufgeben?').dblclick()
      cy.contains('Wo finde ich meine Inserate?').dblclick()
      cy.contains('Wie ändere ich mein Inserat').dblclick()
      cy.contains('Logg dich in deinen Account ein').should('not.exist')
      cy.contains('Um all deine aktiven Inserat zu finden, logg').should('not.exist')
      cy.contains('suche das zu bearbeitende').should('not.exist')
    })
  })
})

describe('tests with login', function() {
  it ('user can sign up', function() {
    cy.contains('Sign up').click()
    cy.get('input:first').type('test@test.ch')
    cy.get('#password').type('Testzurich12#')
    cy.get('input:last').type('Testzurich12#')
    cy.get('button').contains('Jetzt registrieren').click()
  })

  describe('user is logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('Sign in').click()
      cy.get('input:first').type('test@test.ch')
      cy.get('input:last').type('Testzurich12#')
      cy.get('button').contains('Sign in').click()
    })
    it('user can log in', function() {
      cy.contains("test@test.ch")
    })
    it('user can log out', function() {
      cy.contains('Logout').click()
      cy.contains('Sign in')
      cy.contains('Sign up')
    })
    it('user can create a new item', function() {
      cy.contains('Inserat aufgeben').click()
      const picFile = 'cypress/e2e/test.jpg'
      cy.get('#form-title').type("Verkaufe Blumen")
      cy.get('#form-description').type("Hallo Leute, ich verkaufe Blumen")
      cy.get('#form-price').type('1000')
      cy.get('input[type=file]').selectFile(picFile, { force: true })
      cy.contains('Save').click()
    })
  })
})