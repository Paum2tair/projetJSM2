import React, { useState, useEffect } from 'react';
import {Event} from '../scripts/Event';



const Panier: React.FC = () => {

  //Mise en place des Items du Panier 
  const [items, setItems] = useState<Resa[]>([]);
  //Mise en place des erreurs
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {

    //-----------------------Récupération des Items du Panier-----------------------
    const storedItems = localStorage.getItem('panierItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('Panier récupéré depuis le localStorage :' , JSON.parse(storedItems));
    }

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
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('panierItems', JSON.stringify(newItems));
  };

  return (
    <div className='panier'>
      <h1>Panier</h1>
      <ul>
        {items.map(item => (
          <li>
            {item.title} - {item.price}€
            <button onClick={() => removeItemFromPanier(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {addItemToPanier1(); console.log("On ajoute 1")} }>Ajouter Article 1</button>
      <button onClick={() => {addItemToPanier2(); console.log("On ajoute 2")} }>Ajouter Article 2</button>
      <button onClick={() => {removeItemFromPanier(1); console.log("On efface 1")} }>Effacer tout 1</button>
      <button onClick={() => {removeItemFromPanier(2); console.log("On efface 2")} }>Effacer tout 2 </button>

    </div>
  );
};

export default Panier;