import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import "./custom.scss";
// import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <button className="btn-danger">hello</button>
      </BrowserRouter>
    </>
  );
}

export default App;
