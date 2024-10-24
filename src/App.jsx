import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <NavBar /> {/* Always display NavBar */}
      <Routes>
        {/* Define routes for the different pages */}
        <Route path="/" element={<HomePage />} /> {/* Homepage with products */}
        <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
      </Routes>
    </Router>
  );
}

export default App;
