import React, { useState, useEffect } from 'react';
import { Event } from '../scripts/Event';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Etoiles from '../components/Etoiles';
import '../assets/css/panier.css';

interface PanierProps {
   setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}
const Panier: React.FC<PanierProps> = ({setEvents}) => {
  //Mise en place des Items du Panier
  const [items, setItems] = useState<Event[]>([]);
  //Mise en place de la navigation
  const nav = useNavigate();
  //Mise en place du total du panier
  const total = items.reduce((acc, item) => acc + (item.price * item.nb_ticket), 0);
  //État pour la confirmation de commande
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  //État pour les produits commandés
  const [orderedItems, setOrderedItems] = useState<Event[]>([]);
  //État pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState('');
  //État pour le total des places
  const [totalTickets, setTotalTickets] = useState(0);
  //État pour le prix total
  const [totalPrice, setTotalPrice] = useState(0);

  const events = JSON.parse(localStorage.getItem('data') || '[]');


  useEffect(() => {
    //-----------------------Récupération des Items du Panier-----------------------
    let foundEvents = events.filter((event: { nb_ticket: number }) => event.nb_ticket !== 0);
    const storedItems = foundEvents;
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  //Fonction de mise à jour du JSON
  const updateJson = async (event: any) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          id: Number(event.id)
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const updatedEvent = await response.json();
      console.log("Événement mis à jour :", updatedEvent);
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return false;
    }
  }

  //Fonction de validation du panier
  const validatePanier = async () => {

    // Sauvegarder les items pour l'affichage de confirmation
    const itemsToOrder = [...items];
    const totalTicketsCount = itemsToOrder.reduce((acc, item) => acc + item.nb_ticket, 0);
    const totalPriceSum = itemsToOrder.reduce((acc, item) => acc + (item.price * item.nb_ticket), 0);

    let allUpdatesSuccessful = true;

    // Mettre à jour chaque événement
    for (const item of items) {
      const success = await updateJson(item);
      if (!success) {
        allUpdatesSuccessful = false;
        setErrorMessage('Une erreur est survenue lors de la mise à jour des événements.');
        break;
      }

      events[item.id].max_attendees -= item.nb_ticket;
      events[item.id].nb_ticket = 0;
    }

    // Mis à jour du localStorage
    if (allUpdatesSuccessful) {
      localStorage.setItem("data", JSON.stringify(events)); 
      setItems([]);
      setOrderConfirmed(true);
      setOrderedItems(itemsToOrder);
      setTotalTickets(totalTicketsCount);
      setTotalPrice(totalPriceSum);
    }
  }

  //Fonction pour supprimer un item du panier
  const removeItemFromPanier = (id: number) => {
    //Suppression de l'item dans le panier
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    events[id].nb_ticket = 0;
    setEvents(events);

    localStorage.setItem("data", JSON.stringify(events));
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
    const newItems = items.map(i => {
      if (i.id === id) {
        return { ...i, nb_ticket: newQuantity };
      }
      return i;
    });
    setItems(newItems);
    events[id].nb_ticket = newQuantity;
    setEvents(events);

    localStorage.setItem("data", JSON.stringify(events));
  };

  // Fonction pour réinitialiser l'affichage et revenir à la liste des événements
  const backToShopping = () => {
    setOrderConfirmed(false);
    nav('/');
  };

  return (
    <div className="principale_container">
      <Header />
      <Etoiles />
      <div className="container">
        {!orderConfirmed ? (
          <>
            <div className='panier'>
              <h2>Panier</h2>

              {/* Affichage des éléments du panier */}
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
                            </svg> 
                            {/* Bouton pour enlever des places de l'évènement depuis le panier */}
                            <button
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
                            {/* Bouton pour augmenter le nombre de place d'un évènement depuis le panier */}
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
                          {/* Affichage du sous-prix total */}
                          <div className="item-subtotal">
                            <p>Sous-total: {(item.price * item.nb_ticket).toFixed(2)}€</p>
                          </div>

                        </div>

                        {/* Bouton de suppression de l'évènement dans le panier */}
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

              {/* Affichage du prix total */}
              <div className="cart-total">
                <p>Total : <span>{total.toFixed(2)}€</span></p>
              </div>
            </div>

            {/* Bouton de passage de commande et continuer les achats */}
            <div className="cart-actions">
              {items.length > 0 && (
                <button className="button-19" onClick={() => validatePanier()}>
                  Passer la commande
                </button>
              )}
              <button className="button-23" onClick={() => nav('/')}>
                Continuer mes achats
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        ) : (
          <div className="confirmation">
          <div className="order-confirmation">
            <div className="confirmation-header">
              <h2>Commande confirmée !</h2>
              <p className="success-message">Votre commande a été traitée avec succès.</p>
            </div>
            {/* Si validé, récapitulation de la commande passée */}
            <div className="order-details">
              <h3>Récapitulatif de votre commande :</h3>
              <ul className="ordered-items-list">
                {orderedItems.map((item, index) => (
                  <li key={index} className="ordered-item">
                    <span className="item-name">{item.title}</span> 
                    <span className="item-quantity">; Quantité: {item.nb_ticket}</span>
                    <span className="item-price">; Prix: {(item.price * item.nb_ticket).toFixed(2)}€</span>
                  </li>
                ))}
              </ul>
              {/* Nombre de places prises et montant */}
              <div className="order-summary">
                <p>Total des places : <strong> {totalTickets}</strong></p>
                <p>Montant total : <strong> {totalPrice.toFixed(2)}€</strong></p>
              </div>
            </div>
               </div>
            {/* Bouton de retour à la boutique */}
            <div className="confirmation-actions">
              <button className="button-19" onClick={backToShopping}>
                Retourner à la boutique
              </button>
            </div>
       
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Panier;