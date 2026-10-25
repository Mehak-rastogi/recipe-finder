import React from "react";
import "./Categories.css";
const Categories = () => {
  return (
    <div className="categories">
      <button className="category active">
        <i class="fa-solid fa-bowl-food"></i>
        <span>All</span>
      </button>
      <button className="category">
        <i class="fa-solid fa-sun"></i>
        <span>Breakfast</span>
      </button>
      <button className="category">
        <i class="fa-solid fa-utensils"></i>
        <span>Lunch</span>
      </button>
      <button className="category">
        <i class="fa-solid fa-burger"></i>
        <span>Dinner</span>
      </button>
      <button className="category">
        <i class="fa-solid fa-cookie"></i>
        <span>Dessert</span>
      </button>
    </div>
  );
};

export default Categories;
