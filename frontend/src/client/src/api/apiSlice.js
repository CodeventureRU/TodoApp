import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout, setToken} from "../store/features/auth/authSlice";
import env from "react-dotenv";


const baseQuery = fetchBaseQuery({
    baseUrl: env.REACT_APP_API_URL + "/api/v1",
    credentials: 'include',
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

    if (result?.error?.originalStatus === 403) {
        console.log('Sending refresh');

        // Если ошибка 403, то отправляем запрос на обновление access-токена
        const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
        if (refreshResult?.data) {
            // Сохранение нового токена
            api.dispatch(setToken(refreshResult.data));

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