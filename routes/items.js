const status = require("http-status");

module.exports = (app, options) => {
  const { repo } = options;
  const basepath = "";

  app.get(basepath, ensureAuthenticated, (req, res) => {
    repo
      .getAllIncompleteToDoItems()
      .then((items) => {
        res.render("home", {
          user: req.userContext.userinfo,
          items: items,
        });
      })
      .catch((err) => res.render("error"));
  });
  app.get(basepath + "/create", ensureAuthenticated, (req, res) =>
    res.render("create"),
  );

  app.post(basepath + "/items/create", ensureAuthenticated, (req, res) => {
    repo
      .createtoDoItem(req.body.title, req.body.description)
      .then((data) => res.redirect("/"))
      .catch((err) => res.render("error"));
  });
  app.post(basepath + "/items/complete", ensureAuthenticated, (req, res) => {
    repo
      .markAsComplete(req.body.id)
      .then((data) => res.redirect("/"))
      .catch((err) => res.render("error"));
  });

  ensureAuthenticated = (req, res, next) => {
    !req.userContext ? res.status(401).redirect("../users/index") : next();
  };
};
