import React, { useState,useEffect } from 'react'
import axios from 'axios';


const  SearchBar = () => {
  const APIKEY = '47add8af231d447b9ca5ff6ee2e925c3';
  const [searchBar, setSearchBar] = useState('')
  const [result, setResult] = useState([])
  const [show, setshow]=useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI =async()=>{
    if(searchBar.length===2){
    setLoading(true)
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey: APIKEY,
        query:searchBar
        }
      });
      setResult(response.data.results);
    } catch (error) {
      setError('Error fetching recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }
}

fetchAPI()
},[searchBar]);



const handleSearch=(e)=>{
  setSearchBar(e.target.value)
}

const handleShow=()=>{
  if(searchBar.length>2){
    setshow(searchBar)
  }
 
}

  return (
    <div className='flex relative flex-col'> 

      <div className='relative'>

        <input 

          type="search" 

          placeholder='Search'

          value={searchBar}

          onChange={handleSearch}

          className='p-3 rounded-bl-[0.5rem] rounded-tr-[0.5rem] border-[1.2px] border-current bg-gray-100 pl-10' // Added padding for the icon

        />

        <img 

          src='https://cdn-icons-png.flaticon.com/128/5636/5636698.png' 

          className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] cursor-pointer' 

          onClick={handleShow} // You can also use the icon to trigger the search

          alt="Search Icon"

        />
       
      </div>

      <div>
        {show && (

        <ul className='absolute top-27.8 left-0 m-auto  bg-gray-100 w-[19.8rem] p-6'>

        {result.map((resultS, index) => (

        <li key={index}>{resultS.title}</li>

        ))}

        </ul>

        )}
      </div>

      
 


     
    </div>
  )
}

export default  SearchBar