import AuthProvider from "../../../shared/context/auth/AuthProvider";
import { Routes, Route } from "react-router";
import { routeConfig } from "../../../shared/routes/config/routeConfig";

export const AppRouter = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};
