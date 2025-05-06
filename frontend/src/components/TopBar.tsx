import React, { ChangeEvent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button } from '@mui/material';

interface TopBarProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
}

function TopBar({ searchTerm, onSearchChange, onResetSearch }: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="reset search"
          onClick={onResetSearch}
          sx={{ mr: 1 }}
        >
          <img
            src="/cascade_cocktails_icon.svg"
            alt="Cascade Cocktails"
            style={{ width: '28px', height: '28px' }}
          />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
          Cascade Cocktails
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search For Cocktails Or Liquor..."
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
