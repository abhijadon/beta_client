import React from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function RolesForm({ isUpdateForm = false }) {
    const translate = useLanguage();

    // Static actions for the Select component
    const actions = [
        { label: translate('Read'), value: 'read' },
        { label: translate('Write'), value: 'write' },
        { label: translate('Create'), value: 'create' },
        { label: translate('Update'), value: 'update' },
        { label: translate('Delete'), value: 'delete' },
        { label: translate('History'), value: 'history' },
        { label: translate('Excel'), value: 'excel' },
        { label: translate('Payment'), value: 'payment' },
        { label: translate('Document'), value: 'document' },
        { label: translate('Notification'), value: 'notification' },
        { label: translate('Comment'), value: 'comment' },
        { label: translate('Team'), value: 'team' },
        { label: translate('Filter'), value: 'filter' },
    ];


    return (
        <>
            <Form.Item
                label={translate('Enabled')}
                name="enabled"
                valuePropName="checked"
                initialValue={true}
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item
                label={translate('Role Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the role name') }]}
            >
                <Input placeholder={translate('Enter role name')} />
            </Form.Item>
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>
            <Form.Item
                label={translate('Actions')}
                name="actions"
                rules={[{ required: true, message: translate('Please select actions') }]}
            >
                <Select
                    mode="multiple"
                    placeholder={translate('Select actions')}
                    options={actions}
                />
            </Form.Item>
        </>
    );
}
