import React from 'react';
import '../Style/style.css';

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjQSWj_VuYahnY8t3CTPltb5C-GTuHaTKaVQ08QFIdVBxVUB6zZKaB2HJLT6r0McFzwIdgcflaLuKSji0V6Kj_pZ863VGdph6Mrk1X9toAPRCzO1Xda4L6x47U56rRhIKSVY8Azuo&usqp=CAc";

const Article = ({ item, onAddToCart }) => {
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <div className="article-card">
      <div className="article-image-wrapper">
        <img 
          src={item.image || DEFAULT_IMAGE} 
          alt={item.nom} 
          className="article-image"
          onError={handleImageError}
        />
      </div>
      
      <div className="article-info">
        <div className="article-header">
          <h3 className="article-title">{item.nom}</h3>
          <p className="article-price">{item.prix} €</p>
        </div>
        
        <p className="article-details">
          {item.description || "Description non disponible"}
        </p>
        
        <button className="article-button" onClick={onAddToCart}>
          <span className="article-button-text">Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
};

export default Article;
