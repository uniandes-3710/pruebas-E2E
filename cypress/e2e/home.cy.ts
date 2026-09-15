describe("Home de Miawductor", () => {
  it("redirige a /es y muestra el título", () => {
    cy.visit("/");
    cy.url().should("include", "/es");
    cy.contains("Miawductor");
  });
});
