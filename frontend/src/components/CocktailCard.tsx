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
    navigate(`/cocktail/${encodeURIComponent(cocktail.name)}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={
          cocktail.image ||
          'https://images.vexels.com/media/users/3/258801/isolated/preview/e717c6333a4b950395ff25fca3f442a9-cocktail-drink-quote-label.png'
        }
        alt={cocktail.name}
        sx={{
          height: 180,
          width: '100%',
          objectFit: 'contain',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 50%)',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {cocktail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cocktail.description?.substring(0, 80) || 'No description'}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CocktailCard;
