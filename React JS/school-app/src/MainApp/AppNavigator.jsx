import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import Catalogue from './Screen/Catalogue';
import Panier from './Screen/Panier';
import Connexion from './Screen/Connexion';
import Inscription from './Screen/Inscription';
import Menu from './Screen/Menu';
import { FaHome, FaList, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Style/style.css';

const NavBar = ({ cartCount }) => {
    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0',
            zIndex: 1000
        }}>
            <Link to="/accueil" style={{color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}>
                <FaHome size={24} />
                <span style={{fontSize: 12}}>Accueil</span>
            </Link>
            <Link to="/catalogue" style={{color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}>
                <FaList size={24} />
                <span style={{fontSize: 12}}>Catalogue</span>
            </Link>
            <Link to="/panier" style={{color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}>
                <div style={{position: 'relative'}}>
                    <FaShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: -5,
                            right: -10,
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '10px'
                        }}>{cartCount}</span>
                    )}
                </div>
                <span style={{fontSize: 12}}>Panier</span>
            </Link>
            <Link to="/connexion" style={{color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none'}}>
                <FaUser size={24} />
                <span style={{fontSize: 12}}>Connexion</span>
            </Link>
        </nav>
    );
};

const AppRoutes = () => {
    const [panier, setPanier] = useState([]);

    const totalItems = panier.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div style={{ paddingBottom: '60px' }}> {/* Space for bottom navbar */}
            <Routes>
                <Route path="/" element={<Navigate to="/accueil" replace />} />
                <Route path="/accueil" element={<Menu />} />
                <Route path="/catalogue" element={<Catalogue panier={panier} setPanier={setPanier} totalItems={totalItems} />} />
                <Route path="/panier" element={<Panier panier={panier} setPanier={setPanier} />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Routes>
            <NavBar cartCount={totalItems} />
        </div>
    );
};

const AppNavigator = () => {
    return (
        <UserProvider>
            <Router>
                <AppRoutes />
            </Router>
        </UserProvider>
    );
};

export default AppNavigator;
