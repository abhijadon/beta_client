import React, { useCallback, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button, Input, Select, Card, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import { generate as uniqueId } from 'shortid';
import { useNavigate } from 'react-router-dom';
import useResponsiveTable from '@/hooks/useResponsiveTable';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { request } from '@/request';
import { BiReset } from 'react-icons/bi';
import { FcBearish, FcBullish, FcSalesPerformance } from 'react-icons/fc';
import { LiaFileDownloadSolid } from 'react-icons/lia';
import { GrHistory } from 'react-icons/gr';

const { Search } = Input;


function AddNewItem({ config, hasCreate = true }) {
  const navigate = useNavigate();
  const { ADD_NEW_ENTITY, entity } = config;

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`);
  };

  if (hasCreate)
    return (
      <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
        {ADD_NEW_ENTITY}
      </Button>
    );
  else return null;
}
export default function DataTable({ config, extra = [] }) {
  const translate = useLanguage();
  let { entity, dataTableColumns, create = true } = config;
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { items: dataSource } = listResult;
  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [paymentData, setPaymentData] = useState({ result: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [historyData, setHistoryData] = useState(null); // State to hold history data
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [role, setRole] = useState('');

  // Retrieve the role from localStorage
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('auth'));
    setRole(userData.current.role);
  }, []);


  const handelDataTableLoad = useCallback(
    async (pagination, newSearchQuery = '') => {
      const options = {
        page: pagination.current || 1,
        items: pagination.pageSize || 10,
        filter: {
          q: newSearchQuery,
          institute: selectedInstitute,
          university: selectedUniversity,
          status: selectedStatus,
          userId: selectedUserId,
        },
      };

      const { success, result } = await dispatch(erp.list({ entity, options }));
      if (success) {
        const filteredData = filterDataSource(result);
        // Update filtered count
      }
    },
    [entity, selectedInstitute, selectedUniversity, selectedStatus, selectedUserId]
  );

  const handleExportToExcel = () => {
    if (dataSource.length === 0) {
      return;
    }
    const fileName = 'data.xlsx';

    const exportData = [
      dataTableColumns.map(column => column.title),
      ...dataSource.map(item => dataTableColumns.map(column => {
        let value = item;
        const dataIndex = column.dataIndex;
        const keys = dataIndex ? (Array.isArray(dataIndex) ? dataIndex : dataIndex.split('.')) : [];
        keys.forEach(key => {
          value = value?.[key];
        });
        return value;
      })),
    ];

    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Lead Data');

    try {
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  };


  const fetchData = async () => {
    try {
      const { result } = await request.summary({
        entity: 'payment',
        params: {
          institute_name: selectedInstitute,
          university_name: selectedUniversity,
          status: selectedStatus,
          payment_mode: selectedPaymentMode,
          payment_type: selectedPaymentType,
        },
      });

      // Update the payment data state
      setPaymentData({ result });
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedUniversity, selectedInstitute, selectedStatus, selectedPaymentMode, selectedPaymentType]);


  useEffect(() => {
    const fetchData = async () => {
      const { result } = await request.filter({ entity: 'payment' });
      if (result) {
        const uniquePaymentMode = [...new Set(result.map(item => item.payment_mode))];
        const uniquePaymentType = [...new Set(result.map(item => item.payment_type))];
        const uniqueStatuses = [...new Set(result.map(item => item.status))];
        const uniqueInstitutes = [...new Set(result.map(item => item.institute_name))];
        const uniqueUniversities = [...new Set(result.map(item => item.university_name))];
        const uniqueUserNames = [...new Set(result.map(item => item.userId?.fullname))];
        setStatuses(uniqueStatuses);
        setPaymentType(uniquePaymentType);
        setInstitutes(uniqueInstitutes);
        setPaymentMode(uniquePaymentMode);
        setUniversities(uniqueUniversities);
        setUserNames(uniqueUserNames); // New state for unique user names
      }
    };

    fetchData();
    handelDataTableLoad({}, searchQuery); // Include searchQuery here
  }, [searchQuery, handelDataTableLoad]);

  // Function to reset all values
  const resetValues = () => {
    setSelectedInstitute(null);
    setSelectedUniversity(null);
    setSelectedStatus(null);
    setSelectedUserId(null);
    setSelectedPaymentMode(null)
    setSelectedPaymentType(null)
  };

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, []);


  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('Download'),
      key: 'download',
      icon: <FilePdfOutlined />,
    },
    {
      label: translate('History'),
      key: 'history',
      icon: <GrHistory />,
    },
    ...extra,
    {
      type: 'divider',
    },

    {
      label: translate('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];

  const navigate = useNavigate();

  const handleRead = (record) => {
    dispatch(erp.currentItem({ data: record }));
    navigate(`/${entity}/read/${record._id}`);
  };
  const handleEdit = (record) => {
    dispatch(erp.currentAction({ actionType: 'update', data: record }));
    navigate(`/${entity}/update/${record._id}`);
  };
  const handleDownload = (record) => {
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
  };

  const handleDelete = (record) => {
    dispatch(erp.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  };

  const handleHistory = async (record) => {
    try {
      const historyData = await request.history({ entity: 'payment', id: record._id });
      // Sort the history data in descending order based on the time it was changed
      if (historyData && historyData.history) {
        historyData.history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }
      setHistoryData(historyData);
      setShowHistoryModal(true);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;
                case 'download':
                  handleDownload(record);
                  break;
                case 'history':
                  handleHistory(record);
                  break;
                case 'delete':
                  handleDelete(record);
                  break;
                default:
                  break;
              }
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];
  const renderHistoryModal = () => {
    return (
      <Modal
        title="History"
        open={showHistoryModal}
        onCancel={() => setShowHistoryModal(false)}
        footer={null}
        width={700}
        className="history-modal"
      >
        {/* Check if historyData exists */}
        {historyData && historyData.history && historyData.history.length > 0 ? (
          // Render each history item
          historyData.history.map((historyItem, index) => (
            <div key={index} className="mb-4">
              {/* Timestamp */}
              <div className="mb-2">
                <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  {new Date(historyItem.updatedAt).toLocaleDateString()} {new Date(historyItem.updatedAt).toLocaleTimeString()}
                </h3>
              </div>
              {/* Changes */}
              <div className="flex gap-x-3">
                {/* Icon */}
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <h3 className="fullname capitalize">{historyItem.updatedBy.fullname}</h3>
                  </div>
                </div>
                {/* End Icon */}
                {/* Right Content */}
                <div className="grow pt-0.5 pb-8">
                  <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    <svg className="flex-shrink-0 size-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" x2="8" y1="13" y2="13" />
                      <line x1="16" x2="8" y1="17" y2="17" />
                      <line x1="10" x2="8" y1="9" y2="9" />
                    </svg>
                    {`Updated ${index + 1}`}
                  </h3>
                  {/* Display old and new values */}
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(historyItem.updatedFields).map(([key, values]) => (
                          // Check if both old and new values exist
                          values.oldValue !== undefined && values.newValue !== undefined && (
                            <tr key={key}>
                              <td className="pr-2 text-right">{key}:</td>
                              {/* Check if oldValue is an array */}
                              {Array.isArray(values.oldValue) ? (
                                // If oldValue is an array, render each element separately
                                <>
                                  {values.oldValue.map((item, index) => (
                                    <React.Fragment key={index}>
                                      <td className="pr-2 text-gray-500">{item.value}</td>
                                      <td className="px-2">&#8594;</td>
                                      <td className="pr-2 text-gray-700">{item.value}</td>
                                    </React.Fragment>
                                  ))}
                                </>
                              ) : (
                                // If oldValue is not an array, render it directly
                                <>
                                  <td className="pr-2 text-gray-500">{values.oldValue}</td>
                                  <td className="px-2">&#8594;</td>
                                  <td className="pr-2 text-gray-700">{values.newValue}</td>
                                </>
                              )}
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No history available.</p>
        )}
      </Modal>
    );
  };

  const dispatch = useDispatch();

  const filterDataSource = (data) => {
    return data.filter(item => {
      const instituteMatch = !selectedInstitute || (item && item.institute_name === selectedInstitute);
      const universityMatch = !selectedUniversity || (item && item.university_name === selectedUniversity);
      const statusMatch = !selectedStatus || (item && item.status === selectedStatus);
      const userMatch = !selectedUserId || (item && item.userId?.fullname === selectedUserId);

      const phoneAsString = item && item.phone?.toString();
      const emailLowerCase = item && item.email?.toLowerCase();

      const searchMatch = !searchQuery || (
        (item && item.lead_id && item.lead_id.includes(searchQuery)) ||
        (emailLowerCase && emailLowerCase.includes(searchQuery.toLowerCase())) ||
        (typeof phoneAsString === 'string' && phoneAsString.includes(searchQuery)) ||
        (item && item.full_name && item.full_name.includes(searchQuery))
      );
      return instituteMatch && universityMatch && statusMatch && userMatch && searchMatch;
    });
  };



  const dispatcher = () => {
    dispatch(erp.list({ entity }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  const { tableColumns, tableHeader } = useResponsiveTable(
    dataTableColumns,
    items
  );
  const handleSearch = (value) => {
    setSearchQuery(value);
    handelDataTableLoad({}, value); // Trigger search on each keystroke
  };
  const renderTable = () => {
    const filteredData = filterDataSource(dataSource);
    return (
      <>
        <Card>
          <div ref={tableHeader}>
            <div>
              <div className='flex justify-between items-center'>
                <div className='grid grid-rows-1 gap-1 font-thin text-xs text-red-500 '>
                  {entity === 'payment' && (
                    <div className='flex items-center gap-2'>
                      <div className="flex justify-center items-center text-red-500">
                        <span className='font-thin text-sm'>Total:</span> <span className='font-thin text-sm'> {filteredData.length}</span>
                      </div>
                      <Search
                        placeholder="Search by email"
                        onSearch={handleSearch} // Remove this line
                        onChange={(e) => handleSearch(e.target.value)} // Add this line
                        className='w-full'
                      />
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-1'>
                  <AddNewItem config={config} key={`${uniqueId()}`} hasCreate={create} />
                  <div>
                    <LiaFileDownloadSolid title='Export excel' onClick={handleExportToExcel} className='text-3xl text-blue-500 hover:text-blue-700 cursor-pointer font-thin' />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='space30'></div>
          <Table
            columns={tableColumns}
            rowKey={(item) => item._id}
            dataSource={filterDataSource(dataSource)}
            pagination={true}
            onChange={handelDataTableLoad}
          />
        </Card>
      </>
    )
  }


  const amountCardsData = [
    {
      title: 'Total Course Fee',
      color: 'green',
      value: paymentData.result?.total_course_fee,
      total: paymentData.result?.total_course_fee_total,
      icon: <FcSalesPerformance style={{ fontSize: 48, color: 'green' }} />,
    },
    {
      title: 'Total Paid Amount',
      color: 'blue',
      value: paymentData.result?.total_paid_amount,
      total: paymentData.result?.total_paid_amount_total,
      icon: <FcBullish style={{ fontSize: 48, color: 'blue' }} />,
    },
    {
      title: 'Due Amount',
      color: 'red',
      value: paymentData.result?.due_amount,
      total: paymentData.result?.due_amount_total,
      icon: <FcBearish style={{ fontSize: 48, color: 'blue' }} />,
    },
  ];

  const amountCards = amountCardsData.map((card, index) => {
    return (
      <Card className="w-1/3 shadow drop-shadow-lg" key={index}>
        <div>
          <div>
            <div className="flex gap-10 justify-between items-center">
              <div>{card.icon}</div>
              <div>
                <div className={`text-${card.color}-500 mb-2 text-sm font-normal font-serif`}>
                  {card.title}
                </div>
                <div className={`text-${card.color}-500 text-2xl`}>₹ {card.value}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  });


  const filterRender = () => (
    <>
      <div className='flex items-center space-x-2'>
        <div>
          {/* Select for Institute */}
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select institute"
            className='w-60 h-10 capitalize'
            value={selectedInstitute}
            onChange={(value) => setSelectedInstitute(value)}
          >
            {institutes.map(institute => (
              <Select.Option key={institute}>{institute}</Select.Option>
            ))}
          </Select>
        </div>
        <div>
          {/* Select for University */}
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select university"
            className='w-60 h-10 capitalize'
            value={selectedUniversity}
            onChange={(value) => setSelectedUniversity(value)}
          >
            {universities.map(university => (
              <Select.Option key={university}>{university}</Select.Option>
            ))}
          </Select>
        </div>

        <div>
          {/* Select for Status */}
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select status"
            className='w-60 h-10 capitalize'
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          >
            {statuses.map(status => (
              <Select.Option key={status}>{status}</Select.Option>
            ))}
          </Select>
        </div>
        {/* Select for User Full Name */}
        <div>
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select payment mode"
            className='w-60 h-10 capitalize'
            value={selectedPaymentMode}
            onChange={(value) => setSelectedPaymentMode(value)}
          >
            {paymentMode.map((paymentmode) => (
              <Select.Option className="capitalize font-thin font-mono" key={paymentmode}>
                {paymentmode}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select payment type"
            className='w-60 h-10 capitalize'
            value={selectedPaymentType}
            onChange={(value) => setSelectedPaymentType(value)}
          >
            {paymentType.map((paymenttype) => (
              <Select.Option className="capitalize font-thin font-mono" key={paymenttype}>
                {paymenttype}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        {/* Date Range Picker */}
        <div>
          <Select showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
            placeholder="Select user full name"
            className='w-60 h-10 capitalize mt-3'
            value={selectedUserId}
            onChange={(value) => setSelectedUserId(value)}
          >
            {userNames.map((userName) => (
              <Select.Option className="capitalize font-thin font-mono" key={userName}>
                {userName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='relative float-right -mt-10 mr-2'>
        <Button title='Reset All Filters' onClick={resetValues} className='bg-white text-red-500 text-lg h-10 hover:text-red-600'>
          <BiReset />
        </Button>
      </div>
    </>
  )

  return (
    <>
      <div>
        {filterRender()}
      </div>
      <div className='space30'></div>
      {['admin', 'subadmin'].includes(role) && (
        <div>
          <div className='space30'></div>
          <div className='flex gap-4'>
            {amountCards}
          </div>
        </div>
      )}
      <div className='space30'></div>
      <div>
        {renderTable()}
      </div>
      {renderHistoryModal()}
    </>
  );
}


