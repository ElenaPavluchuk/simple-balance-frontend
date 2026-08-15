import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import store from "./app/providers/redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./app/ui/App.jsx";
import AuthProvider from "./shared/context/auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter
        basename={import.meta.env.PROD ? "/simple-balance-frontend" : "/"}
      >
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
);
