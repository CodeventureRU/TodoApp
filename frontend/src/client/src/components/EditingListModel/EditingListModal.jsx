import React from 'react';
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";

const EditingListModal = ({editingListModalActive, setEditingListModalActive, editingList, removeList}) => {
    return (
        <Modal title={"Просмотр списка"} active={editingListModalActive} setActive={setEditingListModalActive}>
            <p>{editingList.name}</p>
            <MyBtn onClick={() => {
                removeList(editingList.id);
            }}>Удалить</MyBtn>
        </Modal>
    );
};

export default EditingListModal;