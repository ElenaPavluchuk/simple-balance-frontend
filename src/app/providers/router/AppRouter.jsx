import { Routes, Route } from "react-router";
import { routeConfig } from "./routeConfig/routeConfig.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routeConfig.path} element={routeConfig.element}>
        {routeConfig.children.map((route, index) => (
          <Route
            key={index}
            {...(route.index ? { index: true } : { path: route.path })}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
};
