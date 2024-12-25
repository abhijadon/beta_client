import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import RolesForm from '@/forms/Roles_form';

export default function Lead() {
    const translate = useLanguage();
    const entity = 'roles';

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
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (actions) =>
                actions?.map((action) => (
                    <Tooltip key={action} title={`Action: ${action}`}>
                        <Tag color={actionColors[action]}>{action}</Tag>
                    </Tooltip>
                )),
        },
        {
            title: 'Institutes',
            dataIndex: 'institutes',
            key: 'institutes',
            render: (institutes) =>
                institutes?.map((institute) => (
                    <Tooltip key={institute._id} title={institute.description}>
                        <Tag color="blue">{institute.name}</Tag>
                    </Tooltip>
                )) || 'N/A',
        },
        {
            title: 'Universities',
            dataIndex: 'university',
            key: 'university',
            render: (universities) =>
                universities?.map((university) => (
                    <Tooltip key={university._id} title={university.description}>
                        <Tag color="purple">{university.name}</Tag>
                    </Tooltip>
                )) || 'N/A',
        },
        {
            title: 'Modes',
            dataIndex: 'modes',
            key: 'modes',
            render: (modes) =>
                modes?.map((mode) => (
                    <Tooltip key={mode._id} title={mode.description}>
                        <Tag color="orange">{mode.name}</Tag>
                    </Tooltip>
                )) || 'N/A',
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
        PANEL_TITLE: translate('roles'),
        DATATABLE_TITLE: translate('roles'),
        ADD_NEW_ENTITY: translate('add_roles'),
        ENTITY_NAME: translate('roles'),
        CREATE_ENTITY: translate('save'),
        UPDATE_ENTITY: translate('update'),
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
                createForm={<RolesForm />}
                updateForm={<RolesForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
