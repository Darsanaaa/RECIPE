import React from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async () => {
    const inputs = document.querySelectorAll("input");
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[4].value;

    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(data.error || "Signup failed");
    }
  };

  const fieldProps = {
    variant: "outlined",
    InputProps: {
      style: { color: 'black', backgroundColor: 'white', borderRadius: '5px' }
    },
    InputLabelProps: { style: { color: 'black' } },
    style: { marginBottom: '15px', width: '300px' }
  };

  return (
<div style={{
  backgroundImage: "url('https://thumbs.dreamstime.com/b/hot-spices-seasonings-powder-splash-explosion-black-background-flame-chili-peppers-wooden-bowls-flying-over-fire-266597100.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px 0' 
}}>

      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <h1>SIGNUP</h1>
        <TextField label="Name" {...fieldProps} />
        <TextField label="Email" {...fieldProps} />
        <TextField label="Age" {...fieldProps} />
        <TextField label="Phone Number" {...fieldProps} />
        <TextField label="Password" type="password" {...fieldProps} />
        <Button
          variant="contained"
          onClick={handleSignup}
          style={{ backgroundColor: 'orange', color: 'black' }}
        >
          SIGNUP
        </Button>
      </div>
    </div>
  );
};

export default Signup;
