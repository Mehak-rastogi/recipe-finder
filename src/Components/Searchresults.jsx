
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchresults.css";

const SearchResults = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!query?.trim()) {
      setRecipes([]);
      setError("");
      return;
    }

    if (!API_KEY) {
      setError("API key is missing. Check your .env file.");
      return;
    }

    const controller = new AbortController();

    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
            query
          )}&number=8&addRecipeInformation=true&apiKey=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 402
              ? "Recipe search limit reached. Please try again later."
              : `Unable to fetch recipes (${response.status}).`
          );
        }

        const data = await response.json();
        setRecipes(data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => controller.abort();
  }, [query, API_KEY]);

  if (!query?.trim()) return null;

  return (
    <section className="search-results-page">
      <div className="search-results-header">
        <span className="search-eyebrow">FIND YOUR NEXT FAVOURITE</span>
        <h1>
          Search results for <span>"{query}"</span>
        </h1>
        <p>Discover something delicious to cook today.</p>
      </div>

      {loading && (
        <p className="search-status">Finding delicious recipes...</p>
      )}

      {error && (
        <div className="search-message" role="alert">
          <h3>We couldn't load your recipes</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="search-message">
          <h3>No recipes found</h3>
          <p>Try another search, such as pasta, pizza, or salad.</p>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <div className="search-results-count">
            Found {recipes.length} recipes
          </div>

          <div className="search-recipe-grid">
            {recipes.map((recipe) => (
              <button
                type="button"
                className="search-recipe-card"
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <div className="search-recipe-image">
                  <img src={recipe.image} alt={recipe.title} />

                  <span className="search-time-badge">
                    {recipe.readyInMinutes
                      ? `${recipe.readyInMinutes} mins`
                      : "Recipe"}
                  </span>
                </div>

                <div className="search-recipe-content">
                  <h2>{recipe.title}</h2>
                  <span className="search-card-link">
                    View recipe <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchResults;
