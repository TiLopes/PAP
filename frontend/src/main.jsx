import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { ReactQueryDevtools } from "react-query/devtools";
import Error from "./pages/Error";

const Frontpage = lazy(() => import("./pages/Frontpage"));
const LoginCondominio = lazy(() => import("./pages/LoginCondominio"));
const SignupCondominio = lazy(() => import("./pages/SignupCondominio"));

const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProfile = lazy(() => import("./pages/AdminProfile"));
const AdminFracoes = lazy(() => import("./pages/AdminFracoes"));
const AdminCondomino = lazy(() => import("./pages/AdminCondomino"));
const FracaoCriar = lazy(() => import("@components/FracaoCriar"));
const CondominoCriar = lazy(() => import("@components/CondominoCriar"));
const LoginCondomino = lazy(() => import("./pages/LoginCondomino"));
const AdminOcorrencias = lazy(() => import("./pages/AdminOcorrencias"));
const OcorrenciaCriar = lazy(() => import("@components/OcorrenciaCriar"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Frontpage />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "signup/condominio",

    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignupCondominio />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "login/condominio",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginCondominio />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "login/condomino",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginCondomino />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "administracao/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Admin />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminProfile />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "fracoes",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminFracoes />
          </Suspense>
        ),
        errorElement: <Error />,
        children: [],
      },
      {
        path: "fracoes/criar",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FracaoCriar />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "condomino",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCondomino />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "condomino/criar",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CondominoCriar />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "ocorrencias",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOcorrencias />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "ocorrencias/criar",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OcorrenciaCriar />
          </Suspense>
        ),
        errorElement: <Error />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnmount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<Error />} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
