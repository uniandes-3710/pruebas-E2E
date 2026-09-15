describe("Cambio de idioma en Registro", () => {
  it("el formulario cambia de español a inglés sin perder la ruta", () => {
    cy.visit("/es/registro");
    cy.contains("Registra a tu gato 🐱");

    cy.get("a").contains("EN").click();

    cy.url().should("include", "/en/registro");
    cy.contains("Register your cat 🐱");
  });
});
