import React from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function InstituteForm({ isUpdateForm = false }) {
    const translate = useLanguage();

    return (
        <>
            {/* Enabled Field */}
            <Form.Item
                label={translate('Enabled')}
                name="enabled"
                valuePropName="checked"
                initialValue={true}
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>

            {/* Removed Field */}
            <Form.Item
                label={translate('Removed')}
                name="removed"
                valuePropName="checked"
                initialValue={false}
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>

            {/* Institute Name Field */}
            <Form.Item
                label={translate('Institute Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the institute name') }]}
            >
                <Input placeholder={translate('Enter institute name')} />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>
        </>
    );
}
