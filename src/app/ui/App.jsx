import "./App.css";
import AuthProvider from "../../shared/context/auth/AuthProvider";
import { AppRouter } from "../providers/router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
