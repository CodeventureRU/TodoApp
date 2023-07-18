import {
    useCreateListMutation, useGetListsQuery,
    useRemoveListMutation,
    useUpdateListMutation,
} from "../api/features/tasks/tasksApiSlice";
import {useEntityWithModal} from "./useEntityWithModal";
import {useEffect, useState} from "react";

const useCreatingList = () => {
    return useEntityWithModal({
        name: '',
    })
}

const useEditingList = () => {
    return useEntityWithModal({
        name: '',
    })
}

export const useListsManager = () => {

    // Использование API-хуков
    const [createListMutation] = useCreateListMutation();
    const [removeListMutation] = useRemoveListMutation();
    const [updateListMutation] = useUpdateListMutation();

    // Определение создаваемой и редактируемой задачи
    const creatingList = useCreatingList();
    const editingList = useEditingList();

    // Список списков задач
    const { data: listData} = useGetListsQuery();
    const [lists, setLists] = useState([]);
    useEffect(() => {
        if (listData) {
            const updatedLists = listData
                .map(item => ({
                    ...item,
                    chosen: false,
                    list_tasks: [...item.list_tasks.map(task => ({...task, chosen: false}))] }))
                .sort((a, b) => a.order > b.order ? 1 : -1);
            setLists(updatedLists);
        }
    }, [listData]);

    // Функции
    const functions = {
        // Открытие модальных окон
        openCreatingListModal: () => {
            creatingList.clear();
            creatingList.setModal(true);
        },

        openEditingListModal: (data) => {
            editingList.setOnClear(data);
            editingList.setModal(true);
        },

        // Обработка создания, изменения, перемещения и удаления списка задач
        createList: async () => {
            const creatingListData = creatingList.data;
            let listData = {
                name: creatingListData.name,
            };

            try {
                await createListMutation(listData).unwrap();
                creatingList.setErrors({});
                creatingList.setModal(false);
            } catch (err) {
                creatingList.setErrors(err.data);
            }
        },

        updateList: async () => {
            const editingListData = editingList.data;
            let listData = {
                id: editingListData.id,
                name: editingListData.name,
            };

            try {
                await updateListMutation(listData).unwrap();
                editingList.setErrors({});
                editingList.setModal(false);
            } catch (err) {
                editingList.setErrors(err.data);
            }
        },

        moveList: async (id, order) => {
            await updateListMutation({
                id,
                order
            });
        },

        removeList: async (id) => {
            try {
                await removeListMutation(id).unwrap();
                editingList.clear();
                editingList.setModal(false);
            } catch (err) {
                editingList.setErrors(err.data);
            }
        },
    }

    // Возвращаем объект
    return {
        editingList,
        creatingList,
        lists,
        setLists,
        ...functions,
    }
}