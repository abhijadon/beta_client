import { useLayoutEffect } from 'react';
import CreateForm from '@/components/Formbuilder/Create';
import UpdateForm from '@/components/Formbuilder/Update';
import DeleteModal from '@/components/Formbuilder/Remove';
import DataTable from '@/components/Formbuilder/DataTable';
import { useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { CrudLayout } from '@/layout';

function SidePanelTopContent({ config, formElements, withUpload }) {
    return (
        <>
            <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
        </>
    );
}

function CrudModule({ config, createForm, updateForm, withUpload = false }) {
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
                <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} />
            }
        >
            <DataTable config={config} />
            <DeleteModal config={config} />
        </CrudLayout>
    );
}

export default CrudModule;