
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import SearchBar from "./Searchbar";
import Categories from "./Categories";
import heroFood from "../assets/hero.png";

const Hero = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    if (onSearch) {
      onSearch(query);
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const exploreRecipes = () => {
    navigate("/search?q=popular");
  };

  return (
    <section className="hero">
      {/* Mobile Search */}
      <div className="mobile-search">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          onSubmit={submitSearch}
        />
      </div>

      <div className="hero-container">
        {/* Left Section */}
        <div className="hero-left">
          {/* Desktop Heading */}
          <h1 className="hero-heading desktop-heading">
            Bring Balance And
            <br />
            Flavour To Your Table
            <br />
            Every Day
          </h1>

          {/* Mobile Heading */}
          <h1 className="hero-heading mobile-heading">
            Bring Balance And
            <br />
            Flavour To Your Table
            <br />
            Every Day
          </h1>

          {/* Desktop Paragraph */}
          <p className="para desktop-para">
            Discover delicious recipes from around the world
          </p>

          {/* Mobile Paragraph */}
          <p className="para mobile-para">
            Discover delicious recipes
            <br />
            from around the world
          </p>

          {/* Explore Button */}
          <div className="herobutton">
            <button
              type="button"
              className="btn"
              onClick={exploreRecipes}
            >
              Explore Recipes{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Desktop Categories */}
          <div className="desktop-categories">
            <Categories />
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="mobile-categories">
          <Categories />
        </div>

        {/* Right Section */}
        <div className="hero-right">
          <div className="hero-image">
            <img
              src={heroFood}
              alt="A delicious selection of food"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
