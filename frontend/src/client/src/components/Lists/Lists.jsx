import React from 'react';
import {ReactSortable} from "react-sortablejs";
import List from "../List/List";
import cl from "./Lists.module.css";

const Lists = ({lists, setLists}) => {
    return (
        <div className={cl.ListsContainer}>
            <ReactSortable
                group={"lists"}
                list={lists}
                setList={setLists}
                className={cl.Lists}
                animation={200}
            >
                {
                    lists.map(list =>
                        <List key={list.id} list={list} />
                    )
                }
            </ReactSortable>
            <div className={cl.ListAddButton}>+</div>
        </div>
    );
};

export default Lists;