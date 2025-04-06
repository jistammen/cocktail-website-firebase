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
import LiquorIcon from '@mui/icons-material/Liquor';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import OpacityIcon from '@mui/icons-material/Opacity';

const categories = [
  { name: 'All', icon: <AllInboxIcon /> },
  { name: 'Classic', icon: <LiquorIcon /> },
  { name: 'Sour', icon: <LocalBarIcon /> },
  { name: 'Fizz', icon: <BubbleChartIcon /> },
  { name: 'Syrup', icon: <OpacityIcon /> },
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
