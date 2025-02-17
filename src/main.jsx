import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SingUp from "./pages/SignUp/SingUp";
import Login from "./pages/Login/Login";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./route/PrivateRoute";
import ForgetPassword from "./pages/ForgetPasswordPage/ForgetPassword";
import PrivateLoginandSignRoute from "./route/PrivateLoginandSignRoute";
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
// import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
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
        element: (
          // <PrivateRoute>
          <ProfilePage />
          // </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: (
      // <PrivateLoginandSignRoute>
      <SingUp />
      //  </PrivateLoginandSignRoute>
    ),
  },
  {
    path: "/login",
    element: (
      // <PrivateLoginandSignRoute>
      <Login />
      // </PrivateLoginandSignRoute>
    ),
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
