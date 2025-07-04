
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (!isAdmin) {
      alert("Access Denied: Admins Only");
      navigate("/home");
    } else {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div>
      <h1>Admin Panel - All Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{recipe.title}</h3>
          <p><strong>Category:</strong> {recipe.category}</p>
          <button onClick={() => handleEdit(recipe._id)}>Edit</button>
          <button onClick={() => handleDelete(recipe._id)} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
