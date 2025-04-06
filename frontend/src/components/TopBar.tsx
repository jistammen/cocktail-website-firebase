import React, { ChangeEvent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button } from '@mui/material';
import { FaCocktail } from 'react-icons/fa';

interface TopBarProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CocktailIcon = FaCocktail as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

function TopBar({ searchTerm, onSearchChange }: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure above drawer
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
          <CocktailIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
          Cocktail Recipes
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Cocktails..."
          value={searchTerm}
          onChange={onSearchChange}
          sx={{
            flexGrow: 1,
            backgroundColor: 'white',
            borderRadius: '9999px',
            mr: 2,
          }}
        />

        <Button color="inherit" sx={{ mr: 2 }}>
          LOGIN
        </Button>
        <Button variant="contained" color="primary">
          SIGN UP
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
