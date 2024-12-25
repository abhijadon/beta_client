import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { fetchOptions } from '@/redux/options/actions';
import {
  selectSpecificEntityData,
  selectSpecificEntityLoading,
} from '@/redux/options/selectors';

export default function UserForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const dispatch = useDispatch();

  // Selectors for roles and institutes data
  const roles = useSelector((state) => selectSpecificEntityData(state, 'roles'));
  const rolesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'roles'));

  const institutes = useSelector((state) => selectSpecificEntityData(state, 'institutes'));
  const institutesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'institutes'));

  // Refs to track if API calls have already been made
  const isRolesFetched = useRef(false);
  const isInstitutesFetched = useRef(false);

  useEffect(() => {
    // Fetch roles data if not already fetched
    if (!isRolesFetched.current) {
      dispatch(fetchOptions('roles'));
      isRolesFetched.current = true;
    }

    // Fetch institutes data if not already fetched
    if (!isInstitutesFetched.current) {
      dispatch(fetchOptions('institutes'));
      isInstitutesFetched.current = true;
    }
  }, [dispatch]);

  return (
    <>
      {/* Enabled Field */}
      <div className="flex items-center justify-between">
        <Form.Item
          label={translate('Enabled')}
          name="enabled"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
        </Form.Item>
        {/* Is Admin Field */}
        <Form.Item
          label={translate('Is Admin')}
          name="isAdmin"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
        </Form.Item>
      </div>

      {/* Full Name Field */}
      <Form.Item
        label={translate('Full Name')}
        name="fullname"
        rules={[{ required: true, message: translate('Please enter the full name') }]}
      >
        <Input placeholder={translate('Enter full name')} />
      </Form.Item>

      {/* Phone Field */}
      <Form.Item
        label={translate('Phone')}
        name="phone"
        rules={[
          { required: true, message: translate('Please enter a phone number') },
          { pattern: /^\d{10}$/, message: translate('Phone number must be 10 digits') },
        ]}
      >
        <Input placeholder={translate('Enter phone number')} />
      </Form.Item>

      {/* Username Field */}
      <Form.Item
        label={translate('Username')}
        name="username"
        rules={[{ required: true, message: translate('Please enter the username') }]}
      >
        <Input placeholder={translate('Enter username')} />
      </Form.Item>

      {/* Password Field */}
      <Form.Item
        label={translate('Password')}
        name="password"
        rules={[
          {
            required: !isUpdateForm, // Required only for create form
            message: translate('Please enter a password'),
          },
        ]}
      >
        <Input.Password placeholder={translate('Enter password')} />
      </Form.Item>

      {/* Role Selection Field */}
      <Form.Item
        label={translate('Role')}
        name="role"
        rules={[{ required: true, message: translate('Please select a role') }]}
      >
        <Select
          placeholder={translate('Select role')}
          loading={rolesLoading}
          options={roles?.map((role) => ({
            label: role.name,
            value: role._id,
          }))}
        />
      </Form.Item>

      {/* Institute Selection Field */}
      <Form.Item
        label={translate('Institute')}
        name="institute"
        rules={[{ required: true, message: translate('Please select an institute') }]}
      >
        <Select
          mode="multiple"
          placeholder={translate('Select institutes')}
          loading={institutesLoading}
          options={institutes?.map((institute) => ({
            label: institute.name,
            value: institute._id,
          }))}
        />
      </Form.Item>
    </>
  );
}
