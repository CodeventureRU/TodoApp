import React from 'react';
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyInp from "../UI/MyInp/MyInp";
import MyForm from "../UI/MyForm/MyForm";

const EditingListModal = ({editingListModalActive, setEditingListModalActive, editingList, setEditingList, removeList, update}) => {
    return (
        <Modal title={`Список задач`} active={editingListModalActive} setActive={setEditingListModalActive}>
            <MyForm onSubmit={() => {
                update();
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={editingList.name}
                    setValue={value => setEditingList({...editingList, name: value})}
                />
                <MyBtn>Сохранить изменение</MyBtn>
            </MyForm>
            <br/><br/>
            <hr/>
            <br/><br/>
            <MyBtn onClick={() => {
                removeList(editingList.id);
            }}>Удалить</MyBtn>
        </Modal>
    );
};

export default EditingListModal;