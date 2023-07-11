import React from 'react';
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyInp from "../UI/MyInp/MyInp";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const EditingListModal = ({listsManager}) => {
    return (
        <Modal title={`Список задач`} active={listsManager.editingList.modal} setActive={listsManager.editingList.setModal}>
            <MyForm onSubmit={() => {
                listsManager.updateList();
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={listsManager.editingList.data.name}
                    setValue={value => listsManager.editingList.setData({...listsManager.editingList.data, name: value})}
                />
                <ErrorList errors={listsManager.editingList.errors} setErrors={listsManager.editingList.setErrors}/>
                <MyBtn>Сохранить изменение</MyBtn>
            </MyForm>
            <br/><br/>
            <hr/>
            <br/><br/>
            <MyBtn onClick={() => {
                listsManager.removeList(listsManager.editingList.data.id);
            }}>Удалить</MyBtn>
        </Modal>
    );
};

export default EditingListModal;