import React from 'react';
import { Form, Input, Select, DatePicker, Switch, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ApplicationForm = ({ onSubmit, initialValues = {}, isUpdateForm = false }) => {

    return (
        <>
            <div className='flex items-start justify-between'>
                <Form.Item label="Enabled" name="enabled" valuePropName="checked" initialValue={true}>
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                </Form.Item>
                <Form.Item label="Removed" name="removed" valuePropName="checked" initialValue={false}>
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                </Form.Item>
            </div>

            <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: 'Please enter the full name' }]}
            >
                <Input placeholder="Enter full name" />
            </Form.Item><Form.Item
                label="Email"
                name="email"
                rules={[
                    { type: 'email', message: 'Please enter a valid email address' },
                    { required: true, message: 'Please enter the email address' },
                ]}
            >
                <Input placeholder="Enter email" />
            </Form.Item><Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please enter the phone number' }]}
            >
                <Input placeholder="Enter phone number" />
            </Form.Item><Form.Item label="Alternate Phone" name="alternate_phone">
                <Input placeholder="Enter alternate phone number" />
            </Form.Item><Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: 'Please enter the course' }]}
            >
                <Input placeholder="Enter course" />
            </Form.Item><Form.Item
                label="University Name"
                name="university_name"
                rules={[{ required: true, message: 'Please select a university' }]}
            >
                <Select placeholder="Select university">
                    {/* Populate options dynamically */}
                    <Select.Option value="university1">University 1</Select.Option>
                    <Select.Option value="university2">University 2</Select.Option>
                </Select>
            </Form.Item><Form.Item label="Session" name="session">
                <Input placeholder="Enter session details" />
            </Form.Item><Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select gender' }]}
            >
                <Select placeholder="Select gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item><Form.Item label="Date of Birth" name="dob">
                <DatePicker style={{ width: '100%' }} placeholder="Select date of birth" />
            </Form.Item><Form.Item label="Total Course Fee" name="total_course_fee">
                <Input placeholder="Enter total course fee" />
            </Form.Item><Form.Item label="Total Paid Amount" name="total_paid_amount">
                <Input placeholder="Enter total paid amount" />
            </Form.Item><Form.Item label="Due Amount" name="due_amount">
                <Input placeholder="Enter due amount" />
            </Form.Item><Form.Item label="Remarks" name="remark">
                <TextArea placeholder="Enter any remarks" rows={3} />
            </Form.Item>
        </>

    );
};

export default ApplicationForm;
