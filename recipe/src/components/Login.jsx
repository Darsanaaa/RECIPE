import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = document.querySelectorAll("input")[0].value;
    const password = document.querySelectorAll("input")[1].value;

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("isAdmin", data.user.isAdmin ? "true" : "false");

      alert("Login successful");
      navigate("/recipes"); 
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div>
      <center>
        <h1>LOGIN</h1>
      </center>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh'}}>
      <h1>Please enter the credentials...!</h1>
      EMAIL: <input type="email" /><br />
      PASSWORD: <input type="password" /><br />
      <Button variant="contained" style={{ backgroundColor: 'brown', color: 'black' }} onClick={handleLogin}>
        LOGIN
      </Button>
      </div>
    </div>
  );
};

export default Login;