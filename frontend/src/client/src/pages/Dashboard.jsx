import React, {useEffect, useState} from 'react';
import Lists from "../components/Lists/Lists";

const Dashboard = () => {

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

    useEffect(() => {
        console.log(lists);
    }, [lists]);

    return (
        <div className="dashboard">
            <div className="container">
                <h2 className="page-header">Список задач</h2>
                <Lists lists={lists} setLists={setLists}></Lists>
            </div>

        </div>
    );
};

export default Dashboard;