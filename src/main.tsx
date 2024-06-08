import React, { Fragment, lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/dashborad";
import { client } from "./component/client.ts";
import "nprogress/nprogress.css";
import nprogress from "nprogress";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Authority = lazy(() => import("./pages/authority"));
const ErrorPage = lazy(() => import("./pages/error-page"));
const RoutePage = lazy(() => import("./pages/route-page"));
const System = lazy(() => import("./pages/system"));
const Tables = lazy(() => import("./pages/table"));
const Admin = lazy(() => import("./pages/authority/admin"));
const Menu21 = lazy(() => import("./pages/route-page/menu2-1"));
const Menu22 = lazy(() => import("./pages/route-page/menu2-2"));
import { SidebarProvider } from "./pages/system/component/menuLocation.tsx";
import { IsSidebarFold } from "./pages/system/component/menuFold.tsx";
import { ThemeChange } from "./component/theme.tsx";
import { AuthProvider } from "./component/AuthContext.tsx";
import Login from "./pages/login";
import Register from "./pages/login/register.tsx";
import NotFound from "./pages/error-page/NotFound.tsx";
import { ApolloProvider } from "@apollo/client";
import Layout from "./component/layout.tsx";
const Loading = () => {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return <Fragment />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "permission",
        children: [
          {
            path: "page",
            element: <Authority />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
      {
        path: "error-page",
        element: <ErrorPage />,
      },
      {
        path: "menu",
        children: [
          {
            path: "menu1",
            element: <RoutePage />,
          },
          {
            path: "menu2",
            children: [
              {
                path: "menu2-1",
                element: <Menu21 />,
              },
              {
                path: "menu2-2",
                element: <Menu22 />,
              },
            ],
          },
        ],
      },
      {
        path: "setting",
        element: <System />,
      },
      {
        path: "table",
        element: <Tables />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "Auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <React.StrictMode>
        <IsSidebarFold>
          <SidebarProvider>
            <ThemeChange>
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </ThemeChange>
          </SidebarProvider>
        </IsSidebarFold>
      </React.StrictMode>
    </AuthProvider>
  </ApolloProvider>,
);
