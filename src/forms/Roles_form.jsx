import React, { useEffect } from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpecificEntityData, selectSpecificEntityLoading } from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';
import useLanguage from '@/locale/useLanguage';

export default function RolesForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const dispatch = useDispatch();

    // Fetch institutes, universities, and modes data from Redux
    const institutes = useSelector((state) => selectSpecificEntityData(state, 'institutes'));
    const universities = useSelector((state) => selectSpecificEntityData(state, 'university'));
    const modes = useSelector((state) => selectSpecificEntityData(state, 'modes'));

    const instituteLoading = useSelector((state) => selectSpecificEntityLoading(state, 'institutes'));
    const universityLoading = useSelector((state) => selectSpecificEntityLoading(state, 'university'));
    const modesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'modes'));

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Dispatch actions to fetch options for institutes, university, and modes
        dispatch(fetchOptions('institutes', { signal }));
        dispatch(fetchOptions('university', { signal }));
        dispatch(fetchOptions('modes', { signal }));

        return () => controller.abort();
    }, [dispatch]);

    // Transform institutes, universities, and modes data into options for the Select component
    const instituteOptions =
        institutes?.map((institute) => ({
            label: institute.name,
            value: institute._id,
        })) || [];

    const universityOptions =
        universities?.map((university) => ({
            label: university.name,
            value: university._id,
        })) || [];

    const modeOptions =
        modes?.map((mode) => ({
            label: mode.name,
            value: mode._id,
        })) || [];

    // Static actions for the Select component
    const actions = [
        { label: translate('Read'), value: 'read' },
        { label: translate('Write'), value: 'write' },
        { label: translate('Create'), value: 'create' },
        { label: translate('Update'), value: 'update' },
        { label: translate('Delete'), value: 'delete' },
        { label: translate('History'), value: 'history' },
        { label: translate('Excel'), value: 'excel' },
        { label: translate('Payment'), value: 'payment' },
        { label: translate('Document'), value: 'document' },
        { label: translate('Notification'), value: 'notification' },
        { label: translate('Comment'), value: 'comment' },
        { label: translate('Team'), value: 'team' },
        { label: translate('Filter'), value: 'filter' },
    ];

    return (
        <>
            <Form.Item
                label={translate('Enabled')}
                name="enabled"
                valuePropName="checked"
                initialValue={true}
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item
                label={translate('Role Name')}
                name="name"
                rules={[{ required: true, message: translate('Please enter the role name') }]}
            >
                <Input placeholder={translate('Enter role name')} />
            </Form.Item>
            <Form.Item
                label={translate('Description')}
                name="description"
                rules={[{ required: true, message: translate('Please enter a description') }]}
            >
                <Input placeholder={translate('Enter description')} />
            </Form.Item>
            <Form.Item
                label={translate('Actions')}
                name="actions"
                rules={[{ required: true, message: translate('Please select actions') }]}
            >
                <Select
                    mode="multiple"
                    placeholder={translate('Select actions')}
                    options={actions}
                />
            </Form.Item>
            <Form.Item
                label={translate('Institute')}
                name="institutes"
                rules={[{ required: true, message: translate('Please select an institute') }]}
            >
                <Select
                    mode='multiple'
                    options={instituteOptions}
                    loading={instituteLoading}
                    placeholder={translate('Select an institute')}
                />
            </Form.Item>
            <Form.Item
                label={translate('University')}
                name="university"
                rules={[{ required: true, message: translate('Please select a university') }]}
            >
                <Select
                    mode='multiple'
                    options={universityOptions}
                    loading={universityLoading}
                    placeholder={translate('Select a university')}
                />
            </Form.Item>
            <Form.Item
                label={translate('Mode')}
                name="modes"
                rules={[{ required: true, message: translate('Please select a mode') }]}
            >
                <Select
                    mode='multiple'
                    options={modeOptions}
                    loading={modesLoading}
                    placeholder={translate('Select a mode')}
                />
            </Form.Item>
        </>
    );
}
