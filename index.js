const server = require("./server/server");
const config = require("./config");

const repository = require("./repository/todo_repository");

const { EventEmitter } = require("events");
const mediator = new EventEmitter();

mediator.on("boot.ready", (dbConfig) => {
  let rep;
  repository
    .connect(dbConfig)
    .then((repo) => {
      console.log("Repository Connected. Starting Server...");
      rep = repo;

      return server.begin({
        port: config.serverSettings.port,
        repo: repo,
        okta: config.oktaSettings,
      });
    })
    .then((app) => {
      console.log(
        `Server started successfully, running on port: ${config.serverSettings.port}`,
      );
      app.on("close", () => rep.disconnect());
    });
});
mediator.on("db.error", (error) => console.log(error));

mediator.emit("boot.ready", config.dbSettings);
