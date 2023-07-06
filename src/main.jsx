import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./component/Layout/Main.jsx";
import Home from "./component/Home/Home.jsx";
import Login from "./component/Login/Login.jsx";
import Register from "./component/Register/Register.jsx";
import RegisterRbs from "./component/RegisterRbs/RegisterRbs.jsx";
import RegisterBS from "./component/RegisterBS/RegisterBS";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path:'/login',
        element: <Login />,
      },
      {
        path: '/register',
        element:<Register />,
      },
      {
        path: 'register-rbs',
        element: <RegisterRbs />,
      },
      {
        path: 'register-bs',
        element:<RegisterBS />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
