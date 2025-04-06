import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { Cocktail } from '../types';

function CocktailDetails() {
  const { cocktailName } = useParams(); // Gets the cocktail name from the URL
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!cocktailName || !API_BASE) return;

    const fetchCocktail = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cocktails?name=${cocktailName}`);
        const data = await res.json();
        console.log(data);

        // If the endpoint returns an array, pick the first item
        if (Array.isArray(data) && data.length > 0) {
          setCocktail(data[0]);
        } else if (data && data.name) {
          setCocktail(data);
        }
      } catch (error) {
        console.error('Error fetching cocktail:', error);
      }
    };

    fetchCocktail();
  }, [cocktailName, API_BASE]);

  if (!cocktail) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading cocktail details...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <img
          src={cocktail.image}
          alt={cocktail.name}
          style={{
            maxWidth: '150px',
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Box>

      {/* Cocktail Name */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        {cocktail.name}
      </Typography>

      {/* History */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        History:
      </Typography>
      <Typography>{cocktail.history}</Typography>

      {/* Reco-my-dations */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Reco-my-dations:
      </Typography>
      <Typography>{cocktail.recommendations}</Typography>

      {/* Instructions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Instructions:
      </Typography>
      <Typography>{cocktail.instructions}</Typography>

      {/* Ingredients */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Ingredients:
      </Typography>
      {cocktail.ingredients.map((ing, i) => (
        <Typography key={i}>
          - {ing.amount} of {ing.ingredient}
        </Typography>
      ))}
    </Container>
  );
}

export default CocktailDetails;
