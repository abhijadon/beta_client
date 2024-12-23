import { Tag } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import InstituteForm from '@/forms/Institute_Form';

export default function Institute() {
    const translate = useLanguage();
    const entity = 'institutes';

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
            title: 'Institute Name',
            dataIndex: 'name',
            key: 'name',
            width: 150, // Set width in pixels
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 150, // Set width in pixels
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
        PANEL_TITLE: translate('institutes'),
        DATATABLE_TITLE: translate('institutes'),
        ADD_NEW_ENTITY: translate('add_institute'),
        ENTITY_NAME: translate('institute'),
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
                createForm={<InstituteForm />}
                updateForm={<InstituteForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
