import {createSlice} from "@reduxjs/toolkit";
import {userInitialState} from "../../api/initialStates";


export const userSlice = createSlice({
    userInitialState,
    name: 'user',
    reducers: {
        logout: () => userInitialState,
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;