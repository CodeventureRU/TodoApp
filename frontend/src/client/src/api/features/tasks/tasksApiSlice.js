import {apiSlice} from "../../apiSlice";


export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: _ => ({
                url: '/tasks/',
                method: 'GET',
            }),
            providesTags: ['Tasks']
        }),

        getLists: builder.query({
            query: _ => ({
                url: '/lists/',
                method: 'GET',
                tags: ['Lists'],
            }),
            providesTags: ['Lists']
        }),

        createList: builder.mutation({
            query: data => ({
                url: '/lists/',
                method: 'POST',
                body: {...data},
            }),
            invalidatesTags: ['Lists']
        }),

        removeList: builder.mutation({
            query: (id) => ({
                url: `/lists/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Lists"]
        }),

        updateList: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/lists/${id}/`,
                method: 'PATCH',
                body: {...data},
            }),
            invalidatesTags: ['Lists']
        }),
    })
});

export const {useGetTasksQuery, useGetListsQuery, useCreateListMutation, useRemoveListMutation, useUpdateListMutation} = tasksApiSlice;