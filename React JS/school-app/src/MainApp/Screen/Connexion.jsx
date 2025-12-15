import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { verifyUser } from '../Database/Task';

import '../Style/style.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize DB (simulate initDB logic)
        // In localstorage version, nothing special needed but good to follow pattern
        console.log("DB Initialized");
    }, []);

    const handleConnexion = async () => {
        if (email && motDePasse) {
            try {
                const user = await verifyUser(email, motDePasse);
                console.log("Résultat VerifUser:", user);
                if (user) {
                    alert('Connexion réussie ! Bienvenue !');
                    console.log('Utilisateur authentifié');
                    setUser({
                        nom: user.nom,
                        email: user.email
                    });
                    navigate('/accueil'); // Navigate to Menu/Accueil
                } else {
                    alert('Erreur: Email ou mot de passe incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification :', error);
                alert('Erreur: Une erreur est survenue.');
            }
        } else {
            alert('Erreur: Tous les champs sont obligatoires.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Formulaire de connexion</h2>
            
            <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="auth-input"
                placeholder="Mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
            />

            <button className="auth-button" onClick={handleConnexion}>
                Se connecter
            </button>

            <button className="auth-link" onClick={() => navigate('/inscription')}>
                Pas de compte? Inscription
            </button>
        </div>
    );
};

export default Connexion;
