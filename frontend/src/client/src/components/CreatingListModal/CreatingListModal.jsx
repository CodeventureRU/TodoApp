import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const CreatingListModal = ({newListModalActive, setNewListModalActive, newList, setNewList, create, errors, setErrors}) => {
    return (
        <Modal title={"Новый список задач"} active={newListModalActive} setActive={setNewListModalActive}>
            <MyForm onSubmit={() => {
                create();
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={newList.name}
                    setValue={value => setNewList({...newList, name: value})}
                />
                <ErrorList errors={errors} setErrors={setErrors}/>
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default CreatingListModal;