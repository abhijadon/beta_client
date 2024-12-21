import { Form, Input, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useState, useEffect } from 'react';
import { request } from '@/request';
const { TextArea } = Input;

export default function EditForm() {
  const translate = useLanguage();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAdmissionType, setSelectedAdmissionType] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.list({ entity: 'formbuilder' });
        if (response.success && response.result.length > 0) {
          const applicationForm = response.result.find(
            (form) => form.title === 'Application Form'
          );
          if (applicationForm) {
            setFormData(applicationForm);
          } else {
            console.error("No form found with the title 'Application Form'");
          }
        } else {
          console.error('Failed to fetch form data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to render dynamic fields
  const renderDynamicFields = (fields) => {
    if (!fields || fields.length === 0) return null;
    return fields.map((field) => (
      <Form.Item
        key={field.field_name}
        label={translate(field.label_name)}
        name={field.field_name}
        rules={[
          { required: field.required, message: `${translate(field.label_name)} is required` },
        ]}
      >
        {field.type === 'select' ? (
          <Select
            placeholder={field.placeholder || 'Select'}
            options={field.options?.map((option) => ({
              value: option.value,
              label: translate(option.label),
            }))}
          />
        ) : field.type === 'textarea' ? (
          <TextArea placeholder={field.placeholder || ''} />
        ) : (
          <Input type={field.type || 'text'} placeholder={field.placeholder || ''} />
        )}
      </Form.Item>
    ));
  };

  return (
    <>
      <div className='grid grid-cols-4 space-x-2'>
        {formData && (
          <Form.Item
            label={translate(formData.workspaces[0]?.label_name)}
            name={translate(formData.workspaces[0]?.field_name)}
            rules={[{ required: true, message: 'Please select a workspace' }]}
          >
            <Select
              placeholder="Select a workspace"
              options={formData.workspaces.map((workspace) => ({
                value: workspace._id,
                label: workspace.name,
              }))}
              onChange={(value) => {
                setSelectedWorkspace(value);
                setSelectedCollege(null);
                setSelectedCourse(null);
                setSelectedAdmissionType(null);
                form.resetFields(['college', 'course', 'subcourse', 'admissionType', 'payment']);
              }}
            />
          </Form.Item>
        )}

        {selectedWorkspace && (
          <Form.Item
            label={translate(formData.college[0]?.label_name)}
            name={translate(formData.college[0]?.label_name)}
            rules={[{ required: true, message: 'Please select a college' }]}
          >
            <Select
              placeholder="Select a college"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.map((college) => ({
                    value: college._id,
                    label: college.name,
                  })) || []
              }
              onChange={(value) => {
                setSelectedCollege(value);
                setSelectedCourse(null);
                setSelectedAdmissionType(null);
                form.resetFields(['course', 'subcourse', 'admissionType', 'payment']);
              }}
            />
          </Form.Item>
        )}

        {selectedCollege && (
          <Form.Item
            label={translate('Course')}
            name="course"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select
              placeholder="Select a course"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.find((college) => college._id === selectedCollege)
                  ?.courses.map((course) => ({
                    value: course.value,
                    label: course.label,
                  })) || []
              }
              onChange={(value) => {
                setSelectedCourse(value);
                form.resetFields(['subcourse']);
              }}
            />
          </Form.Item>
        )}

        {selectedCourse && (
          <Form.Item
            label={translate('Subcourse')}
            name="subcourse"
            rules={[{ required: true, message: 'Please select a subcourse' }]}
          >
            <Select
              placeholder="Select a subcourse"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.find((college) => college._id === selectedCollege)
                  ?.courses.find((course) => course.value === selectedCourse)
                  ?.specializations.map((subcourse) => ({
                    value: subcourse.value,
                    label: subcourse.label,
                  })) || []
              }
            />
          </Form.Item>
        )}

        {selectedCollege && (
          <Form.Item
            label={translate('Admission Type')}
            name="admissionType"
            rules={[{ required: true, message: 'Please select an admission type' }]}
          >
            <Select
              placeholder="Select an admission type"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.find((college) => college._id === selectedCollege)
                  ?.admission_type.map((admission) => ({
                    value: admission.value,
                    label: admission.label,
                  })) || []
              }
              onChange={(value) => {
                setSelectedAdmissionType(value);
                setSelectedPaymentMethod(null);
                form.resetFields(['payment', 'paymentStatus']);
              }}
            />
          </Form.Item>
        )}

        {selectedAdmissionType && (
          <Form.Item
            label={translate('Payment Method')}
            name="payment"
            rules={[{ required: true, message: 'Please select a payment method' }]}
          >
            <Select
              placeholder="Select a payment method"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.find((college) => college._id === selectedCollege)
                  ?.admission_type.find((admission) => admission.value === selectedAdmissionType)
                  ?.payments.map((payment) => ({
                    value: payment.value,
                    label: payment.label,
                  })) || []
              }
              onChange={(value) => {
                setSelectedPaymentMethod(value);
                form.resetFields(['paymentStatus']);
              }}
            />
          </Form.Item>
        )}

        {selectedPaymentMethod && (
          <Form.Item
            label={translate('Payment Status')}
            name="paymentStatus"
            rules={[{ required: true, message: 'Please select a payment status' }]}
          >
            <Select
              placeholder="Select a payment status"
              options={
                formData.workspaces
                  .find((workspace) => workspace._id === selectedWorkspace)
                  ?.colleges.find((college) => college._id === selectedCollege)
                  ?.admission_type.find(
                    (admission) => admission.value === selectedAdmissionType
                  )
                  ?.payments.find((payment) => payment.value === selectedPaymentMethod)
                  ?.paymentType.map((paymentType) => ({
                    value: paymentType.key,
                    label: paymentType.label,
                  })) || []
              }
              onChange={(value) => {
                setSelectedPaymentStatus(value);
              }}
            />
          </Form.Item>
        )}

        {selectedPaymentStatus &&
          renderDynamicFields(
            formData.workspaces
              .find((workspace) => workspace._id === selectedWorkspace)
              ?.colleges.find((college) => college._id === selectedCollege)
              ?.admission_type.find(
                (admission) => admission.value === selectedAdmissionType
              )
              ?.payments.find((payment) => payment.value === selectedPaymentMethod)
              ?.paymentType.find((type) => type.key === selectedPaymentStatus)
              ?.paymentStatusOptions[0]?.fields || []
          )}

        {selectedCollege &&
          renderDynamicFields(
            formData.workspaces
              .find((workspace) => workspace._id === selectedWorkspace)
              ?.colleges.find((college) => college._id === selectedCollege)
              ?.fields || []
          )}
      </div>
    </>
  );
}
