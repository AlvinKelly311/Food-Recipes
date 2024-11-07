import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './ SearchBar';

const NavMenu = () => {
  return (
    <div>
      <nav className=' p-5 mx-4  bg-gray-100 flex flex-row justify-between items-center fixed top-0 left-0 right-0 shadow z-10 '>
        
       <h1  className='font-black uppercase tracking-wider italic'>CHILLy 🧑🏼‍🍳 CHEF</h1>
       
        <ul className='flex flex-row justify-center gap-[6rem] font-black uppercase tracking-wider items-center relative right-[2rem]'>
        
          <li><Link to="/RecipeDetails">Recipe Details</Link></li>
          <li><Link to="/Recipelist">Recipe List</Link></li>
          <li><Link to="/Favorites">Favorites</Link></li>
          
          <SearchBar />
        </ul>
      </nav>
     
    </div>

    
  );
}

export default NavMenu;