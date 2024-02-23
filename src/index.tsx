import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import ProductList from "./pages/ProductList";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/products",
        element: <ProductList />,
        children: [
          {
            path: "/products/:productId",
            element: <SingleProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  /* {
    path: "/products",
    element: <ProductList />,
    children: [
      {
        path: "/products/:productId",
        element: <SingleProduct />,
      },
    ],
  }, */
  /* {
    path: "/products/:productId",
    element: <SingleProduct />,
  }, */
]);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
