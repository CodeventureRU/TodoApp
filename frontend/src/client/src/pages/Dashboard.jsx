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

const Dashboard = () => {

    // Массивы тегов и задач
    const [tags] = useState([
        {
            id: 1,
            name: "Frontend"
        },
        {
            id: 2,
            name: "Backend"
        },
        {
            id: 3,
            name: "Kitchen"
        },
    ]);
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
       description: "",
       deadline: "",
       tags: [],
    });
    const [selectedTags, setSelectedTags] = useState([]);

    // Управление модалкой изменения/удаления задачи
    const [editingTaskModalActive, setEditingTaskModalActive] = useState(false);
    const [editingTask, setEditingTask] = useState({
        list: 1,
        name: "",
        description: "",
        deadline: "",
        tags: [],
    })

    const createNewTask = () => {
        let taskData = newTask;
        if (!taskData.description) {
            delete taskData.description;
        }
        if (!taskData.deadline) {
            delete taskData.deadline;
        }
        createTaskMutation(newTask);
    }

    // Управление формой создания списка задач
    const [newListModalActive, setNewListModalActive] = useState(false);
    const [newList, setNewList] = useState({
        name: "",
    });

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
                update={updateTask}
                removeTask={removeTask}
            />
        </div>
    );
};

export default Dashboard;