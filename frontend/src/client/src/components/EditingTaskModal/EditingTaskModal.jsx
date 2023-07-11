import React from 'react';
import MyInp from "../UI/MyInp/MyInp";
import MyTextarea from "../UI/MyTextarea/MyTextarea";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import MyForm from "../UI/MyForm/MyForm";
import MultiSelect from "../UI/MultiSelect/MultiSelect";
import ErrorList from "../ErrorList/ErrorList";

const EditingTaskModal = ({tasksManager, tagsManager}) => {

    const deadline = new Date(tasksManager.editingTask.data.deadline);

    return (
        <Modal title={"Новая задача"} active={tasksManager.editingTask.modal} setActive={tasksManager.editingTask.setModal}>
            <MyForm onSubmit={() => {
                tasksManager.updateTask();
            }}>
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={tasksManager.editingTask.data.name}
                    setValue={value => {
                        tasksManager.editingTask.setData({...tasksManager.editingTask.data, name: value});
                    }}
                />
                <MyInp
                    type={"date"}
                    name={"deadline"}
                    label={"Срок выполнения"}
                    group={true}
                    value={tasksManager.editingTask.data.deadline
                        ?
                        deadline.getFullYear()+"-"+(("0" + (deadline.getMonth() + 1)).slice(-2))+"-"+(("0" + deadline.getDate()).slice(-2))
                        :
                        ""
                    }
                    setValue={value => tasksManager.editingTask.setData({...tasksManager.editingTask.data, deadline: value})}
                />
                <MyTextarea
                    name={"description"}
                    label={"Описание"}
                    rows={3}
                    group={true}
                    value={tasksManager.editingTask.data.description}
                    setValue={value => tasksManager.editingTask.setData({...tasksManager.editingTask.data, description: value})}
                />
                <MultiSelect
                    name={"tags"}
                    label={"Теги"}
                    selected={tasksManager.editingTask.data.selectedTags}
                    setSelected={value => tasksManager.editingTask.setData({...tasksManager.editingTask.data, selectedTags: value})}
                    options={tagsManager.tags.map(tag => ({value: tag.id, name: tag.name}))}
                />
                <br/>
                <p className={"colored pointer"} onClick={tagsManager.openCreatingTagModal}>Управление тегами</p>
                <br/>
                <ErrorList errors={tasksManager.editingTask.errors} setErrors={tasksManager.editingTask.setErrors}/>
                <MyBtn>Сохранить изменения</MyBtn>
            </MyForm>
            <br/><br/>
            <hr/>
            <br/><br/>
            <MyBtn onClick={() => {
                tasksManager.removeTask(tasksManager.editingTask.data.id);
            }}>Удалить</MyBtn>
        </Modal>
    );
};

export default EditingTaskModal;