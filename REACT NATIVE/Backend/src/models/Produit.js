const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema({

    nom : String,
    categorie : String,
    prix : Number,
    stock : Number,
    disponible : Boolean,
    description : String,
    tags : [String],
}
)
module.exports = mongoose.model("ListProduits", ProduitSchema);