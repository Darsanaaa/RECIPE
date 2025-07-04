import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const Recipedetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        setError('Recipe not found');
        console.error(err);
      });
  }, [id]);

  const canEdit = recipe && (isAdmin || recipe.createdBy === userId);

  const handleEdit = () => {
    if(canEdit){
      navigate(`/edit/${id}`);
    }
  };

  if (error) {
    return <Typography variant="h5" align="center" style={{ marginTop: '60px' }}>{error}</Typography>;
  }

  if (!recipe) {
    return <Typography variant="h6" align="center" style={{ marginTop: '60px' }}>Loading...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '50px auto' }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <h2>{recipe.title}</h2>
        <h4>INGREDIENTS</h4>
        <ul>
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
        <h4>STEPS</h4>
        {Array.isArray(recipe.steps) ? (
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{recipe.steps}</p>
        )}
        {canEdit && (
          <Button
            variant="contained"
            style={{ backgroundColor: 'orange', marginTop: '20px' }}
            onClick={handleEdit}
          >
            Edit Recipe
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Recipedetails;
