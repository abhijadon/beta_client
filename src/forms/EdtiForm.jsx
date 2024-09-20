import { Form, Input, Select, Radio, InputNumber, Upload, DatePicker } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import axios from 'axios';

const { TextArea } = Input;

export default function EditForm() {
    const translate = useLanguage();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const currentAdmin = useSelector(selectCurrentAdmin);
    const isAdmin = ['admin', 'subadmin', 'manager'].includes(currentAdmin?.role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/form/list');
                const formFields = response.data.data[0];
                setFormData(formFields);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const restrictNumericInput = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    const renderFields = (fields) => {
        return fields.map((field) => {
            switch (field.Type) {
                case 'email':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <Input type='email' placeholder={field.placeholder} />
                        </Form.Item>
                    );
                case 'text':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <Input type='text' placeholder={field.placeholder} />
                        </Form.Item>
                    );
                case 'tel':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <Input type='tel' placeholder={field.placeholder} />
                        </Form.Item>
                    );
                case 'textarea':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <TextArea placeholder={field.placeholder} rows={3} />
                        </Form.Item>
                    );
                case 'date':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <DatePicker placeholder={field.placeholder} />
                        </Form.Item>
                    );
                case 'file':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <Upload>
                                <Input type='file' />
                            </Upload>
                        </Form.Item>
                    );
                case 'select':
                    return (
                        <Form.Item
                            key={field._id}
                            label={translate(field.label_name)}
                            name={field.field_name}
                            rules={[
                                { required: field.required, message: `${field.label_name} is required` }
                            ]}
                        >
                            <Select
                                placeholder={field.placeholder}
                                options={field.options.map(option => ({
                                    value: option.value,
                                    label: option.label
                                }))}
                            />
                        </Form.Item>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <>
            {formData && (
                <Form form={form} initialValues={formData}>
                    <div className='grid grid-cols-4 gap-3'>
                        <Form.Item
                            label={translate('Institute')}
                            name='institute'
                            rules={[{ required: true, message: 'Please select an institute' }]}
                        >
                            <Select
                                showSearch
                                placeholder='Select an institute'
                                options={formData.institutes.map(institute => ({
                                    value: institute.name._id,
                                    label: institute.name.name
                                }))}
                                onChange={(value) => {
                                    setSelectedInstitute(value);
                                    setSelectedUniversity(null); // Reset university selection
                                    form.setFieldsValue({ university: null }); // Reset university field value
                                }}
                            />
                        </Form.Item>

                        {selectedInstitute && (
                            <Form.Item
                                label={translate('University')}
                                name='university'
                                rules={[{ required: true, message: 'Please select a university' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder='Select a university'
                                    options={formData.institutes
                                        .find(institute => institute.name._id === selectedInstitute)
                                        .universities.map(university => ({
                                            value: university.name._id,
                                            label: university.name.name
                                        }))}
                                    onChange={(value) => {
                                        setSelectedUniversity(value);
                                    }}
                                />
                            </Form.Item>
                        )}

                        {selectedUniversity && renderFields(
                            formData.institutes
                                .find(institute => institute.name._id === selectedInstitute)
                                .universities.find(university => university.name._id === selectedUniversity)
                                .fields
                        )}

                        <Form.Item
                            label={translate('status')}
                            name={['customfields', 'status']}
                            rules={[{ required: true, message: 'Status is required' }]}
                        >
                            <Select
                                showSearch
                                options={[
                                    { value: 'New', label: translate('New') },
                                    { value: 'Approved', label: translate('Approved') },
                                    { value: 'Processed', label: translate('Processed') },
                                    { value: 'Enrolled', label: translate('Enrolled') },
                                    { value: 'Correction', label: translate('Correction') },
                                    { value: 'Cancel', label: translate('Cancel') },
                                    { value: 'Refunded', label: translate('Refunded') },
                                    { value: 'Alumni', label: translate('Alumni') },
                                    { value: 'Connected', label: translate('Connected') },
                                ]}
                                onChange={(value) => setStatus(value)}
                            />
                        </Form.Item>

                        {status === 'Enrolled' && (
                            <Form.Item
                                label={translate('Enrollment Number')}
                                name={['customfields', 'enrollment']}
                                rules={[
                                    { required: status === 'Enrolled', message: 'Enrollment number is required for enrolled status' },
                                ]}
                            >
                                <Input placeholder='Enter enrollment number' />
                            </Form.Item>
                        )}

                        <Form.Item
                            label={translate('Remark')}
                            name={['customfields', 'remark']}
                        >
                            <TextArea rows={1} />
                        </Form.Item>

                        {isAdmin && (
                            <Form.Item
                                label={translate('LMS Status')}
                                name={['customfields', 'lmsStatus']}
                            >
                                <Radio.Group>
                                    <Radio value="yes">{translate('Yes')}</Radio>
                                    <Radio value="no">{translate('No')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                    </div>
                </Form>
            )}
        </>
    );
}
