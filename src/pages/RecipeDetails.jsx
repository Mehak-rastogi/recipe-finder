
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipe() {
      setLoading(true);
      setError("");
      setRecipe(null);

      try {
        if (!API_KEY || !id) {
          throw new Error("Recipe details are unavailable.");
        }

        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 402
              ? "Recipe API limit reached. Try again later."
              : "Unable to load this recipe."
          );
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRecipe();
    return () => controller.abort();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className="rd-status">
        <div className="rd-loader" />
        Preparing your recipe...
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="rd-status">
        <p>{error || "Recipe not found."}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const nutrients = recipe.nutrition?.nutrients || [];

  const getNutrient = (name) =>
    nutrients.find(
      (n) => n.name.toLowerCase() === name.toLowerCase()
    );

  const calories = getNutrient("Calories");
  const protein = getNutrient("Protein");
  const fat = getNutrient("Fat");
  const carbs = getNutrient("Carbohydrates");

  const stats = [
    {
      icon: "◷",
      value: `${recipe.readyInMinutes || "—"} min`,
      label: "Cooking time",
    },
    {
      icon: "♨",
      value: calories ? `${Math.round(calories.amount)} Cal` : "—",
      label: "Calories",
    },
    {
      icon: "♧",
      value: fat ? `${Math.round(fat.amount)} g` : "—",
      label: "Fat",
    },
    {
      icon: "♧",
      value: carbs ? `${Math.round(carbs.amount)} g` : "—",
      label: "Carbs",
    },
    {
      icon: "♧",
      value: protein ? `${Math.round(protein.amount)} g` : "—",
      label: "Protein",
    },
  ];

  const steps =
    recipe.analyzedInstructions?.flatMap(
      (section) => section.steps || []
    ) || [];

  const cleanInstructions = recipe.instructions
    ? DOMPurify.sanitize(recipe.instructions, {
        ALLOWED_TAGS: [
          "p", "ol", "ul", "li", "b", "strong",
          "i", "em", "br",
        ],
        ALLOWED_ATTR: [],
      })
    : "";

  const ingredients = recipe.extendedIngredients || [];

  return (
    <main className="rd-page">
      <header className="rd-header">
        <button
          className="rd-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>
        <h1>{recipe.title}</h1>
      </header>

      <section className="rd-overview">
        <div className="rd-image-area">
          <img
            className="rd-food-image"
            src={recipe.image}
            alt={recipe.title}
          />
        </div>

        <div className="rd-stats">
          {stats.map((stat) => (
            <div className="rd-stat" key={stat.label}>
              <span className="rd-stat-icon">{stat.icon}</span>
              <span className="rd-stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rd-ingredients">
        <div className="rd-section-heading">
          <h2>
            <span>🧺</span> Ingredients
          </h2>
          <span className="rd-serving">
            {recipe.servings || 1} servings
          </span>
        </div>

        {ingredients.length ? (
          <ul className="rd-ingredient-list">
            {ingredients.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                <span>{item.name || item.originalName}</span>
                <span className="rd-quantity">
                  {item.measures?.metric
                    ? `${Number(
                        item.measures.metric.amount.toFixed(2)
                      )} ${item.measures.metric.unitShort}`
                    : item.original}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ingredients are not available.</p>
        )}
      </section>

      <section className="rd-instructions">
        <div className="rd-instruction-heading">
          <h2>Instructions</h2>
          <span className="rd-instruction-icon">▤</span>
        </div>

        {steps.length ? (
          <ol className="rd-steps">
            {steps.map((step, index) => (
              <li key={`${step.number}-${index}`}>
                {step.step}
              </li>
            ))}
          </ol>
        ) : cleanInstructions ? (
          <div
            className="rd-instruction-text"
            dangerouslySetInnerHTML={{
              __html: cleanInstructions,
            }}
          />
        ) : (
          <p>Instructions are not available for this recipe.</p>
        )}
      </section>
    </main>
  );
}
