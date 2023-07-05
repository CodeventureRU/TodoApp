import React, {useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import List from "../List/List";
import cl from "./Lists.module.css";

const Lists = ({lists, setLists, openNewTaskModal, openNewListModal, openEditingListModal, openEditingTaskModal, moveList, moveTask, completeTask}) => {

    const [draggingTask, setDraggingTask] = useState(null);
    const handleMove = e => {
        let draggedList = lists[e.oldIndex];
        let newListPosition = e.newIndex;

        if (e.oldIndex !== e.newIndex) {
            moveList(draggedList.id, newListPosition);
        }
    }

    return (
        <div className={cl.ListsContainer}>
            <ReactSortable
                group={"lists"}
                list={lists}
                setList={setLists}
                className={cl.Lists}
                onEnd={e => handleMove(e)}
                animation={200}
            >
                {
                    lists.map(list =>
                        <List openEditingTaskModal={openEditingTaskModal} completeTask={completeTask} draggingTask={draggingTask} setDraggingTask={setDraggingTask} key={list.id} list={list} openNewTaskModal={openNewTaskModal} openEditingListModal={openEditingListModal} moveTask={moveTask} />
                    )
                }
            </ReactSortable>
            <div className={cl.ListAddButton} onClick={() => openNewListModal()}>+</div>
        </div>
    );
};

export default Lists;