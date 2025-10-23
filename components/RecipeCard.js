import React from "react";
import Image from "next/image";

function RecipeCard({ recipe }) {
  return (
    <>
      <div className="flex flex-col justify-center card">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={420}
          height={200}
          className="image-card"
        />
        <h3>{recipe.name}</h3>
      </div>
    </>
  );
}

export default RecipeCard;
