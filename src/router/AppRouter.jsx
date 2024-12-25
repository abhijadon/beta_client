import { useRoutes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Logout from '@/pages/Logout';
import NotFound from '@/pages/NotFound.jsx';
import Dashboard from '@/pages/Dashboard';
import Customer from '@/pages/Customer';
import University from '@/pages/University';
import InvoiceCreate from '@/pages/Invoice/InvoiceCreate';
import InvoiceRead from '@/pages/Invoice/InvoiceRead';
import InvoiceUpdate from '@/pages/Invoice/InvoiceUpdate';
import InvoiceRecordPayment from '@/pages/Invoice/InvoiceRecordPayment';
import Quote from '@/pages/Quote/index';
import QuoteCreate from '@/pages/Quote/QuoteCreate';
import QuoteRead from '@/pages/Quote/QuoteRead';
import QuoteUpdate from '@/pages/Quote/QuoteUpdate';
import Payment from '@/pages/Payment/index';
import PaymentRead from '@/pages/Payment/PaymentRead';
import PaymentUpdate from '@/pages/Payment/PaymentUpdate';
import Admin from '@/pages/Admin';
import Settings from '@/pages/Settings/Settings';
import Subcourse from '@/pages/Subcourse';
import Users from '@/pages/Users';
import Permission from '@/pages/permission';
import History from '@/pages/History';
import Email from '@/pages/Email/index';
import EmailRead from '@/pages/Email/EmailRead';
import EmailUpdate from '@/pages/Email/EmailUpdate';
import AdvancedSettings from '@/pages/AdvancedSettings';
import Profile from '@/pages/Profile';
import Application from '@/pages/Application/index';
import Offer from '@/pages/Offer/index';
import OfferCreate from '@/pages/Offer/OfferCreate';
import Mode from '@/pages/Mode';
import CourseInfo from '@/pages/Course_Info';
import Course from '@/pages/Course';
import Alumni from '@/pages/Alumni';
import FormBuilder from '@/pages/FormBuilder';
import Role from '@/pages/Role';
import Sidebar from '@/pages/Sidebar';
import Institute from '@/pages/Institute';
export default function AppRouter() {
  let element = useRoutes([
    {
      path: '/login',
      element: <PublicRoute />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },
    {
      path: '/course_fees',
      element: <CourseInfo />,
    },
    {
      path: '/course',
      element: <Course />,
    },
    {
      path: '/role',
      element: <Role />,
    },
    {
      path: '/institute',
      element: <Institute />,
    },
    {
      path: '/sidebar',
      element: <Sidebar />,
    },
    {
      path: '/university',
      element: <University />,
    },
    {
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
    },
    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },
    {
      path: '/alumni',
      element: <Alumni />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/sub-course',
      element: <Subcourse />,
    },
    {
      path: '/email',
      element: <Email />,
    },
    {
      path: '/history',
      element: <History />,
    },
    {
      path: '/email/read/:id',
      element: <EmailRead />,
    },
    {
      path: '/email/update/:id',
      element: <EmailUpdate />,
    },
    {
      path: '/settings/advanced',
      element: <AdvancedSettings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/permission',
      element: <Permission />,
    },
    {
      path: '/application',
      element: <Application />,
    },
    {
      path: '/formbuilder',
      element: <FormBuilder />,
    },
    {
      path: '/offer',
      element: <Offer />,
    },
    {
      path: '/offer/create',
      element: <OfferCreate />,
    },
    {
      path: '/mode',
      element: <Mode />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return element;
}
