// UserTable.jsx
import React, { useState } from 'react';
import { Table, Button, Drawer, message, Card } from 'antd';
import useFetch from '@/hooks/useFetch'; // Assuming this hook handles API requests
import { request } from '@/request';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { CiBookmarkPlus } from "react-icons/ci";
import EditRole from '@/forms/EditRole';

const UserTable = () => {
    const [visible, setVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const { data: userList, isLoading: userLoading, error } = useFetch(() =>
        request.list({ entity: 'teams' })
    );

    const handleAddNew = () => {
        setSelectedRecord(null); // Reset selected record
        setVisible(true);
    };

    const handleDrawerClose = () => {
        setVisible(false);
        setSelectedRecord(null);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setVisible(true);
    };

    const handleDelete = async (record) => {
        try {
            await request.delete({ entity: 'teams', id: record._id });
        } catch (error) {
            message.error('Failed to delete record');
        }
    };

    const handleFormSubmit = () => {
        // Close drawer after form submission
        setVisible(false);
        setSelectedRecord(null); // Reset selected record
    };

    const columns = [
        {
            title: 'Full Name',
            dataIndex: ['userId', 'fullname'],
            key: 'fullname',
            render: (text) => <span style={{ textTransform: 'capitalize' }}>{text}</span>,
        },
        {
            title: 'Team Members',
            dataIndex: 'teamMembers',
            key: 'teamMembers',
            render: (teamMembers) => (
                <span className='capitalize'>
                    {teamMembers.map(member => member.fullname).join(', ')}
                </span>
            ),
        },
        {
            title: 'Institute Name',
            dataIndex: 'institute',
            key: 'institute',
            render: (institutes) => institutes.join(', '), // Assuming institutes is an array
        },
        {
            title: 'University Name',
            dataIndex: 'university',
            key: 'university',
            render: (universities) => universities.join(', '), // Assuming universities is an array
        },
        {
            title: 'Teamname',
            dataIndex: 'teamName',
            key: 'teamName',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => (
                <span className='flex items-center gap-4'>
                    <TbEdit
                        className='text-blue-500 text-base cursor-pointer'
                        onClick={() => handleEdit(record)}
                    />
                    <RiDeleteBin6Line
                        className='text-red-500 text-base cursor-pointer'
                        onClick={() => handleDelete(record)}
                    />
                </span>
            ),
        },
    ];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Card>
            <div className='flex justify-between items-center'>
                <h3 className='text-lg font-thin'>Teams</h3>
                <Button type="primary" onClick={handleAddNew} className='relative float-right mb-4 flex items-center gap-1'>
                    <span><CiBookmarkPlus className='text-red-600 font-bold text-lg' /></span> <span>Add Teams</span>
                </Button>
            </div>

            <Table dataSource={userList?.result} columns={columns} loading={userLoading} />
            <Drawer
                title={selectedRecord ? 'Edit Item' : 'Add New Item'}
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={visible}
                width={400}
            >

            </Drawer>
        </Card>
    );
};

export default UserTable;
