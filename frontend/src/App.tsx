import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import CategoryBar from './components/CategoryBar';
import CocktailGrid from './components/CocktailGrid';
import { Cocktail } from './types';

function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>('All');

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_BASE) {
      console.error('API_BASE is not defined');
      return;
    }
    fetch(`${API_BASE}/api/cocktails`)
      .then((res) => res.json())
      .then((data: Cocktail[]) => setCocktails(data))
      .catch((err) => console.error('Error:', err));
  }, [API_BASE]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSideCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTopCategorySelect = (category: string) => {
    setSelectedTopCategory(category);
  };

  // Normalize special characters like é to e
  const normalizeString = (str: string): string => {
    return str
      .normalize('NFD')                // Decompose characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase();                  // Case-insensitive comparison
  };

  const filteredCocktails = cocktails.filter((cocktail) => {
    // Filter by left sidebar category (e.g., "Classic", "Sour", etc.)
    if (selectedCategory !== 'All' && normalizeString(cocktail.category) !== normalizeString(selectedCategory)) {
      return false;
    }

    // Filter by top category (e.g., "Vodka", "Tequila", etc.)
    if (selectedTopCategory !== 'All' && normalizeString(cocktail.base_spirit) !== normalizeString(selectedTopCategory)) {
      return false;
    }

    // Filter by search term
    const normalizedSearch = normalizeString(searchTerm.trim());
    if (normalizedSearch !== '') {
      const nameMatch = normalizeString(cocktail.name).includes(normalizedSearch);
      const ingredientMatch = cocktail.ingredients.some((ingredient) =>
        normalizeString(ingredient.ingredient).includes(normalizedSearch)
      );
      return nameMatch || ingredientMatch;
    }

    return true;
  });

  const handleResetSearch = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTopCategory('All');
  };  

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetSearch={handleResetSearch}
      />
      <SideBar
        selectedCategory={selectedCategory}
        onCategorySelect={handleSideCategorySelect}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 6,
          p: 3,
        }}
      >
        <CategoryBar
          selectedCategory={selectedTopCategory}
          onCategorySelect={handleTopCategorySelect}
        />

        <Toolbar variant="dense" />

        <Container>
          <CocktailGrid cocktails={filteredCocktails} />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
