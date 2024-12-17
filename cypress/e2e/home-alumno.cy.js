describe('Login', () => {
    it('Debe permitir al usuario iniciar sesión correctamente con email y contraseña', () => {
      // Visitar la página de login
      cy.visit('http://localhost:8100/login'); 

      // Llenar el formulario de login
      cy.get('input[name="email"]').type('c.camus@duocuc.cl'); 
      cy.get('input[name="password"]').type('123456789'); 
      cy.get('ion-button[type="submit"]').click(); 

      // Validar que el login fue exitoso
      cy.url().should('eq', 'http://localhost:8100/home-alumno/historial-asistencia'); 
      cy.get('h1').should('contain.text', 'Bienvenido'); 

    // Navegar al segundo apartado 
    cy.get('ion-segment-button[value="historial-asistencia"]').click();
    cy.url().should('include', 'historial-asistencia'); 

    // Navegar al tercer apartado 
    cy.get('ion-segment-button[value="camara-alumno"]').click();
    cy.url().should('include', 'camara-alumno'); 

    // Navegar al cuarto apartado
    cy.get('ion-segment-button[value="alumno-perfil"]').click();
    cy.url().should('include', 'alumno-perfil'); 
    });
});
