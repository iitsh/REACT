import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import '../Style/style.css';

const Menu = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="menu-container">
            <h1 style={{color: '#4c8479', marginBottom: 30}}>Bienvenue sur E-Commerce App</h1>
            
            {user ? (
                <p className="menu-text">Bonjour, <strong>{user.nom}</strong> !</p>
            ) : (
                <p className="menu-text">Veuillez vous connecter pour profiter de nos offres.</p>
            )}

            <Link to="/catalogue" className="menu-button">Voir le Catalogue</Link>
            <Link to="/panier" className="menu-button">Mon Panier</Link>
            
            {!user && (
                <>
                    <Link to="/connexion" className="menu-button" style={{backgroundColor: '#333'}}>Connexion</Link>
                    <Link to="/inscription" className="menu-button" style={{backgroundColor: '#555'}}>Inscription</Link>
                </>
            )}
        </div>
    );
};

export default Menu;
