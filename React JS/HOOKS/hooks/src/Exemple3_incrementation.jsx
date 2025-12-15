import { useState } from "react";


const Increment_dec_ini = () => {
    const [compte1, setCompte1] = useState(0); 
    const [compte2, setCompte2] = useState(100);// toujours a l'interieur du composant/fonction
    const [compte3, setCompte3] = useState(20);
    const incrementhandler = () =>(
    setCompte1(compte1 + 1) )

    const decrementhandler = () =>(
    setCompte2(compte2 - 1) )

    const initialiser = () =>(
    setCompte3(0) )

    return(
        <>
        {/* <h1>{console.log(compte)}</h1>
        {console.log(compte+1)} */}

        <h1>Compteur : </h1>
        <button onClick={incrementhandler}>Incrementer</button>
        {console.log(compte1)}<br></br>
        {compte1}<br></br> <br></br>

        <h1>Compteur : </h1>
        <button onClick={decrementhandler}>Decrementer</button>
        {console.log(compte2)}<br></br>
        {compte2}

        <h1>Compteur : </h1>
        <button onClick={initialiser}>Initialiser</button>
        {console.log(compte3)}<br></br>
        {compte3}
        </>
    )

}
export default Increment_dec_ini