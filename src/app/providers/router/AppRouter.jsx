import UserProvider from "../../../shared/context/user/UserProvider";
import { Routes, Route } from "react-router";
import { routeConfig } from "../../../shared/config/routeConfig";

export const AppRouter = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};
