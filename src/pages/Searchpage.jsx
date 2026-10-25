
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import {
  FaArrowLeft,
  FaHeart,
  FaShareAlt,
  FaClock,
  FaUtensils,
  FaFire,
  FaCheck,
} from "react-icons/fa";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [saved, setSaved] = useState(false);

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
              ? "API quota exceeded. Please try again later."
              : "Unable to load this recipe."
          );
        }

        setRecipe(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadRecipe();
    return () => controller.abort();
  }, [id, API_KEY]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    setSaved(ids.some((item) => String(item.id) === String(id)));
  }, [id]);

  if (loading) {
    return <div className="rd-status">Preparing your recipe...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="rd-status">
        <p>{error || "Recipe not found."}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const ingredients = recipe.extendedIngredients || [];
  const steps =
    recipe.analyzedInstructions?.flatMap((section) => section.steps || []) ||
    [];

  const nutrients = recipe.nutrition?.nutrients || [];
  const nutrient = (name) =>
    nutrients.find((item) => item.name.toLowerCase() === name.toLowerCase());

  const instructionsHTML = recipe.instructions
    ? DOMPurify.sanitize(recipe.instructions, {
        ALLOWED_TAGS: ["p", "ol", "ul", "li", "b", "strong", "i", "em", "br"],
        ALLOWED_ATTR: [],
      })
    : "";

  const toggleSaved = () => {
    const items = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    const exists = items.some((item) => String(item.id) === String(id));

    const updated = exists
      ? items.filter((item) => String(item.id) !== String(id))
      : [
          ...items,
          {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
          },
        ];

    localStorage.setItem("savedRecipes", JSON.stringify(updated));
    setSaved(!exists);
  };

  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied!");
    } catch {
      alert("Copy this recipe link from your browser address bar.");
    }
  };

  const tabs = ["Ingredients", "Instructions", "Nutrition"];

  return (
    <main className="rd-page">
      <div className="rd-breadcrumb">
        <button onClick={() => navigate("/")}>
          <FaArrowLeft /> Home
        </button>
        <span>/</span>
        <span>Recipes</span>
        <span>/</span>
        <span className="rd-current">{recipe.title}</span>
      </div>

      <section className="rd-overview">
        <div className="rd-image-area">
          <img className="rd-food-image" src={recipe.image} alt={recipe.title} />
        </div>

        <div className="rd-info">
          <span className="rd-kicker">A RECIPE TO LOVE</span>
          <h1>{recipe.title}</h1>

          <div className="rd-meta">
            <span><FaClock /> {recipe.readyInMinutes || "—"} min</span>
            <span><FaUtensils /> {recipe.servings || 1} servings</span>
            <span><FaFire /> {Math.round(nutrient("Calories")?.amount || 0)} kcal</span>
          </div>

          <div className="rd-tags">
            {(recipe.diets || []).slice(0, 3).map((diet) => (
              <span key={diet}>{diet}</span>
            ))}
            {recipe.vegetarian && <span>Vegetarian</span>}
          </div>

          <p className="rd-summary">
            {recipe.summary
              ? DOMPurify.sanitize(recipe.summary.replace(/<[^>]*>/g, " "))
                  .slice(0, 240)
              : "Discover the ingredients and steps for making this delicious recipe."}
          </p>

          <div className="rd-actions">
            <button className="rd-save-btn" onClick={toggleSaved}>
              <FaHeart /> {saved ? "Saved" : "Save Recipe"}
            </button>
            <button className="rd-share-btn" onClick={shareRecipe}>
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </section>

      <section className="rd-recipe-body">
        <div className="rd-body-heading">
          <div>
            <span className="rd-kicker">LET'S GET COOKING</span>
            <h2>Make it your way</h2>
          </div>
          <span className="rd-serving-badge">
            {recipe.servings || 1} servings
          </span>
        </div>

        <div className="rd-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Ingredients" && (
          <div className="rd-ingredients-panel">
            <p className="rd-panel-intro">
              Check off each ingredient as you prepare.
            </p>
            {ingredients.map((item, index) => {
              const checked = checkedIngredients.includes(index);
              return (
                <label
                  className={`rd-ingredient-row ${checked ? "checked" : ""}`}
                  key={`${item.id}-${index}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setCheckedIngredients((previous) =>
                        checked
                          ? previous.filter((value) => value !== index)
                          : [...previous, index]
                      )
                    }
                  />
                  <span className="rd-check"><FaCheck /></span>
                  <span className="rd-ingredient-name">
                    {item.name || item.originalName}
                  </span>
                  <span className="rd-quantity">
                    {item.measures?.metric
                      ? `${Number(item.measures.metric.amount.toFixed(2))} ${item.measures.metric.unitShort}`
                      : item.original}
                  </span>
                </label>
              );
            })}
            {!ingredients.length && <p>Ingredients are unavailable.</p>}
          </div>
        )}

        {activeTab === "Instructions" && (
          <div className="rd-instructions-panel">
            {steps.length ? (
              steps.map((step, index) => (
                <div className="rd-step-row" key={`${step.number}-${index}`}>
                  <span className="rd-step-number">{index + 1}</span>
                  <p>{step.step}</p>
                </div>
              ))
            ) : instructionsHTML ? (
              <div dangerouslySetInnerHTML={{ __html: instructionsHTML }} />
            ) : (
              <p>Instructions are unavailable for this recipe.</p>
            )}
          </div>
        )}

        {activeTab === "Nutrition" && (
          <div className="rd-nutrition-grid">
            {["Calories", "Protein", "Fat", "Carbohydrates"].map((name) => {
              const item = nutrient(name);
              return (
                <div className="rd-nutrition-card" key={name}>
                  <span>{name}</span>
                  <strong>
                    {item ? `${Math.round(item.amount)} ${item.unit}` : "—"}
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
