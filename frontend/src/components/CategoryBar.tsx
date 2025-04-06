import React from 'react';
import { AppBar, Toolbar, Box, Typography, Stack } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LiquorIcon from '@mui/icons-material/Liquor';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import WineBarIcon from '@mui/icons-material/WineBar';

interface Category {
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { name: 'All', icon: <LocalBarIcon /> },
  { name: 'Vodka', icon: <LiquorIcon /> },
  { name: 'Tequila', icon: <SportsBarIcon /> },
  { name: 'Rum', icon: <LocalBarIcon /> },
  { name: 'Gin', icon: <WineBarIcon /> },
  { name: 'Whiskey', icon: <LiquorIcon /> },
];

interface CategoryBarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: '64px',
        backgroundColor: '#ffffff',
        color: 'black',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            whiteSpace: 'nowrap',
            overflowX: 'auto',
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                color: selectedCategory === cat.name ? 'primary.main' : 'inherit',
              }}
              onClick={() => onCategorySelect(cat.name)}
            >
              {cat.icon}
              <Typography variant="caption">{cat.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;
