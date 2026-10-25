import "./Feature.css";
const Feature = () => {
  return (
    <section className="features">
      <div className="feature-card">
        <div className="feature-icon">
          <i className="fa-solid fa-book-open"></i>
        </div>

        <div className="feature-text">
          <h3>10,000+ Recipes</h3>
          <p>A vast collection of delicious recipes from around the world.</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="feature-card">
        <div className="feature-icon">
          <i className="fa-regular fa-clock"></i>
        </div>

        <div className="feature-text">
          <h3>Ready in Minutes</h3>
          <p>Quick and easy recipes for your busy lifestyle.</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="feature-card">
        <div className="feature-icon">
          <i className="fa-solid fa-heart"></i>
        </div>

        <div className="feature-text">
          <h3>Healthy & Tasty</h3>
          <p>Nutritious ingredients with great taste in every bite.</p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
