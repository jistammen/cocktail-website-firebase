import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { Cocktail } from '../types';

function CocktailDetails() {
  const { cocktailName } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!cocktailName || !API_BASE) return;

    const fetchCocktail = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cocktails?name=${encodeURIComponent(cocktailName)}`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setCocktail(data[0]);
        } else if (data && data.name) {
          setCocktail(data);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.error('Error Fetching Cocktail:', error);
        setCocktail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktail();
  }, [cocktailName, API_BASE]);

  const renderBackButton = () => (
    <button
      onClick={() => navigate(`/${location.search}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        background: '#e65c3d',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      ← Back to Home
      <img
        src="/cascade_cocktails_icon.svg"
        alt="Cascade Icon"
        style={{ width: '20px', height: '20px' }}
      />
    </button>
  );

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading Cocktail Details...</Typography>
      </Container>
    );
  }

  if (!cocktail) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Cocktail Not Found.</Typography>
        <Box sx={{ mt: 2 }}>{renderBackButton()}</Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ mb: 3 }}>{renderBackButton()}</Box>

      <Box sx={{ textAlign: 'center', mb: 2 }}>
        {cocktail.image && (
          <img
            src={cocktail.image}
            alt={cocktail.name}
            style={{
              maxWidth: '150px',
              width: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        {cocktail.name}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Ingredients:
      </Typography>
      {cocktail.ingredients.map((ing, i) => (
        <Typography key={i}>
          - {ing.amount} of {ing.ingredient}
        </Typography>
      ))}

      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Instructions:
      </Typography>
      <Typography>{cocktail.instructions}</Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        Recommendations:
      </Typography>
      <Typography>{cocktail.recommendations}</Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
        History:
      </Typography>
      <Typography>{cocktail.history}</Typography>
    </Container>
  );
}

export default CocktailDetails;
