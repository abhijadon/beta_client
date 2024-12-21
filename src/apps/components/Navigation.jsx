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
  SettingOutlined,
} from '@ant-design/icons';
import { PiMicrosoftTeamsLogoLight, PiStudentFill } from 'react-icons/pi';
import logoIcon from '@/style/images/sodelogo.png';
import logoText from '@/style/images/sodeicon.png';
import { FaUsersRays } from 'react-icons/fa6';
import { CiUnread } from 'react-icons/ci';
import { GrCircleInformation } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { logout } from '@/redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '@/redux/navigation/actions';
import { selectListItems } from '@/redux/navigation/selectors';
import { useMediaQuery } from 'react-responsive';

const { Header } = Layout;

export default function Navigation() {
  const dispatch = useDispatch();
  const { result: listResult, isLoading, isSuccess } = useSelector(selectListItems);
  const [menuOptions, setMenuOptions] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Media query to detect mobile screens
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Fetch the navigation data on component mount
  useEffect(() => {
    dispatch(navigation.list({ entity: 'navigation' }));
  }, [dispatch]);

  // Update menuOptions state when data loads
  useEffect(() => {
    if (isSuccess && listResult?.items) {
      setMenuOptions(listResult.items);
    }
  }, [isSuccess, listResult]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Generate menu items
  const generateMenuItems = () =>
    menuOptions.map((option) => {
      let icon;
      let path;

      switch (option.name) {
        case 'Dashboard':
          icon = <DashboardOutlined />;
          path = '/';
          break;
        case 'Application':
          icon = <UserAddOutlined />;
          path = '/application';
          break;
        case 'Alumni':
          icon = <PiStudentFill />;
          path = '/alumni';
          break;
        case 'Payment':
          icon = <CreditCardOutlined />;
          path = '/payment';
          break;
        case 'Teams':
          icon = <PiMicrosoftTeamsLogoLight />;
          path = '/teams';
          break;
        case 'Users':
          icon = <FaUsersRays />;
          path = '/users';
          break;
        case 'Roles':
          icon = <CiUnread />;
          path = '/roles';
          break;
        case 'Courses & Fees':
          icon = <GrCircleInformation />;
          path = '/courseInfo';
          break;
        case 'Settings':
          icon = <IoSettingsOutline />;
          path = '/settings';
          break;
        case 'Formbuilder':
          icon = <FormOutlined />;
          path = '/formbuilder';
          break;
        default:
          icon = null;
          path = `/${option.name.toLowerCase()}`;
      }

      return {
        key: path,
        icon,
        label: <Link to={path}>{option.name}</Link>,
      };
    });

  // Show/hide mobile drawer
  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spin tip="Loading navigation..." size="large" className="flex items-center justify-center" />
      </div>
    );
  }


  if (!isSuccess || !menuOptions.length) {
    return <div>No navigation data available</div>;
  }


  return (
    <Header className="fixed top-0 left-0 w-full z-50 bg-white shadow-xl flex items-center justify-between px-4"
    >
      {/* Logo Section */}
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <img
          src={logoText}
          alt="Logo Text"
          style={{ height: '40px' }}
        />
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
            items={generateMenuItems()}
            selectedKeys={[location.pathname]}
            style={{ flex: 1, justifyContent: 'flex-start' }}
          />
        )}
        <Button className={`ml-5 ${isMobile ? 'hover:text-black hover:bg-transparent' : 'hover:text-black hover:bg-transparent hover:border-black border-blue-500'}`}
          type="link"
          icon={isMobile ? <MenuOutlined /> : <LogoutOutlined />}
          onClick={isMobile ? toggleDrawer : handleLogout}
          style={{
            marginLeft: 20,
          }}
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
          bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Menu
            mode="vertical"
            items={generateMenuItems()}
            selectedKeys={[location.pathname]}
            onClick={toggleDrawer}
          />
          <div style={{ marginTop: 'auto', padding: '10px' }}>
            <Button className='w-full text-red-500 border-dashed border-red-500 bg-transparent '
              type="link"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Drawer>
      )}
    </Header>
  );
}
