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
    <div
      style={{
        backgroundImage: "url('https://thumbs.dreamstime.com/b/hot-spices-seasonings-powder-splash-explosion-black-background-flame-chili-peppers-wooden-bowls-flying-over-fire-266597100.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '0',
        margin: '0',
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>LOGIN</h1>
        <h2>Please enter the credentials...!</h2>
        EMAIL: <input type="email" style={inputStyle} /><br />
        PASSWORD: <input type="password" style={inputStyle} /><br />
        <Button variant="contained" style={{ backgroundColor: 'orange', color: 'black' }} onClick={handleLogin}>
          LOGIN
        </Button>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

export default Login;
