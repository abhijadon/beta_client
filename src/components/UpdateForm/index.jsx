import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  const { entity } = config;
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const { state, crudContextAction } = useCrudContext();
  const { editBox } = crudContextAction;
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      const newValues = {
        ...current,
        ...(entity === 'university' && {
          institute: Array.isArray(current.institute) && current.institute.length > 0
            ? current.institute[0]?.name
            : "", // Default to an empty string if `institute` is undefined or empty
        }),
        ...(entity === 'user' && {
          role: current?.role?.name || '',
          workspace: Array.isArray(current.workspace) && current.workspace.length > 0
            ? current.workspace[0]?.name
            : "",

        }),
      };
      console.log(newValues)

      form.setFieldsValue(newValues);
    }
  }, [current, form, entity]);

  const onSubmit = (fieldsValue) => {
    const id = current?._id;

    if (fieldsValue.institute && Array.isArray(current?.institute)) {
      // Match the `name` from `fieldsValue` to the `name` in `current.institute`
      const matchedInstitute = current.institute.find(inst => inst.name === fieldsValue.institute);
      fieldsValue.institute = matchedInstitute ? matchedInstitute._id : null; // Use `_id` if a match is found, otherwise set to null
    } else {
      fieldsValue.institute = null; // Default to null if institute is not provided or invalid
    }

    console.log('Final submitted values:', fieldsValue);

    // Dispatch the update action
    dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      editBox.close();
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess, dispatch, editBox, entity, form]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };

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
          />
        </Form>
      </Loading>
    </div>
  );
}
