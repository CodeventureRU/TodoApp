import {apiSlice} from "../../apiSlice";
import {setToken, setUser} from "../../../store/features/auth/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login/',
                method: 'POST',
                body: {...credentials},
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled, }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setToken(data));
                } catch (error) {}
            }
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/user/registration/',
                method: 'POST',
                body: {...credentials},
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled, }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setToken(data));
                } catch (error) {}
            }
        }),
       getMe: builder.query({
          query: _ => ({
              url: '/user/me/',
              method: 'GET'
          }),
           async onQueryStarted(args, { dispatch, queryFulfilled }) {
               try {
                   const { data } = await queryFulfilled;
                   dispatch(setUser(data));
               } catch (error) {}
           },
       })
   })
});

export const {useLoginMutation, useGetMeQuery, useRegisterMutation} = authApiSlice;