import React from 'react';
import { Grid } from '@mui/material';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../types';

interface CocktailGridProps {
  cocktails: Cocktail[];
}

const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktails }) => {
  return (
    <Grid container spacing={2}>
      {cocktails.map((cocktail, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <CocktailCard cocktail={cocktail} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CocktailGrid;
