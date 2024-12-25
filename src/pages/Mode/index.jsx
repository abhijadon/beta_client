import { Tag } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import ModeForm from '@/forms/Mode_Form';

export default function Mode() {
    const translate = useLanguage();
    const entity = 'modes';

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
            title: 'Mode Name',
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
        PANEL_TITLE: translate('modes'),
        DATATABLE_TITLE: translate('modes'),
        ADD_NEW_ENTITY: translate('add_mode'),
        ENTITY_NAME: translate('mode'),
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
                createForm={<ModeForm />}
                updateForm={<ModeForm isUpdateForm={true} />}
                config={config}
            />
        </>
    );
}
