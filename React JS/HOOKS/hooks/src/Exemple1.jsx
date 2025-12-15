// const [etat, setEtat] = useState(valeurInitiale);
import { useState } from "react";


const Compteur = () => {
    const [compte, setCompte] = useState(0); // toujours a l'interieur du composant/fonction

    return(
        <>
        <h1>{console.log(compte)}</h1>
        {console.log(compte+1)}
        </>
    )

}
export default Compteur