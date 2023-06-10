import {logout} from "../../store/features/auth/authSlice";
import {redirect} from "react-router-dom";
import {store} from "../../store";


export default function logoutAction () {
    store.dispatch(logout());
    return redirect("/login");
}