const Header = () => {

    return (

      <div className='header'>
          <div className='circle'>
            <h1>EvenemenCiel</h1>
          </div>
          <div className='panier-container'>
            <a href='/panier'><img src="/panier.png"></img></a>
          </div>
      </div>

    );
  };

  export default Header;
