import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import LandingLayout from "../components/LandingLayout";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/:section?" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};
