import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SingUp from "./pages/SignUp/SingUp";
import Login from "./pages/Login/Login";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ForgetPassword from "./pages/ForgetPasswordPage/ForgetPassword";
import SendEmail from "./pages/SendEmailPage/SendEmail";
import { Bounce, ToastContainer } from "react-toastify";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTask from "./pages/AddTask/AddTask";
import Home from "./pages/Home/Home";
import MyTask from "./pages/MyTask/MyTask";
import store from "./app/store";
import SingleTask from "./pages/SingleTask/SingleTask";
// import ProtectedRoute from "./route/ProtectedRoute";
// import PublicRoute from "./route/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Dashboard />
    ),
    // </ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
      },

      {
        path: "/my-tasks",
        element: <MyTask />,
      },
      {
        path: "/task/:id",
        element: <SingleTask />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  // {
  //   path: "/",
  //   element: <PublicRoute />, // Prevent access if logged in
  //   children: [
  //     { path: "/signup", element: <SingUp /> },
  //     { path: "/login", element: <Login /> },
  //   ],
  // },

  {
    path: "/signup",
    element: (
      // <PublicRoute>
      <SingUp />
    ),
    // </PublicRoute> ,
  },
  {
    path: "/login",
    element: (
      // <PublicRoute>
      <Login />
    ),
    // </PublicRoute>,
  },
  {
    path: "/send-email",
    element: <SendEmail />,
  },
  {
    path: "/forgot-password/:id/:token",
    element: <ForgetPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
