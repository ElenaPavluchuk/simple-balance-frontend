import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import store from "./app/providers/redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./app/ui/App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/simple-balance-frontend">
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
