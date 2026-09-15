describe("Registro de Miawductor", () => {
  beforeEach(() => {
    cy.visit("/es/registro");
  });

  it("registra un gato y navega a bienvenida con los datos correctos", () => {
    cy.fixture("gato").then((gato) => {
      cy.get('input[name="nombreGato"]').type(gato.nombreGato);
      cy.get('input[name="nombreDueno"]').type(gato.nombreDueno);
      cy.get('input[name="email"]').type(gato.email);
      cy.get('select[name="tipoMaullido"]').select(gato.tipoMaullido);

      cy.get("[data-cy=submit-registro]").click();

      cy.url().should("include", "/es/bienvenida");
      cy.contains(gato.nombreDueno).should("be.visible");
    });
  });
});
