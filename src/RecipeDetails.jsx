import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavMenu from './NavMenu';
import { useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const APIKEY = '47add8af231d447b9ca5ff6ee2e925c3';
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey: APIKEY,
          addRecipeInformation: true,
          number: 9,
        }
      });
      setRecipes(response.data.results);
    } catch (error) {
      setError('Error fetching recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleFavorite = (recipe) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    const isExistingFavorite = existingFavorites.some(fav => fav.id === recipe.id);

    if (!isExistingFavorite) {
      const updatedFavorites = [...existingFavorites, recipe];
      localStorage.setItem('favoriteRecipe', JSON.stringify(updatedFavorites));
      console.log('Recipe added to favorites!');
    } else {
      console.log('This recipe is already in your favorites!');
    }

    navigate('/Favorites');
  };


  return (
    <div className='flex flex-col gap-[8rem] justify-center content-center mx-4'>
      <NavMenu />
      <h1 className='text-center font-black uppercase tracking-[30px] text-4xl italic font-mono'>Recipe Details</h1>
      <hr />
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className="flex flex-col gap-14 justify-center content-center mx-4">
            <h2 className='relative left-11 font-black uppercase tracking-wider text-center text-xl'>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className='w-1/2 p-2 h-17 relative left-[28%] border-transparent' />
            <p className='relative left-[28%] text-[1.4rem] font-medium'>Servings: {recipe.servings}</p>
            <p className='relative left-[28%] text-[1.4rem] font-medium'>Ready in: {recipe.readyInMinutes} minutes</p>
            
            <h3 className="mt-4 font-semibold relative left-[28%] text-[1.4rem]">Ingredients:</h3>
            <ul className="list-disc pl-5 relative left-[28%] text-[1.4rem]">
              {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))
              ) : (
                <li>No ingredients available.</li>
              )}
            </ul>

            <h3 className="mt-4 font-semibold relative left-[28%] text-[1.4rem]">Dietary Information:</h3>
            <ul>
              {recipe.diets.length > 0 ? (
                recipe.diets.map((diet, index) => <li key={index} className='relative left-[28%] text-[1.4rem]  text-[#94a3b8]'>{diet}</li>)
              ) : (
                <li>No specific dietary information available.</li>
              )}
            </ul>

            <div className="button-group mt-4 relative left-[28%] text-[1.4rem]">
              <button onClick={() => handleFavorite(recipe)} className="bg-green-500 text-white py-1 px-3 rounded mr-2 tracking-tight hover:tracking-[15px] hover:bg-[#6b7280] ">
                Save Recipe
              </button>
            
            </div>
            
            <hr /> {/* Add horizontal rule here */}
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeDetails;