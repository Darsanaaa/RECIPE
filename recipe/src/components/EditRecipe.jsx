import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setCategory(data.category);
        setImage(data.image);
        setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join(', ') : '');
        setSteps(Array.isArray(data.steps) ? data.steps.join('. ') : '');
      })
      .catch(err => {
        console.error('Error loading recipe:', err);
        alert('❌ Failed to load recipe');
        navigate('/recipes');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      category,
      image,
      ingredients: ingredients.split(',').map(i => i.trim()),
      steps: steps.split('.').map(s => s.trim()),
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin") === "true"
    };

    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe)
      });

      if (response.ok) {
        alert('✅ Recipe updated successfully');
        navigate(`/recipes/${id}`);
      } else {
        alert('❌ Failed to update recipe');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('❌ Error updating recipe');
    }
  };

  return (
    <div style={{
      backgroundImage: "url('https://www.shutterstock.com/image-photo/food-background-spices-herbs-utensil-600nw-2254302831.jpg')",
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
      <h1>Edit Your Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
        <input
          type="text"
          placeholder="Category (e.g. CHICKEN)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={inputStyle}
        /><br /><br />
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
        <button type="submit" style={{ backgroundColor: 'orange', color: 'black' }}>Update Recipe</button>
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

export default EditRecipe;
