import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  // Récupérer l'état du thème depuis localStorage au chargement du composant
  // Si la valeur n'existe pas encore, on utilise false par défaut
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  
  const allerVersHome = () => {
    navigate('/');
  };
  
  const themeChange = () => {
    const newThemeValue = !isDark;
    setIsDark(newThemeValue);
    // Sauvegarder le nouvel état dans localStorage
    localStorage.setItem("isDarkTheme", JSON.stringify(newThemeValue));
  };

  useEffect(() => {
    if(isDark){
      document.documentElement.style.setProperty("--couleur_fond", "#417590");
      document.documentElement.style.setProperty("--footer_contour","#417590");
      document.documentElement.style.setProperty("--footer_interieur","#ffffff");
      document.documentElement.style.setProperty("--couleur_bdr", "#ADD1E3");
      document.documentElement.style.setProperty("--couleur_lune_2", "#abadb5");
      document.documentElement.style.setProperty("--couleur_tites_titre", "#0f232e");
    }else{
      document.documentElement.style.setProperty("--couleur_fond", "#ADD1E3");
      document.documentElement.style.setProperty("--footer_contour","#ffffff");
      document.documentElement.style.setProperty("--footer_interieur","#417590");
      document.documentElement.style.setProperty("--couleur_bdr", "#417590");
      document.documentElement.style.setProperty("--couleur_lune_2", "#B0D4E0");
      document.documentElement.style.setProperty("--couleur_tites_titre", "#417590");
    }
  },[isDark]);

  return (
    <div className='header'>
      <div className='them-container'>
        <img src={isDark ? "/sun.png" : "/moon.png"} onClick={themeChange}></img>
      </div>
      <div className={`circle ${isDark ? "circle_color_dark" : "circle_color_light"}`} onClick={allerVersHome} title="Accueil">
        <h1>EvenemenCiel</h1>
      </div>
      <div className='panier-container'>
        <a href='/panier'><img src="/panier.png"></img></a>
      </div>
    </div>
  );
};

export default Header;