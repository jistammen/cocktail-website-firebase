import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
} from '@mui/material';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink'
import IcecreamIcon from '@mui/icons-material/Icecream'
import NoDrinkIcon from '@mui/icons-material/NoDrinks';
import OpacityIcon from '@mui/icons-material/Opacity';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const categories = [
  { name: 'All', icon: <AllInboxIcon /> },
  { name: 'Classic', icon: <AutoAwesomeIcon /> },
  { name: 'Sour', icon: <LocalBarIcon /> },
  { name: 'Fizz', icon: <BubbleChartIcon /> },
  { name: 'Tiki', icon: <BeachAccessIcon />},
  { name: 'Highball', icon: <LocalDrinkIcon />},
  { name: 'Dessert', icon: <IcecreamIcon />},
  { name: 'Mocktail', icon: <NoDrinkIcon />},
  { name: 'Syrup', icon: <OpacityIcon /> },
  { name: 'Information', icon: <AutoStoriesIcon />},
];

interface SideBarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const DRAWER_WIDTH = 200;

function SideBar({ selectedCategory, onCategorySelect }: SideBarProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {categories.map((cat) => (
            <ListItemButton
              key={cat.name}
              selected={selectedCategory === cat.name}
              onClick={() => onCategorySelect(cat.name)}
            >
              <ListItemIcon>{cat.icon}</ListItemIcon>
              <ListItemText primary={cat.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
