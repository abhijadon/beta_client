import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message, Radio, Modal } from 'antd';
import axios from 'axios';
import useLanguage from '@/locale/useLanguage';
import { InboxOutlined } from '@ant-design/icons';
import DocumentPreview from '@/components/DocumentPreview';
const UpdatePaymentForm = ({ entity, id, recordDetails, onCloseModal }) => {
    const [loading, setLoading] = useState(false);
    const translate = useLanguage();
    const [role, setRole] = useState('');
    const [success, setSuccess] = useState(false); // Track success state
    const [paymentStatus, setPaymentStatus] = useState('');
    const [installmentType, setInstallmentType] = useState('');
    const [documentModalVisible, setDocumentModalVisible] = useState(false);
    const [documentUrls, setDocumentUrls] = useState([]);
    const [documentType, setDocumentType] = useState(''); // New state variable to track the document type to be displayed

    // Event handler to show fee-related documents in the modal
    const handleViewFeeReceipt = () => {
        if (recordDetails && recordDetails.feeDocument) {
            setDocumentUrls(recordDetails.feeDocument); // Set fee documents to display
            setDocumentType('fee'); // Set document type
            setDocumentModalVisible(true); // Open modal
        }
    };

    // Event handler to show student-related documents in the modal
    const handleViewStudentDocuments = () => {
        if (recordDetails && recordDetails.studentDocument) {
            setDocumentUrls(recordDetails.studentDocument); // Set student documents to display
            setDocumentType('student'); // Set document type
            setDocumentModalVisible(true); // Open modal
        }
    };

    const onDownload = (url) => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = true;

        // Trigger the click event on the link to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };

    // Fetch the installment type from the backend
    useEffect(() => {
        if (recordDetails && recordDetails.customfields) {
            setInstallmentType(recordDetails.customfields.installment_type || '');
            setPaymentStatus(recordDetails.customfields.paymentStatus || '');
        }
    }, [recordDetails]);


    // Define the installment options with filtering logic
    const getInstallmentOptions = () => {
        const allInstallmentOptions = [
            { value: '1st Installment', label: '1st Installment' },
            { value: '2nd Installment', label: '2nd Installment' },
            { value: '3rd Installment', label: '3rd Installment' },
            { value: '4th Installment', label: '4th Installment' },
            { value: '5th Installment', label: '5th Installment' },
            { value: '6th Installment', label: '6th Installment' },
            { value: '7th Installment', label: '7th Installment' },
            { value: '8th Installment', label: '8th Installment' },
            { value: '9th Installment', label: '9th Installment' },
            { value: '10th Installment', label: '10th Installment' },
        ];

        if (installmentType === '1st Installment') {
            // Exclude the first installment
            return allInstallmentOptions.filter(option => option.value !== '1st Installment');
        }

        if (installmentType === '2nd Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment'].includes(option.value));
        }
        if (installmentType === '3rd Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment'].includes(option.value));
        }
        if (installmentType === '4th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment'].includes(option.value));
        }
        if (installmentType === '5th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment'].includes(option.value));
        }

        if (installmentType === '6th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment', '6th Installment'].includes(option.value));
        }
        if (installmentType === '7th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment', '6th Installment', '7th Installment'].includes(option.value));
        }
        if (installmentType === '8th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment', '6th Installment', '7th Installment', '8th Installment'].includes(option.value));
        }
        if (installmentType === '9th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment', '6th Installment', '7th Installment', '8th Installment', '9th Installment'].includes(option.value));
        }
        if (installmentType === '10th Installment') {
            // Exclude the first and second installments
            return allInstallmentOptions.filter(option => !['1st Installment', '2nd Installment', '3rd Installment', '4th Installment', '5th Installment', '6th Installment', '7th Installment', '8th Installment', '9th Installment', '10th Installment'].includes(option.value));
        }
        return allInstallmentOptions; // Default options if no specific exclusion
    };

    const installmentOptions = getInstallmentOptions();


    const isFieldDisabled = (fieldName) => {
        if (fieldName === 'paid_amount') {
            return paymentStatus === 'payment received' || paymentStatus === 'payment rejected';
        }
        return false; // default to not disabled
    };


    // Determine whether the fields should be disabled or enabled
    const isField = (fieldName) => {
        if (fieldName === 'paid_amount') {
            return paymentStatus === 'payment approved';
        }
        return false; // default to not disabled
    };

    useEffect(() => {
        // Retrieve the role from localStorage and parse it as JSON
        const storedRole = window.localStorage.getItem('auth');
        const parsedRole = storedRole ? JSON.parse(storedRole).current.role : '';
        setRole(parsedRole);
    }, []);

    useEffect(() => {
        // Automatically refresh the page after 2 seconds when success state changes to true
        if (success) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 2000); // 2000 milliseconds = 2 seconds
            // Clear the timer when the component unmounts or success state changes
            return () => clearTimeout(timer);
        }
    }, [success]);
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('full_name', values.full_name);
            formData.append('contact[email]', values.contact.email);
            formData.append('contact[phone]', values.contact.phone);
            formData.append('education[course]', values.education.course);
            formData.append('customfields[institute_name]', values.customfields.institute_name);
            formData.append('customfields[university_name]', values.customfields.university_name);
            formData.append('customfields[session]', values.customfields.session);
            formData.append('customfields[father_name]', values.customfields.father_name);
            formData.append('customfields[dob]', values.customfields.dob);
            formData.append('customfields[installment_type]', values.customfields.installment_type);
            formData.append('customfields[payment_mode]', values.customfields.payment_mode);
            formData.append('customfields[payment_type]', values.customfields.payment_type);
            formData.append('customfields[total_course_fee]', values.customfields.total_course_fee);
            formData.append('customfields[total_paid_amount]', values.customfields.total_paid_amount);
            formData.append('customfields[paid_amount]', values.customfields.paid_amount);
            formData.append('customfields[paymentStatus]', values.customfields.paymentStatus);

            formData.append(
                'customfields[sendfeeReciept]',
                values.customfields.sendfeeReciept === 'yes' ? 'Yes' : 'No'
            );

            // Append existing images 
            if (recordDetails && recordDetails.feeDocument) {
                recordDetails.feeDocument.forEach((image) => {
                    formData.append('feeDocument', image);
                });
            }
            // Append newly uploaded images
            if (values.feeDocument && Array.isArray(values.feeDocument)) {
                values.feeDocument.forEach((file) => {
                    formData.append('feeDocument', file.originFileObj);
                });
            }

            const response = await axios.put(`/${entity}/updatePayment/${id}`, formData);
            if (response && response.data && response.data.success) {
                setSuccess(true);
                onCloseModal(); // Close modal if needed
                if (response.data.message) {
                    message.success(response.data.message); // Display success message from backend
                }
            }
        } catch (error) {
            console.error('Update failed:', error);
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message); // Display error message from backend
            } else {
                message.error('Update failed'); // Display generic error message
            }
        } finally {
            setLoading(false);
        }
    };

    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    // Define function to get status options based on role
    const getStatusOptions = (role) => {
        const commonOptions = [
            { value: 'Payment Approved', label: translate('Payment Approved') },
            { value: 'Payment Received', label: translate('Payment Received') },
            { value: 'Payment Rejected', label: translate('Payment Rejected') },
        ];

        if (['supportiveassociate', 'teamleader'].includes(role)) {
            return commonOptions.filter(option => option.value === 'Payment Received');
        }

        return commonOptions;
    };

    // Get status options based on the role
    const statusOptions = getStatusOptions(role);



    return (
        <><Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={recordDetails || null}
        >
            <Form.Item
                name="full_name"
                label="Fullname"
                rules={[{ required: true, message: 'Please enter fullname' }]}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                hidden
                label={translate('University name')}
                name={['customfields', 'university_name']}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                hidden
                label={translate('session')}
                name={['customfields', 'session']}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                hidden
                label={translate('Institute name')}
                name={['customfields', 'institute_name']}
            >
                <Select
                    showSearch
                    disabled
                    optionFilterProp='children'
                    options={[
                        { value: 'HES', label: 'HES' },
                        { value: 'DES', label: 'DES' },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item
                hidden
                label={translate('Course name')}
                name={['education', 'course']}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                hidden
                label={translate('father name')}
                name={['customfields', 'father_name']}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                hidden
                label={translate('Date of birth')}
                name={['customfields', 'dob']}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                label={translate('email')}
                name={['contact', 'email']}
            >
                <Input type='email' autoComplete='on' disabled />
            </Form.Item>

            <Form.Item
                label={translate('phone')}
                name={['contact', 'phone']}
            >
                <Input type='tel' autoComplete='on' disabled />
            </Form.Item>
            <Form.Item
                label={translate('Installment Type')}
                name={['customfields', 'installment_type']}
            >

                <Select
                    disabled={isFieldDisabled('paid_amount')}
                    showSearch
                    options={installmentOptions}
                ></Select>

            </Form.Item>


            <Form.Item
                label={translate('Payment Mode')}
                name={['customfields', 'payment_mode']}
            >
                <Select
                    showSearch
                    disabled={isFieldDisabled('paid_amount')}
                    options={[
                        { value: 'DES Bank Account/UPI', label: 'DES Bank Account/UPI' },
                        { value: 'University Website', label: 'University Website' },
                        { value: 'HES Bank Account/UPI', label: 'HES Bank Account/UPI' },
                        { value: 'University Bank Account', label: 'University Bank Account' },
                        { value: 'Cash/DD', label: 'Cash/DD' }
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item
                label={translate('payment type')}
                name={['customfields', 'payment_type']}
            >
                <Select disabled
                    showSearch
                    options={[
                        { value: 'Semester', label: translate('semester') },
                        { value: 'Yearly', label: translate('Yearly') },
                        { value: 'Fullfees', label: translate('Fullfees') },
                    ]}
                ></Select>
            </Form.Item>

            <Form.Item
                label={translate('Total Course Fee')}
                name={['customfields', 'total_course_fee']}
                rules={[{ required: true, message: 'Enter Course Fee' }]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Enter Total Paid Amount' }]}
                label={translate('Total Paid Amount')}
                name={['customfields', 'total_paid_amount']}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Enter paid amount' }]}
                label={translate('Paid Amount')}
                name={['customfields', 'paid_amount']}
            >
                <Input disabled={isFieldDisabled('paid_amount')} />
            </Form.Item>
            <Form.Item
                label="Send Fee Receipt"
                name={['customfields', 'sendfeeReciept']}
                rules={[{ required: true, message: 'Please select an option' }]}
            >
                <Radio.Group disabled={isField('paid_amount')}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={translate('paymentStatus')}
                name={['customfields', 'paymentStatus']}
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                {isLoggedIn && role ? (
                    <Select
                        showSearch
                        optionFilterProp='children'
                        options={statusOptions}
                    ></Select>
                ) : null}
            </Form.Item>
            <div className="flex items-center justify-start gap-24">
                <Form.Item>
                    <Button
                        className="bg-blue-300 text-blue-700 rounded h-8 hover:text-blue-900 hover:bg-blue-100"
                        onClick={handleViewFeeReceipt}
                    >
                        View Fee Receipt
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        className="bg-green-300 text-green-700 rounded h-8 hover:text-green-900 hover:bg-green-100"
                        onClick={handleViewStudentDocuments}
                    >
                        View Student Documents
                    </Button>
                </Form.Item>
            </div>
            <Form.Item
                label="Fee Documents"
                name="feeDocument"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    // Return the file list from the event
                    return e && e.fileList ? e.fileList : [];
                }}
            >
                <Upload.Dragger
                    disabled={isFieldDisabled('paid_amount')}
                    multiple
                    listType="picture-card"
                    accept="image/png, image/jpeg, image/jpg"
                    beforeUpload={() => false} // Prevent automatic upload
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag files to upload</p>
                    <p className="ant-upload-hint">Supports preview of image files</p>
                </Upload.Dragger>
            </Form.Item>

            <Form.Item>
                <Button className='bg-red-300 text-red-800 rounded' htmlType="submit" loading={loading}>
                    Update Payment
                </Button>
            </Form.Item>
        </Form><Modal
            title={<div className="font-thin text-lg border-b mb-10">
                {documentType === 'fee' ? 'Fee Receipt' : 'Student Documents'}
            </div>}
            visible={documentModalVisible}
            onCancel={() => setDocumentModalVisible(false)}
            footer={null}
            width={1000}
        >
                <DocumentPreview documentUrls={documentUrls} onDownload={onDownload} />
            </Modal></>
    );
};

export default UpdatePaymentForm;
