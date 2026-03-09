import { Routes, Route } from "react-router";
import { routeConfig } from "./routeConfig/routeConfig.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      {routeConfig.map((rootRoute, index) => (
        <Route key={index} path={rootRoute.path} element={rootRoute.element}>
          {rootRoute.children?.map((child, childIndex) => (
            <Route
              key={childIndex}
              {...(child.index ? { index: true } : { path: child.path })}
              element={child.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};
