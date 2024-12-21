import React, { useState, useEffect } from 'react';
import { useCrudContext } from '@/context/crud';
import { Modal, Drawer } from 'antd';
import CollapseBox from '../CollapseBox';
import { selectCreatedItem, selectUpdatedItem } from '@/redux/crud/selectors'; // Import selectUpdatedItem selector
import { useSelector } from 'react-redux';

export default function SidePanel({ config, topContent, bottomContent }) {
  const { ADD_NEW_ENTITY } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;
  const { isSuccess: createdSuccess } = useSelector(selectCreatedItem); // Rename isSuccess to createdSuccess
  const { isSuccess: updatedSuccess } = useSelector(selectUpdatedItem); // Add updatedSuccess selector
  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);

  useEffect(() => {
    if (isPanelClose) {
      setTimeout(() => setSidePanel(isPanelClose), 200);
    } else {
      setSidePanel(isPanelClose);
    }
  }, [isPanelClose]);

  const collapsePanel = () => {
    panel.collapse();
  };

  const collapsePanelBox = () => {
    collapsedBox.collapse();
  };

  useEffect(() => {
    if (createdSuccess || updatedSuccess) { // Check both createdSuccess and updatedSuccess
      collapsePanel(); // Close the panel when either created or updated
    }
  }, [createdSuccess, updatedSuccess]); // Add updatedSuccess to the dependency array

  return (
    <>
      {ADD_NEW_ENTITY === 'Add Applications' ? ( // Check if ADD_NEW_ENTITY is 'Add Applications'
        <Modal
          title={ADD_NEW_ENTITY}
          open={!isPanelClose} // Change open to visible
          onCancel={collapsePanel}
          footer={null}
          width={1000}
        >
          <div>
            <CollapseBox
              isCollapsed={isBoxCollapsed}
              onCollapse={collapsePanelBox}
              topContent={topContent}
              bottomContent={bottomContent}
            />
          </div>
        </Modal>
      ) : (
        <Drawer
          title={
            <div className='float-end text-[15px] font-semibold'>
              {ADD_NEW_ENTITY}
            </div>
          }
          visible={!isPanelClose} // Change open to visible
          placement='left'
          onClose={collapsePanel}
          footer={null}
          width={400}
        >
          <div>
            <CollapseBox
              isCollapsed={isBoxCollapsed}
              onCollapse={collapsePanelBox}
              topContent={topContent}
              bottomContent={bottomContent}
            />
          </div>
        </Drawer>
      )}
    </>
  );
}
