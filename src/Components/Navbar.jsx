
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isRecipeDetailsPage =
    window.location.pathname.startsWith("/recipe/");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


const submitSearch = (e) => {
  e.preventDefault();

  const query = search.trim();
  if (!query) return;

  setMenuOpen(false);
  navigate(`/search?q=${encodeURIComponent(query)}`);
};

  return (
    <nav
      className={`navbar custom-navbar ${
        isRecipeDetailsPage ? "light-navbar" : ""
      }`}
    >
      <div
        className="nav-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        RECIPE FINDER
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/saved">Saved</a>

        <div className="mobile-nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>

      <div className="desktop-search">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          onSubmit={submitSearch}
        />
      </div>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>

      <button
        className="menu-btn"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i
          className={
            menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
          }
        />
      </button>
    </nav>
  );
};

export default Navbar;
