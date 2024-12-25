import { Tag, Tooltip } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import useLanguage from '@/locale/useLanguage';
import moment from 'moment';
import SubcourseForm from '@/forms/SubCourse_Form';

export default function Subcourse() {
    const translate = useLanguage();
    const entity = 'subcourse';

    const dataTableColumns = [
        {
            title: translate('Enabled'),
            dataIndex: 'enabled',
            key: 'enabled',
            width: 80,
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
            width: 80,
            render: (removed) => (
                <Tag color={removed ? 'red' : 'green'}>
                    {removed ? translate('Yes') : translate('No')}
                </Tag>
            ),
        },
        {
            title: translate('Subcourse Name'),
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: translate('Description'),
            dataIndex: 'description',
            key: 'description',
            width: 300,
        },
        {
            title: translate('Course'),
            dataIndex: 'course',
            key: 'course',
            width: 200,
            render: (courses) => (
                <>
                    {Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                            <Tooltip key={course._id} title={course.description || translate('No description')}>
                                <Tag color="blue">{course.name || translate('Unnamed Course')}</Tag>
                            </Tooltip>
                        ))
                    ) : (
                        <Tag color="red">{translate('No course associated')}</Tag>
                    )}
                </>
            ),
        },
        {
            title: translate('Created At'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: translate('Updated At'),
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150,
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
    ];


    const Labels = {
        PANEL_TITLE: translate('Subcourses'),
        DATATABLE_TITLE: translate('Subcourse List'),
        ADD_NEW_ENTITY: translate('Add Subcourse'),
        ENTITY_NAME: translate('Subcourse'),
        CREATE_ENTITY: translate('Save Subcourse'),
        UPDATE_ENTITY: translate('Update Subcourse'),
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
        <CrudModule
            createForm={<SubcourseForm />}
            updateForm={<SubcourseForm isUpdateForm={true} />}
            config={config}
        />
    );
}
