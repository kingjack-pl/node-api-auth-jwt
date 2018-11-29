const Authentication = require("./controllers/authentication");
const Article = require("./controllers/article");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
    app.get("/", requireAuth, function(req, res) {
       res.send({ hi: "there" });
    });
    app.post("/signin", requireSignin, Authentication.signIn);
    app.post("/signup", Authentication.signUp);

    app.post("/articles", Article.saveArticle);
    app.get("/articles", Article.getArticles);
    app.param("id", Article.paramId);
    app.get("/articles/:id", Article.getArticle);
    app.patch("/articles/:id", Article.updateArticle);
    app.delete("/articles/:id", Article.removeArticle);
};
