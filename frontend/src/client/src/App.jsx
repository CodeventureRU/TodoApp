import {Outlet} from "react-router-dom";
import './styles/main.css';
import Navbar from "./components/Navbar/Navbar";
import {useGetMeQuery} from "./api/features/auth/authApiSlice";

function App() {
    useGetMeQuery({}, {
        refetchOnMountOrArgChange: true,
        skip: false,});

  return (
    <div className="App">
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  );
}

export default App;
