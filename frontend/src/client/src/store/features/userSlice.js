import {createSlice} from "@reduxjs/toolkit";
import {userInitialState} from "../../api/initialStates";


export const userSlice = createSlice({
    initialState: userInitialState,
    name: 'user',
    reducers: {
        logout: () => userInitialState,
        setUser: (state, action) => {

            state.id = action.payload.id;
            state.email = action.payload.email;
            state.auth = action.payload.auth;
        }
    }
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;