import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { course } from '@/redux/course/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/course/selector';
import useLanguage from '@/locale/useLanguage';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const { state, crudContextAction } = useCrudContext();
  const { editBox, readBox, panel } = crudContextAction
  const [form] = Form.useForm();

  console.log(isSuccess)
  const onSubmit = (fieldsValue) => {
    const id = current._id;
    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});
    dispatch(course.update({ entity, id, jsonData: trimmedValues, withUpload }));
  };

  useEffect(() => {
    if (current) {
      let newValues = {
        ...current,

      };
      form.setFieldsValue(newValues);
    }
  }, [current, form]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      editBox.close();
      readBox.close();
      panel.close();
      dispatch(course.resetAction({ actionType: 'update' }));
      dispatch(course.list({ entity }));
    }
  }, [isSuccess]);

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
            <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
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
