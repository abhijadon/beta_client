import React, { useEffect, useState } from 'react';
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    RedoOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button, Card, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { course } from '@/redux/course/actions';
import { selectCreatedItem, selectListItems } from '@/redux/course/selector';
import useLanguage from '@/locale/useLanguage';
import { useCrudContext } from '@/context/crud';
import { PageHeader } from '@ant-design/pro-layout';
import { generate as uniqueId } from 'shortid';
import FileterCourse from '../FileterCourse'

function AddNewItem({ config }) {
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel, readBox } = crudContextAction;
    const { ADD_NEW_ENTITY } = config;

    const handleClick = () => {
        panel.open();
        collapsedBox.close();
        readBox.close();
    };

    return (
        <Button onClick={handleClick} type="primary">
            {ADD_NEW_ENTITY}
        </Button>
    );
}

export default function DataTable({ config, extra = [] }) {
    const { entity, dataTableColumns, DATATABLE_TITLE } = config;
    const { isSuccess } = useSelector(selectCreatedItem);
    const dispatch = useDispatch();
    const { crudContextAction } = useCrudContext();
    const { panel, collapsedBox, modal, editBox, readBox } = crudContextAction;
    const translate = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (record) => {
        dispatch(course.currentItem({ data: record }));
        dispatch(course.currentAction({ actionType: 'update', data: record }));
        editBox.open();
        panel.open();
        collapsedBox.open();
    };

    const handleDelete = (record) => {
        dispatch(course.currentAction({ actionType: 'delete', data: record }));
        modal.open();
    };

    const handleShow = (record) => {
        dispatch(course.currentItem({ data: record }));
        dispatch(course.currentAction({ actionType: 'read', data: record }));
        readBox.open();
        panel.open();
        collapsedBox.open();
    };



    const items = [
        {
            label: translate('Show'),
            key: 'showDetails',
            icon: <EyeOutlined />,
        },
        {
            label: translate('Edit'),
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: translate('Delete'),
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];

    const finalColumns = [
        {
            title: 'S.No.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            width: 20,
            render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        ...dataTableColumns,
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: items, // Use the items array directly
                        onClick: ({ key }) => {
                            switch (key) {
                                case 'showDetails':
                                    handleShow(record); // Ensure handleShow is defined
                                    break;
                                case 'edit':
                                    handleEdit(record); // Ensure handleEdit is defined
                                    break;
                                case 'delete':
                                    handleDelete(record); // Ensure handleDelete is defined
                                    break;
                                default:
                                    break;
                            }
                        },
                    }}
                    trigger={['click']}
                >
                    <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
                </Dropdown>
            ),
        },
    ];

    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
    const { pagination = {}, items: dataSource = [] } = listResult || { items: [], pagination: {} };


    useEffect(() => {
        const controller = new AbortController(); // Create AbortController instance
        const signal = controller.signal; // Get the abort signal

        dispatcher(signal); // Pass the signal to the dispatcher

        return () => {
            controller.abort(); // Cancel the request on cleanup
        };
    }, []);

    const dispatcher = (signal) => {
        setSearchQuery('');
        dispatch(
            course.list({
                entity,
                options: {},
                signal, // Pass the abort signal to the API request
            })
        );
    };

    // Updated handleDataTableLoad to accept signal
    const handleDataTableLoad = (pagination = {}, signal) => {
        const options = {
            page: pagination.current || 1,
            items: pagination.pageSize || 10,
            search: searchQuery || '', // Include search query or reset to default
        };

        dispatch(
            course.list({
                entity,
                options,
                signal, // Include abort signal
            })
        );
    };
    const handleSearch = () => {
        handleDataTableLoad({ current: 1, pageSize: pagination.pageSize });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === '') {
            dispatcher();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleDataTableLoad({});
        }
    }, [isSuccess]);

    return (
        <>
            <Card className="rounded-3xl shadow-2xl drop-shadow-lg mb-6">
                <FileterCourse config={config} />
            </Card>
            <Card className="rounded-3xl shadow-xl drop-shadow-lg">
                <PageHeader
                    title={
                        <>
                            {DATATABLE_TITLE}
                            <span title={pagination?.total} style={{ color: 'red' }} className="text-base font-medium">
                                ({pagination?.total})
                            </span>
                        </>
                    }
                    ghost={false}
                    extra={[
                        <Input.Search
                            key="searchFilterDataTable"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onSearch={handleSearch} // Trigger search on Enter or search icon click
                            placeholder={translate('search')}
                            allowClear
                        />,
                        <Button onClick={dispatcher} key={`${uniqueId()}`} icon={<RedoOutlined />}>
                            {translate('Refresh')}
                        </Button>,
                        <AddNewItem key={`${uniqueId()}`} config={config} />,
                    ]}
                    style={{
                        padding: '10px 0px',
                    }}
                />
                <Table
                    columns={finalColumns}
                    rowKey={(item) => item._id}
                    loading={listIsLoading}
                    dataSource={dataSource}
                    pagination={pagination}
                    onChange={handleDataTableLoad}
                />
            </Card>
        </>
    );
}
