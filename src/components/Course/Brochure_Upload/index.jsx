import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { course } from '@/redux/course/actions';
import { useCrudContext } from '@/context/crud';
import { selectcreateDocument } from '@/redux/course/selector';
import useLanguage from '@/locale/useLanguage';
import { Button, Form, Select, Upload } from 'antd';
import { InboxOutlined, FileOutlined, FileAddOutlined, FileTextOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';
const { Option } = Select;

export default function UploadBrochure({ config, onUploadSuccess, onClose }) {
    const { entity } = config;
    const { isLoading, isSuccess } = useSelector(selectcreateDocument);
    const { crudContextAction } = useCrudContext();
    const [form] = Form.useForm();
    const [formSection, setFormSection] = useState('brochure'); // Tracks the active form section
    const translate = useLanguage();
    const dispatch = useDispatch();

    console.log('Upload', isSuccess)

    // Fetch data for modes, universities, courses, and subcourses
    const modes = useSelector((state) => selectSpecificEntityData(state, 'modes'));
    const universities = useSelector((state) => selectSpecificEntityData(state, 'university'));
    const courses = useSelector((state) => selectSpecificEntityData(state, 'course'));
    const subcourses = useSelector((state) => selectSpecificEntityData(state, 'subcourse'));

    // Loading states
    const modesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'modes'));
    const universitiesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'university'));
    const coursesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'course'));
    const subcoursesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'subcourse'));

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch all required options
        dispatch(fetchOptions('modes', { signal }));
        dispatch(fetchOptions('university', { signal }));
        dispatch(fetchOptions('course', { signal }));
        dispatch(fetchOptions('subcourse', { signal }));

        return () => controller.abort();
    }, [dispatch]);

    // Transform fetched data into options for Select components
    const toOptions = (data) => data?.map((item) => ({ label: item.name, value: item._id, children: item.children || [] })) || [];

    const onSubmit = (values) => {
        console.log('onSubmit', values);

        // Extract file name if brochure is uploaded
        if (values.brochure && values.brochure.length > 0) {
            // Assume first file uploaded is used as the brochure
            values.brochure = values.brochure[0].name;
        }

        // Dispatch Redux action with the collected form data
        dispatch(course.createDocument({ entity: 'brochures', jsonData: values }));
    };



    useEffect(() => {
        if (isSuccess) {
            form.resetFields(); // Reset the form
            onClose()
            dispatch(course.resetAction({ actionType: 'createDocument' }));
            dispatch(course.list({ entity }));
        }
    }, [isSuccess]);

    return (
        <Loading isLoading={isLoading || modesLoading || universitiesLoading || coursesLoading || subcoursesLoading}>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                {/* Section Selector Buttons */}
                <div className="button-group flex items-center justify-center space-x-1 mb-6">
                    <Button
                        type={formSection === 'brochure' ? 'primary' : 'default'}
                        icon={<FileOutlined />}
                        onClick={() => setFormSection('brochure')}
                    >
                        Brochure
                    </Button>
                    <Button
                        type={formSection === 'marksheet' ? 'primary' : 'default'}
                        icon={<FileAddOutlined />}
                        onClick={() => setFormSection('marksheet')}
                    >
                        Sample Marksheet
                    </Button>
                    <Button
                        type={formSection === 'degree' ? 'primary' : 'default'}
                        icon={<FileTextOutlined />}
                        onClick={() => setFormSection('degree')}
                    >
                        Sample Degree
                    </Button>
                </div>

                {/* Shared Fields */}
                <Form.Item label="University" name="university">
                    <Select
                        placeholder="Select university name"
                        showSearch
                        optionFilterProp="label"
                        options={toOptions(universities)}
                    />
                </Form.Item>

                {/* Conditional Fields Based on Selected Section */}
                {formSection === 'brochure' && (
                    <>
                        <Form.Item label="Course" name="course">
                            <Select
                                placeholder="Select course"
                                showSearch
                                optionFilterProp="label"
                                options={toOptions(courses)}
                            />
                        </Form.Item>
                        <Form.Item label="Elective" name="elective">
                            <Select
                                placeholder="Select elective"
                                showSearch
                                optionFilterProp="label"
                                options={toOptions(subcourses)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Brochure"
                            name="brochure"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        >
                            <Upload.Dragger multiple listType="picture" accept=".png,.jpeg,.svg,.pdf">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag files to this area to upload</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </>
                )}

                {formSection === 'marksheet' && (
                    <Form.Item
                        label="Sample Marksheet"
                        name="sampleMarksheet"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload.Dragger multiple listType="picture" accept=".png,.jpeg,.svg,.pdf">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag files to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                )}

                {formSection === 'degree' && (
                    <Form.Item
                        label="Sample Degree"
                        name="sampleDegree"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload.Dragger multiple listType="picture" accept=".png,.jpeg,.svg,.pdf">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag files to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                )}

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {translate('Submit')}
                    </Button>
                </Form.Item>
            </Form>
        </Loading>
    );
}
