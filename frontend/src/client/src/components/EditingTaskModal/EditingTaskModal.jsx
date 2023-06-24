import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyTextarea from "../UI/MyTextarea/MyTextarea";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";

const EditingTaskModal = ({editingTaskModalActive, setEditingTaskModalActive, editingTask, setEditingTask, removeTask, update}) => {

    const deadline = new Date(editingTask.deadline);

    return (
        <Modal title={"Задача"} active={editingTaskModalActive} setActive={setEditingTaskModalActive}>
            <MyForm onSubmit={() => {
                update();
            }}>
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={editingTask.name}
                    setValue={value => setEditingTask({...editingTask, name: value})}
                />
                <MyInp
                    type={"date"}
                    name={"deadline"}
                    label={"Срок выполнения"}
                    group={true}
                    value={deadline.getFullYear()+"-"+(("0" + (deadline.getMonth() + 1)).slice(-2))+"-"+(("0" + deadline.getDate()).slice(-2))}
                    setValue={value => setEditingTask({...editingTask, deadline: value})}
                />
                <MyTextarea
                    name={"description"}
                    label={"Описание"}
                    rows={3}
                    group={true}
                    value={editingTask.description}
                    setValue={value => setEditingTask({...editingTask, description: value})}
                />
                {/*<MultiSelect*/}
                {/*    name={"tags"}*/}
                {/*    label={"Теги"}*/}
                {/*    group={true}*/}
                {/*    selected={selectedTags}*/}
                {/*    setSelected={setSelectedTags}*/}
                {/*    options={tags.map(tag => ({value: tag.id, name: tag.name}))}*/}
                {/*/>*/}
                <MyBtn>Сохранить изменения</MyBtn>
            </MyForm>
            <br/><br/>
            <hr/>
            <br/><br/>
            <MyBtn onClick={() => {
                removeTask(editingTask.id);
            }}>Удалить</MyBtn>
        </Modal>
    );
};

export default EditingTaskModal;