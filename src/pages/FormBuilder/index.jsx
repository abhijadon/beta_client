import React from 'react';
import { Tag, Tooltip } from 'antd';
import FormbuilderModule from '@/modules/FormbuilderModule';
import FormBuilder from '@/forms/FormBuilder';

export default function Lead() {
    const entity = 'formbuilder';
    const dataTableColumns = [
        {
            title: 'Form Title',
            dataIndex: ['title'], // Matches the title field in your API response
            render: (text) => <Tooltip title={text}>{text}</Tooltip>,
        },
        {
            title: 'Workspace Name',
            dataIndex: ['workspaces'],
            render: (workspaces) =>
                workspaces?.map((workspace) => (
                    <Tag key={workspace._id} color="blue">
                        {workspace.name}
                    </Tag>
                )),
        },
        {
            title: 'College Name',
            dataIndex: ['workspaces'], // Extracting nested college names
            render: (workspaces) =>
                workspaces?.flatMap((workspace) =>
                    workspace.colleges.map((college) => (
                        <Tag key={college._id} color="green">
                            {college.name}
                        </Tag>
                    ))
                ),
        },
        {
            title: 'Created At',
            dataIndex: ['createdAt'],
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Updated At',
            dataIndex: ['updatedAt'],
            render: (date) => new Date(date).toLocaleString(),
        },
    ];

    const Labels = {
        PANEL_TITLE: 'Form Builder',
        DATATABLE_TITLE: 'Form List',
        ADD_NEW_ENTITY: 'Add New Form',
        ENTITY_NAME: 'Form',
        CREATE_ENTITY: 'Save Form',
        UPDATE_ENTITY: 'Update Form',
    };

    const configPage = {
        entity,
        ...Labels,
    };

    const config = {
        ...configPage,
        dataTableColumns,
        searchConfig: {}, // Add search configuration if needed
        entityDisplayLabels: {
            title: 'title',
        },
    };

    return (
        <FormbuilderModule
            createForm={<FormBuilder />}
            updateForm={<FormBuilder isUpdateForm={true} />}
            config={config}
        />
    );
}
