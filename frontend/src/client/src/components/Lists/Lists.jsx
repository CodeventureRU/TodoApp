import React from 'react';
import {ReactSortable} from "react-sortablejs";
import List from "../List/List";
import cl from "./Lists.module.css";

const Lists = ({lists, setLists, openNewTaskModal, openNewListModal, openEditingListModal, moveList}) => {

    const handleMove = e => {
        let draggedList = lists[e.oldIndex];
        let newListPosition = e.newIndex;

        moveList(draggedList.id, newListPosition);
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
                        <List key={list.id} list={list} openNewTaskModal={openNewTaskModal} openEditingListModal={openEditingListModal} />
                    )
                }
            </ReactSortable>
            <div className={cl.ListAddButton} onClick={() => openNewListModal()}>+</div>
        </div>
    );
};

export default Lists;