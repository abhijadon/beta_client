import React from 'react';
import { Select, Form, Button, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const { Option } = Select;

const PermissionForm = ({ onClose, onFormSubmit }) => {
    const onFinish = async (formValues) => {
        try {
            const response = await axios.post(`/menu/create`,formValues,);
            if (response.status === 201) {
                message.success('Permission created successfully');
                onFormSubmit(); // Trigger parent component's onFormSubmit function
                onClose(); // Close the form
            } else {
                throw new Error(response.data.message || 'Failed to create permission');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error(error.response?.data?.message || 'Failed to create permission');
        }
    };

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select a role' }]}
            >
                <Select placeholder="Select role">
                    <Option value="admin">Admin</Option>
                    <Option value="subadmin">Sub Admin</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="supportiveassociate">Supportive Associate</Option>
                    <Option value="teamleader">Team Leader</Option>
                    <Option value="user">User</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Menu Options"
                name="options"
                rules={[{ required: true, message: 'Please select menu options' }]}
            >
                <Select mode="multiple" placeholder="Select options">
                    <Option value="Dashboard">Dashboard</Option>
                    <Option value="Application">Application</Option>
                    <Option value="Alumni">Alumni</Option>
                    <Option value="Payment">Payment</Option>
                    <Option value="Teams">Teams</Option>
                    <Option value="Users">Users</Option>
                    <Option value="Permission">Permission</Option>
                    <Option value="Courses & Fees">Courses & Fees</Option>
                    <Option value="Settings">Settings</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PermissionForm;
