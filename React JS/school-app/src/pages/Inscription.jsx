import React, { useState } from "react";
import champNom from "./champ_nom.webp";
import champEmail from "./email_champ.webp";
import champTelephone from "./champ_telephone.webp";
import champPassword from "./champ_password.webp";

const Inscription = () => {

const [nom, setNom] = useState("");
const [email, setEmail] = useState("");
const [number, setNumber] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [boxcheck, setBoxcheck] = useState(false);

const [NomEror, setNomError] = useState("");
const [EmailEror, setEmailError] = useState("");
const [NumberEror, setNumberError] = useState("");
const [PasswordEror, setPasswordError] = useState("");
const [ConfirmPasswordEror, setConfirmPasswordError] = useState("");
const [BoxcheckEror, setBoxcheckError] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

            if (nom.trim() === "") { // Vérifie si le champ nom est vide
                setNomError("Le nom est obligatoire");
            }
            if (/\s/.test(nom.trim())) { // Vérifie si le nom contient des espaces
                setNomError("Le nom ne doit pas contenir d'espaces");
            }


            if (email.trim() === ""){
                setEmailError("L'email est obligatoire");
            } 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                if (!emailRegex.test(email.trim()) && email.trim() !== "") { // Vérifie le format de l'email
                setEmailError('Le format de l\'email est invalide.');
        
            }

            if (number.trim() === ""){
                setNumberError("Le numéro est obligatoire");
            }
            if(/^\d+$/.test(number.trim()) === false && number.trim() !== "") { // Vérifie si le numéro contient uniquement des chiffres
                setNumberError("Le numéro doit contenir uniquement des chiffres");
            }
            if (password.trim() === ""){
                setPasswordError("Le mot de passe est obligatoire");    
        } 

            if (password.trim().length < 8 && password.trim().length > 0) { // Vérifie la longueur minimale du mot de passe
                setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
            }
            if(password.trim().length > 20) { // Vérifie la longueur maximale du mot de passe
                setPasswordError("Le mot de passe doit contenir au maximum 20 caractères");
            }

            const hasUpperCase = /[A-Z]/.test(password.trim()); 

            if (hasUpperCase === false && password.trim() !== "") { // Vérifie la présence d'une majuscule dans le mot de passe
                setPasswordError("Le mot de passe doit contenir au moins une majuscule");
            }
            if (password.trim().length > 25 && hasUpperCase === false && password.trim() !== "") {
                setPasswordError("Le mot de passe doit contenir au maximum 20 caractères et une majuscule");
            }

            if(password.trim().length <8 && hasUpperCase === false && password.trim() !== "") {
                setPasswordError("Le mot de passe doit contenir au moins 8 caractères et une majuscule");
            }

        if (confirmPassword.trim() === ""){
            setConfirmPasswordError("La confirmation du mot de passe est obligatoire");
        }
        if(password !== confirmPassword) {
            setConfirmPasswordError("Les mots de passe ne correspondent pas");
        }
        if (boxcheck === false){
            setBoxcheckError("Vous devez accepter les conditions");
        }
        if (/^\d+$/.test(number.trim())){
            if (number.trim().length !== 10) {
                setNumberError("Le numéro doit contenir exactement 10 chiffres");
            }
        }
    }

    // Mise a jour du champ nom + suppression du message d'erreur si le champ est rempli
    const handleNameChange = (e) => {
        const value = e.target.value;
        setNom(value);
        if (value.trim() !== "") {
            setNomError("");
        }
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value.trim() !== "") {
            setEmailError("");
        }
    }

    const handleNumberChange = (e) => {
        const value = e.target.value;
        setNumber(value);
        if (value.trim() !== "") {
            setNumberError("");
        }
    }
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value); 
        if (value.trim() !== "") {
            setPasswordError("");
        }
    }
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value); 
        if (value.trim() !== "") {
            setConfirmPasswordError("");
        }
    }

    
    const handleboxcheckChange = (e) => {
        const value = e.target.checked;
        setBoxcheck(value);
    
        if (value === true) {
            setBoxcheckError("");
        }
    }

    return (

        
        <>
        <center>
        <div style={{
            border: '1px solid #000000ff',
            borderRadius: 8,
            padding: 10,
            maxWidth: 390,
            marginTop: '50px',
            backgroundColor: 'white',
        }}>
            <form onSubmit={handleSubmit}>
                <h2 style={{color: 'black'}}>Bienvenue !</h2>
                <h3 style={{color: 'black'}}>Inscrivez-vous pour continuer</h3> <br></br>

                <label style={{marginLeft: '-225px', color: 'black'}}>Nom</label> <br></br>
                <input name="nom" type="text" value={nom} onChange={handleNameChange} placeholder="Dupont" style={{width:'280px', borderRadius:'20px', height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px', backgroundImage:`url(${champNom})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}} /><br></br>
                
                {NomEror && <span style={{ color: "red" }}>{NomEror}</span>}<br></br><br></br>

                <label style={{marginLeft: '-225px', color: 'black'}}>Email</label><br></br>
                <input name="email" type="text" value={email} onChange={handleEmailChange} placeholder="exemple@gmail.com" style={{width:'280px', borderRadius:'20px' , height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px' , backgroundImage:`url(${champEmail})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}} /><br></br>
                {EmailEror && <span style={{ color: "red" }}>{EmailEror}</span>}<br></br><br></br>


                <label style={{marginLeft: '-210px', color: 'black'}}>Numéro</label><br></br>
                <input name="number" type="text" value={number} onChange={handleNumberChange} placeholder="0762566151" style={{width:'280px', borderRadius:'20px', height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px', backgroundImage:`url(${champTelephone})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'13px', color:'black' }} /><br></br>
                {NumberEror && <span style={{color:'red'}}>{NumberEror}</span>} <br></br><br></br>

                <label style={{marginLeft: '-190px', color: 'black'}}>Mot de passe</label><br></br>
                <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="•••••••••••••••••••••••••••••" style={{width:'280px', borderRadius:'20px', height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px', backgroundImage:`url(${champPassword})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}} /><br></br> 
                {PasswordEror && <span style={{color:'red'}}>{PasswordEror}</span>} <br></br><br></br>

                <label style={{marginLeft: '-70px', color: 'black'}}>Confirmation du mot de passe</label><br></br>
                <input  type="password" name="confirm_password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="•••••••••••••••••••••••••••••" style={{width:'280px', borderRadius:'20px', height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px', backgroundImage:`url(${champPassword})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}}/><br></br> 
                {ConfirmPasswordEror && <span style={{color:'red'}}>{ConfirmPasswordEror}</span>} <br></br><br></br>
                
                <input type="checkbox" nom="boxcheck" value={boxcheck} onChange={handleboxcheckChange} style={{marginLeft:'-80px'}} />
                <label style={{ color: 'black', paddingLeft:'-50px',marginLeft:'10px' }}>Accepter la politique de l’entreprise</label> <br></br> 
                {BoxcheckEror && <span style={{color:'red'}}>{BoxcheckEror}</span>} <br></br><br></br>

                <button type="submit" style={{backgroundColor:'rgb(39, 102, 49)', color: 'white', borderRadius:'20px', width:'100px', height:'30px', border:'none', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>Inscription</button><br></br><br></br>

                
                <p style={{color: 'black'}}>Vous avez dèja un compte ?<a href="./Login" style={{color:'rgba(51, 128, 63, 1)', textDecoration:'none'}} > Se connecter</a></p> 
            </form>
        </div>
        </center>
        </>
    )
} 

export default Inscription;


