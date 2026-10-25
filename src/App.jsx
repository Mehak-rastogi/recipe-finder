
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import TrendingRecipes from "./Components/TrendingRecipies";
import Cuisines from "./Components/Cuisines";
import Feature from "./Components/Feature";
import PopularRecipe from "./Components/PopularRecipe";
import Footer from "./Components/Footer";
import RecipeDetails from "./pages/RecipeDetails";
import SearchPage from "./pages/SearchPage";

function Layout() {
  const location = useLocation();
  const isRecipePage = location.pathname.startsWith("/recipe/");

  return (
    <div className={isRecipePage ? "recipe-page-layout" : "home-page-layout"}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <TrendingRecipes />
      <Cuisines />
      <Feature />
      <PopularRecipe />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
