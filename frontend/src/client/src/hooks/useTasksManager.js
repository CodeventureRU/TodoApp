import {
    useCreateTaskMutation,
    useMoveTaskMutation,
    useRemoveTaskMutation,
    useUpdateTaskMutation
} from "../api/features/tasks/tasksApiSlice";
import {useEntityWithModal} from "./useEntityWithModal";

const useCreatingTask = () => {
    return useEntityWithModal({
        list: null,
        name: '',
        description: '',
        deadline: '',
        tags: [],
        selectedTags: [],
    })
}

const useEditingTask = () => {
    return useEntityWithModal({
        list: null,
        name: '',
        tags: [],
        selectedTags: [],
    })
}

export const useTasksManager = () => {

    // Использование API-хуков
    const [createTaskMutation] = useCreateTaskMutation();
    const [updateTaskMutation] = useUpdateTaskMutation();
    const [moveTaskMutation] = useMoveTaskMutation();
    const [removeTaskMutation] = useRemoveTaskMutation();

    // Определение создаваемой и редактируемой задачи
    const creatingTask = useCreatingTask();
    const editingTask = useEditingTask();

    // Функции
    const functions = {
        // Открытие модальных окон
        openCreatingTaskModal: (list) => {
            creatingTask.setOnClear({list});
            creatingTask.setModal(true);
        },

        openEditingTaskModal: (data) => {
            editingTask.setOnClear({...data, selectedTags: [...data.tags_for_read.map(tag => ({
                value: tag.id,
                name: tag.name
            }))]});
            editingTask.setModal(true);
        },

        // Обработка создания, изменения, перемещения, завершения и удаления задачи
        createTask: async () => {
            const creatingTaskData = creatingTask.data;
            let taskData = {
                list: creatingTaskData.list,
                name: creatingTaskData.name,
                deadline: creatingTaskData.deadline,
                description: creatingTaskData.description,
            };
            taskData.tags = [...creatingTaskData.selectedTags.map(tag => tag.value)];

            if (!creatingTaskData.deadline) {
                taskData.deadline = null;
            }

            try {
                await createTaskMutation(taskData).unwrap();
                creatingTask.setErrors({});
                creatingTask.setModal(false);
                creatingTask.clear();
            } catch (err) {
                creatingTask.setErrors(err.data);
            }
        },

        updateTask: async () => {
            const editingTaskData = editingTask.data;
            let taskData = {
                id: editingTaskData.id,
                name: editingTaskData.name,
                deadline: editingTaskData.deadline,
                description: editingTaskData.description
            };

            taskData.tags = [...editingTaskData.selectedTags.map(tag => tag.value)];

            if (!editingTaskData.deadline) {
                taskData.deadline = null;
            }

            try {
                await updateTaskMutation(taskData).unwrap();
                editingTask.setErrors({});
                editingTask.setModal(false);
            } catch (err) {
                editingTask.setErrors(err.data);
            }
        },

        completeTask: async (id, completed) => {
            await updateTaskMutation({
                id,
                completed
            })
        },

        moveTask: async (id, order, list_id) => {
            await moveTaskMutation({
                id,
                order,
                list_id
            });
        },

        removeTask: async (id) => {
            try {
                await removeTaskMutation(id).unwrap();
                editingTask.clear();
                editingTask.setModal(false);
            } catch (err) {
                editingTask.setErrors(err.data);
            }
        },
    }

    // Возвращаем объект
    return {
        editingTask,
        creatingTask,
        ...functions,
    }
}