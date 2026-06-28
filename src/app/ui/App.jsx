import "./App.css";
import { AppRouter } from "../providers/router/AppRouter";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRouter />
      <ScrollToTop />
      <Toaster position="top-center" />
    </>
  );
}
