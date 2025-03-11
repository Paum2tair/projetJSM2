import {useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  
  const allerVersHome = () => {
    navigate('/');
  };

    return (

      <div className='header'>
          <div className='circle' onClick={allerVersHome} title="Accueil">
            <h1>EvenemenCiel</h1>
          </div>
          <div className='panier-container'>
            <a href='/panier'><img src="/panier.png"></img></a>
          </div>
      </div>

    );
  };

  export default Header;
