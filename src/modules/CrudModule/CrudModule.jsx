import { useLayoutEffect, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CreateForm from '@/components/CreateForm';
import UpdateForm from '@/components/UpdateForm';
import DeleteModal from '@/components/DeleteModal';
import SearchItem from '@/components/SearchItem';
import AddPayment from '@/components/AddPayment';
import DataTable from '@/components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentItem } from '@/redux/crud/selectors';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { CrudLayout } from '@/layout';

function SidePanelTopContent({ config, formElements, withUpload, addPayment }) {
  const { state } = useCrudContext();
  const { entityDisplayLabels } = config;
  const { isReadBoxOpen, isEditBoxOpen, isPaymentBoxOpen } = state;
  const { result: currentItem } = useSelector(selectCurrentItem);

  const [labels, setLabels] = useState('');

  useEffect(() => {
    if (currentItem && entityDisplayLabels) {
      const currentLabels = entityDisplayLabels.map((x) => currentItem[x]).join(' ');
      setLabels(currentLabels);
    }
  }, [currentItem, entityDisplayLabels]);

  return (
    <>
      {isPaymentBoxOpen && <AddPayment config={config} formElements={addPayment} withUpload={withUpload} />}
      {isEditBoxOpen && <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />}    </>
  );
}

function CrudModule({ config, createForm, updateForm, withUpload = false, filter, addForm }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  return (
    <CrudLayout
      config={config}
      sidePanelBottomContent={
        <CreateForm config={config} formElements={createForm} withUpload={withUpload} />
      }
      sidePanelTopContent={
        <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} addPayment={addForm} />
      }
    >
      <DataTable config={config} extra={[]} filter={filter} />
      <DeleteModal config={config} />
    </CrudLayout>
  );
}

export default CrudModule;