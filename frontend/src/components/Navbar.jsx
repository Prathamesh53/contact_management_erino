import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const path = window.location.pathname;
  console.log(path)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ margin: 0, padding: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ERINO
          </Typography>
          <Button color="inherit">
            <Link style={{ color: 'white', paddingRight: "12px" }} to={'/create'}>Create Contact</Link>
          </Button>

          <Button color="inherit">
            <Link style={{ color: 'white', paddingRight: "12px" }} to={'/'}>View Contacts</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
