import React from "react";
import ReactDOM from "react-dom/client";
import Frontpage from "./pages/Frontpage";
import LoginCondominio from "./pages/LoginCondominio";
import SignupCondominio from "./pages/SignupCondominio";
import "./index.scss";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Error from "./pages/Error";
import AdminCondominio from "./pages/AdminCondominio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Frontpage />,
    errorElement: <Error />,
  },
  {
    path: "login/condominio",
    element: <LoginCondominio />,
    errorElement: <Error />,
  },
  {
    path: "signup/condominio",
    element: <SignupCondominio />,
    errorElement: <Error />,
  },
  {
    path: "administracao/condominio",
    element: <AdminCondominio />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
