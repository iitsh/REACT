import { Route, Routes } from "react-router-dom";
import Menu from "../Menu/Menu.jsx";
import Accueil from "../pages/Accueil.jsx";
import Login from "../pages/Login.jsx";
import Inscription from "../pages/Inscription.jsx";
import Myapp2 from "./composants/Myapp2.jsx";

function Myapp() {
    return (
        <div style={{ paddingTop: 56 }}>
            <Menu />
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Inscription" element={<Inscription />} />
                <Route path="*" element={<Accueil />} />
            </Routes>
        </div>
    );
}

export default Myapp;