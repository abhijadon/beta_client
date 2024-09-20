import { CrudLayout } from '@/layout'
import React from 'react'
import AlumniDataTable from "@/components/AlumniDataTable"
import { useLayoutEffect, useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import UpdateForm from '@/components/UpdateForm';

import DataTable from '@/components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentItem } from '@/redux/crud/selectors';
import { useCrudContext } from '@/context/crud';


function SidePanelTopContent({ config, formElements, withUpload }) {
    const { state } = useCrudContext();
    const { entityDisplayLabels } = config;

    const { isReadBoxOpen, isEditBoxOpen } = state;
    const { result: currentItem } = useSelector(selectCurrentItem);
    const dispatch = useDispatch();

    const [labels, setLabels] = useState('');

    useEffect(() => {
        if (currentItem && entityDisplayLabels) {
            const currentLabels = entityDisplayLabels.map((x) => currentItem[x]).join(' ');
            setLabels(currentLabels);
        }
    }, [currentItem, entityDisplayLabels]);

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className="line"></div>
                </Col>
                <div className="space10"></div>
            </Row>
            <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
        </>
    );
}

export default function index({ config }) {
    return (
        <CrudLayout config={config}
            sidePanelTopContent={<SidePanelTopContent config={config} />}
        >
            <AlumniDataTable config={config} extra={[]} />
        </CrudLayout>
    )
}
