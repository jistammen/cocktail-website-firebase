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

  const filteredCocktails = cocktails.filter((cocktail) => {
    // Filter by left sidebar category (e.g., "Classic", "Sour", etc.)
    if (selectedCategory !== 'All') {
      if (cocktail.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }
    
    // Filter by top category (e.g., "Vodka", "Tequila", etc.)
    if (selectedTopCategory !== 'All') {
      if (cocktail.base_spirit.toLowerCase() !== selectedTopCategory.toLowerCase()) {
        return false;
      }
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      return cocktail.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return true;
  });  

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
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
