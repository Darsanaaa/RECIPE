import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, [location]);

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="logo">
          FoodieApp
        </Typography>
        <div className="nav-links">
          <Link to="/home">
            <Button className="nav-button">Home</Button>
          </Link>
          <Link to="/admin">
            <Button className="nav-button">Admin</Button>
          </Link>
          {!isLoggedIn && <Link to="/signup">
            <Button className="nav-button">Signup</Button>
          </Link>}
          
          {!isLoggedIn && <Link to="/login">
            <Button className="nav-button">Login</Button>
          </Link>}
          
          {isLoggedIn && <Link to="/logout">
            <Button className="nav-button">Logout</Button>
          </Link>}
          
          <Link to="/recipes">
            <Button className="nav-button">Recipes</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
