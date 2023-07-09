import {useCreateTagMutation, useGetTagsQuery, useRemoveTagMutation} from "../api/features/tags/tagsApislice";
import {useEffect, useState} from "react";
import {useEntityWithModal} from "./useEntityWithModal";


export const useCreatingTag = () => {
    return useEntityWithModal({
        name: '',
    })
}

export const useTagsManager = () => {

    // Работа с API-хуками
    const [createTagMutation] = useCreateTagMutation();
    const [removeTagMutation] = useRemoveTagMutation();

    // Определение создаваемого тега
    const creatingTag = useCreatingTag();

    // Список тегов
    const { data: tagsData } = useGetTagsQuery();
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (tagsData) {
            setTags(tagsData);
        }
    }, [tagsData]);

    // Функции
    const functions = {
        openCreatingTagModal: () => {
            creatingTag.clear();
            creatingTag.setModal(true);
        },

        closeCreatingTagModal: () => {
            creatingTag.setModal(false);
            creatingTag.clear();
        },

        createTag: async () => {
            const creatingTagData = creatingTag.data;
            let tagData = {
                name: creatingTagData.name,
            };
            try {
                await createTagMutation(tagData).unwrap();
                creatingTag.clear();
            } catch (err) {
                creatingTag.setErrors(err.data);
            }
        },

        removeTag: async (id) => {
            try {
                await removeTagMutation(id).unwrap();
                creatingTag.setErrors({});
            } catch (err) {
                creatingTag.setErrors(err.data);
            }
        }
    }

    return {
        tags,
        creatingTag,
        ...functions
    }
}