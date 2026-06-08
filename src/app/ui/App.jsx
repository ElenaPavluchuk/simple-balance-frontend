import "./App.css";
import { AppRouter } from "../providers/router/AppRouter";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-center" />
    </>
  );
}
