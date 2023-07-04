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

    const createNewTask = () => {
        let taskData = newTask;
        console.log(selectedTags);
        taskData.tags = [...selectedTags.map(tag => tag.value)];
        if (!taskData.description) {
            delete taskData.description;
        }
        if (!taskData.deadline) {
            delete taskData.deadline;
        }
        createTaskMutation(newTask);
        setNewTask({
            list: 1,
            name: "",
            tags: [],
        })
        setNewTaskModalActive(false);
    }

    // Управление формой создания списка задач
    const [newListModalActive, setNewListModalActive] = useState(false);
    const [newList, setNewList] = useState({
        name: "",
    });

    const createTag = (data) => {
        createTagMutation(data);
    }

    const removeTag = (id) => {
        removeTagMutation(id);
    }

    const createNewList = () => {
        createListMutation(newList);
        setNewListModalActive(false);
        setNewList({
            name: "",
        });
    }

    const removeList = (id) => {
        removeListMutation(id);
        setEditingListModalActive(false);
    }

    const removeTask = (id) => {
        removeTaskMutation(id);
        setEditingTaskModalActive(false);
    }

    const updateList = () => {
        updateListMutation({
            id: editingList.id,
            name: editingList.name
        });
        setEditingListModalActive(false);
    }

    const updateTask = () => {
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

        updateTaskMutation(taskData);
        setEditingTaskModalActive(false);
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
    }

    const openNewListModal = () => {
        setNewListModalActive(true);
    }

    const openEditingListModal = (list) => {
        setEditingList(list);
        setEditingListModalActive(true);
    }

    const openEditingTaskModal = (task) => {
        setSelectedTags([...task.tags_for_read.map(tag => ({
            value: tag.id,
            name: tag.name
        }))]);
        setEditingTask(task);
        setEditingTaskModalActive(true);
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
                create={createNewTask}
            />

            <CreatingListModal
                newList={newList}
                setNewList={setNewList}
                newListModalActive={newListModalActive}
                setNewListModalActive={setNewListModalActive}
                create={createNewList}
            />

            <EditingListModal
                editingListModalActive={editingListModalActive}
                setEditingListModalActive={setEditingListModalActive}
                editingList={editingList}
                setEditingList={setEditingList}
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
                update={updateTask}
                removeTask={removeTask}
            />

            <TagsManagementModal
                tagsManagementModalActive={tagsManagementModalActive}
                setTagsManagementModalActive={setTagsManagementModalActive}
                tags={tags}

                create={createTag}
                remove={removeTag}
            />
        </div>
    );
};

export default Dashboard;