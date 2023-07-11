import React, {useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import List from "../List/List";
import cl from "./Lists.module.css";

const Lists = ({listsManager, tasksManager}) => {

    const [draggingTask, setDraggingTask] = useState(null);
    const handleMove = async e => {
        let draggedList = listsManager.lists[e.oldIndex];
        let newListPosition = e.newIndex;

        if (e.oldIndex !== e.newIndex) {
            await listsManager.moveList(draggedList.id, newListPosition);
        }
    }

    return (
        <div className={cl.ListsContainer}>
            <ReactSortable
                group={"lists"}
                list={listsManager.lists}
                setList={listsManager.setLists}
                className={cl.Lists}
                onEnd={e => handleMove(e)}
                animation={200}
            >
                {
                    listsManager.lists.map(list =>
                        <List tasksManager={tasksManager} draggingTask={draggingTask} setDraggingTask={setDraggingTask} key={list.id} list={list} listsManager={listsManager} />
                    )
                }
            </ReactSortable>
            <div className={cl.ListAddButton} onClick={listsManager.openCreatingListModal}>+</div>
        </div>
    );
};

export default Lists;