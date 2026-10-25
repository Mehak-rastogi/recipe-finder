import cuisines from "../data/cuisines";
import "./Cuisines.css";
const Cuisines = () => {
  return (
    <section className="explore-cuisines">
      <div className="cuisine-header">
        <div>
          <h2>Explore By Cuisines</h2>
          <p>Discover recipes from different part of the world</p>
        </div>
        <div className="cuisine-card">
          {cuisines.map((cuisine) => (
            <div className="Cuisine-card-inside" key={cuisine.id}>
              <img
                className="cuisine-image"
                src={cuisine.image}
                alt={cuisine.name}
              />
              <p>{cuisine.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cuisines;
