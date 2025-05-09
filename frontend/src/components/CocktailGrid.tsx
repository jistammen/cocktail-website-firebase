import React from 'react';
import { Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../types';

interface CocktailGridProps {
  cocktails: Cocktail[];
}

const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktails }) => {
  const location = useLocation();

  return (
    <Grid container spacing={2}>
      {cocktails.map((cocktail, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cocktail.id}>
          <Link
            to={{
              pathname: `/cocktail/${encodeURIComponent(cocktail.name)}`,
              search: location.search
            }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CocktailCard cocktail={cocktail} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default CocktailGrid;
