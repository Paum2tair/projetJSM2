import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Panier from './pages/Panier';
import Details from './pages/Details';
import Test from './components/test';
import { Event } from './scripts/Event';
import { useState } from 'react';

function App() {
 const [events, setEvents] = useState<Event[]>(() => {
  const savedData = localStorage.getItem("data");
  return savedData ? JSON.parse(savedData) : [];
});
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<> <Accueil events={events} setEvents={setEvents} /> </>} />
          <Route path="/details/:id" element={<> <Details events={events} /> </>} />
          <Route path="/panier" element={<> <Panier/> </>} />          
          <Route path="/test" element={<> <Test/> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
