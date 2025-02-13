import "../assets/css/form.css"

const Form = () => {
    return (
      <div className="form">
        <h3>Réservation de l'événement</h3>
  
        <form action="/submit" method="POST">
          <input type="text" id="name" name="name" placeholder="Name" required />
          <input type="email" id="email" name="email" placeholder="Email" required />
          <input type="number" id="places" name="places" placeholder="1" min="1" required />
  
          <button type="submit">Valider</button>
        </form>
      </div>
    );
  };
  
  export default Form;
  