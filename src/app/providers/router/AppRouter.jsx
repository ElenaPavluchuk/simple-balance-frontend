import { Routes, Route } from "react-router";
import { routeConfig } from "./routeConfig/routeConfig.jsx";

// export const AppRouter = () => {
//   return (
//     <Routes>
//       {routeConfig.map(({ path, element }) => (
//         <Route key={path} path={path} element={element} />
//       ))}
//     </Routes>
//   );
// };

const renderRoutes = (routes) => {
  return routes.map((route) => {
    const { path, element, children, index } = route;

    if (children) {
      return (
        <Route key={path || "root"} path={path} element={element}>
          {index && (
            <Route index element={route.index.element || route.element} />
          )}
          {renderRoutes(children)}
        </Route>
      );
    }

    return (
      <Route
        key={path || "index"}
        {...(index ? { index: true } : { path })}
        element={element}
      />
    );
  });
};

export const AppRouter = () => {
  return <Routes>{renderRoutes(routeConfig)}</Routes>;
};
