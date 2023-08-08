import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectedRoute";
import Layout from "./layout/Layout";
import Home from "./pages/dashboard/Home";
import Category from "./pages/dashboard/Category";
import Products from "./pages/dashboard/Products";
import Brands from "./pages/dashboard/Brands";
import SubCategory from "./pages/dashboard/SubCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthCheck>
        <Login />
      </AuthCheck>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <Layout />
      </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "subcategory",
        element: <SubCategory />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
