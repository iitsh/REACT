import React, { useState } from 'react';
import '../Style/style.css';

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ5Po4oyzpU83M7BJUNtvqKC6A86gYUfrNb_sNWE0ENLbCV4fMtFshSBnXbBuYqb_Fr_dhg6_xdbGhXW13zZ3kQOHvOhNhPa9Ml3XWiq_QVzSqk-rDk51Tc-EUS8VEMgtSVMGVeK1Y&usqp=CAc";

const Articles = ({ item, onAddToCart }) => {
  // Same hook pattern as React Native version
  const [showDetails, setShowDetails] = useState(false);

  // Extract item properties (matching React Native variable names)
  const name = item.nom;
  const price = item.prix;
  const category = item.categorie;
  const stock = item.stock;
  const available = item.disponible;
  const description = item.description;

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <div className="article-card">
      <div className="article-image-wrapper">
        <img
          src={item.image || DEFAULT_IMAGE}
          alt={name}
          className="article-image"
          onError={handleImageError}
        />
      </div>

      <div className="article-info">
        <div className="article-header">
          <h3 className="article-title">{name}</h3>
          <p className="article-price">{price}</p>
        </div>

        {/* Toggle button for details - matching React Native functionality */}
        <button
          className="article-toggle-button"
          onClick={() => setShowDetails((v) => !v)}
        >
          <span className="article-button-text">
            {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
          </span>
        </button>

        {/* Conditional details section - same logic as React Native */}
        {showDetails && (
          <div className="article-details-section">
            {category !== undefined && (
              <p className="article-details">catégorie : {String(category)}</p>
            )}
            {stock !== undefined && (
              <p className="article-details">stock : {String(stock)}</p>
            )}
            {available !== undefined && (
              <p className="article-details">disponible : {String(available)}</p>
            )}
            {description && (
              <p className="article-details">description : {description}</p>
            )}
          </div>
        )}

        <button className="article-button" onClick={onAddToCart}>
          <span className="article-button-text">+ Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
};

// React.memo optimization - same as React Native version
export default React.memo(Articles);

