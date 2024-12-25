import React, { useEffect, useRef } from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { fetchOptions } from '@/redux/options/actions';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';

export default function NavigationForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const dispatch = useDispatch();

    // Selectors for roles and children data
    const roles = useSelector((state) => selectSpecificEntityData(state, 'roles'));
    const rolesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'roles'));

    const children = useSelector((state) => selectSpecificEntityData(state, 'navigation'));
    const childrenLoading = useSelector((state) => selectSpecificEntityLoading(state, 'navigation'));

    // Refs to track if API calls have already been made
    const isRolesFetched = useRef(false);
    const isChildrenFetched = useRef(false);

    useEffect(() => {
        const rolesController = new AbortController(); // AbortController for roles
        const childrenController = new AbortController(); // AbortController for children

        // Fetch roles if not already fetched
        if (!isRolesFetched.current) {
            dispatch(fetchOptions('roles', { signal: rolesController.signal }));
            isRolesFetched.current = true; // Mark roles as fetched
        }

        // Fetch children if not already fetched
        if (!isChildrenFetched.current) {
            dispatch(fetchOptions('navigation', { signal: childrenController.signal }));
            isChildrenFetched.current = true; // Mark children as fetched
        }

        // Cleanup function to abort requests when component unmounts
        return () => {
            rolesController.abort();
            childrenController.abort();
        };
    }, [dispatch]);

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

            {/* Navigation Name Field */}
            <Form.Item
                label={translate('Navigation Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the navigation name') }]}
            >
                <Input placeholder={translate('Enter navigation name')} />
            </Form.Item>

            {/* Children Selection Field */}
            <Form.Item
                label={translate('Children')}
                name="children"
            >
                <Select
                    mode="multiple"
                    placeholder={translate('Select children')}
                    loading={childrenLoading}
                    options={children?.map((item) => ({
                        label: item.name,
                        value: item._id, // Ensure correct ID field
                    }))}
                />
            </Form.Item>

            {/* Order Field */}
            <Form.Item
                label={translate('Order')}
                name="order"
                rules={[{ required: true, message: translate('Please enter an order') }]}
            >
                <Input placeholder={translate('Enter order')} type="number" />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>

            {/* Roles Selection Field */}
            <Form.Item
                label={translate('Roles')}
                name="role"
                rules={[{ required: true, message: translate('Please select roles') }]}
            >
                <Select
                    mode="multiple"
                    placeholder={translate('Select roles')}
                    loading={rolesLoading}
                    options={roles?.map((item) => ({
                        label: item.name || 'Unknown',
                        value: item._id, // Ensure correct ID field
                    }))}
                    onChange={(selected) => {
                        console.log('Selected Roles:', selected);
                    }}
                />
            </Form.Item>
        </>
    );
}
