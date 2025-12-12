import { Routes, Route } from "react-router-dom";
import { Home, UserDetails } from "./pages";
import { AppRoutes } from "@constants";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<Home />} />
      <Route path={AppRoutes.USER_DETAIL} element={<UserDetails />} />
    </Routes>
  );
};
