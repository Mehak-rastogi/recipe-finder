import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingRecipies.css";
import { FaHeart, FaArrowRight, FaStar } from "react-icons/fa";

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?number=8&apiKey=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="trending-section">
      <div className="trending-header">
        <div>
          <h2>🔥 Trending Recipes</h2>
          <p>Our most loved recipes this week</p>
        </div>

        <button className="view-all-btn">
          View All <FaArrowRight />
        </button>
      </div>

      <div className="recipe-grid">
        {recipes?.slice(0, 4).map((recipe) => (
          <div
            className="recipe-card"
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="image-wrapper">
              <img src={recipe.image} alt={recipe.title} />

              <span className="time-badge">{recipe.readyInMinutes} mins</span>

              <button
                className="heart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  // We'll add favorite functionality later
                }}
              >
                <FaHeart />
              </button>
            </div>

            <div className="card-content">
              <h3>{recipe.title}</h3>

              <div className="recipe-info">
                <span>
                  <FaStar className="star" />
                  {recipe.spoonacularScore
                    ? (recipe.spoonacularScore / 20).toFixed(1)
                    : "4.8"}
                </span>

                <span>
                  {recipe.diets.length > 0 ? recipe.diets[0] : "Healthy"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingRecipes;
