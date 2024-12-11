import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectSelectedUpdatePayment } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function AddPayment({ config, formElements, withUpload = false }) {
    let { entity } = config;
    const translate = useLanguage();
    const dispatch = useDispatch();
    const { current, isLoading, isSuccess } = useSelector(selectSelectedUpdatePayment);
    const { state } = useCrudContext();
    const [form] = Form.useForm();

    const onSubmit = (fieldsValue) => {
        const id = current._id;
        if (fieldsValue.file && withUpload) {
            fieldsValue.file = fieldsValue.file[0].originFileObj;
        }
        const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
            acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
            return acc;
        }, {});
        dispatch(crud.update({ entity, id, jsonData: trimmedValues, withUpload }));
    };

    useEffect(() => {
        if (current) {
            let newValues = { ...current };
            form.setFieldsValue(newValues);
        }
    }, [current]);

    useEffect(() => {
        if (isSuccess) {
            form.resetFields();
            dispatch(crud.resetAction({ actionType: 'updatePayment' }));
            dispatch(crud.list({ entity }));
        }
    }, [isSuccess]);

    const { isPaymentBoxOpen } = state;
    const show = isPaymentBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
    return (
        <div style={show}>
            <Loading isLoading={isLoading}>
                <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{ user: { role: 'user' }, teamMembers: [{}] }}>
                    {formElements}
                    <Form.Item
                        style={{
                            display: 'inline-block',
                            paddingRight: '5px',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            {translate('Save')}
                        </Button>
                    </Form.Item>
                    <Form.Item
                        style={{
                            display: 'inline-block',
                            paddingLeft: '5px',
                        }}
                    >
                    </Form.Item>
                </Form>
            </Loading>
        </div>
    );
}
