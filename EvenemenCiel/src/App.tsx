import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Panier from './pages/Panier';
import Details from './pages/Details';
import Test from './components/test';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<> <Accueil/> </>} />
          <Route path="/details/:id" element={<> <Details/> </>} />
          <Route path="/panier" element={<> <Panier/> </>} />          
          <Route path="/test" element={<> <Test/> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
