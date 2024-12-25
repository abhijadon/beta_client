import React, { useState, useEffect } from 'react';
import { useCrudContext } from '@/context/crud';
import { Modal, Drawer } from 'antd';
import CollapseBox from '../CollapseBox';
import { selectCreatedItem, selectUpdatedItem } from '@/redux/crud/selectors';
import { useSelector } from 'react-redux';

export default function SidePanel({ config, topContent, bottomContent }) {
  const { DATATABLE_TITLE } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;
  const { isSuccess: createdSuccess } = useSelector(selectCreatedItem);
  const { isSuccess: updatedSuccess } = useSelector(selectUpdatedItem);
  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);
  const [isSidePanelVisible, setSidePanelVisible] = useState(!isPanelClose);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPanelClose) {
      setTimeout(() => setSidePanel(isPanelClose), 200);
    } else {
      setSidePanel(isPanelClose);
    }
  }, [isPanelClose]);

  useEffect(() => {
    setSidePanelVisible(!isPanelClose);
  }, [isPanelClose]);

  const collapsePanel = () => {
    panel.collapse();
  };

  const collapsePanelBox = () => {
    collapsedBox.collapse();
  };

  useEffect(() => {
    if (createdSuccess || updatedSuccess) {
      collapsePanel();
    }
  }, [createdSuccess, updatedSuccess]);

  return (
    <>
      <Drawer
        className={`fixed top-5 left-5 bottom-5 z-50 bg-white shadow-lg h-auto w-[400px] rounded-2xl transform transition-transform duration-500 ease-in-out ${isSidePanelVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        title={
          <div className="float-end text-[15px] font-semibold">
            {DATATABLE_TITLE}
          </div>
        }
        visible={!isPanelClose}
        placement="left"
        onClose={collapsePanel}
        footer={null}
        width={screenWidth > 768 ? 400 : '100%'} // Responsive width for drawer
        bodyStyle={{
          maxHeight: '100vh', // Adjust drawer height for smaller screens
          overflowY: 'auto',
          padding: screenWidth > 768 ? '20px' : '10px', // Adjust padding based on screen size
        }}
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

    </>
  );
}
