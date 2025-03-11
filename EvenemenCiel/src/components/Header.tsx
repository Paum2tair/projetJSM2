import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  
  const allerVersHome = () => {
    navigate('/');
  };
  
  const themeChange = () => {
    // const newTheme = isDark ? "light" : "dark";
    // document.body.classList.toggle("dark-theme");
    // localStorage.setItem("theme", newTheme);
    // window.dispatchEvent(new Event("themeChanged"));
    setIsDark(!isDark);
    document.documentElement.style.setProperty("--couleur_fond", "#417590"); // Fond sombre
    document.documentElement.style.setProperty("--couleur_bdr", "#ADD1E3"); // Fond sombre
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
