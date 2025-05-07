import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignupFormPage from './SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LoginFormModal from './LoginFormPage/LoginFormPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      {
        path: "/login",
          element: <LoginFormModal />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
