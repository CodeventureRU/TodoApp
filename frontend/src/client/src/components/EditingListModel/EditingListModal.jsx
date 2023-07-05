import React from 'react';
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyInp from "../UI/MyInp/MyInp";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const EditingListModal = ({editingListModalActive, setEditingListModalActive, editingList, setEditingList, removeList, update, errors, setErrors}) => {
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
                <ErrorList errors={errors} setErrors={setErrors}/>
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