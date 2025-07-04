import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    navigate("/login");
  };

  return (
    <div>
      <h1>Logout</h1>
      <center>
        <Button
          variant="contained"
          style={{ background: 'brown', color: 'white' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </center>
    </div>
  );
};

export default Logout;
