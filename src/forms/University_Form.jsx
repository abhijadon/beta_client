import React, { useEffect } from 'react';
import { Form, Input, Switch, Select, Spin } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';

export default function UniversityForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const dispatch = useDispatch();

    // Fetch institutes data from Redux
    const institutes = useSelector((state) => selectSpecificEntityData(state, 'institutes'));
    const instituteLoading = useSelector((state) => selectSpecificEntityLoading(state, 'institutes'));

    // Fetch modes data from Redux
    const modes = useSelector((state) => selectSpecificEntityData(state, 'modes'));
    const modesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'modes'));

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance
        const signal = controller.signal;

        // Dispatch action to fetch options for institutes and modes
        dispatch(fetchOptions('institutes', { signal }));
        dispatch(fetchOptions('modes', { signal }));

        // Cleanup function to cancel the API call if the component unmounts or dependencies change
        return () => controller.abort();
    }, [dispatch]);

    // Transform institutes data into options for the Select component
    const instituteOptions =
        institutes?.map((institute) => ({
            label: institute.name, // Display name
            value: institute._id,  // Unique ID as value
        })) || [];

    // Transform modes data into options for the Select component
    const modeOptions =
        modes?.map((mode) => ({
            label: mode.name, // Display name
            value: mode._id,  // Unique ID as value
        })) || [];

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

            {/* University Name Field */}
            <Form.Item
                label={translate('University Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the university name') }]}
            >
                <Input placeholder={translate('Enter university name')} />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>

            {/* Institute Selection Field */}
            <Form.Item
                label={translate('Institutes')}
                name="institute"
                rules={[{ required: true, message: translate('Please select institutes') }]}
            >
                {instituteLoading ? (
                    <Spin tip={translate('Loading institutes...')} />
                ) : (
                    <Select
                        mode="multiple"
                        placeholder={translate('Select institutes')}
                        options={instituteOptions}
                    />
                )}
            </Form.Item>

            {/* Mode Selection Field */}
            <Form.Item
                label={translate('Modes')}
                name="modes"
                rules={[{ required: true, message: translate('Please select modes') }]}
            >
                {modesLoading ? (
                    <Spin tip={translate('Loading modes...')} />
                ) : (
                    <Select
                        mode="multiple"
                        placeholder={translate('Select modes')}
                        options={modeOptions}
                    />
                )}
            </Form.Item>
        </>
    );
}
