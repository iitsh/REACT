import { Route, Routes } from "react-router-dom"
import Login from "../../pages/Login"
import Accueil from "../../pages/Accueil"
import Inscription from "../../pages/Inscription"

const Main = () => {
    return (
        <div style={{ display: 'flex', padding: 12 }}>
            <aside style={{ width: 160, background: 'white', border: '1px solid #000000ff', borderRadius: 6, padding: 8, color: 'black' }}> Sidebar gauche
                <p style={{ marginTop: 100, color: 'black' }}>Bonjour</p>
            </aside>
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Inscription" element={<Inscription />} />
                </Routes>
            </main>
            <aside style={{ width: 160, background: 'white', border: '1px solid #000000ff', borderRadius: 6, padding: 8, color: 'black' }}>Sidebar droite
                <p style={{ marginTop: 100, color: 'black' }}>Bonsoir</p>
            </aside>
        </div>
    )}

export default Main