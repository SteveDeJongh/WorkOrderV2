import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import "./whitespace-resets.css";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
