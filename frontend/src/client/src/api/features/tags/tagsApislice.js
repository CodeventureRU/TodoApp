import {apiSlice} from "../../apiSlice";


export const tagsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTags: builder.query({
            query: _ => ({
                url: '/tags/',
                method: 'GET',
            }),
            providesTags: ['Tags']
        }),

        createTag: builder.mutation({
            query: data => ({
                url: '/tags/',
                method: 'POST',
                body: {...data},
            }),
            invalidatesTags: ["Tags"]
        }),


        removeTag: builder.mutation({
            query: (id) => ({
                url: `/tags/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tags"]
        }),
    })
});

export const {
    useGetTagsQuery,
    useCreateTagMutation,
    useRemoveTagMutation,
} = tagsApiSlice;