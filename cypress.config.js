const { defineConfig } = require("cypress");

module.exports = defineConfig({

  projectId: "3jh8c5",
  e2e: {
    baseUrl: "http://localhost:8080/users",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
