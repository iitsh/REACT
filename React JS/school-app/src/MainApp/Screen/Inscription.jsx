import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsertUser } from '../Database/Task';
import '../Style/style.css';

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
    
    const navigate = useNavigate();

    const handleInscription = async () => {
        if (!nom || !prenom || !numero || !email || !motDePasse || !confirmerMotDePasse) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        if (motDePasse !== confirmerMotDePasse) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await InsertUser(nom, prenom, numero, email, motDePasse, confirmerMotDePasse);
            alert('Inscription réussie !');
            navigate('/connexion');
        } catch (error) {
            console.error("Erreur inscription:", error);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Inscription</h2>
            
            <input type="text" className="auth-input" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            <input type="text" className="auth-input" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            <input type="tel" className="auth-input" placeholder="Numéro" value={numero} onChange={(e) => setNumero(e.target.value)} />
            <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="auth-input" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
            <input type="password" className="auth-input" placeholder="Confirmer mot de passe" value={confirmerMotDePasse} onChange={(e) => setConfirmerMotDePasse(e.target.value)} />

            <button className="auth-button" onClick={handleInscription}>
                S'inscrire
            </button>

            <button className="auth-link" onClick={() => navigate('/connexion')}>
                Déjà un compte? Se connecter
            </button>
        </div>
    );
};

export default Inscription;
