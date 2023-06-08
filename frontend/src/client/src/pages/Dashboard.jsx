import React, {useState} from 'react';
import Lists from "../components/Lists/Lists";
import CreatingTaskModal from "../components/CreatingTaskModal/CreatingTaskModal";
import CreatingListModal from "../components/CreatingListModal/CreatingListModal";

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
    const [lists, setLists] = useState([
        {
            id: 1,
            name: "Tasks list 1",
            tasks: [
                {
                    id: 1,
                    name: "Todo 1",
                    description: "Сделать жареный суп",
                    deadline: "26.06.2023 13:00",
                    tags: ["Kitchen"],
                    completed: false,
                },
                {
                    id: 2,
                    name: "Todo 2",
                    tags: ["Kitchen"],
                    completed: false,
                },
            ]
        },
        {
            id: 2,
            name: "Tasks list 2",
            tasks: [
                {
                    id: 3,
                    name: "Todo 3",
                    deadline: "26.06.2023 13:00",
                    completed: true,
                },
            ]
        },
        {
            id: 3,
            name: "Tasks list 3",
            tasks: [
                {
                    id: 4,
                    name: "Todo 4",
                    tags: [],
                    completed: false,
                },
            ]
        },
    ]);

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
        // TODO: Сделать добавление списка задач
    }

    const openNewTaskModal = (list_id) => {
        setNewTaskModalActive(true);
        setNewTask({...newTask, list_id});
    }

    const openNewListModal = () => {
        setNewListModalActive(true);
    }


    return (
        <div className="dashboard">
            <div className="container">
                <h2 className="page-header">Списки задач</h2>
                <Lists lists={lists} setLists={setLists} openNewTaskModal={openNewTaskModal} openNewListModal={openNewListModal}></Lists>
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
        </div>
    );
};

export default Dashboard;