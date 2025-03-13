import React, { useState, useEffect } from 'react';
import { Event } from '../scripts/Event';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Etoiles from '../components/Etoiles';
import '../assets/css/panier.css';

const Panier: React.FC = () => {
  //Mise en place des Items du Panier 
  const [items, setItems] = useState<Event[]>([]);
  //Mise en place de la navigation
  const nav = useNavigate();
  //Mise en place du total du panier
  const total = items.reduce((acc, item) => acc + (item.price * item.nb_ticket), 0);

  useEffect(() => {
    //-----------------------Récupération des Items du Panier-----------------------
    const storedItems = localStorage.getItem('panierItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('Panier récupéré depuis le localStorage :', JSON.parse(storedItems));
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

  // Fonction pour augmenter la quantité
  const increaseQuantity = (item: Event) => {
    if (item.nb_ticket < item.max_attendees) {
      updateItemQuantity(item.id, item.nb_ticket + 1);
    } else {
      alert(`Nombre de places max : ${item.max_attendees} !`);
    }
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = (item: Event) => {
    if (item.nb_ticket > 1) {
      updateItemQuantity(item.id, item.nb_ticket - 1);
    } else {
      alert("Nombre minimal: 1 !");
    }
  };

  // Fonction générique pour mettre à jour la quantité
  const updateItemQuantity = (id: number, newQuantity: number) => {
    let max_attendees = 0;
    const newItems = items.map(i => {
      if (i.id === id) {
        max_attendees = i.max_attendees;
        return { ...i, nb_ticket: newQuantity };
      }
      return i;
    });
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
    localStorage.setItem("places_remaining_" + id, (max_attendees - newQuantity).toString());
  };

  return (
    <div className="principale_container">
      <Header />
      <Etoiles />
      <div className="container">
        <div className='panier'>
          <h2>Panier</h2>

          {items.length === 0 ? (
            <p className="empty-cart">Votre panier est vide</p>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="titre_text">
                   
                    <img className='image_title' src={`/images/${item.title}.jpg`} alt={item.title} ></img> <h3>{item.title}</h3>
                  </div>
                  <div className="item-details">
                    <div className="item-info">

                      <p className="item-date">Date: {item.date}</p>
                      <p className="item-price">Prix: {item.price}€</p>
                    </div>

                    <div className="quantity-control">
                      <label className="block mb-1 text-sm">Quantité</label>
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
                          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                        </svg> <button
                          className="decrease-button"
                          type="button"
                          onClick={() => decreaseQuantity(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                          </svg>
                        </button>



                        <input
                          type="number"
                          className="quantity-input"
                          value={item.nb_ticket}
                          min="1"
                          max={item.max_attendees}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (isNaN(value) || value <= 0) {
                              alert("Nombre minimal: 1 !");
                              updateItemQuantity(item.id, 1);
                            } else if (value > item.max_attendees) {
                              alert(`Nombre de places max : ${item.max_attendees} !`);
                            } else {
                              updateItemQuantity(item.id, value);
                            }
                          }}
                        />

                        <button
                          className="increase-button"
                          type="button"
                          onClick={() => increaseQuantity(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                          </svg>
                        </button>
                      </div>
                      <div className="item-subtotal">
                        <p>Sous-total: {(item.price * item.nb_ticket).toFixed(2)}€</p>
                      </div>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() => removeItemFromPanier(item.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-total">
            <p>Total : <span>{total.toFixed(2)}€</span></p>
          </div>
        </div>

        <div className="cart-actions">
          <button className="continue-shopping" onClick={() => nav('/')}>
            Continuer mes achats
          </button>
          {items.length > 0 && (
            <button className="checkout-button">
              Passer la commande
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panier;