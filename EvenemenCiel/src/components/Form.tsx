import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../scripts/Event";

interface FormProps {
  eventId: number;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

interface FormData {
  name: string;
  email: string;
  places: number;
}

interface FormErrors {
  name: string;
  email: string;
  places: string;
}

const Form: React.FC<FormProps> = ({ eventId, events, setEvents }) => {
  const navigate = useNavigate();
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    places: 1
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    places: ""
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const maxAvailablePlaces = events[eventId].max_attendees - events[eventId].nb_ticket;

  // Validation des champs du formulaire
  useEffect(() => {
    const validateForm = () => {
      const errors: FormErrors = {
        name: "",
        email: "",
        places: ""
      };
      
      // Validation du nom
      if (formData.name.trim().length === 0) {
        errors.name = "Le nom est requis";
      } else if (formData.name.trim().length < 2) {
        errors.name = "Le nom doit contenir au moins 2 caractères";
      }
      
      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim().length === 0) {
        errors.email = "L'email est requis";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Veuillez entrer une adresse email valide";
      }
      
      // Validation du nombre de places
      if (formData.places <= 0) {
        errors.places = "Vous devez réserver au moins 1 place";
      } else if (formData.places > maxAvailablePlaces) {
        errors.places = `Vous ne pouvez pas réserver plus de ${maxAvailablePlaces} place${maxAvailablePlaces > 1 ? 's' : ''}`;
      }
      
      setFormErrors(errors);
      
      // Le formulaire est valide si tous les champs sont remplis et sans erreurs
      const isValid = 
        formData.name.trim().length >= 1 && 
        emailRegex.test(formData.email) && 
        formData.places > 0 && 
        formData.places <= maxAvailablePlaces;
      
      setIsFormValid(isValid);
    };
    
    validateForm();
  }, [formData, maxAvailablePlaces]);

  // Gestion des changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "places" ? Number(value) : value
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event2: React.FormEvent<HTMLFormElement>) => {
    event2.preventDefault();

    // Vérification finale avant soumission
    if (!isFormValid) {
      return;
    }

    // Mettre à jour le nombre de tickets
    const updatedEvents = [...events];
    updatedEvents[eventId] = {
      ...updatedEvents[eventId],
      nb_ticket: updatedEvents[eventId].nb_ticket + formData.places
    };

    // Mettre à jour l'état et le stockage local
    setEvents(updatedEvents);
    localStorage.setItem("data", JSON.stringify(updatedEvents));
    setReservationSuccess(true);
  };

  // Afficher un message de confirmation si la réservation est réussie
  if (reservationSuccess) {
    return (
      <div className="form success-message">
        <h3>Réservation confirmée !</h3>
        <p>Merci pour votre réservation de {formData.places} place{formData.places > 1 ? 's' : ''}.</p>
        <p>Votre commande a été enregistrée avec succès.</p>
        <button onClick={() => navigate("/panier")}>Voir mon panier</button>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="form">
      <h3>Réservation de l'événement</h3>
      <p>Places restantes : {maxAvailablePlaces}</p>

      <form onSubmit={handleSubmit} className="submit_f">
        <div className="element">
          <label htmlFor="name">Nom :</label>
          <input 
            type="text" 
            className="textarea" 
            id="name" 
            name="name" 
            placeholder="Nom" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
        </div>
        
        <div className="element">
          <label htmlFor="email">Email :</label>
          <input 
            type="email" 
            className="textarea" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>
        
        <div className="element">
          <label htmlFor="places">Nombre de places :</label>
          <input
            className="number"
            type="number"
            id="places"
            name="places"
            placeholder="1"
            value={formData.places}
            onChange={handleInputChange}
            min="1"
            max={maxAvailablePlaces}
            required
          />
  
        </div>
        {formErrors.name && (
            <div className="error-message" style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
              {formErrors.name}
            </div>
          )}
               {formErrors.email && (
            <div className="error-message" style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
              {formErrors.email}
            </div>
          )}
          {formErrors.places && (
            <div className="error-message" style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
              {formErrors.places}
            </div>
          )}

        <button type="submit" className="submit" disabled={!isFormValid}>
          Valider
        </button>
      </form>
    </div>
  );
};

export default Form;