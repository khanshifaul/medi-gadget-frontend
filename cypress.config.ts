import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // Logic to execute before running tests
      on("before:run", () => {
        console.log("Preparing to run tests...");
      });

      // Logic to execute after running tests
      on("after:run", () => {
        console.log("Tests completed.");
      });

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      json: true,
      html: true,
      overwrite: false,
    },
    screenshotOnRunFailure: false,
    screenshotsFolder: "cypress/screenshots",
    video: false,
    videoCompression: true,
    videosFolder: "cypress/videos",
    retries: {
      runMode: 2, // Retry failed tests twice in run mode
      openMode: 0, // No retries in open mode
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
