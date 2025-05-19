// Import React hooks: useState to manage local component state and useEffect to perform side effects
import { useState, useEffect } from 'react';
// Import useDispatch hook from react-redux to dispatch actions to the Redux store
import { useDispatch } from 'react-redux';
// Import tools from react-router-dom to handle routing: browser router, router provider, and outlet for nested routes
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// Import the Navigation component to be shown across all pages
import Navigation from './components/Navigation';
// Import all session-related action creators, such as restoreUser, from the session store
import * as sessionActions from './store/session';
// import * as spotsActions from './store/spots';

import HomePage from './components/HomePage/HomePage';
import SpotPage from './components/SpotPage/SpotPage';
import CreateSpot from './components/CreateSpot/CreateSpot';

import "./index.css"



// Define a layout component that wraps the navigation and routed content
function Layout() {
  // Create a dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Create a local state variable to track if the user session has been restored
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect runs once on component mount to restore the user's session
  useEffect(() => {
    // Dispatch the restoreUser action to check if the user is already logged in (e.g., via cookies)
    dispatch(sessionActions.restoreUser()).then(() => {
      // Once user restoration is complete, mark the app as loaded
      setIsLoaded(true)
    });
  }, [dispatch]); // Dependency array ensures this effect runs only once on mount



  // Render JSX once the component is mounted
  return (
    <>
      {/* Render the Navigation bar, passing isLoaded to control visibility or behavior */}
      <Navigation isLoaded={isLoaded} />

      {/* Only render the nested routes when isLoaded is true */}
      {isLoaded && <Outlet />}
    </>
  );
}



// Create a browser router with a route configuration
const router = createBrowserRouter([
  {
    // Use the Layout component for the root route
    element: <Layout />,
    // Define child routes that will render inside the Layout’s <Outlet />
    children: [
      {
        // Route for the root path "/"
        path: '/',
        // Renders a heading for the homepage
        element: <HomePage />
      },
      {
        path: `/spots/:spotId`,
        element: <SpotPage />
      },
      {
      path: `/spots`,
      element: <CreateSpot />
      }
    ]
  }
]);

// Define the main App component
function App() {
  // Render the RouterProvider to initialize routing with the configured router
  return <RouterProvider router={router} />;
}

export default App;
