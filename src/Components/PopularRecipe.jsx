import "./PopularRecipe.css";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const PopularRecipe = () => {
  const [popularRecipe, setpopularRecipe] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?number=8&apiKey=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setpopularRecipe(data.recipes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="popular-recipe">
      <div className="popular-recipe-header">
        <div>
          <h2>Popular This Week</h2>
          <p>Check out the most popular recipes of this week</p>
        </div>
      </div>

      <div className="recipe-grid">
        {/* map cards here */}
        {popularRecipe?.slice(0, 4).map((popularrecipe) => (
          <div className="recipe-card" key={popularrecipe.id}>
            <div className="image-wrapper">
              <img src={popularrecipe.image} alt={popularrecipe.title} />

              <span className="time-badge">
                {popularrecipe.readyInMinutes} mins
              </span>

              <button className="heart-btn">
                <FaHeart />
              </button>
            </div>

            <div className="card-content">
              <h3>{popularrecipe.title}</h3>

              <div className="recipe-info">
                <span>
                  <FaStar className="star" />
                  {popularrecipe.spoonacularScore
                    ? (popularrecipe.spoonacularScore / 20).toFixed(1)
                    : "4.8"}
                </span>

                <span>
                  {popularrecipe.diets.length > 0
                    ? popularrecipe.diets[0]
                    : "Healthy"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipe;
