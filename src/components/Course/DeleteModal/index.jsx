import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { course } from '@/redux/course/actions';
import { useCrudContext } from '@/context/crud';
import { useAppContext } from '@/context/appContext';
import { selectDeletedItem } from '@/redux/course/selector';
import useLanguage from '@/locale/useLanguage';

export default function DeleteModal({ config }) {
  const translate = useLanguage();
  let {
    entity,
    deleteMessage = translate('are_you_sure_you_want_to_delete'),
    modalTitle = translate('delete_confirmation'),
  } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, crudContextAction } = useCrudContext();
  const { appContextAction } = useAppContext();
  const { panel, readBox } = crudContextAction;
  const { navMenu } = appContextAction;
  const { isModalOpen } = state;
  const { modal } = crudContextAction;

  const handleOk = () => {
    const id = current._id;
    dispatch(course.delete({ entity, id }));
    readBox.close();
    modal.close();
    panel.close();
    navMenu.collapse();
    dispatch(course.list({ entity }));
  };
  const handleCancel = () => {
    if (!isLoading) modal.close();
  };

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(course.list({ entity }));
      dispatch(course.resetAction({ actionType: "delete" }));
    }
  }, [isSuccess]);

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {deleteMessage}
      </p>
    </Modal>
  );
}
