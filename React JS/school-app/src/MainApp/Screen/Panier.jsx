import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/style.css';

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjQSWj_VuYahnY8t3CTPltb5C-GTuHaTKaVQ08QFIdVBxVUB6zZKaB2HJLT6r0McFzwIdgcflaLuKSji0V6Kj_pZ863VGdph6Mrk1X9toAPRCzO1Xda4L6x47U56rRhIKSVY8Azuo&usqp=CAc";

const Panier = ({ panier, setPanier }) => {
    const navigate = useNavigate();

    const handleQuantityChange = (itemToUpdate, newQuantity) => {
        if (newQuantity <= 0) {
            setPanier(panier.filter(item => item.id !== itemToUpdate.id));
        } else {
            setPanier(panier.map(item => 
                item.id === itemToUpdate.id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        setPanier(panier.filter(item => item.id !== itemToRemove.id));
    };

    const calculateTotal = () => {
        return panier.reduce((total, item) => total + (item.prix * (item.quantity || 1)), 0).toFixed(2);
    };

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = DEFAULT_IMAGE;
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="header-title">Mon Panier</h1>
                <div className="cart-actions">
                    <button onClick={() => navigate('/catalogue')} className="button-secondary">
                        Retour au catalogue
                    </button>
                    <button onClick={() => setPanier([])} className="button-danger">
                        Vider le panier
                    </button>
                </div>
            </div>
            
            <div className="list">
                {panier.length === 0 ? (
                    <p className="cart-empty">Votre panier est vide.</p>
                ) : (
                    panier.map((item, index) => (
                        <div key={item.id || index} className="cart-item">
                            <img 
                                src={item.image || DEFAULT_IMAGE} 
                                alt={item.nom} 
                                className="cart-item-image"
                                onError={handleImageError} 
                            />
                            <div className="cart-item-details">
                                <strong>{item.nom}</strong>
                                <p>{item.prix} €</p>
                            </div>
                            <div className="cart-item-actions">
                                <button className="quantity-button" onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}>-</button>
                                <span className="quantity-display">{item.quantity || 1}</span>
                                <button className="quantity-button" onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}>+</button>
                                <button className="delete-item-button" onClick={() => handleRemoveItem(item)}>X</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {panier.length > 0 && (
                <div className="cart-total">
                    Total: <span>{calculateTotal()} €</span>
                </div>
            )}
            {panier.length > 0 && (
                <button className="cart-checkout-button" onClick={() => alert('Procéder au paiement!')}>Procéder au paiement</button>
            )}
        </div>
    );
};

export default Panier;
