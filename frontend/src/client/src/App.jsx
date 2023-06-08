import {Outlet} from "react-router-dom";
import './styles/main.css';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  );
}

export default App;
