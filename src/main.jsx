import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './layouts/Main';
import Home from './pages/Home/Home';
import SingUp from './pages/SignUp/SingUp';
import Login from './pages/Login/Login';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <SingUp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
