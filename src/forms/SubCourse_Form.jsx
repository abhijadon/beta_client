import React, { useEffect } from 'react';
import { Form, Input, Switch, Select, Spin } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { fetchOptions } from '@/redux/options/actions';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';

export default function SubcourseForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const dispatch = useDispatch();

    // Fetch courses data from Redux
    const courses = useSelector((state) => selectSpecificEntityData(state, 'course'));
    const coursesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'course'));

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(fetchOptions('course', { signal }));

        return () => controller.abort();
    }, [dispatch]);

    const courseOptions = courses?.map((course) => ({
        label: course.name,
        value: course._id,
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

            {/* Subcourse Name Field */}
            <Form.Item
                label={translate('Subcourse Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the subcourse name') }]}
            >
                <Input placeholder={translate('Enter subcourse name')} />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>

            {/* Course Selection Field */}
            <Form.Item
                label={translate('Course')}
                name="course"
                rules={[{ required: true, message: translate('Please select a course') }]}
            >
                {coursesLoading ? (
                    <Spin tip={translate('Loading courses...')} />
                ) : (
                    <Select
                        mode='multiple'
                        placeholder={translate('Select a course')}
                        options={courseOptions}
                    />
                )}
            </Form.Item>
        </>
    );
}
