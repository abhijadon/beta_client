import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, Radio, Modal, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { InboxOutlined } from '@ant-design/icons';
import DocumentPreview from '@/components/DocumentPreview';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedUpdatePayment } from '@/redux/crud/selectors';
import { crud } from '@/redux/crud/actions';

const UpdatePaymentForm = ({ entity, id, recordDetails, withUpload = false }) => {
    // const dispatch = useDispatch();
    // const { current, isSuccess, isLoading } = useSelector(selectSelectedUpdatePayment);
    // const translate = useLanguage();
    // const [role, setRole] = useState('');
    // const [paymentStatus, setPaymentStatus] = useState('');
    // const [installmentType, setInstallmentType] = useState('');
    // const [documentModalVisible, setDocumentModalVisible] = useState(false);
    // const [documentUrls, setDocumentUrls] = useState([]);
    // const [documentType, setDocumentType] = useState('');
    // console.log(current)

    // const handleViewFeeReceipt = () => {
    //     if (recordDetails && recordDetails.feeDocument) {
    //         setDocumentUrls(recordDetails.feeDocument);
    //         setDocumentType('fee');
    //         setDocumentModalVisible(true);
    //     }
    // };

    // const handleViewStudentDocuments = () => {
    //     if (recordDetails && recordDetails.studentDocument) {
    //         setDocumentUrls(recordDetails.studentDocument);
    //         setDocumentType('student');
    //         setDocumentModalVisible(true);
    //     }
    // };

    // const restrictNumericInput = (e) => {
    //     const charCode = e.which ? e.which : e.keyCode;
    //     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //         e.preventDefault();
    //     }
    // };

    // const onDownload = (url) => {
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = true;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    // useEffect(() => {
    //     if (recordDetails && recordDetails.customfields) {
    //         setInstallmentType(recordDetails.customfields.installment_type || '');
    //         setPaymentStatus(recordDetails.customfields.paymentStatus || '');
    //     }
    // }, [recordDetails]);

    // const getInstallmentOptions = () => {
    //     const allInstallmentOptions = [
    //         { value: '1st Installment', label: '1st Installment' },
    //         { value: '2nd Installment', label: '2nd Installment' },
    //         { value: '3rd Installment', label: '3rd Installment' },
    //         { value: '4th Installment', label: '4th Installment' },
    //         { value: '5th Installment', label: '5th Installment' },
    //         { value: '6th Installment', label: '6th Installment' },
    //         { value: '7th Installment', label: '7th Installment' },
    //         { value: '8th Installment', label: '8th Installment' },
    //         { value: '9th Installment', label: '9th Installment' },
    //         { value: '10th Installment', label: '10th Installment' },
    //     ];

    //     const excludedInstallments = allInstallmentOptions.slice(0, parseInt(installmentType.split(' ')[0], 10));
    //     return allInstallmentOptions.filter(option => !excludedInstallments.includes(option));
    // };
    // const installmentOptions = getInstallmentOptions();
    // const isFieldDisabled = (fieldName) => {
    //     if (fieldName === 'paid_amount') {
    //         return paymentStatus === 'payment received';
    //     }
    //     return false;
    // };

    // const isField = (fieldName) => {
    //     if (fieldName === 'paid_amount') {
    //         return paymentStatus === 'payment approved' || paymentStatus === 'payment rejected';
    //     }
    //     return false;
    // };

    // const isFieldrejected = (fieldName) => {
    //     if (fieldName === 'paid_amount') {
    //         return paymentStatus === 'payment rejected';
    //     }
    //     return false;
    // };

    // useEffect(() => {
    //     const storedRole = window.localStorage.getItem('auth');
    //     const parsedRole = storedRole ? JSON.parse(storedRole).current.role : '';
    //     setRole(parsedRole);
    // }, []);

    // useEffect(() => {
    //     if (isSuccess) {
    //         const timer = setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isSuccess]);

    // const onFinish = (fieldsValue) => {
    //     if (fieldsValue.studentDocument && withUpload) {
    //         fieldsValue.studentDocument = fieldsValue.studentDocument[0].originFileObj;
    //     }
    //     if (fieldsValue.feeDocument && withUpload) {
    //         fieldsValue.feeDocument = fieldsValue.feeDocument[0].originFileObj;
    //     }
    //     dispatch(crud.updatePayment({ entity, id, jsonData: fieldsValue }));
    // };

    // const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    // const getStatusOptions = (role) => {
    //     const commonOptions = [
    //         { value: 'Payment Approved', label: translate('Payment Approved') },
    //         { value: 'Payment Received', label: translate('Payment Received') },
    //         { value: 'Payment Rejected', label: translate('Payment Rejected') },
    //     ];

    //     if (['supportiveassociate', 'teamleader'].includes(role)) {
    //         return commonOptions.filter(option => option.value === 'Payment Received');
    //     }

    //     return commonOptions;
    // };

    // const statusOptions = getStatusOptions(role);

    return (
        <>
            <Form.Item
                name="full_name"
                label="Fullname"
                rules={[{ required: true, message: 'Please enter fullname' }]}
            >
                <Input disabled />
            </Form.Item>
        </>
    );
};

export default UpdatePaymentForm;
