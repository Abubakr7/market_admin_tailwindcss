import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectedRoute";
import Layout from "./layout/Layout";
import Home from "./pages/dashboard/Home";

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
