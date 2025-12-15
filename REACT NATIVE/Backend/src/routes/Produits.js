const express = require("express");
const router = express.Router();
const ListProduit = require("../models/Produit");

router.get("/", async (req, res) => { //route pour récupérer tous les produits
    try {
        const produits = await ListProduit.find();
        res.json(produits); //renvoie les produits au client sous forme de JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;