import React from 'react';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../types';

interface CocktailGridProps {
  cocktails: Cocktail[];
}

const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktails }) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 2,
      }}
    >
      {cocktails.map((cocktail) => (
        <Link
          key={cocktail.id}
          to={{
            pathname: `/cocktail/${encodeURIComponent(cocktail.name)}`,
            search: location.search,
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CocktailCard cocktail={cocktail} />
        </Link>
      ))}
    </Box>
  );
};

export default CocktailGrid;
