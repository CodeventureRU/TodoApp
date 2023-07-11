import React from 'react';
import MyForm from "../UI/MyForm/MyForm";
import MyInp from "../UI/MyInp/MyInp";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";
import ErrorList from "../ErrorList/ErrorList";

const TagsManagementModal = ({tagsManager}) => {

    return (
        <Modal title={"Управление тегами"} active={tagsManager.creatingTag.modal} setActive={tagsManager.creatingTag.setModal}>
            {tagsManager.tags.map(tag =>
                <div key={tag.id}><span className={"colored pointer"} onClick={_ => tagsManager.removeTag(tag.id)}>×</span> {tag.name}</div>
            )}
            <br/><br/>
            <hr/>
            <br/><br/>
            <h2>Новый тег</h2>
            <br/>
            <MyForm onSubmit={() => {
                tagsManager.createTag();
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={tagsManager.creatingTag.name}
                    setValue={value => tagsManager.creatingTag.setData({...tagsManager.creatingTag.data, name: value})}
                />
                <ErrorList errors={tagsManager.creatingTag.errors} setErrors={tagsManager.creatingTag.setErrors}/>
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default TagsManagementModal;