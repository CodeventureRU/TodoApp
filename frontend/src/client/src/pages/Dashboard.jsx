import React, {useEffect, useState} from 'react';
import Lists from "../components/Lists/Lists";
import CreatingTaskModal from "../components/CreatingTaskModal/CreatingTaskModal";
import CreatingListModal from "../components/CreatingListModal/CreatingListModal";
import {
    useCreateListMutation, useCreateTaskMutation,
    useGetListsQuery, useMoveTaskMutation,
    useRemoveListMutation, useRemoveTaskMutation,
    useUpdateListMutation, useUpdateTaskMutation
} from "../api/features/tasks/tasksApiSlice";
import EditingListModal from "../components/EditingListModel/EditingListModal";
import EditingTaskModal from "../components/EditingTaskModal/EditingTaskModal";
import {useCreateTagMutation, useGetTagsQuery, useRemoveTagMutation} from "../api/features/tags/tagsApislice";
import TagsManagementModal from "../components/TagsManagementModal/TagsManagementModal";
import {stringifyErrors} from "../utlis/stringifyErrors";

const Dashboard = () => {

    // Массивы тегов и задач
    const { data: tagsData } = useGetTagsQuery();
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (tagsData) {
            console.log(tagsData);
            setTags(tagsData);
        }
    }, [tagsData]);

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
    const [createListMutation] = useCreateListMutation();
    const [removeListMutation] = useRemoveListMutation();
    const [updateListMutation] = useUpdateListMutation();
    const [createTaskMutation] = useCreateTaskMutation();
    const [updateTaskMutation] = useUpdateTaskMutation();
    const [moveTaskMutation] = useMoveTaskMutation();
    const [removeTaskMutation] = useRemoveTaskMutation();
    const [createTagMutation] = useCreateTagMutation();
    const [removeTagMutation] = useRemoveTagMutation();

    // Общий список ошибок
    const [errors, setErrors] = useState([]);

    // Управление модалкой тегов
    const [tagsManagementModalActive, setTagsManagementModalActive] = useState(false);

    // Управление модалкой изменения/удаления списка задач
    const [editingListModalActive, setEditingListModalActive] = useState(false);
    const [editingList, setEditingList] = useState({
        name: "",
    });

    // Управление формой создания задачи
    const [newTaskModalActive, setNewTaskModalActive] = useState(false);
    const [newTask, setNewTask] = useState({
        list: 1,
        name: "",
        deadline: undefined,
        description: "",
        tags: [],
    });
    const [selectedTags, setSelectedTags] = useState([]);

    // Управление модалкой изменения/удаления задачи
    const [editingTaskModalActive, setEditingTaskModalActive] = useState(false);
    const [editingTask, setEditingTask] = useState({
        list: 1,
        name: "",
        tags: [],
    })

    const createNewTask = async () => {
        let taskData = newTask;
        taskData.tags = [...selectedTags.map(tag => tag.value)];
        if (!taskData.description) {
            delete taskData.description;
        }
        if (!taskData.deadline) {
            delete taskData.deadline;
        }

        try {
            await createTaskMutation(newTask).unwrap();
            setErrors([]);
            setNewTask({
                list: 1,
                name: "",
                deadline: "",
                description: "",
                tags: [],
            });
            setNewTaskModalActive(false);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }

    }

    // Управление формой создания списка задач
    const [newListModalActive, setNewListModalActive] = useState(false);
    const [newList, setNewList] = useState({
        name: "",
    });
    
    const errorsAliases = {
        "name": "Название",
        "description": "Описание",
        "deadline": "Срок"
    };

    const createTag = async (data) => {
        try {
            await createTagMutation(data).unwrap();
            setErrors([]);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const removeTag = async (id) => {
        try {
            await removeTagMutation(id).unwrap();
            setErrors([]);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const createNewList = async () => {
        try {
            await createListMutation(newList).unwrap();
            setErrors([]);
            setNewListModalActive(false);
            setNewList({
                name: "",
            });
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }

    }

    const removeList = async (id) => {
        try {
            await removeListMutation(id).unwrap();
            setErrors([]);
            setEditingListModalActive(false);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const removeTask = async (id) => {
        try {
            await removeTaskMutation(id).unwrap();
            setErrors([]);
            setEditingTaskModalActive(false);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const updateList = async () => {
        try {
            await updateListMutation({
                id: editingList.id,
                name: editingList.name
            }).unwrap();
            setErrors([]);
            setEditingListModalActive(false);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const updateTask = async () => {
        let taskData = {
            id: editingTask.id,
            name: editingTask.name,
            deadline: editingTask.deadline,
            description: editingTask.description
        };

        taskData.tags = [...selectedTags.map(tag => tag.value)];

        if (!editingTask.deadline) {
            delete taskData.deadline;
        }

        if (!editingTask.description) {
            delete taskData.description;
        }
        try {
            await updateTaskMutation(taskData).unwrap();
            setErrors([]);
            setEditingTaskModalActive(false);
        } catch (err) {
            setErrors(stringifyErrors(err.data, errorsAliases));
        }
    }

    const moveList = (id, order) => {
        updateListMutation({
            id,
            order
        });
    }

    const moveTask = (id, order, list_id) => {
        moveTaskMutation({
            id,
            order,
            list_id
        });
    }

    const completeTask = (id, completed) => {
        updateTaskMutation({
            id,
            completed
        })
    }

    const openNewTaskModal = (list) => {
        setSelectedTags([]);
        setLists([...lists]);
        setNewTaskModalActive(true);
        setNewTask({...newTask, list});
        setErrors([]);
    }

    const openNewListModal = () => {
        setNewListModalActive(true);
        setErrors([]);
    }

    const openEditingListModal = (list) => {
        setEditingList(list);
        setEditingListModalActive(true);
        setErrors([]);
    }

    const openEditingTaskModal = (task) => {
        setSelectedTags([...task.tags_for_read.map(tag => ({
            value: tag.id,
            name: tag.name
        }))]);
        setEditingTask(task);
        setEditingTaskModalActive(true);
        setErrors([]);
    }


    return (
        <div className="dashboard">
            <div className="container">
                <h2 className="page-header">Списки задач</h2>
                <Lists
                    lists={lists}
                    setLists={setLists}
                    openNewTaskModal={openNewTaskModal}
                    openNewListModal={openNewListModal}
                    openEditingListModal={openEditingListModal}
                    openEditingTaskModal={openEditingTaskModal}
                    moveList={moveList}
                    moveTask={moveTask}
                    completeTask={completeTask}

                ></Lists>
            </div>
            <CreatingTaskModal
                newTaskModalActive={newTaskModalActive}
                setNewTaskModalActive={setNewTaskModalActive}
                newTask={newTask}
                setNewTask={setNewTask}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                setTagsManagementModalActive={setTagsManagementModalActive}
                tags={tags}
                errors={errors}
                setErrors={setErrors}
                create={createNewTask}
            />

            <CreatingListModal
                newList={newList}
                setNewList={setNewList}
                newListModalActive={newListModalActive}
                setNewListModalActive={setNewListModalActive}
                errors={errors}
                setErrors={setErrors}
                create={createNewList}
            />

            <EditingListModal
                editingListModalActive={editingListModalActive}
                setEditingListModalActive={setEditingListModalActive}
                editingList={editingList}
                setEditingList={setEditingList}
                errors={errors}
                setErrors={setErrors}
                removeList={removeList}
                update={updateList}
            />

            <EditingTaskModal
                editingTaskModalActive={editingTaskModalActive}
                setEditingTaskModalActive={setEditingTaskModalActive}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                setTagsManagementModalActive={setTagsManagementModalActive}
                tags={tags}
                errors={errors}
                setErrors={setErrors}
                update={updateTask}
                removeTask={removeTask}
            />

            <TagsManagementModal
                tagsManagementModalActive={tagsManagementModalActive}
                setTagsManagementModalActive={setTagsManagementModalActive}
                tags={tags}
                errors={errors}
                setErrors={setErrors}
                create={createTag}
                remove={removeTag}
            />
        </div>
    );
};

export default Dashboard;