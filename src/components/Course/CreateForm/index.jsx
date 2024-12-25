import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { course } from '@/redux/course/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/course/selector';
import useLanguage from '@/locale/useLanguage';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function CreateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();
  const translate = useLanguage();

  const onSubmit = (fieldsValue) => {
    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    dispatch(course.create({ entity, jsonData: fieldsValue, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(course.resetAction({ actionType: 'create' }));
      dispatch(course.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {formElements}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('Submit')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}