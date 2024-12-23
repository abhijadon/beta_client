import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import UniversityForm from '@/forms/University_Form';

export default function University() {
    const translate = useLanguage();
    const entity = 'university';

    const dataTableColumns = [
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 50, // Set width in pixels
            render: (enabled) => (enabled ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>),
        },
        {
            title: 'Removed',
            dataIndex: 'removed',
            key: 'removed',
            width: 50, // Set width in pixels
            render: (removed) => (removed ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>),
        },
        {
            title: 'University Name',
            dataIndex: 'name',
            key: 'name',
            width: 150, // Set width in pixels
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200, // Set width in pixels
        },
        {
            title: 'Institutes',
            dataIndex: 'institute',
            key: 'institute',
            width: 200, // Set width in pixels
            render: (institute) => (
                <>
                    {institute?.map((inst) => (
                        <Tooltip key={inst._id} title={inst.description}>
                            <Tag color="blue">{inst.name}</Tag>
                        </Tooltip>
                    ))}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150, // Set width in pixels
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150, // Set width in pixels
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('universities'),
        DATATABLE_TITLE: translate('universities'),
        ADD_NEW_ENTITY: translate('add_university'),
        ENTITY_NAME: translate('university'),
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
                createForm={<UniversityForm />}
                updateForm={<UniversityForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
