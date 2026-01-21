import { createBrowserRouter } from "react-router-dom";

import Home from "../../pages/Home";
import Search from "../../pages/Search";
import MovieDetail from "../../pages/MovieDetail";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/movie/:id", element: <MovieDetail /> },
]);