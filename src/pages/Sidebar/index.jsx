import React from 'react';
import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import NavigationForm from '@/forms/Navigation_Form';

export default function Navigation() {
    const translate = useLanguage();
    const entity = 'navigation';

    // Define color mapping for actions
    const actionColors = {
        read: 'blue',
        write: 'green',
        create: 'orange',
        update: 'purple',
        delete: 'red',
    };

    const dataTableColumns = [
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled) => (enabled ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>),
        },
        {
            title: 'Navigation Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            key: 'role',
            render: (roles) =>
                roles?.map((role) => (
                    <Tooltip key={role._id} title={`Role Description: ${role.description}`}>
                        <Tag color="purple">{role.name}</Tag>
                    </Tooltip>
                )),
        },
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('Navigation'),
        DATATABLE_TITLE: translate('Navigation'),
        ADD_NEW_ENTITY: translate('Add Navigation'),
        ENTITY_NAME: translate('Navigation'),
        CREATE_ENTITY: translate('Save'),
        UPDATE_ENTITY: translate('Update'),
    };

    const configPage = {
        entity,
        ...Labels,
    };

    const config = {
        ...configPage,
        dataTableColumns,
    };

    return (
        <>
            <CrudModule
                createForm={<NavigationForm />}
                updateForm={<NavigationForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
