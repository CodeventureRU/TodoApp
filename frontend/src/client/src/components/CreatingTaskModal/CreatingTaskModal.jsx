import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyTextarea from "../UI/MyTextarea/MyTextarea";
import MultiSelect from "../UI/MultiSelect/MultiSelect";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";
import ErrorList from "../ErrorList/ErrorList";

const CreatingTaskModal = ({tasksManager, tagsManager}) => {
    return (
        <Modal title={"Новая задача"} active={tasksManager.creatingTask.modal} setActive={tasksManager.creatingTask.setModal}>
            <MyForm onSubmit={() => {
                tasksManager.createTask();
            }}>
                {/*
                Для каждого поля мы изменяем объект новой задачи
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={tasksManager.creatingTask.data.name}
                    setValue={value => tasksManager.creatingTask.setData({...tasksManager.creatingTask.data, name: value})}
                />
                <MyInp
                    type={"date"}
                    name={"deadline"}
                    label={"Срок выполнения"}
                    group={true}
                    value={tasksManager.creatingTask.data.deadline}
                    setValue={value => tasksManager.creatingTask.setData({...tasksManager.creatingTask.data, deadline: value})}
                />
                <MyTextarea
                    name={"description"}
                    label={"Описание"}
                    rows={3}
                    group={true}
                    value={tasksManager.creatingTask.data.description}
                    setValue={value => tasksManager.creatingTask.setData({...tasksManager.creatingTask.data, description: value})}
                />
                <MultiSelect
                    name={"tags"}
                    label={"Теги"}
                    selected={tasksManager.creatingTask.data.selectedTags}
                    setSelected={value => tasksManager.creatingTask.setData({...tasksManager.creatingTask.data, selectedTags: value})}
                    options={tagsManager.tags.map(tag => ({value: tag.id, name: tag.name}))}
                />
                <br/>
                <p className={"colored pointer"} onClick={tagsManager.openCreatingTagModal}>Управление тегами</p>
                <br/>
                <ErrorList errors={tasksManager.creatingTask.errors} setErrors={tasksManager.creatingTask.setErrors}/>
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default CreatingTaskModal;