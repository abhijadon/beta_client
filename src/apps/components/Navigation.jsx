import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Spin } from 'antd';
import {
  DashboardOutlined,
  UserAddOutlined,
  CreditCardOutlined,
  MenuOutlined,
  LogoutOutlined,
  FormOutlined,
  BookFilled,
  BookOutlined,
} from '@ant-design/icons';
import { PiStudentFill } from 'react-icons/pi';
import { FaUniversalAccess, FaUsersRays } from 'react-icons/fa6';
import { CiUnread } from 'react-icons/ci';
import { GrCircleInformation } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '@/redux/navigation/actions';
import { selectMenuItems } from '@/redux/navigation/selectors';
import { useMediaQuery } from 'react-responsive';
import logoText from '@/style/images/sode.png';
import { MdOutlineDoneOutline } from 'react-icons/md';
const { Header } = Layout;

export default function Navigation() {
  const dispatch = useDispatch();
  const { result: listResult, isLoading, isSuccess } = useSelector(selectMenuItems);
  const [menuOptions, setMenuOptions] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Fetch navigation data from the API
  useEffect(() => {
    dispatch(navigation.menu({ entity: 'navigation' }));
  }, [dispatch]);

  // Update menuOptions when data is successfully fetched
  useEffect(() => {
    if (isSuccess && listResult?.items) {
      setMenuOptions(listResult.items);
    }
  }, [isSuccess, listResult]);

  // Handle logout
  const handleLogout = () => {
    // Implement your logout logic
    console.log('Logged out');
    navigate('/login');
  };

  // Icon map to dynamically associate icons with menu items
  const iconMap = {
    Dashboard: <DashboardOutlined />,
    Application: <UserAddOutlined />,
    Alumni: <PiStudentFill />,
    Payment: <CreditCardOutlined />,
    Sidebar: <MenuOutlined />,
    Users: <FaUsersRays />,
    Role: <CiUnread />,
    'Course_Fees': <GrCircleInformation />,
    Course: <BookFilled />,
    Settings: <IoSettingsOutline />,
    Institute: <FaUniversalAccess />,
    University: <FaUniversalAccess />,
    Formbuilder: <FormOutlined />,
    Mode: <MdOutlineDoneOutline />,
    'Sub-Course': <BookOutlined />
  };

  // Recursive function to generate menu items
  const generateMenuItems = (items) =>
    items
      .sort((a, b) => a.order - b.order) // Sort by 'order' field
      .map((item) => ({
        key: item.path || `/${item.name.toLowerCase()}`,
        icon: iconMap[item.name] || null,
        label: <Link to={item.path || `/${item.name.toLowerCase()}`}>{item.name}</Link>,
        children: item.children ? generateMenuItems(item.children) : null, // Recursively handle children
      }));

  // Show/hide mobile drawer
  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spin tip="Loading navigation..." size="large" />
      </div>
    );
  }

  if (!isSuccess || !menuOptions.length) {
    return <div>No navigation data available</div>;
  }

  return (
    <Header className="fixed top-0 left-0 w-full z-50 bg-white shadow-xl flex items-center justify-between px-4">
      {/* Logo Section */}
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <img src={logoText} alt="Logo" style={{ height: '40px' }} />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: isMobile ? 'flex-end' : 'space-between',
          alignItems: 'center',
        }}
      >
        {!isMobile && (
          <Menu
            mode="horizontal"
            items={generateMenuItems(menuOptions)}
            selectedKeys={[location.pathname]}
            style={{ flex: 1, justifyContent: 'flex-start' }}
          />
        )}
        <Button
          type="link"
          icon={isMobile ? <MenuOutlined /> : <LogoutOutlined />}
          onClick={isMobile ? toggleDrawer : handleLogout}
        >
          {isMobile ? null : 'Logout'}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={toggleDrawer}
          open={drawerVisible}
          width={250}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            items={generateMenuItems(menuOptions)}
            selectedKeys={[location.pathname]}
            onClick={toggleDrawer}
          />
          <div style={{ marginTop: 'auto', padding: '10px' }}>
            <Button
              type="link"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="w-full text-red-500 border-dashed"
            >
              Logout
            </Button>
          </div>
        </Drawer>
      )}
    </Header>
  );
}
