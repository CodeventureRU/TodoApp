import React, {useState} from 'react';
import MyForm from "../UI/MyForm/MyForm";
import MyInp from "../UI/MyInp/MyInp";
import MyBtn from "../UI/MyBtn/MyBtn";
import Modal from "../Modal/Modal";

const TagsManagementModal = ({tagsManagementModalActive, setTagsManagementModalActive, tags, create, remove}) => {
    const [name, setName] = useState("");

    return (
        <Modal title={"Управление тегами"} active={tagsManagementModalActive} setActive={setTagsManagementModalActive}>
            {tags.map(tag =>
                <div><span className={"colored pointer"} onClick={_ => remove(tag.id)}>×</span> {tag.name}</div>
            )}
            <br/><br/>
            <hr/>
            <br/><br/>
            <h2>Новый тег</h2>
            <br/>
            <MyForm onSubmit={() => {
                setName("");
                create({name});
            }}>
                {/*
                Для каждого поля мы изменяем объект нового списка задач
                */}
                <MyInp
                    name={"name"}
                    label={"Название"}
                    group={true}
                    value={name}
                    setValue={value => setName(value)}
                />
                <MyBtn>Создать</MyBtn>
            </MyForm>
        </Modal>
    );
};

export default TagsManagementModal;