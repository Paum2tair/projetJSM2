import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Panier from './pages/Panier';
import Details from './pages/Details';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<> <Accueil/><Footer/> </>} />
          <Route path="/details" element={<> <Details/> </>} />
          <Route path="/panier" element={<> <Panier/> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
