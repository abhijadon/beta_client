import { useLayoutEffect } from 'react';
import { Row } from 'antd';
import CreateForm from '@/components/Course/CreateForm';
import UpdateForm from '@/components/Course/UpdateInfo';
import DeleteModal from '@/components/Course/DeleteModal';
import SearchItem from '@/components/SearchItem';
import DataTable from '@/components/Course/Data';
import { useDispatch } from 'react-redux';
import { CrudLayout } from '@/layout';
import { course } from '@/redux/course/actions';
import ReadItem from '@/components/Course/Read';

function SidePanelTopContent({ config, formElements, withUpload }) {
    return (
        <>
            <ReadItem config={config} />
            <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
        </>
    );
}

function FixHeaderPanel({ config }) {
    return (
        <Row>
            <SearchItem config={config} />
        </Row>
    );
}

function CourseModule({ config, createForm, updateForm, withUpload = false, filter }) {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(course.resetState());
    }, []);

    return (
        <CrudLayout
            config={config}
            fixHeaderPanel={<FixHeaderPanel config={config} />}
            sidePanelBottomContent={
                <CreateForm config={config} formElements={createForm} withUpload={withUpload} />
            }
            sidePanelTopContent={
                <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} />
            }
        >
            <DataTable config={config} extra={[]} filter={filter} />
            <DeleteModal config={config} />
        </CrudLayout>
    );
}

export default CourseModule;