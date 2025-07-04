import React from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async () => {
    const name = document.querySelectorAll("input")[0].value;
    const email = document.querySelectorAll("input")[1].value;
    const password = document.querySelectorAll("input")[4].value;

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

  return (
    <div>
      <center>
        <h1>SIGNUP</h1>
      </center>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh'}}>
      <TextField label="Name" variant="outlined"  /><br />
      <TextField label="Email" variant="outlined"  /><br />
      <TextField label="Age" variant="outlined"  /><br />
      <TextField label="Phone Number" variant="outlined"  /><br />
      <TextField label="Password" variant="outlined" type="password" /><br />
      <Button variant="contained" style={{ backgroundColor: 'brown', color: 'black' }} onClick={handleSignup}>
        SIGNUP
      </Button>
      </div>
    </div>
  );
};

export default Signup;