import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout, setToken} from "../store/features/auth/authSlice";
import env from "react-dotenv";
import {store} from "../store";


const baseQuery = fetchBaseQuery({
    baseUrl: env.REACT_APP_API_URL + "/api/v1",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {

        // Если ошибка 401, то отправляем запрос на обновление access-токена
        const refreshResult = await fetch(env.REACT_APP_API_URL + "/api/v1/user/refresh/", {
            method: "POST",
            body: JSON.stringify({"refresh": store.getState().auth.refreshToken}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (refreshResult?.access) {
            // Сохранение нового токена
            api.dispatch(setToken({
                access: refreshResult.access,
                refresh: store.getState().auth.refreshToken
            }));

            // Повторение изначального запроса
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefresh,
    endpoints: _ => ({})
});