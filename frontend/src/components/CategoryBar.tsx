import React from 'react';
import { AppBar, Toolbar, Box, Typography, Stack } from '@mui/material';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LiquorIcon from '@mui/icons-material/Liquor';
import ParkIcon from '@mui/icons-material/Park';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SailingIcon from '@mui/icons-material/Sailing';
import SpaIcon from '@mui/icons-material/Spa';

interface Category {
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { name: 'All', icon: <AllInboxIcon /> },
  { name: 'Whiskey', icon: <ParkIcon /> },
  { name: 'Vodka', icon: <LiquorIcon /> },
  { name: 'Tequila', icon: <WbSunnyIcon /> },
  { name: 'Rum', icon: <SailingIcon /> },
  { name: 'Gin', icon: <SpaIcon /> },
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
