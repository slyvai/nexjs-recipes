import axios from "axios";
import Image from "next/image";
import Link from "next/link";


export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
    const recipe = response.data;

    return {
      props: {
        recipe,
      },
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return {
      notFound: true,
    };
  }
}

export default function RecipeDetail({ recipe }) {
  return (
    <>
      <div className="mx-auto text-[#777777]">
        <div className="flex justify-between items-center pl-20 pr-20 pt-5 pb-5 text-header">
          <p className="text-2xl text-[#83c9b9] font-bold ">Recipes</p>
          <button className="border-none bg-[#ff6363] text-white p-3 rounded text-lg">
            Login
          </button>
        </div>
        <div className="border border-[#83c9b9]"></div>

        <h1 className="text-2xl font-semibold mb-5 ml-10 text-[#0fab7a] pt-5">
          {recipe.name}
        </h1>
        <div className="flex category-recipes">
          <p className="ml-10">
            Difficulty:{" "}
            <span className="text-[#ff6363] font-bold">
              {recipe.difficulty}
            </span>
          </p>
          <p className="ml-5">
            Cook Time:
            <span className="text-[#ff6363] font-bold">
              {recipe.cookTimeMinutes} min
            </span>
          </p>
          <p className="ml-5">
            Calories :{" "}
            <span className="text-[#ff6363] font-bold">
              {recipe.caloriesPerServing} kcal
            </span>
          </p>
        </div>

        <div className="flex m-10 recipes-detail">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={420}
            height={400}
          />
          <div className="ml-10">
            <h1 className="text-2xl font-semibold mb-2 ">Ingredients:</h1>
            <div className="border border-[#ff6363] w-1/3 mb-5"></div>
            <ul className=" mb-4 text-lg list-disc">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-[#ededed]"></div>

        <div>
          <h1 className="text-2xl font-semibold mb-2 ml-10">Instructions</h1>
          <div className="border border-[#ff6363] w-1/20 mb-5 ml-10"></div>
          <ul className=" mb-4 text-lg ml-10 list-disc">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>

        <Link href="/">
          <button className="border-none bg-[#ff6363] text-white p-3 rounded text-lg ml-10 mt-5 cursor-pointer">
            Go Back
          </button>
        </Link>
      </div>

      <div>
        <p className="text-center mt-10 text-[#777777] mb-10 text-lg">
          Copyright &copy; 2025
        </p>
      </div>
    </>
  );
}
