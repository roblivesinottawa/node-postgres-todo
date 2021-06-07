const express = require("express");
const path = require("path");

const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const session = require("express-session");

const items = require("../routes/items");
const users = require("../routes/users");

const start = (options) => {
  return new Promise((resolve, reject) => {
    process.on("unhandledRejection", (reason, p) =>
      console.log("unhandled rejection at: Promise", p, "reason", reason),
    );
    if (!options.port) reject(new Error("no port specified"));
    if (!options.repo) reject(new Error("no repo"));
  });
};
const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use((error, req, res, next) => {
  reject(new Error(`Something went wrong ${error}`));
  res.status(500).send(`Something went wrong`);
});

const oidc = new ExpressOIDC({
  issuer: options.okta.url + "/oauth2/default",
  client_id: options.okta.clientId,
  client_secret: options.okta.clientSecret,
  appBaseUrl: options.okta.appBaseUrl,
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login",
    },
    callback: {
      path: "/authorization-code/callback",
      defaultRedirect: "/",
    },
  },
});

app.use(
  session({
    secret:
      "ladhnsfolnjaerovklnoisag093w4jgpijbfimdposjg5904mbgomcpasjdg'pomp;m",
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(oidc.router);

items(app, options);
users(app, null);

const server = app.listen(options.port, () => resolve(server));

module.exports = Object.assign({}, { start });
