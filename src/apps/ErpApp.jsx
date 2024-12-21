import { useLayoutEffect, useState } from 'react';
import { Layout } from 'antd';
import Navigation from '@/apps/components/Navigation';
import AppRouter from '@/router/AppRouter';
import useIsMobile from '@/hooks/useIsMobile';

export default function ErpCrmApp() {
  const { Content } = Layout;
  const isMobile = useIsMobile(); // Hook to determine if the device is mobile
  const [collapsed, setCollapsed] = useState(true); // Tracks the collapsed state of the nav menu

  const onCollapse = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  return (
    <Layout hasSider>
      <Navigation
        collapsed={collapsed}
        onCollapse={onCollapse}
      />
      <Layout className='mt-2'>
        <Content
          style={{
            margin: '60px auto',
            overflow: 'initial',
            width: '100%',
            padding: isMobile ? '10px' : collapsed ? '10px 8px' : '10px 16px', // Adjust padding for mobile
            maxWidth: '100%', // Keep width responsive
            transition: 'all 0.3s ease', // Smoothly animate padding
          }}
        >
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
}
