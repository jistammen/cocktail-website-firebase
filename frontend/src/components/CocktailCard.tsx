import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Cocktail } from '../types';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Use encodeURIComponent to handle spaces, special characters, etc.
    navigate(`/cocktail/${encodeURIComponent(cocktail.name)}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={cocktail.image || 
            'https://images.vexels.com/media/users/3/258801/isolated/preview/e717c6333a4b950395ff25fca3f442a9-cocktail-drink-quote-label.png'
        }
        alt={cocktail.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {cocktail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cocktail.description.substring(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CocktailCard;
