describe('Login y Navegación entre Apartados', () => {
  it('Debe permitir al usuario iniciar sesión y navegar entre los diferentes apartados', () => {
    // Visitar la página de login
    cy.visit('http://localhost:8100/login'); 

    // Llenar el formulario de login
    cy.get('input[name="email"]').type('mpino@profesor.duocuc.cl'); 
    cy.get('input[name="password"]').type('123456789'); 
    cy.get('ion-button[type="submit"]').click(); 

    // Verificar que el login fue exitoso 
    cy.url().should('eq', 'http://localhost:8100/home/reglamento-profesor'); 
    cy.get('h1').should('contain.text', 'Bienvenido'); 

    // Navegar al primer apartado (por ejemplo, "reglamento-profesor")
    cy.get('ion-segment-button[value="reglamento-profesor"]').click();
    cy.url().should('include', 'reglamento-profesor'); 

    // Navegar al segundo apartado (por ejemplo, "historial-clases")
    cy.get('ion-segment-button[value="historial-clases"]').click();
    cy.url().should('include', 'historial-clases'); 

    // Navegar al tercer apartado (por ejemplo, "codigoqr")
    cy.get('ion-segment-button[value="codigoqr"]').click();
    cy.url().should('include', 'codigoqr'); 

    // Navegar al cuarto apartado
    cy.get('ion-segment-button[value="profesor-perfil"]').click();
    cy.url().should('include', 'profesor-perfil'); 
  });
});
