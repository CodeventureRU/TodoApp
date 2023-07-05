import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../store/features/auth/authSlice";

export const NotAuthProvider = ({children}) => {

    const user =  useSelector(selectUser);

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div>
            {children}
        </div>
    );
};