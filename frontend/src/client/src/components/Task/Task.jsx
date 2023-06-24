import React from 'react';
import cl from './Task.module.css';
import completed from "../../assets/icons/completed.svg";
import clocks from "../../assets/icons/clocks.svg";
import tags from "../../assets/icons/tags.svg";

const Task = ({task, complete, openEditingTaskModal}) => {
    return (
        <div className={cl.Task + " " + (task.completed && cl.CompletedTask)}>
            <div className={cl.TaskIndicator} onClick={() => complete(task.id, !task.completed)}>
                {
                    task.completed &&
                    <img src={completed} alt="Completed"/>
                }
            </div>
            <div className={cl.TaskContent}>
                <div>
                    <p className={cl.TaskName} onClick={() => openEditingTaskModal(task)}>{task.name}</p>
                    <p className="muted">{task.description}</p>
                </div>
                {/*
                Если есть срок или теги, выводим эту информацию.
                Внутри выводимого дива также выводим сроки, если есть, и теги, если есть и непустые.
                */}
                {
                    (task.deadline || (task.tags && task.tags.length)) ?
                    <div className="">
                        {task.deadline && <p className="small-muted"><img src={clocks} alt="Deadline"/> {
                            new Date(task.deadline).toLocaleDateString("ru-RU", {
                                month: 'short', day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })
                        }</p> }
                        {(task.tags && task.tags.length) && <p className="small-muted"><img src={tags} alt="Tags"/> {task.tags.join(", ")}</p> }
                    </div>
                        :
                        ""
                }

            </div>
        </div>
    );
};

export default Task;