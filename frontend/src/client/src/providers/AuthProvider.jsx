import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../store/features/auth/authSlice";

export const AuthProvider = () => {

    const user =  useSelector(selectUser);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};