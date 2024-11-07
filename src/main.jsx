import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import NavMenu from './NavMenu.jsx';
import Favorites from './Favorites.jsx';
import RecipeDetails from './RecipeDetails.jsx';
import Recipelist from './Recipelist.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/RecipeDetails",
    element: <RecipeDetails />,
  },
  {
    path: "/Recipelist",
    element: <Recipelist />,
  },
  {
    path: "/Favorites",
    element: <Favorites />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
