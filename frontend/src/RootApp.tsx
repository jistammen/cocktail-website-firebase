// RootApp.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CocktailDetails from './pages/cocktailDetails';

function RootApp() {
  return (
    <Router>
      <Routes>
        {/* The homepage (cocktail list) */}
        <Route path="/" element={<App />} />

        {/* The cocktail details page */}
        <Route path="/cocktail/:cocktailName" element={<CocktailDetails />} />
      </Routes>
    </Router>
  );
}

export default RootApp;
