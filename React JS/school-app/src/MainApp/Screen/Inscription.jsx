import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { initDB } from "../Database/initdb";
import { InsertUser } from "../Database/Task";
import '../Style/style.css';

export const Inscription = () => {
    const navigate = useNavigate();

    // Same state structure as React Native version
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        confirmerMotDePasse: '',
        numero: ''
    });
    const [erreurs, setErreurs] = useState({});

    // Same handleChange pattern as React Native
    const handleChange = (champ, valeur) => {
        setFormData(prev => ({
            ...prev,
            [champ]: valeur
        }));

        // Efface l'erreur du champ quand l'utilisateur modifie
        if (erreurs[champ]) {
            setErreurs(prev => ({
                ...prev,
                [champ]: ''
            }));
        }
    };

    // Database initialization on mount - same pattern as React Native
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

    // Ensure database is initialized before allowing inscription
    const [dbInitialized, setDbInitialized] = useState(false);

    useEffect(() => {
        const initializeAndSetDb = async () => {
            try {
                await initDB();
                setDbInitialized(true);
            } catch (error) {
                console.error("Failed to initialize database:", error);
                setDbInitialized(false);
            }
        };
        initializeAndSetDb();
    }, []);

    // Vérification en temps réel de la correspondance des mots de passe
    useEffect(() => {
        if (formData.motDePasse && formData.confirmerMotDePasse) {
            if (formData.motDePasse !== formData.confirmerMotDePasse) {
                setErreurs(prev => ({
                    ...prev,
                    confirmerMotDePasse: 'Les mots de passe ne correspondent pas'
                }));
            } else {
                setErreurs(prev => ({
                    ...prev,
                    confirmerMotDePasse: ''
                }));
            }
        }
    }, [formData.motDePasse, formData.confirmerMotDePasse]);

    // Same validation logic as React Native version
    const validerFormulaire = () => {
        let nouvellesErreurs = {};

        if (!formData.nom.trim()) nouvellesErreurs.nom = 'Le nom est obligatoire';
        if (!formData.prenom.trim()) nouvellesErreurs.prenom = 'Le prénom est obligatoire';
        if (!formData.numero.trim()) nouvellesErreurs.numero = 'Le numéro est obligatoire';
        if (!formData.email.trim()) nouvellesErreurs.email = 'L\'email est obligatoire';
        if (!formData.motDePasse.trim()) nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
        if (!formData.confirmerMotDePasse.trim()) nouvellesErreurs.confirmerMotDePasse = 'La confirmation du mot de passe est obligatoire';

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email.trim())) {
            nouvellesErreurs.email = 'Le format de l\'email est invalide.';
        }

        // Validation du numéro
        if (formData.numero && !/^\d+$/.test(formData.numero.trim())) {
            nouvellesErreurs.numero = "Le numéro doit contenir uniquement des chiffres";
        } else if (formData.numero && formData.numero.trim().length !== 10) {
            nouvellesErreurs.numero = "Le numéro doit contenir exactement 10 chiffres";
        }

        // Validation du mot de passe
        if (formData.motDePasse) {
            if (formData.motDePasse.length < 12) {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères";
            } else if (formData.motDePasse.length > 25) {
                nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 25 caractères";
            } else {
                const hasNumber = /\d/.test(formData.motDePasse);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.motDePasse);
                const hasUpperCase = /[A-Z]/.test(formData.motDePasse);

                if (!hasNumber) {
                    nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un chiffre";
                } else if (!hasSpecialChar) {
                    nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un caractère spécial";
                } else if (!hasUpperCase) {
                    nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
                }
            }
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    };

    // Same inscription handler as React Native version
    const handleInscription = async () => {
        if (!dbInitialized) {
            alert('La base de données n\'est pas initialisée. Veuillez réessayer plus tard.');
            return;
        }
        if (validerFormulaire()) {
            try {
                await InsertUser(
                    formData.nom,
                    formData.prenom,
                    formData.numero,
                    formData.email,
                    formData.motDePasse,
                    formData.confirmerMotDePasse
                );

                alert(`Inscription réussie, Bienvenue, ${formData.prenom} ${formData.nom} !`);

                // Réinitialiser le formulaire
                setFormData({
                    nom: '',
                    prenom: '',
                    numero: '',
                    email: '',
                    motDePasse: '',
                    confirmerMotDePasse: ''
                });

                // Rediriger vers la page de connexion
                navigate('/connexion');
            } catch (error) {
                console.error('Erreur lors de l\'inscription :', error);
                let errorMessage = 'Une erreur est survenue lors de l\'inscription';
                if (error.message && error.message.includes('email')) {
                    errorMessage = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
                }
                alert(errorMessage);
            }
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-scroll-content">
                <div className="auth-champ-container">
                    <h1 style={{ fontWeight: 'bold', fontSize: 40, marginBottom: 10 }}>Inscription</h1>
                    <h2 style={{ fontSize: 20, marginBottom: 10 }}>Créez votre compte</h2>
                </div>

                <div className="auth-champ-container">
                    <label className="auth-label">Nom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre nom"
                        className={`auth-input ${erreurs.nom ? 'auth-input-erreur' : ''}`}
                        value={formData.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                    />
                    {erreurs.nom && <p className="auth-texte-erreur">{erreurs.nom}</p>}
                </div>

                <div className="auth-champ-container">
                    <label className="auth-label">Prénom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        className={`auth-input ${erreurs.prenom ? 'auth-input-erreur' : ''}`}
                        value={formData.prenom}
                        onChange={(e) => handleChange('prenom', e.target.value)}
                    />
                    {erreurs.prenom && <p className="auth-texte-erreur">{erreurs.prenom}</p>}
                </div>

                <div className="auth-champ-container">
                    <label className="auth-label">Numéro de téléphone</label>
                    <input
                        type="tel"
                        placeholder="Entrez votre numéro"
                        className={`auth-input ${erreurs.numero ? 'auth-input-erreur' : ''}`}
                        value={formData.numero}
                        onChange={(e) => handleChange('numero', e.target.value)}
                    />
                    {erreurs.numero && <p className="auth-texte-erreur">{erreurs.numero}</p>}
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
                    <label className="auth-label">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        className={`auth-input ${erreurs.confirmerMotDePasse ? 'auth-input-erreur' : ''}`}
                        value={formData.confirmerMotDePasse}
                        onChange={(e) => handleChange('confirmerMotDePasse', e.target.value)}
                    />
                    {erreurs.confirmerMotDePasse && <p className="auth-texte-erreur">{erreurs.confirmerMotDePasse}</p>}
                </div>

                <div className="auth-champ-container">
                    <button className="auth-bouton" onClick={handleInscription}>
                        <span className="auth-texte-bouton">S'inscrire</span>
                    </button>
                </div>

                <div>
                    <button
                        onClick={() => navigate('/connexion')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <p style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Déjà un compte ? Connectez-vous</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Inscription

