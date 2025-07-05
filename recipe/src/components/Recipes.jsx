import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const filters = ["BEEF", "CHICKEN", "PORK", "VEGGIES", "SEAFOOD", 'EGG','DESSERT'];

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";



  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    axios.delete(`http://localhost:5000/api/recipes/${id}`, {
      data: {
        userId,
        isAdmin
      }
    })
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      })
      .catch(err => console.error(err));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFilter = selectedFilter ? recipe.category === selectedFilter : true;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div style={{ padding: '20px', marginTop: '60px' }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '20px', padding: '20px' }}>
        <Button variant='contained' color='success' style={{ marginTop: '46px' }}
          onClick={() => navigate('/add')}
        >
          Add Recipe
        </Button>&nbsp; &nbsp;

        {filters.map((filter) => (
          <Button
            key={filter}
            variant={filter === selectedFilter ? 'contained' : 'outlined'}
            onClick={() => setSelectedFilter(filter)}
            sx={{
              marginRight: '10px',
              marginBottom: '10px',
              marginTop: '60px',
              backgroundColor: filter === selectedFilter ? 'yellow' : '#f5f5f5',
              color: 'red'
            }}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <h2>Recipe List</h2>
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card>

                <div onClick={() => navigate(`/recipes/${recipe._id}`)} style={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                </div>
                <CardContent>
                  <h3>{recipe.title}</h3>


                  {isAdmin && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/edit/${recipe._id}`)}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                  )}


                  <Button variant="outlined" color="error" onClick={() => handleDelete(recipe._id)}>
                    Delete
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Recipes;
