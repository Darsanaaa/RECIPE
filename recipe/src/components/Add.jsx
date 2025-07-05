
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = { title, category, image, ingredients, steps, userId: localStorage.getItem("userId")  };

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      if (response.ok) {
        alert('✅ Recipe added');
        navigate('/recipes');
      } else {
        alert('❌ Failed to add recipe');
      }
    } catch (error) {
      alert('❌ Error submitting recipe');
    }
  };

  return (
    <div style={{
      backgroundImage: "url('https://www.baltana.com/files/wallpapers-2/Food-HD-Images-04860.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingRight: '5vw',
      color: 'red',
      textAlign: 'left'
    }}>
      <h1>Add Your Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
  style={{ ...inputStyle, color: category ? 'black' : '#999' }}
>
  <option value="">Select Category</option>
  <option value="CHICKEN">CHICKEN</option>
  <option value="BEEF">BEEF</option>
  <option value="EGG">EGG</option>
  <option value="VEGGIES">VEGGIES</option>
  <option value="PORK">VEGGIES</option>
  <option value="SEAFOOD">VEGGIES</option>
  <option value="DESSERT">DESSERT</option>
</select>
<br /><br />
   
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
        <input
          type="text"
          placeholder="Steps (sentence-separated)"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
        <button type="submit" style={{ backgroundColor: 'orange', color: 'black' }}>Add Recipe</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '18px',
  marginBottom: '20px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

export default Add
