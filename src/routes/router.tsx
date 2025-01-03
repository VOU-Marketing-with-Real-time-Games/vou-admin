import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import path from "../constants/paths.ts";
import HomePage from "../pages/private/HomePage.tsx";
import AccountsPage from "../pages/private/AccountsPage.tsx";
import CampaignsPage from "../pages/private/CampaignsPage.tsx";
import BrandsPage from "../pages/private/BrandsPage.tsx";
import PrivateRoute from "../layout/private/PrivateRoute.tsx";
import LoginPage from "../pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: path.LOGIN,
        element: <LoginPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: path.HOME,
                element: <HomePage />,
              },
              {
                path: path.ACCOUNTS,
                element: <AccountsPage />,
              },
              {
                path: path.CAMPAIGNS,
                element: <CampaignsPage />,
              },
              {
                path: path.BRANDS,
                element: <BrandsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;