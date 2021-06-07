const { response } = require("express");

module.exports = (app, options) => {
  const basepath = "/users";
  // logging a user out
  app.get(basepath + "/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });

  app.get(basepath + "/index", (req, res, next) => {
    !req.userContext ? response.render("login") : response.redirect("/");
  });
};
