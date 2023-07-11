import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const CreatingListModal = ({listsManager}) => {
    return (
        <Modal title={"Новый список задач"} active={listsManager.creatingList.modal} setActive={listsManager.creatingList.setModal}>
            <MyForm onSubmit={() => {
                listsManager.createList();
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={listsManager.creatingList.data.name}
                    setValue={value => listsManager.creatingList.setData({...listsManager.creatingList.data, name: value})}
                />
                <ErrorList errors={listsManager.creatingList.errors} setErrors={listsManager.creatingList.setErrors}/>
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default CreatingListModal;