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
  const data = useSelector((state) => state.options?.data || {}); // Access additional data from Redux state
  const { state, crudContextAction } = useCrudContext();
  const { editBox } = crudContextAction;
  const [form] = Form.useForm();

  console.log('Redux Data:', data);

  // Utility function to map names to IDs
  const mapNamesToIds = (names, list) => {
    const items = Array.isArray(list) ? list : list?.data || [];
    if (!names || !Array.isArray(items)) return [];
    return names.map((name) => items.find((item) => item.name === name)?._id || name);
  };

  // Populate form with current data
  useEffect(() => {
    if (current) {
      const newValues = {
        ...current,
        ...(entity === 'university' && {
          institute: current?.institute?.map((inst) => inst.name),
          modes: current?.modes?.map((mode) => mode.name),
        }),
        ...(entity === 'user' && {
          role: current?.role?.name || '',
          workspace: current?.workspace?.map((wrk) => wrk.name) || [],
        }),
        ...(entity === 'roles' && {
          institutes: current?.institutes?.map((inst) => inst.name),
          university: current?.university?.map((inst) => inst.name),
          modes: current?.modes?.map((mode) => mode.name),
        }),
        ...(entity === 'subcourse' && {
          course: current?.course?.map((sub) => sub.name),
        }),
        ...(entity === 'course' && {
          university: current?.university?.map((inst) => inst.name),
        }),

      };

      form.setFieldsValue(newValues);
    }
  }, [current, form, entity]);

  // Submit handler
  const onSubmit = (fieldsValue) => {
    const id = current?._id;

    // Transform fields based on entity type while preserving existing data
    const transformedValues = {
      ...fieldsValue,
      ...(entity === 'university' && {
        institute: mapNamesToIds(fieldsValue.institute || form.getFieldValue('institute'), data.institutes),
        modes: mapNamesToIds(fieldsValue.modes || form.getFieldValue('modes'), data.modes),
      }),
      ...(entity === 'user' && {
        role: mapNamesToIds([fieldsValue.role || form.getFieldValue('role')], data.roles)?.[0],
        workspace: mapNamesToIds(fieldsValue.workspace || form.getFieldValue('workspace'), data.workspaces),
      }),
      ...(entity === 'roles' && {
        institutes: mapNamesToIds(fieldsValue.institutes || form.getFieldValue('institutes'), data.institutes),
        university: mapNamesToIds(fieldsValue.university || form.getFieldValue('university'), data.university),
        modes: mapNamesToIds(fieldsValue.modes || form.getFieldValue('modes'), data.modes),
      }),
      ...(entity === 'subcourse' && {
        course: mapNamesToIds(fieldsValue.course || form.getFieldValue('course'), data.course),
      }),
      ...(entity === 'course' && {
        university: mapNamesToIds(fieldsValue.university || form.getFieldValue('university'), data.university),
      }),
    };

    console.log('Final submitted values:', transformedValues);

    // Dispatch the update action
    dispatch(crud.update({ entity, id, jsonData: transformedValues, withUpload }));
  };

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      editBox.close();
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess, form, editBox, dispatch, entity]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };

  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
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
            <Button onClick={() => editBox.close()}>{translate('Cancel')}</Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}