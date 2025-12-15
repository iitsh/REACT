import { useState, useRef, useEffect } from "react";
import champEmail from "./email_champ.webp";
import champPassword from "./champ_password.webp";




const Login = () => {
    

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const nomInputRef = useRef(null);//Crée une référence vide au départ.


    useEffect(() => {
    if (nomInputRef.current) { 

      nomInputRef.current.focus();//Accède à l’élément DOM et lui applique la méthode focus().
   console.log(nomInputRef.current);
   
  }
  }, []);//Le tableau vide [] indique que l’effet ne dépend d’aucune variable externe. Il s’exécute une seule fois au montage du composant.

    //definir useState comme un objet
    const [MyForm, setMyForm] = useState({
        email : "", 
        password : ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target; 
        setMyForm((prev) => ({
            ...prev, 
            [name] : value,
        }))
        // Clear errors on input like in Inscription.jsx
        if (name === "email" && value.trim() !== "") {
            setEmailError("");
        }
        if (name === "password" && value.trim() !== "") {
            setPasswordError("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        console.log( "Donnès : ",MyForm);

        // Email validations copied from Inscription.jsx
        if(MyForm.email.trim() === ""){
            setEmailError("L'email est obligatoire");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(MyForm.email.trim()) && MyForm.email.trim() !== "") {
            setEmailError("Le format de l'email est invalide.");
        }

        // Password validations copied from Inscription.jsx
        if(MyForm.password.trim() === ""){
            setPasswordError("Le mot de passe est obligatoire");
        }


        if (MyForm.password.trim().length < 8 && MyForm.password.trim().length > 0) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
        }
        if(MyForm.password.trim().length > 20) {
            setPasswordError("Le mot de passe doit contenir au maximum 20 caractères");
        }

        const hasUpperCase = /[A-Z]/.test(MyForm.password.trim());

        if (hasUpperCase === false && MyForm.password.trim() !== "") {
            setPasswordError("Le mot de passe doit contenir au moins une majuscule");
        }
        if(MyForm.password.trim().length < 8 && hasUpperCase === false && MyForm.password.trim() !== "") {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères et une majuscule");
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
                <h2 style={{color: 'black'}}>Bienvenue !</h2> <br/>
                <h3 style={{color: 'black'}}>Inscrivez-vous pour continuer</h3> <br></br>

                
                
                <label style={{marginLeft: '-220px', color: 'black'}}>Email</label><br></br>
                <input name="email" value={MyForm.email} onChange={handleChange} type="text" placeholder="exemple@gmail.com" ref={nomInputRef} style={{width:'280px', borderRadius:'20px' , height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px' , backgroundImage:`url(${champEmail})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}}/><br></br>
                 {emailError && <span style={{ color: "red" }}>{emailError}</span>}<br></br><br></br>


                <label style={{marginLeft: '-180px', color: 'black'}}>Mot de passe</label><br></br>
                <input name="password" value={MyForm.password} onChange={handleChange} type="password" placeholder="•••••••••••••••••••••••••••••" style={{width:'280px', borderRadius:'20px', height:'30px', backgroundColor:'lightgrey', paddingLeft:'40px', backgroundImage:`url(${champPassword})`, backgroundRepeat:'no-repeat', backgroundPosition:'8px center',backgroundSize:'20px', color:'black'}}/><br></br> 
                {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}<br></br>

                <input type="checkbox" style={{marginLeft:'-120px'}} />
                <label style={{ color: 'black', marginLeft:'10px' }}>Se souvenir de moi</label> <br></br> <br/>


                <button type="submit" style={{backgroundColor:'rgb(39, 102, 49)', color: 'white', borderRadius:'20px', width:'100px', height:'30px', border:'none', outline:'none', display:'flex', alignItems:'center', justifyContent:'center' }} >Connexion</button><br></br>
                <p style={{color: 'black'}}>Pas encore de compte ?<a href="./Inscription" style={{color:'rgba(51, 128, 63, 1)', textDecoration:'none'}} > S'inscrire</a></p> 

            </form>
        </div>
        </center>
        </>
    )
}

export default Login;


