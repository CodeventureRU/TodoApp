import React, {useEffect, useState} from 'react';
import Lists from "../components/Lists/Lists";
import CreatingTaskModal from "../components/CreatingTaskModal/CreatingTaskModal";
import CreatingListModal from "../components/CreatingListModal/CreatingListModal";
import {
    useCreateListMutation,
    useGetListsQuery,
    useRemoveListMutation,
    useUpdateListMutation
} from "../api/features/tasks/tasksApiSlice";
import EditingListModal from "../components/EditingListModel/EditingListModal";

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
            const updatedLists = listData.map(item => ({ ...item, chosen: false }));
            setLists(updatedLists);
        }
    }, [listData]);
    const [createListMutation] = useCreateListMutation();
    const [removeListMutation] = useRemoveListMutation();
    const [updateListMutation] = useUpdateListMutation();

    // Управление модалкой изменения/удаления списка задач
    const [editingListModalActive, setEditingListModalActive] = useState(false);
    const [editingList, setEditingList] = useState({
        name: "",
    });

    // Управление формой создания задачи
    const [newTaskModalActive, setNewTaskModalActive] = useState(false);
    const [newTask, setNewTask] = useState({
       list_id: 1,
       name: "",
       description: "",
       deadline: "",
       tags1: false,
    });
    const [selectedTags, setSelectedTags] = useState([]);

    const createNewTask = () => {
        // TODO: Сделать добавление задачи
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

    const updateList = () => {
        updateListMutation({
            id: editingList.id,
            name: editingList.name
        });
        setEditingListModalActive(false);
    }

    const openNewTaskModal = (list_id) => {
        setLists([...lists]);
        setNewTaskModalActive(true);
        setNewTask({...newTask, list_id});
    }

    const openNewListModal = () => {
        setNewListModalActive(true);
    }

    const openEditingListModal = (list) => {
        setEditingList(list);
        setEditingListModalActive(true);
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
        </div>
    );
};

export default Dashboard;