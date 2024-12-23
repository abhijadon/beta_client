import { Badge } from 'antd';
import useLanguage from '@/locale/useLanguage';
import AdminCrudModule from '@/modules/AdminCrudModule';

export default function Admin() {
    const translate = useLanguage();
    const entity = 'admin';
    const searchConfig = {
        displayLabels: ['name', 'surname'],
        searchFields: 'email,name,surname',
        outputValue: '_id',
    };

    const entityDisplayLabels = ['email'];

    const toTitleCase = (str) => {
        if (!str) return ''; // Check for undefined or null
        return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    };


    const readColumns = [
        { title: translate('full_name'), dataIndex: 'fullname' },
        { title: translate('username'), dataIndex: 'username' },
        { title: translate('role'), dataIndex: 'role' },
        {
            title: translate('status'),
            dataIndex: 'status',
            render: (status) => {
                console.log('Translated Status:', translate(status));
                console.log('Status:', status);
                return (
                    <Badge color={status === 'online' ? 'green' : 'red'} text={status} />
                );
            },
        },
    ];

    const dataTableColumns = [
        {
            title: 'S.No.',
            dataIndex: '',
            render: (text, record, index) => index + 1,
        },
        { title: translate('fullname'), dataIndex: 'fullname', render: (fullname) => toTitleCase(fullname), },
        { title: translate('username'), dataIndex: 'username' },
        { title: translate('phone'), dataIndex: 'phone' },
        {
            title: translate('role'),
            dataIndex: 'role',
            render: (role) => {
                let roleTextColor = 'black'; // Default text color

                // Assign different text colors based on roles
                switch (role) {
                    case 'teamleader':
                        roleTextColor = 'blue';
                        break;
                    case 'admin':
                        roleTextColor = 'green';
                        break;
                    case 'subadmin':
                        roleTextColor = 'purple';
                        break;
                    case 'user':
                        roleTextColor = 'orange';
                        break;
                    // Add more cases if you have additional roles
                    default:
                        roleTextColor = 'black'; // Default text color
                }

                return (
                    <span style={{ color: roleTextColor }}>{translate(role)}</span>
                );
            },
        },
        {
            title: translate('status'),
            dataIndex: 'status',
            render: (status) => {
                const badgeColor = status === 'online' ? 'green' : 'red';
                const textColor = badgeColor === 'green' ? 'green' : 'red';

                return (
                    <Badge color={badgeColor} text={<span style={{ color: textColor }}>{translate(status)}</span>} />
                );
            },
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('admin'),
        DATATABLE_TITLE: translate('admin_list'),
        ADD_NEW_ENTITY: translate('add_user'),
        ENTITY_NAME: translate('admin'),
        CREATE_ENTITY: translate('save'),
        UPDATE_ENTITY: translate('update'),
        RECORD_ENTITY: translate('record_payment'),
    };

    const configPage = {
        entity,
        ...Labels,
    };
    const config = {
        ...configPage,
        readColumns,
        dataTableColumns,
        searchConfig,
        entityDisplayLabels,
    };

    return (
        <>
            <AdminCrudModule
                config={config}
            />
        </>
    );
}
