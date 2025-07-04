const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt"); 
const User = require("./models/User");
const Recipe = require("./models/Recipe");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ name, email, password: hashedPassword, isAdmin: false });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed", details: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});

app.post("/api/recipes", async (req, res) => {
  try {
    const { title, category, image, ingredients, steps, userId } = req.body;
    if (!title || !category || !ingredients || !steps || !userId ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newRecipe = new Recipe({
      title,
      category,
      image,
      ingredients,
      steps,
      createdBy: userId 
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe", details: error.message });
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes", details: error.message });
  }
});


app.put("/api/recipes/:id", async (req, res) => {
  try {
    const { title, category, image, ingredients, steps, userId, isAdmin } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (isAdmin || recipe.createdBy.toString() === userId) {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { title, category, image, ingredients, steps },
        { new: true }
      );

      return res.json({ message: "Recipe updated successfully", updatedRecipe });
    } else {
      return res.status(403).json({ message: "You are not allowed to update this recipe" });
    }

  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe", details: error.message });
  }
});

app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const { userId, isAdmin } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (isAdmin || recipe.createdBy.toString() === userId) {
      await recipe.deleteOne();
      return res.json({ message: "Recipe deleted successfully" });
    } else {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe", details: error.message });
  }
});


app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe", details: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));