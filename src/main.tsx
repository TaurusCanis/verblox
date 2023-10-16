import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/index";
import Game from "./pages/Game/index";
import Leaderboard from "./pages/Leaderboard/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Dashboard from "./pages/Dashboard/index";
import { DragProvider } from "./contexts/DragContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/play",
        element: <DragProvider><Game /></DragProvider>,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
