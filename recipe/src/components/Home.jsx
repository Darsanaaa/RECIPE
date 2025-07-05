import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-background">
            <div className="overlay"></div>
            <div className="home-content animate-slide-in">
                <h1 className="animate-fade-in">Welcome to RecipeHub </h1> 
                <p className="animate-fade-in-delay">
                    Share your favorite recipes, discover new flavors, and fall in love with cooking all over again!
                </p>
            </div>
        </div>
    );
};

export default Home;
