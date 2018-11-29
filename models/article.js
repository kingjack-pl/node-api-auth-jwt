const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    content: String,
    category: String,
}, { timestamps: true });

articleSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        title: this.title,
        description: this.description,
        content: this.content,
        category: this.category,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

const ModelClass = mongoose.model("article", articleSchema);

module.exports = ModelClass;
