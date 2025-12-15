import { Link } from 'react-router-dom'
export default function Menu() {
    return (
        <div style={{ padding: '15px', borderBottom: '1px solid #ffffffff', textAlign: 'center' , backgroundColor: 'rgb(32, 68, 143)', margin: 0, width: '100%'}}>
            <Link style={{ marginRight: 60, textDecoration: 'none', color: 'black', fontWeight: 'bold' ,color:'white'}} to="/">Accueil</Link>
            <Link style={{ marginRight: 60, textDecoration: 'none', color: 'black', fontWeight: 'bold',color:'white' }} to="/login">Connexion</Link>
            <Link to="/Inscription" style={{textDecoration: 'none', color: 'black', fontWeight: 'bold',color:'white'}}>Inscription</Link>
        </div>
    )
}