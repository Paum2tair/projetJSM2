import Etoiles from "../components/Etoiles";
import Header from "../components/Header";
import "../assets/css/notfound.css"
import { useNavigate } from "react-router-dom";

function NotFound() {

    // Permet la navigation entre les pages
    const nav = useNavigate();

    return (
        <>
            <div className="principale_container">
                <Header />
                <Etoiles />
                {/* Affichage de l'erreur et bouton de retour */}
                <h1 className="titre position heightte">Erreur <span className="error">404</span> : Page non trouvée</h1>
                <p className="p position heightt">Retour à l'accueil : <span className="spann" onClick={() => nav("/")}>Accueil</span><img src="/click.png" className="img"></img></p>
                
            </div>   
        </>
    );
};

export default NotFound;