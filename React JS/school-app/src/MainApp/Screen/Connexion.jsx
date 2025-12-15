import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { initDB } from "../Database/initdb";
import { verifyUser } from '../Database/Task';
import { UserContext } from '../context/UserContext.jsx';
import '../Style/style.css';

const Connexion = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Same state structure as React Native version
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: '',
    });

    const [erreurs, setErreurs] = useState({});

    // Same useEffect pattern for database initialization
    useEffect(() => {
        const setupDB = async () => {
            try {
                await initDB();
            } catch (error) {
                console.error("Failed to initialize database:", error);
            }
        };
        setupDB();
    }, []);

    // Same handleChange pattern as React Native
    const handleChange = (champ, valeur) => {
        setFormData(prev => ({
            ...prev,
            [champ]: valeur
        }));
        if (erreurs[champ]) {
            setErreurs(prev => ({
                ...prev,
                [champ]: ''
            }));
        }
    };

    // Same validation logic as React Native version
    const validerFormulaire = () => {
        let nouvellesErreurs = {};

        if (formData.email.trim() === '') {
            nouvellesErreurs.email = 'L\'email est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim()) && formData.email.trim() !== "") {
            nouvellesErreurs.email = 'Le format de l\'email est invalide.';
        }

        if (formData.motDePasse.trim() === '') {
            nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
        }
        if (formData.motDePasse.trim().length < 12 && formData.motDePasse.trim().length > 0) {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères";
        }
        if (formData.motDePasse.trim().length > 25) {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 20 caractères";
        }
        const hasNumber = /\d/.test(formData.motDePasse.trim());
        if (hasNumber === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un chiffre";
        }
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.motDePasse.trim());
        if (hasSpecialChar === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un caractère spécial";
        }
        const hasUpperCase = /[A-Z]/.test(formData.motDePasse.trim());
        if (hasUpperCase === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    }

    // Same submit logic as React Native version
    const handleSubmit = async () => {
        if (validerFormulaire()) {
            try {
                const user = await verifyUser(formData.email, formData.motDePasse);
                if (user) {
                    alert('Connexion réussie, Bienvenue !');
                    setUser(user);
                    navigate('/catalogue');
                } else {
                    alert('Email ou mot de passe incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
                alert('Une erreur est survenue lors de la connexion.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-scroll-content">
                <div className="auth-champ-container">
                    <h1 style={{ fontWeight: 'bold', fontSize: 40, marginBottom: 10, textAlign: 'center' }}>Connexion</h1>
                </div>

                <div className="auth-champ-container">
                    <label className="auth-label">Adresse email</label>
                    <input
                        type="email"
                        placeholder="Entrez votre adresse email"
                        className={`auth-input ${erreurs.email ? 'auth-input-erreur' : ''}`}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {erreurs.email && <p className="auth-texte-erreur">{erreurs.email}</p>}
                </div>

                <div className="auth-champ-container">
                    <label className="auth-label">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        className={`auth-input ${erreurs.motDePasse ? 'auth-input-erreur' : ''}`}
                        value={formData.motDePasse}
                        onChange={(e) => handleChange('motDePasse', e.target.value)}
                    />
                    {erreurs.motDePasse && <p className="auth-texte-erreur">{erreurs.motDePasse}</p>}
                </div>

                <div className="auth-champ-container">
                    <button className="auth-bouton" onClick={handleSubmit}>
                        <span className="auth-texte-bouton">Se connecter</span>
                    </button>
                </div>

                <div>
                    <button
                        onClick={() => navigate('/inscription')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <p style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Pas de compte ? Inscrivez-vous</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Connexion;

