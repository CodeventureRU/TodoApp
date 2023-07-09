import React from 'react';
import Lists from "../components/Lists/Lists";
import CreatingTaskModal from "../components/CreatingTaskModal/CreatingTaskModal";
import CreatingListModal from "../components/CreatingListModal/CreatingListModal";

import EditingListModal from "../components/EditingListModel/EditingListModal";
import EditingTaskModal from "../components/EditingTaskModal/EditingTaskModal";
import TagsManagementModal from "../components/TagsManagementModal/TagsManagementModal";
import {useTagsManager} from "../hooks/useTagsManager";
import {useTasksManager} from "../hooks/useTasksManager";
import {useListsManager} from "../hooks/useListsManager";

const Dashboard = () => {

    // Менеджер тегов
    const tagsManager = useTagsManager();

    // Менеджер задач
    const tasksManager = useTasksManager();

    // Менеджер списков задач
    const listsManager = useListsManager();

    return (
        <div className="dashboard">
            <div className="container">
                <h2 className="page-header">Списки задач</h2>
                <Lists
                    listsManager={listsManager}
                    tasksManager={tasksManager}
                ></Lists>
            </div>
            <CreatingTaskModal
                tasksManager={tasksManager}
                tagsManager={tagsManager}
            />

            <CreatingListModal
                listsManager={listsManager}
            />

            <EditingListModal
                listsManager={listsManager}
            />

            <EditingTaskModal
                tasksManager={tasksManager}
                tagsManager={tagsManager}
            />

            <TagsManagementModal
                tagsManager={tagsManager}
            />
        </div>
    );
};

export default Dashboard;