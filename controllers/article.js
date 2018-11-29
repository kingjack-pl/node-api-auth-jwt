const Article = require("../models/article");

exports.saveArticle = function(req, res, next) {
    const articleData = new Article(req.body);
    articleData.save().then(function (result) {
       res.send({ status: "saved successfully" })
    }).catch(function (err) {
       res.status(400).send({ status: "unable to save data" })
    });
};

exports.getArticles = function(req, res, next) {
    Article.find({}, function (err, articles) {
        res.send({ articles: articles })
    })
};

exports.paramId = function(req, res, next, id) {
    Article.findById(id, function (err, article) {
        if(err){
            res.sendStatus(404)
        } else if (article) {
            req.article = article;
            next();
        }
    }).catch(next);
};

exports.getArticle = function(req, res, next) {
    Article.findOne({ _id: req.article.id }, function (err, article) {
        res.send({ article: article })
    })
};

exports.updateArticle = function(req, res, next) {
    const body = req.body;

    if(body.title){
        req.article.title = body.title;
    }

    if(body.description){
        req.article.description = body.description;
    }

    if(body.content){
        req.article.content = body.content;
    }

    if(body.category){
        req.article.category = body.category;
    }

    req.article.save().then(function () {
        res.json({ article: req.article.toJSON() })
    }).catch(next);
};

exports.removeArticle = function(req, res, next) {
    Article.findByIdAndRemove(req.article.id).then(function () {
        res.sendStatus(200)
    }).catch(next);
};
