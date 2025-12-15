import { useState } from "react";


const Decrement = () => {
    const [compte, setCompte] = useState(100); // toujours a l'interieur du composant/fonction
    const decrementhandler = () =>(
    setCompte(compte - 1) )

    return(
        <>
        {/* <h1>{console.log(compte)}</h1>
        {console.log(compte+1)} */}

        <h1>Compteur : </h1>
        <button onClick={decrementhandler}>Decrementer</button>
        {console.log(compte)}<br></br>
        {compte}
        </>
    )

}
export default Decrement