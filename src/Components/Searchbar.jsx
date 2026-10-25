
import "./Searchbar.css";

const SearchBar = ({ search, handleSearch, onSubmit }) => {
  return (
    <form className="nav-search" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={handleSearch}
        aria-label="Search recipes"
      />

      <button
        type="submit"
        className="search-button"
        aria-label="Search recipes"
      >
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
      </button>
    </form>
  );
};

export default SearchBar;
