import React from 'react';
import { Form, Input, Switch } from 'antd';

export default function ModeForm({ isUpdateForm = false }) {
    return (

        <>
            <Form.Item
                label="Mode Name"
                name="name"
                rules={[{ required: true, message: 'Please enter a mode name' }]}
            >
                <Input placeholder="Enter mode name" />
            </Form.Item><Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter a mode description' }]}
            >
                <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item><Form.Item label="Enabled" name="enabled" valuePropName="checked">
                <Switch />
            </Form.Item>
            {isUpdateForm && (
                <Form.Item label="Removed" name="removed" valuePropName="checked">
                    <Switch />
                </Form.Item>
            )}
        </>
    );
}
