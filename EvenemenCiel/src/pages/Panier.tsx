import React, { useState, useEffect } from 'react';
import {Event} from '../scripts/Event';
import Header from '../components/Header';
import {useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



const Panier: React.FC = () => {

  //Mise en place des Items du Panier 
  const [items, setItems] = useState<Event[]>([]);
  //Mise en place de la navigation
  const nav = useNavigate();
  //Mise en place du total du panier
  const total = items.reduce((acc, item) => acc + (item.price * item.nb_ticket), 0)  ;
  
  
  useEffect(() => {

    //-----------------------Récupération des Items du Panier-----------------------
    const storedItems = localStorage.getItem('panierItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('Panier récupéré depuis le localStorage :' , JSON.parse(storedItems));
    }

  }, []);

  //Fonction pour supprimer un item du panier
  const removeItemFromPanier = (id: number) => {
    //Suppression de l'item dans le panier
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
    //Suppression de la quantité de l'item dans le panier
    const quantityItem = "places_remaining_" + id;
    localStorage.removeItem(quantityItem);
  };

  return (
    <div className="principale_container">
      <Header />
      <div className="container">
        <div className='panier'>
          <h1>Panier</h1>
          <ul>
            {items.map(item => (
              <li>
                {item.title} le {item.date} - {item.price * item.nb_ticket}€  ({item.nb_ticket} places)
                <button onClick={() => removeItemFromPanier(item.id)}>Supprimer</button>
                <input 
                  type="number"
                  value={item.nb_ticket}
                  min="1"
                  max={item.max_attendees}
                  onChange={(e) => {
                    //Cas où la quantité est nulle
                    if (parseInt(e.target.value) <= 0) {
                      alert("Nombre minimal: 1 !");
                      e.target.value = "1";
                    }
                    //Cas où la quantité est supérieure à la quantité maximale
                    if (parseInt(e.target.value) > item.max_attendees) {
                      alert("Nombre de places max : "+item.max_attendees+" !");
                      return;
                    }
                    const newItems = items.map(i => {
                      if (i.id === item.id) {
                        return {...i, nb_ticket: parseInt(e.target.value)};
                      }
                      return i;
                    });
                    setItems(newItems);
                    localStorage.setItem('panierItems', JSON.stringify(newItems));
                  }}
                ></input>
              </li>
            ))}
          </ul>
          <p>Total : {total}€</p>
        </div>
        <div>
          <button onClick={() => nav('/')}>Continuer mes achats</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panier;