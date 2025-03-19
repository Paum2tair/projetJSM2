import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/accueil.css'
import Accueil from './pages/Accueil';
import Panier from './pages/Panier';
import Details from './pages/Details';
import { Event } from './scripts/Event';
import { useEffect, useState } from 'react';
import { getAllEvents } from './scripts/GetAll';
import NotFound from './pages/NotFound';

function App() {
  const [events, setEvents] = useState<Event[]>(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });
  
  useEffect(() => {
    if (events.length > 0) return; // Évite de refaire l'appel si les données sont déjà en mémoire
  
    getAllEvents()
      .then((data: Event[]) => {
        localStorage.setItem("data", JSON.stringify(data));
        setEvents(data);
      })
      .catch(error => setError(error.message));
  }, [events]); // Dépendance sur `events` pour éviter des appels inutiles

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<> <Accueil events={events}/> </>} />
          <Route path="/details/:id" element={<> <Details events={events} setEvents={setEvents}/> </>} />
          <Route path="/panier" element={<> <Panier setEvents={setEvents} /> </>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
function setError(message: any): any {
  throw new Error(message);
}

