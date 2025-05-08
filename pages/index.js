import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Link from "next/link";
import { useState } from "react";

export async function getStaticProps() {
  const { data } = await axios.get("https://dummyjson.com/recipes");
  const allRecipes = data.recipes;

  return { props: { allRecipes } };
}

export default function Home({ allRecipes }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const displayedRecipes = searchTerm
    ? filteredRecipes.slice(0, 6)
    : allRecipes.slice(0, 6);

  return (
    <>
      <div className="flex justify-between items-center pl-20 pr-20 pt-5 pb-5 text-header">
        <p className="text-2xl text-[#83c9b9] font-bold ">Recipes</p>
        <button className="border-none bg-[#ff6363] text-white p-3 rounded text-lg">
          Login
        </button>
      </div>
      <div className="border border-[#83c9b9]"></div>

      <div className="flex flex-col justify-center items-center text-5xl ">
        <h1 className="text-center mt-10">
          All your favorite{" "}
          <span className="text-[#ff6363] font-bold">
            recipes, <br /> in one place{" "}
          </span>
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <input
          type="search"
          placeholder="Search"
          className="border border-[#83c9b9] rounded p-1 m-10 w-1/2 text-lg"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-3 justify-items-center card-container">
        {displayedRecipes.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>

      <div>
        <p className="text-center mt-10 text-[#777777] mb-10 text-lg">
          Copyright &copy; 2025
        </p>
      </div>
    </>
  );
}
