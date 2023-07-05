import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyTextarea from "../UI/MyTextarea/MyTextarea";
import MultiSelect from "../UI/MultiSelect/MultiSelect";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const CreatingTaskModal = ({newTaskModalActive, setNewTaskModalActive, newTask, setNewTask, selectedTags, setSelectedTags, tags, create, setTagsManagementModalActive, errors, setErrors}) => {
    return (
        <Modal title={"Новая задача"} active={newTaskModalActive} setActive={setNewTaskModalActive}>
            <MyForm onSubmit={() => {
                create();
            }}>
                {/*
                Для каждого поля мы изменяем объект новой задачи
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={newTask.name}
                    setValue={value => setNewTask({...newTask, name: value})}
                />
                <MyInp
                    type={"date"}
                    name={"deadline"}
                    label={"Срок выполнения"}
                    group={true}
                    value={newTask.deadline}
                    setValue={value => setNewTask({...newTask, deadline: value})}
                />
                <MyTextarea
                    name={"description"}
                    label={"Описание"}
                    rows={3}
                    group={true}
                    value={newTask.description}
                    setValue={value => setNewTask({...newTask, description: value})}
                />
                <MultiSelect
                    name={"tags"}
                    label={"Теги"}
                    selected={selectedTags}
                    setSelected={setSelectedTags}
                    options={tags.map(tag => ({value: tag.id, name: tag.name}))}
                />
                <br/>
                <p className={"colored pointer"} onClick={_ => setTagsManagementModalActive(true)}>Управление тегами</p>
                <br/>
                <ErrorList errors={errors} setErrors={setErrors}/>
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default CreatingTaskModal;