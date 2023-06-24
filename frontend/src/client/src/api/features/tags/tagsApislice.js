import {apiSlice} from "../../apiSlice";


export const tagsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTags: builder.query({
            query: _ => ({
                url: '/tags/',
                method: 'GET',
                tags: ['Tags'],
            }),
            providesTags: ['Tags']
        }),
    })
});

export const {
    useGetTagsQuery
} = tagsApiSlice;