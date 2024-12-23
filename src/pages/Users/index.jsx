import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import UserForm from '@/forms/User_Form';
export default function Lead() {
    const translate = useLanguage();
    const entity = 'user';

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
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                role ? <Tag color="blue">{role.name}</Tag> : <Tag color="gray">No Role</Tag>
            ),
        },
        {
            title: 'Actions',
            dataIndex: ['role', 'actions'],
            key: 'actions',
            render: (actions) =>
                actions?.map((action) => (
                    <Tooltip key={action} title={`Action: ${action}`}>
                        <Tag color={actionColors[action]}>{action}</Tag>
                    </Tooltip>
                )),
        },
        {
            title: 'Workspaces',
            dataIndex: 'workspace',
            key: 'workspace',
            render: (workspaces) =>
                workspaces?.map((workspace) => (
                    <Tooltip key={workspace._id} title={`Workspace: ${workspace.description}`}>
                        <Tag color="geekblue">{workspace.name}</Tag>
                    </Tooltip>
                )),
        },
        {
            title: 'Is Admin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isAdmin) => (isAdmin ? <Tag color="gold">Yes</Tag> : <Tag color="red">No</Tag>),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('Users'),
        DATATABLE_TITLE: translate('User List'),
        ADD_NEW_ENTITY: translate('Add User'),
        ENTITY_NAME: translate('User'),
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
                createForm={<UserForm />}
                updateForm={<UserForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
