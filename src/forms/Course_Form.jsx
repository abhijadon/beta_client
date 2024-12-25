import React, { useEffect } from 'react';
import { Form, Input, Switch, Select, Spin } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { selectSpecificEntityData, selectSpecificEntityLoading } from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';

export default function CourseForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const dispatch = useDispatch();

    // Fetch universities data from Redux
    const universities = useSelector((state) => selectSpecificEntityData(state, 'university'));
    const universityLoading = useSelector((state) => selectSpecificEntityLoading(state, 'university'));

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance
        const signal = controller.signal;

        // Dispatch action to fetch options
        dispatch(fetchOptions('university', { signal }));

        // Cleanup function to cancel the API call if the component unmounts or dependencies change
        return () => controller.abort();
    }, [dispatch]);

    // Transform universities data into options for the Select component
    const universityOptions = universities?.map((university) => ({
        label: university.name, // Display name
        value: university._id,  // Unique ID as value
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

            {/* Course Name Field */}
            <Form.Item
                label={translate('Course Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the course name') }]}
            >
                <Input placeholder={translate('Enter course name')} />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>

            {/* University Selection Field */}
            <Form.Item
                label={translate('Universities')}
                name="university"
                rules={[{ required: true, message: translate('Please select universities') }]}
            >
                {universityLoading ? (
                    <Spin tip={translate('Loading universities...')} />
                ) : (
                    <Select
                        mode="multiple"
                        placeholder={translate('Select universities')}
                        options={universityOptions}
                    />
                )}
            </Form.Item>
        </>
    );
}
