import React, { useEffect, useState } from 'react';
import NavMenu from './NavMenu';

const Favorites = () => {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  useEffect(() => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    setFavoriteRecipe(storedFavoriteRecipes);
  }, []);

  const handleRemove = (recipeId) => {
    const newFavorite = favoriteRecipe.filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipe(newFavorite); // Update state
    localStorage.setItem('favoriteRecipe', JSON.stringify(newFavorite)); // Update localStorage
  };

  return (
    <div className='m-9'>
      <NavMenu />
      {favoriteRecipe.length === 0 ? (
        <p className='relative top-[20rem] left-[28%] '>No favorites added</p>
      ) : (
        favoriteRecipe.map(recipe => (
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
            <ul className='flex flex-col gap-14 justify-center content-center relative left-[28%] text-[1.4rem]  text-[#94a3b8]'>
              {recipe.diets.length > 0 ? (
                recipe.diets.map((diet, index) => <li key={index} >{diet}</li>)
              ) : (
                <li className='font-semibold relative left-[28%] text-[1.4rem]'>No specific dietary information available.</li>
              )}
            </ul>
  
            <div className="button-group mt-4 relative left-[28%] text-[1.4rem]">
              <button onClick={() => handleRemove(recipe.id)} className="bg-red-500 text-white py-1 px-3 rounded mr-2 hover:tracking-[15px] hover:bg-[#6b7280] ">
              Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;