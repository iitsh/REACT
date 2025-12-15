const express = require("express"); // import express
const cors = require("cors"); // import cors
const ProduitRoutes = require("./routes/Produits"); // import ProduitRoutes

const app = express(); // create express app

app.use(cors()); // enable cors
app.use(express.json());    // enable json

app.use('/api/produits', ProduitRoutes);    // use ProduitRoutes

module.exports = app;   // export app