import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  
  const allerVersHome = () => {
    navigate('/');
  };
  
  const themeChange = () => {
    setIsDark(!isDark);
    if(isDark){
      document.documentElement.style.setProperty("--couleur_fond", "#417590");
      document.documentElement.style.setProperty("--footer_contour","#417590");
      document.documentElement.style.setProperty("--footer_interieur","#ffffff");
      document.documentElement.style.setProperty("--couleur_bdr", "#ADD1E3");
    }else{
      document.documentElement.style.setProperty("--couleur_fond", "#ADD1E3");
      document.documentElement.style.setProperty("--footer_contour","#ffffff");
      document.documentElement.style.setProperty("--footer_interieur","#417590");
      document.documentElement.style.setProperty("--couleur_bdr", "#417590");
    }
 
    console.log("change",document.documentElement.style.getPropertyValue("--couleur_bdr"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

    return (

      <div className='header'>
          <div className={`circle ${isDark ? "circle_color_dark" : "circle_color_light"}`} onClick={allerVersHome} title="Accueil">
            <h1>EvenemenCiel</h1>
          </div>
          <div className='panier-container'>
            <a href='/panier'><img src="/panier.png"></img></a>
          </div>
          <div className='them-container'>
            <img src={isDark ? "/sun.png" : "/moon.png"} onClick={themeChange}></img>
          </div>
      </div>

    );
  };

  export default Header;
