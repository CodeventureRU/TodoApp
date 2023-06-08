import React, {useState} from 'react';
import Task from "../Task/Task";
import cl from "./List.module.css";
import options from "../../assets/icons/options.svg";
import {ReactSortable} from "react-sortablejs";

const List = ({list, openNewTaskModal}) => {
    const [tasks, setTasks] = useState(list.tasks);

    return (
        <div className={cl.List}>
            <div className={cl.ListHeader}>
                <img src={options} alt="Options" className={"pointer"}/>
                {list.name}
            </div>
            {/*
            Все задачи можно перемещать в любом списке, поэтому они должны иметь общую группу.
            */}
            <ReactSortable group="tasks" animation={200} list={tasks} setList={setTasks} className={cl.ListTasks}>
                {
                    tasks.map(task =>
                        <Task key={task.id} task={task}/>
                    )
                }
            </ReactSortable>
            <div className={cl.ListFooter} onClick={() => openNewTaskModal(list.id)}>
                +
            </div>

        </div>
    );
};

export default List;