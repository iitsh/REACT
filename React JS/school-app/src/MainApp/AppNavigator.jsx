import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import Catalogue from './Screen/Catalogue';
import Panier from './Screen/Panier';
import Connexion from './Screen/Connexion';
import Inscription from './Screen/Inscription';
import Menu from './Screen/Menu';
import { FaHome, FaList, FaShoppingCart, FaUser, FaBars, FaTimes, FaUserPlus } from 'react-icons/fa';
import './Style/style.css';

// Sidebar vertical (équivalent du DrawerNavigator de React Native)
const Sidebar = ({ isOpen, onClose, cartCount }) => {
    return (
        <>
            {/* Overlay sombre quand le sidebar est ouvert */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999
                    }}
                />
            )}

            {/* Le sidebar lui-même */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: isOpen ? 0 : '-280px',  // Animation slide de gauche
                width: '280px',
                height: '100%',
                backgroundColor: '#fff',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                transition: 'left 0.3s ease-in-out',  // Animation fluide
                zIndex: 1000,
                overflowY: 'auto'
            }}>
                {/* Header du sidebar */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#4c8479',
                    color: 'white'
                }}>
                    <h2 style={{ margin: 0, fontSize: 20 }}>Menu</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: 24
                        }}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Les liens du sidebar */}
                <nav style={{ padding: '10px 0' }}>
                    <Link
                        to="/accueil"
                        onClick={onClose}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            color: '#333',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <FaHome size={20} style={{ marginRight: 15, color: '#4c8479' }} />
                        <span style={{ fontSize: 16 }}>Accueil</span>
                    </Link>

                    <Link
                        to="/catalogue"
                        onClick={onClose}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            color: '#333',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <FaList size={20} style={{ marginRight: 15, color: '#4c8479' }} />
                        <span style={{ fontSize: 16 }}>Catalogue</span>
                    </Link>

                    <Link
                        to="/panier"
                        onClick={onClose}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            color: '#333',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'background-color 0.2s',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <div style={{ position: 'relative', marginRight: 15 }}>
                            <FaShoppingCart size={20} style={{ color: '#4c8479' }} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                }}>{cartCount}</span>
                            )}
                        </div>
                        <span style={{ fontSize: 16 }}>Panier</span>
                    </Link>

                    <Link
                        to="/connexion"
                        onClick={onClose}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            color: '#333',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <FaUser size={20} style={{ marginRight: 15, color: '#4c8479' }} />
                        <span style={{ fontSize: 16 }}>Connexion</span>
                    </Link>

                    <Link
                        to="/inscription"
                        onClick={onClose}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            color: '#333',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <FaUserPlus size={20} style={{ marginRight: 15, color: '#4c8479' }} />
                        <span style={{ fontSize: 16 }}>Inscription</span>
                    </Link>
                </nav>
            </div>
        </>
    );
};

// Barre horizontale en bas (Bottom Navigation)
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
            <Link to="/accueil" style={{ color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <FaHome size={24} />
                <span style={{ fontSize: 12 }}>Accueil</span>
            </Link>
            <Link to="/catalogue" style={{ color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <FaList size={24} />
                <span style={{ fontSize: 12 }}>Catalogue</span>
            </Link>
            <Link to="/panier" style={{ color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <div style={{ position: 'relative' }}>
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
                <span style={{ fontSize: 12 }}>Panier</span>
            </Link>
            <Link to="/connexion" style={{ color: '#4c8479', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <FaUser size={24} />
                <span style={{ fontSize: 12 }}>Connexion</span>
            </Link>
        </nav>
    );
};

const AppRoutes = () => {
    const [panier, setPanier] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);  // État pour le sidebar

    const totalItems = panier.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div style={{ paddingBottom: '60px' }}>
            {/* Bouton hamburger pour ouvrir le sidebar */}
            <button
                onClick={() => setSidebarOpen(true)}
                style={{
                    position: 'fixed',
                    top: 15,
                    left: 15,
                    zIndex: 998,
                    backgroundColor: '#4c8479',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 15px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    fontSize: 20
                }}
            >
                <FaBars />
            </button>

            {/* Sidebar vertical */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                cartCount={totalItems}
            />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Navigate to="/accueil" replace />} />
                <Route path="/accueil" element={<Menu />} />
                <Route path="/catalogue" element={<Catalogue panier={panier} setPanier={setPanier} totalItems={totalItems} />} />
                <Route path="/panier" element={<Panier panier={panier} setPanier={setPanier} />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Routes>

            {/* Barre de navigation en bas */}
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
