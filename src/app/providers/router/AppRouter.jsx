import { Routes, Route } from "react-router";
import { routeConfig } from "./routeConfig/routeConfig.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
