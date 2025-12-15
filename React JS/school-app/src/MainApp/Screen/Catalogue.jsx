import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Article from '../Composant/Article';
import '../Style/style.css';

const Catalogue = ({ panier, setPanier, totalItems }) => {
    const { user } = useContext(UserContext);
    const [produits, setProduits] = useState([]);
    const [erreur, setErreur] = useState(null);
    const [recherche, setRecherche] = useState('');
    const navigate = useNavigate();

    const ajouterAuPanier = useCallback((produit) => {
        // Ensure we have a unique ID, preferring 'id' but falling back to '_id'
        const uniqueId = produit.id || produit._id;
        const produitToAdd = { ...produit, id: uniqueId };

        setPanier((prevPanier) => {
            const existingProductIndex = prevPanier.findIndex(item => item.id === uniqueId);

            if (existingProductIndex > -1) {
                // Product already in cart, increment quantity
                const newPanier = [...prevPanier];
                newPanier[existingProductIndex] = {
                    ...newPanier[existingProductIndex],
                    quantity: (newPanier[existingProductIndex].quantity || 1) + 1,
                };
                return newPanier;
            } else {
                // Product not in cart, add with quantity 1
                return [...prevPanier, { ...produitToAdd, quantity: 1 }];
            }
        });
    }, [setPanier]);

    useEffect(() => {
        const chargerProduits = async () => {
            try {
                // Use localhost for web
                const res = await fetch('http://localhost:3000/api/produits');
                if (!res.ok) {
                    throw new Error('Echec de chargement des produits');
                }
                const data = await res.json();
                setProduits(data);
            } catch (error) {
                console.error("Erreur fetch:", error);
                setErreur(error.message);
            }
        };
        chargerProduits();
    }, []);

    const produitsFiltres = useMemo(() => {
        return produits.filter(p =>
            p.nom.toLowerCase().includes(recherche.toLowerCase())
        );
    }, [produits, recherche]);

    if (erreur) return <div className="erreur">Erreur : {erreur}</div>;

    return (
        <div className="container">
            <div className="header">
                {user && <div className="header-title">Bonjour, {user.nom}</div>}
                <div className="cart-badge" onClick={() => navigate('/panier')}>
                    🛒 {totalItems}
                </div>
                <input 
                    type="text" 
                    placeholder="🔍    Rechercher..." 
                    className="search-input"
                    value={recherche} 
                    onChange={(e) => setRecherche(e.target.value)}
                />
            </div>

            <div className="list">
                {produitsFiltres.map((item, index) => (
                    <Article 
                        key={item.id || item._id || index} 
                        item={item} 
                        onAddToCart={() => ajouterAuPanier(item)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalogue;
