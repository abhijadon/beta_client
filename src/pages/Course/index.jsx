import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import CourseForm from '@/forms/Course_Form';

export default function Course() {
    const translate = useLanguage();
    const entity = 'course';

    const dataTableColumns = [
        {
            title: translate('Enabled'),
            dataIndex: 'enabled',
            key: 'enabled',
            width: 80, // Set width in pixels
            render: (enabled) => (
                <Tag color={enabled ? 'green' : 'red'}>
                    {enabled ? translate('Yes') : translate('No')}
                </Tag>
            ),
        },
        {
            title: translate('Removed'),
            dataIndex: 'removed',
            key: 'removed',
            width: 80, // Set width in pixels
            render: (removed) => (
                <Tag color={removed ? 'red' : 'green'}>
                    {removed ? translate('Yes') : translate('No')}
                </Tag>
            ),
        },
        {
            title: translate('Course Name'),
            dataIndex: 'name',
            key: 'name',
            width: 200, // Set width in pixels
        },
        {
            title: translate('Description'),
            dataIndex: 'description',
            key: 'description',
            width: 300, // Set width in pixels
        },
        {
            title: translate('Universities'),
            dataIndex: 'university',
            key: 'university',
            width: 250, // Set width in pixels
            render: (university) => (
                <>
                    {university?.map((uni) => (
                        <Tooltip key={uni._id} title={uni.description || translate('No description')}>
                            <Tag color="blue">{uni.name}</Tag>
                        </Tooltip>
                    ))}
                </>
            ),
        },
        {
            title: translate('Created At'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150, // Set width in pixels
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: translate('Updated At'),
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150, // Set width in pixels
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('Courses'),
        DATATABLE_TITLE: translate('Courses List'),
        ADD_NEW_ENTITY: translate('Add Course'),
        ENTITY_NAME: translate('Course'),
        CREATE_ENTITY: translate('Save Course'),
        UPDATE_ENTITY: translate('Update Course'),
    };

    const configPage = {
        entity, // Entity identifier for CRUD operations
        ...Labels, // Labels for UI
    };

    const config = {
        ...configPage,
        dataTableColumns, // Columns configuration for the data table
    };

    return (
        <CrudModule
            createForm={<CourseForm />} // Form component for creating courses
            updateForm={<CourseForm isUpdateForm={true} />} // Form component for updating courses
            config={config} // Configuration for the CrudModule
        />
    );
}
