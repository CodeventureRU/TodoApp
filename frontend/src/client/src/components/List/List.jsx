import React, {useEffect, useState} from 'react';
import Task from "../Task/Task";
import cl from "./List.module.css";
import options from "../../assets/icons/options.svg";
import {ReactSortable} from "react-sortablejs";

const List = ({list, openNewTaskModal, openEditingListModal, openEditingTaskModal, moveTask, draggingTask, setDraggingTask, completeTask}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(list.list_tasks.sort((a, b) => a.order > b.order ? 1 : -1));
    }, [list.list_tasks]);

    const handleMove = e => {
        if (e.to === e.from) {
            let draggedTask = tasks[e.oldIndex];
            let newTaskPosition = e.newIndex;

            if (e.oldIndex !== e.newIndex) {
                moveTask(draggedTask.id, newTaskPosition, list.id);
            }
        }
    }

    const handleAdd = e => {
        let draggedTask = draggingTask;
        let newTaskPosition = e.newIndex;
        moveTask(draggedTask.id, newTaskPosition, list.id);
    }

    return (
        <div className={cl.List}>
            <div className={cl.ListHeader}>
                <img src={options} onClick={() => openEditingListModal(list)} alt="Options" className={"pointer"}/>
                {list.name}
            </div>
            {/*
            Все задачи можно перемещать в любом списке, поэтому они должны иметь общую группу.
            */}
            <ReactSortable
                group="tasks"
                animation={200}
                list={tasks}
                setList={setTasks}
                className={cl.ListTasks}
                onEnd={e => handleMove(e)}
                onAdd={e => handleAdd(e)}
                onStart={e => setDraggingTask(tasks[e.oldIndex])}
            >
                {
                    tasks.map(task =>
                        <Task key={task.id} task={task} complete={completeTask} openEditingTaskModal={openEditingTaskModal}/>
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