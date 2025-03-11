import React, { useState, useEffect } from 'react';
import {Event} from '../scripts/Event';
import Header from '../components/Header';
import { Form, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



const Panier: React.FC = () => {

  //Mise en place des Items du Panier 
  const [items, setItems] = useState<Event[]>([]);
  //Mise en place des erreurs
  const [error, setError] = useState<string | null>(null);
  //Mise en place de la navigation
  const nav = useNavigate();
  
  
  useEffect(() => {

    //-----------------------Récupération des Items du Panier-----------------------
    const storedItems = localStorage.getItem('panierItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('Panier récupéré depuis le localStorage :' , JSON.parse(storedItems));
    }

  }, []);

    //-----------------------A retirer-----------------------

  
  const addItemToPanier1 = () => {
    const newItem = {  
      id: 1,
      title: "titre1",
      description: "descr1",
      date: "date1",
      location: "location1",
      category: "category1",
      image: "image1",
      organizer: "organizer1",
      max_attendees: 1,
      price: 15,
    }
    const newItems = [...items, newItem];
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
  };

  const addItemToPanier2 = () => {
    const newItem = {
      id: 2,
      title: "titre2",
      description: "descr2",
      date: "date2",
      location: "location2",
      category: "category2",
      image: "image2",
      organizer: "organizer2",
      max_attendees: 2,
      price: 25,
    }

    const newItems = [...items, newItem];
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
  };
  
  const removeItemFromPanier = (id: number) => {
    //Suppression de l'item dans le panier
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
    //Suppression de la quantité de l'item dans le panier
    const quantityItem = "places_remaining_" + id;
    localStorage.removeItem(quantityItem);
  };


  const modifyItemFromPanier = (id: number) => {
    //Suppression de l'item dans le panier
    const newItems = items.filter(item => item.id !== id);
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
                {item.title} - {item.price}€
                <button onClick={() => removeItemFromPanier(item.id)}>Supprimer</button>
                <button onClick={() => nav(`/details/${item.id}`) }>Modifier</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panier;