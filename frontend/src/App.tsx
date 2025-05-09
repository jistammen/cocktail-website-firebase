import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const leftCategory = params.get('category') || 'All';
    const topCategory = params.get('base') || 'All';
    setSearchTerm(search);
    setSelectedCategory(leftCategory);
    setSelectedTopCategory(topCategory);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedTopCategory !== 'All') params.set('base', selectedTopCategory);
    navigate({ search: params.toString() }, { replace: true });
  }, [searchTerm, selectedCategory, selectedTopCategory, navigate]);

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

  const normalizeString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase();
  };

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (selectedCategory !== 'All' && normalizeString(cocktail.category) !== normalizeString(selectedCategory)) {
      return false;
    }
    if (selectedTopCategory !== 'All' && normalizeString(cocktail.base_spirit) !== normalizeString(selectedTopCategory)) {
      return false;
    }
    const normalizedSearch = normalizeString(searchTerm.trim());
    if (normalizedSearch !== '') {
      const nameMatch = normalizeString(cocktail.name).includes(normalizedSearch);
      const spiritMatch = normalizeString(cocktail.base_spirit).includes(normalizedSearch);
      const ingredientMatch = cocktail.ingredients.some((ingredient) =>
        normalizeString(ingredient.ingredient).includes(normalizedSearch)
      );
      return nameMatch || spiritMatch || ingredientMatch;
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
