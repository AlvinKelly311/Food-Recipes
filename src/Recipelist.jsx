import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavMenu from './NavMenu';

const Recipelist = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const APIKEY = '47add8af231d447b9ca5ff6ee2e925c3';

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

 

  return (
    <div className='flex flex-col gap-[8rem] justify-center content-center mx-4'>
      <NavMenu />
      <h1 className='text-center font-black uppercase tracking-[30px] text-4xl italic font-mono'>Recipe <span className=''>🔖</span> List </h1>
      <hr /> 
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className="flex flex-col gap-14 justify-center content-center mx-4">
            <h2 className='relative left-11 font-black uppercase tracking-wider text-center text-xl'>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className='w-1/2 p-2 h-17 relative left-[28%]  border-transparent' />
            <p className='relative left-[28%] text-[1.4rem] font-medium'>Servings: {recipe.servings}</p>
            <p className='relative left-[28%] text-[1.4rem] font-medium'>Ready in: {recipe.readyInMinutes} minutes</p>
            <p className='w-[50rem] relative left-[28%] text-[1.4rem] text-[#94a3b8]'>{recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : 'No description available.'}</p>
           
           
            
            <hr /> {/* Add horizontal rule here */}
           
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
      
     
    </div>
  );
};

export default Recipelist;