const addition = (a, b) => a + b
const x = 'toto'

const MonComposant = () => {
    return(
        <>
         <h1>{console.log(addition(3,4))}</h1>         {/*inspecter -> console */}
        {x} {/* affichage de la variable dans la page*/}
        </>
    )
}
export default MonComposant