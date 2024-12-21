import React from 'react';
import { Form, Input, Button, Select, Card, Switch, Collapse } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Panel } = Collapse;

// Define render field options
const renderfieldsOptions = [
    { value: 'lead_id', label: 'LEAD ID' },
    { value: 'full_name', label: 'FULL NAME' },
    { value: 'email', label: 'EMAIL' },
    { value: 'phone', label: 'PHONE' },
    { value: 'alternate_phone', label: 'ALTERNATE PHONE' },
    { value: 'course', label: 'COURSE' },
    { value: 'sendfeeReciept', label: 'SENDFEERECIEPT' },
    { value: 'paymentStatus', label: 'PAYMENTSTATUS' },
    { value: 'institute_name', label: 'INSTITUTE NAME' },
    { value: 'university_name', label: 'UNIVERSITY NAME' },
    { value: 'enrollment', label: 'ENROLLMENT' },
    { value: 'lmsStatus', label: 'LMSSTATUS' },
    { value: 'father_name', label: 'FATHER NAME' },
    { value: 'mother_name', label: 'MOTHER NAME' },
    { value: 'session', label: 'SESSION' },
    { value: 'admission_type', label: 'ADMISSION TYPE' },
    { value: 'enter_specialization', label: 'ENTER SPECIALIZATION' },
    { value: 'dob', label: 'DOB' },
    { value: 'remark', label: 'REMARK' },
    { value: 'gender', label: 'GENDER' },
    { value: 'installment_type', label: 'INSTALLMENT TYPE' },
    { value: 'payment_mode', label: 'PAYMENT MODE' },
    { value: 'payment_type', label: 'PAYMENT TYPE' },
    { value: 'total_course_fee', label: 'TOTAL COURSE FEE' },
    { value: 'total_paid_amount', label: 'TOTAL PAID AMOUNT' },
    { value: 'paid_amount', label: 'PAID AMOUNT' },
    { value: 'status', label: 'STATUS' },
    { value: 'due_amount', label: 'DUE AMOUNT' },
    { value: 'feeDocument', label: 'FEEDOCUMENT' },
    { value: 'studentDocument', label: 'STUDENTDOCUMENT' },
    { value: 'welcomeMail', label: 'WELCOMEMAIL' },
    { value: 'whatsappMessageStatus', label: 'WHATSAPPMESSAGESTATUS' },
    { value: 'whatsappEnrolled', label: 'WHATSAPPENROLLED' },
    { value: 'welcomeEnrolled', label: 'WELCOMEENROLLED' },
    { value: 'welcome', label: 'WELCOME' },
    { value: 'whatsappWelcome', label: 'WHATSAPPWELCOME' },
];


const DynamicForm = () => {
    return (
        <>
            <Form.Item
                label="Form Title"
                name="title"
                initialValue="Student Registration Form"
                rules={[{ required: true, message: 'Form title is required' }]}
            >
                <Input placeholder="Enter Form Title" />
            </Form.Item>
            <Form.List name="workspaces">
                {(workspaceFields, { add: addWorkspace, remove: removeWorkspace }) => (
                    <>
                        {workspaceFields.map(({ key, name, ...restField }) => (
                            <Collapse key={key} defaultActiveKey={['1']}>
                                <Panel
                                    header={`Workspace ${name + 1}`}
                                    key="1"
                                    extra={
                                        <MinusCircleOutlined
                                            onClick={() => removeWorkspace(name)}
                                            style={{ fontSize: '16px', color: 'red' }}
                                        />
                                    }
                                >
                                    <Form.Item
                                        {...restField}
                                        label="Workspace Name"
                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Workspace name is required' }]}
                                    >
                                        <Input placeholder="Enter Workspace Name" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Field Name"
                                        name={[name, 'field_name']}
                                        rules={[{ required: true, message: 'Field name is required' }]}
                                    >
                                        <Select placeholder="Select Field">
                                            {renderfieldsOptions.map((option) => (
                                                <Option key={option.value} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Label Name"
                                        name={[name, 'label_name']}
                                        rules={[{ required: true, message: 'Label name is required' }]}
                                    >
                                        <Input placeholder="Enter Label Name" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Placeholder"
                                        name={[name, 'placeholder']}
                                        rules={[{ required: true, message: 'Placeholder is required' }]}
                                    >
                                        <Input placeholder="Enter Placeholder" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Type"
                                        name={[name, 'type']}
                                        rules={[{ required: true, message: 'Type is required' }]}
                                    >
                                        <Select placeholder="Select Type">
                                            <Option value="text">Text</Option>
                                            <Option value="number">Number</Option>
                                            <Option value="date">Date</Option>
                                            <Option value="select">Select</Option>
                                        </Select>
                                    </Form.Item>
                                    <div className='flex items-center justify-between'>
                                        <Form.Item
                                            {...restField}
                                            label="Status"
                                            name={[name, 'status']}
                                            valuePropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label="Required"
                                            name={[name, 'required']}
                                            valuePropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>

                                    </div>


                                    <Form.List name={[name, 'colleges']}>
                                        {(collegeFields, { add: addCollege, remove: removeCollege }) => (
                                            <>
                                                {collegeFields.map(({ key: collegeKey, name: collegeName, ...collegeRestField }) => (
                                                    <Card
                                                        key={collegeKey}
                                                        title={`College ${collegeName + 1}`}
                                                        extra={<MinusCircleOutlined
                                                            onClick={() => removeCollege(collegeName)}
                                                            style={{ fontSize: '16px', color: 'red' }} />}
                                                        style={{ marginBottom: '16px' }}
                                                    >

                                                        {/* College Fields */}
                                                        <Form.Item
                                                            {...collegeRestField}
                                                            label="College Name"
                                                            name={[collegeName, 'name']}
                                                            rules={[{ required: true, message: 'College name is required' }]}
                                                        >
                                                            <Input placeholder="Enter College Name" />
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...collegeRestField}
                                                            label="Field Name"
                                                            name={[collegeName, 'field_name']}
                                                            rules={[{ required: true, message: 'Field name is required' }]}
                                                        >
                                                            <Select placeholder="Select Field">
                                                                {renderfieldsOptions.map((option) => (
                                                                    <Option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...collegeRestField}
                                                            label="Placeholder"
                                                            name={[collegeName, 'placeholder']}
                                                            rules={[{ required: true, message: 'Placeholder is required' }]}
                                                        >
                                                            <Input placeholder="Enter Placeholder" />
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...collegeRestField}
                                                            label="Type"
                                                            name={[collegeName, 'type']}
                                                            rules={[{ required: true, message: 'Type is required' }]}
                                                        >
                                                            <Select placeholder="Select Type">
                                                                <Option value="text">Text</Option>
                                                                <Option value="number">Number</Option>
                                                                <Option value="select">Select</Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <div className="flex items-center justify-between">
                                                            {/* Status */}
                                                            <Form.Item
                                                                {...collegeRestField}
                                                                label="Status"
                                                                name={[collegeName, 'status']}
                                                                valuePropName="checked"
                                                                initialValue={false} // Default to false
                                                            >
                                                                <Switch />
                                                            </Form.Item>
                                                            {/* Required */}
                                                            <Form.Item
                                                                {...collegeRestField}
                                                                label="Required"
                                                                name={[collegeName, 'required']}
                                                                valuePropName="checked"
                                                                initialValue={false} // Default to false
                                                            >
                                                                <Switch />
                                                            </Form.Item>
                                                        </div>
                                                        <Form.List name={[collegeName, 'options']}>
                                                            {(optionFields, { add: addOption, remove: removeOption }) => (
                                                                <>
                                                                    {optionFields.map(({ key: optionKey, name: optionName, ...optionRestField }) => (
                                                                        <Card
                                                                            key={optionKey}
                                                                            style={{ marginBottom: '16px' }}
                                                                            title={`Option ${optionName + 1}`}
                                                                            extra={<MinusCircleOutlined
                                                                                onClick={() => removeOption(optionName)}
                                                                                style={{ fontSize: '16px', color: 'red' }} />}
                                                                        >
                                                                            <Form.Item
                                                                                {...optionRestField}
                                                                                label="Option Value"
                                                                                name={[optionName, 'value']}
                                                                                rules={[
                                                                                    { required: true, message: 'Option value is required' },
                                                                                ]}
                                                                            >
                                                                                <Input placeholder="Enter Option Value" />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...optionRestField}
                                                                                label="Option Label"
                                                                                name={[optionName, 'label']}
                                                                                rules={[
                                                                                    { required: true, message: 'Option label is required' },
                                                                                ]}
                                                                            >
                                                                                <Input placeholder="Enter Option Label" />
                                                                            </Form.Item>
                                                                        </Card>
                                                                    ))}
                                                                    <Form.Item>
                                                                        <Button
                                                                            type="dashed"
                                                                            onClick={() => addOption()}
                                                                            block
                                                                            icon={<PlusOutlined />}
                                                                        >
                                                                            Add Option
                                                                        </Button>
                                                                    </Form.Item>
                                                                </>
                                                            )}
                                                        </Form.List>
                                                        <Form.List name={[collegeName, 'fields']}>
                                                            {(fieldFields, { add: addField, remove: removeField }) => (
                                                                <>
                                                                    {fieldFields.map(({ key: fieldKey, name: fieldName, ...fieldRestField }) => (
                                                                        <Card
                                                                            key={fieldKey}
                                                                            style={{ marginBottom: '16px' }}
                                                                            title={`Field ${fieldName + 1}`}
                                                                            extra={<MinusCircleOutlined
                                                                                onClick={() => removeField(fieldName)}
                                                                                style={{ fontSize: '16px', color: 'red' }} />}
                                                                        >
                                                                            <Form.Item
                                                                                {...fieldRestField}
                                                                                label="Field Name"
                                                                                name={[fieldName, 'field_name']}
                                                                                rules={[{ required: true, message: 'Field name is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Field">
                                                                                    {renderfieldsOptions.map((option) => (
                                                                                        <Option key={option.value} value={option.value}>
                                                                                            {option.label}
                                                                                        </Option>
                                                                                    ))}
                                                                                </Select>
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...fieldRestField}
                                                                                label="Field Label"
                                                                                name={[fieldName, 'label_name']}
                                                                                rules={[{ required: true, message: 'Field label is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Field Label" />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...fieldRestField}
                                                                                label="Placeholder"
                                                                                name={[fieldName, 'placeholder']}
                                                                                rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Placeholder" />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...fieldRestField}
                                                                                label="Type"
                                                                                name={[fieldName, 'Type']}
                                                                                rules={[{ required: true, message: 'Type is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Field Type">
                                                                                    <Option value="text">Text</Option>
                                                                                    <Option value="email">Email</Option>
                                                                                    <Option value="number">Number</Option>
                                                                                </Select>
                                                                            </Form.Item>
                                                                            <div className='flex items-center justify-between'>
                                                                                <Form.Item
                                                                                    {...fieldRestField}
                                                                                    label="Status"
                                                                                    name={[fieldName, 'status']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>
                                                                                <Form.Item
                                                                                    {...fieldRestField}
                                                                                    label="Required"
                                                                                    name={[fieldName, 'required']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>
                                                                            </div>
                                                                        </Card>
                                                                    ))}
                                                                    <Form.Item>
                                                                        <Button
                                                                            type="dashed"
                                                                            onClick={() => addField()}
                                                                            block
                                                                            icon={<PlusOutlined />}
                                                                        >
                                                                            Add Field
                                                                        </Button>
                                                                    </Form.Item>
                                                                </>
                                                            )}
                                                        </Form.List>

                                                        <Form.List name={[collegeName, 'courses']}>
                                                            {(courseFields, { add: addCourse, remove: removeCourse }) => (
                                                                <>
                                                                    {courseFields.map(({ key: courseKey, name: courseName, ...courseRestField }) => (
                                                                        <Card
                                                                            key={courseKey}
                                                                            style={{ marginBottom: '16px' }}
                                                                            title={`Course ${courseName + 1}`}
                                                                            extra={<MinusCircleOutlined
                                                                                onClick={() => removeCourse(courseName)}
                                                                                style={{ fontSize: '16px', color: 'red' }} />}
                                                                        >
                                                                            {/* Course Value */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Course Value"
                                                                                name={[courseName, 'value']}
                                                                                rules={[{ required: true, message: 'Course value is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Course Value" />
                                                                            </Form.Item>

                                                                            {/* Course Label */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Course Label"
                                                                                name={[courseName, 'label']}
                                                                                rules={[{ required: true, message: 'Course label is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Course Label" />
                                                                            </Form.Item>

                                                                            {/* Field Name */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Field Name"
                                                                                name={[courseName, 'field_name']}
                                                                                rules={[{ required: true, message: 'Field name is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Field">
                                                                                    {renderfieldsOptions.map((option) => (
                                                                                        <Option key={option.value} value={option.value}>
                                                                                            {option.label}
                                                                                        </Option>
                                                                                    ))}
                                                                                </Select>
                                                                            </Form.Item>

                                                                            {/* Label Name */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Label Name"
                                                                                name={[courseName, 'label_name']}
                                                                                rules={[{ required: true, message: 'Label name is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Label Name" />
                                                                            </Form.Item>

                                                                            {/* Placeholder */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Placeholder"
                                                                                name={[courseName, 'placeholder']}
                                                                                rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Placeholder" />
                                                                            </Form.Item>

                                                                            {/* Type */}
                                                                            <Form.Item
                                                                                {...courseRestField}
                                                                                label="Type"
                                                                                name={[courseName, 'type']}
                                                                                rules={[{ required: true, message: 'Type is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Type">
                                                                                    <Option value="text">Text</Option>
                                                                                    <Option value="number">Number</Option>
                                                                                    <Option value="date">Date</Option>
                                                                                    <Option value="select">Select</Option>
                                                                                </Select>
                                                                            </Form.Item>

                                                                            {/* Status and Required */}
                                                                            <div className="flex items-center justify-between">
                                                                                <Form.Item
                                                                                    {...courseRestField}
                                                                                    label="Status"
                                                                                    name={[courseName, 'status']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>

                                                                                <Form.Item
                                                                                    {...courseRestField}
                                                                                    label="Required"
                                                                                    name={[courseName, 'required']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>
                                                                            </div>

                                                                            <Form.List name={[courseName, 'specializations']}>
                                                                                {(specializationFields, { add: addSpecialization, remove: removeSpecialization }) => (
                                                                                    <>
                                                                                        {specializationFields.map(({ key: specializationKey, name: specializationName, ...specializationRestField }) => (
                                                                                            <Card
                                                                                                key={specializationKey}
                                                                                                style={{ marginBottom: '16px' }}
                                                                                                title={`Specialization ${specializationName + 1}`}
                                                                                                extra={<MinusCircleOutlined
                                                                                                    onClick={() => removeSpecialization(specializationName)}
                                                                                                    style={{ fontSize: '16px', color: 'red' }} />}
                                                                                            >
                                                                                                {/* Specialization Value */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Specialization Value"
                                                                                                    name={[specializationName, 'value']}
                                                                                                    rules={[{ required: true, message: 'Specialization value is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Specialization Value" />
                                                                                                </Form.Item>

                                                                                                {/* Specialization Label */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Specialization Label"
                                                                                                    name={[specializationName, 'label']}
                                                                                                    rules={[{ required: true, message: 'Specialization label is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Specialization Label" />
                                                                                                </Form.Item>

                                                                                                {/* Field Name */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Field Name"
                                                                                                    name={[specializationName, 'field_name']}
                                                                                                    rules={[{ required: true, message: 'Field name is required' }]}
                                                                                                >
                                                                                                    <Select placeholder="Select Field">
                                                                                                        {renderfieldsOptions.map((option) => (
                                                                                                            <Option key={option.value} value={option.value}>
                                                                                                                {option.label}
                                                                                                            </Option>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </Form.Item>

                                                                                                {/* Label Name */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Label Name"
                                                                                                    name={[specializationName, 'label_name']}
                                                                                                    rules={[{ required: true, message: 'Label name is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Label Name" />
                                                                                                </Form.Item>

                                                                                                {/* Placeholder */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Placeholder"
                                                                                                    name={[specializationName, 'placeholder']}
                                                                                                    rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Placeholder" />
                                                                                                </Form.Item>

                                                                                                {/* Type */}
                                                                                                <Form.Item
                                                                                                    {...specializationRestField}
                                                                                                    label="Type"
                                                                                                    name={[specializationName, 'type']}
                                                                                                    rules={[{ required: true, message: 'Type is required' }]}
                                                                                                >
                                                                                                    <Select placeholder="Select Type">
                                                                                                        <Option value="text">Text</Option>
                                                                                                        <Option value="number">Number</Option>
                                                                                                        <Option value="date">Date</Option>
                                                                                                        <Option value="select">Select</Option>
                                                                                                    </Select>
                                                                                                </Form.Item>

                                                                                                {/* Status and Required */}
                                                                                                <div className="flex items-center justify-between">
                                                                                                    {/* Status */}
                                                                                                    <Form.Item
                                                                                                        {...specializationRestField}
                                                                                                        label="Status"
                                                                                                        name={[specializationName, 'status']}
                                                                                                        valuePropName="checked"
                                                                                                    >
                                                                                                        <Switch />
                                                                                                    </Form.Item>
                                                                                                    {/* Required */}
                                                                                                    <Form.Item
                                                                                                        {...specializationRestField}
                                                                                                        label="Required"
                                                                                                        name={[specializationName, 'required']}
                                                                                                        valuePropName="checked"
                                                                                                    >
                                                                                                        <Switch />
                                                                                                    </Form.Item>
                                                                                                </div>
                                                                                            </Card>
                                                                                        ))}
                                                                                        <Form.Item>
                                                                                            <Button
                                                                                                type="dashed"
                                                                                                onClick={() => addSpecialization()}
                                                                                                block
                                                                                                icon={<PlusOutlined />}
                                                                                            >
                                                                                                Add Specialization
                                                                                            </Button>
                                                                                        </Form.Item>
                                                                                    </>
                                                                                )}
                                                                            </Form.List>
                                                                        </Card>
                                                                    ))}
                                                                    <Form.Item>
                                                                        <Button
                                                                            type="dashed"
                                                                            onClick={() => addCourse()}
                                                                            block
                                                                            icon={<PlusOutlined />}
                                                                        >
                                                                            Add Course
                                                                        </Button>
                                                                    </Form.Item>
                                                                </>
                                                            )}
                                                        </Form.List>
                                                        <Form.List name={[collegeName, 'admission_type']}>
                                                            {(admissionFields, { add: addAdmission, remove: removeAdmission }) => (
                                                                <>
                                                                    {admissionFields.map(({ key: admissionKey, name: admissionName, ...admissionRestField }) => (
                                                                        <Card
                                                                            key={admissionKey}
                                                                            style={{ marginBottom: '16px' }}
                                                                            title={`Admission Type ${admissionName + 1}`}
                                                                            extra={
                                                                                <MinusCircleOutlined
                                                                                    onClick={() => removeAdmission(admissionName)}
                                                                                    style={{ fontSize: '16px', color: 'red' }}
                                                                                />
                                                                            }
                                                                        >
                                                                            {/* Admission Value */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Admission Value"
                                                                                name={[admissionName, 'value']}
                                                                                rules={[{ required: true, message: 'Admission value is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Admission Value" />
                                                                            </Form.Item>

                                                                            {/* Admission Label */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Admission Label"
                                                                                name={[admissionName, 'label']}
                                                                                rules={[{ required: true, message: 'Admission label is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Admission Label" />
                                                                            </Form.Item>

                                                                            {/* Field Name */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Field Name"
                                                                                name={[admissionName, 'field_name']}
                                                                                rules={[{ required: true, message: 'Field name is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Field">
                                                                                    {renderfieldsOptions.map((option) => (
                                                                                        <Option key={option.value} value={option.value}>
                                                                                            {option.label}
                                                                                        </Option>
                                                                                    ))}
                                                                                </Select>
                                                                            </Form.Item>

                                                                            {/* Label Name */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Label Name"
                                                                                name={[admissionName, 'label_name']}
                                                                                rules={[{ required: true, message: 'Label name is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Label Name" />
                                                                            </Form.Item>

                                                                            {/* Placeholder */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Placeholder"
                                                                                name={[admissionName, 'placeholder']}
                                                                                rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                            >
                                                                                <Input placeholder="Enter Placeholder" />
                                                                            </Form.Item>

                                                                            {/* Type */}
                                                                            <Form.Item
                                                                                {...admissionRestField}
                                                                                label="Type"
                                                                                name={[admissionName, 'type']}
                                                                                rules={[{ required: true, message: 'Type is required' }]}
                                                                            >
                                                                                <Select placeholder="Select Type">
                                                                                    <Option value="text">Text</Option>
                                                                                    <Option value="number">Number</Option>
                                                                                    <Option value="date">Date</Option>
                                                                                    <Option value="select">Select</Option>
                                                                                </Select>
                                                                            </Form.Item>

                                                                            {/* Status and Required */}
                                                                            <div className="flex items-center justify-between">
                                                                                {/* Status */}
                                                                                <Form.Item
                                                                                    {...admissionRestField}
                                                                                    label="Status"
                                                                                    name={[admissionName, 'status']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>

                                                                                {/* Required */}
                                                                                <Form.Item
                                                                                    {...admissionRestField}
                                                                                    label="Required"
                                                                                    name={[admissionName, 'required']}
                                                                                    valuePropName="checked"
                                                                                >
                                                                                    <Switch />
                                                                                </Form.Item>
                                                                            </div>

                                                                            <Form.List name={[admissionName, 'paymentType']}>
                                                                                {(paymentFields, { add: addPayment, remove: removePayment }) => (
                                                                                    <>
                                                                                        {paymentFields.map(({ key: paymentKey, name: paymentName, ...paymentRestField }) => (
                                                                                            <Card
                                                                                                key={paymentKey}
                                                                                                style={{ marginBottom: '16px' }}
                                                                                                title={`Payment Type ${paymentName + 1}`}
                                                                                                extra={
                                                                                                    <MinusCircleOutlined
                                                                                                        onClick={() => removePayment(paymentName)}
                                                                                                        style={{ fontSize: '16px', color: 'red' }}
                                                                                                    />
                                                                                                }
                                                                                            >
                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Payment Value"
                                                                                                    name={[paymentName, 'value']}
                                                                                                    rules={[{ required: true, message: 'Payment value is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Payment Value" />
                                                                                                </Form.Item>

                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Payment Label"
                                                                                                    name={[paymentName, 'label']}
                                                                                                    rules={[{ required: true, message: 'Payment label is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Payment Label" />
                                                                                                </Form.Item>

                                                                                                {/* Field Name */}
                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Field Name"
                                                                                                    name={[paymentName, 'field_name']}
                                                                                                    rules={[{ required: true, message: 'Field name is required' }]}
                                                                                                >
                                                                                                    <Select placeholder="Select Field">
                                                                                                        {renderfieldsOptions.map((option) => (
                                                                                                            <Option key={option.value} value={option.value}>
                                                                                                                {option.label}
                                                                                                            </Option>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </Form.Item>

                                                                                                {/* Label Name */}
                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Label Name"
                                                                                                    name={[paymentName, 'label_name']}
                                                                                                    rules={[{ required: true, message: 'Label name is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Label Name" />
                                                                                                </Form.Item>

                                                                                                {/* Placeholder */}
                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Placeholder"
                                                                                                    name={[paymentName, 'placeholder']}
                                                                                                    rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                                                >
                                                                                                    <Input placeholder="Enter Placeholder" />
                                                                                                </Form.Item>

                                                                                                {/* Type */}
                                                                                                <Form.Item
                                                                                                    {...paymentRestField}
                                                                                                    label="Type"
                                                                                                    name={[paymentName, 'type']}
                                                                                                    rules={[{ required: true, message: 'Type is required' }]}
                                                                                                >
                                                                                                    <Select placeholder="Select Type">
                                                                                                        <Option value="text">Text</Option>
                                                                                                        <Option value="number">Number</Option>
                                                                                                        <Option value="date">Date</Option>
                                                                                                        <Option value="select">Select</Option>
                                                                                                    </Select>
                                                                                                </Form.Item>

                                                                                                {/* Status and Required */}
                                                                                                <div className="flex items-center justify-between">
                                                                                                    {/* Status */}
                                                                                                    <Form.Item
                                                                                                        {...paymentRestField}
                                                                                                        label="Status"
                                                                                                        name={[paymentName, 'status']}
                                                                                                        valuePropName="checked"
                                                                                                    >
                                                                                                        <Switch />
                                                                                                    </Form.Item>

                                                                                                    {/* Required */}
                                                                                                    <Form.Item
                                                                                                        {...paymentRestField}
                                                                                                        label="Required"
                                                                                                        name={[paymentName, 'required']}
                                                                                                        valuePropName="checked"
                                                                                                    >
                                                                                                        <Switch />
                                                                                                    </Form.Item>
                                                                                                </div>
                                                                                                <Form.List name={[paymentName, 'paymentStatusOptions']}>
                                                                                                    {(statusFields, { add: addStatus, remove: removeStatus }) => (
                                                                                                        <>
                                                                                                            {statusFields.map(({ key: statusKey, name: statusName, ...statusRestField }) => (
                                                                                                                <Card
                                                                                                                    key={statusKey}
                                                                                                                    style={{ marginBottom: '16px' }}
                                                                                                                    title={`Payment Status ${statusName + 1}`}
                                                                                                                    extra={
                                                                                                                        <MinusCircleOutlined
                                                                                                                            onClick={() => removeStatus(statusName)}
                                                                                                                            style={{ fontSize: '16px', color: 'red' }}
                                                                                                                        />
                                                                                                                    }
                                                                                                                >
                                                                                                                    {/* Status Value */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Status Value"
                                                                                                                        name={[statusName, 'value']}
                                                                                                                        rules={[{ required: true, message: 'Status value is required' }]}
                                                                                                                    >
                                                                                                                        <Input placeholder="Enter Status Value" />
                                                                                                                    </Form.Item>

                                                                                                                    {/* Status Label */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Status Label"
                                                                                                                        name={[statusName, 'label']}
                                                                                                                        rules={[{ required: true, message: 'Status label is required' }]}
                                                                                                                    >
                                                                                                                        <Input placeholder="Enter Status Label" />
                                                                                                                    </Form.Item>

                                                                                                                    {/* Field Name */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Field Name"
                                                                                                                        name={[statusName, 'field_name']}
                                                                                                                        rules={[{ required: true, message: 'Field name is required' }]}
                                                                                                                    >
                                                                                                                        <Select placeholder="Select Field">
                                                                                                                            {renderfieldsOptions.map((option) => (
                                                                                                                                <Option key={option.value} value={option.value}>
                                                                                                                                    {option.label}
                                                                                                                                </Option>
                                                                                                                            ))}
                                                                                                                        </Select>
                                                                                                                    </Form.Item>

                                                                                                                    {/* Label Name */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Label Name"
                                                                                                                        name={[statusName, 'label_name']}
                                                                                                                        rules={[{ required: true, message: 'Label name is required' }]}
                                                                                                                    >
                                                                                                                        <Input placeholder="Enter Label Name" />
                                                                                                                    </Form.Item>

                                                                                                                    {/* Placeholder */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Placeholder"
                                                                                                                        name={[statusName, 'placeholder']}
                                                                                                                        rules={[{ required: true, message: 'Placeholder is required' }]}
                                                                                                                    >
                                                                                                                        <Input placeholder="Enter Placeholder" />
                                                                                                                    </Form.Item>

                                                                                                                    {/* Type */}
                                                                                                                    <Form.Item
                                                                                                                        {...statusRestField}
                                                                                                                        label="Type"
                                                                                                                        name={[statusName, 'type']}
                                                                                                                        rules={[{ required: true, message: 'Type is required' }]}
                                                                                                                    >
                                                                                                                        <Select placeholder="Select Type">
                                                                                                                            <Option value="text">Text</Option>
                                                                                                                            <Option value="number">Number</Option>
                                                                                                                            <Option value="date">Date</Option>
                                                                                                                            <Option value="select">Select</Option>
                                                                                                                        </Select>
                                                                                                                    </Form.Item>
                                                                                                                    {/* Status and Required */}
                                                                                                                    <div className="flex items-center justify-between">
                                                                                                                        {/* Status */}
                                                                                                                        <Form.Item
                                                                                                                            {...statusRestField}
                                                                                                                            label="Status"
                                                                                                                            name={[statusName, 'status']}
                                                                                                                            valuePropName="checked"
                                                                                                                        >
                                                                                                                            <Switch />
                                                                                                                        </Form.Item>
                                                                                                                        {/* Required */}
                                                                                                                        <Form.Item
                                                                                                                            {...statusRestField}
                                                                                                                            label="Required"
                                                                                                                            name={[statusName, 'required']}
                                                                                                                            valuePropName="checked"
                                                                                                                        >
                                                                                                                            <Switch />
                                                                                                                        </Form.Item>
                                                                                                                    </div>
                                                                                                                    <Form.List name={[statusName, 'fields']}>
                                                                                                                        {(fieldFields, { add: addField, remove: removeField }) => (
                                                                                                                            <>
                                                                                                                                {fieldFields.map(({ key: fieldKey, name: fieldName, ...fieldRestField }) => (
                                                                                                                                    <Card
                                                                                                                                        key={fieldKey}
                                                                                                                                        style={{ marginBottom: '16px' }}
                                                                                                                                        title={`Field ${fieldName + 1}`}
                                                                                                                                        extra={
                                                                                                                                            <MinusCircleOutlined
                                                                                                                                                onClick={() => removeField(fieldName)}
                                                                                                                                                style={{ fontSize: '16px', color: 'red' }}
                                                                                                                                            />
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        <Form.Item
                                                                                                                                            {...fieldRestField}
                                                                                                                                            label="Field Name"
                                                                                                                                            name={[fieldName, 'field_name']}
                                                                                                                                            rules={[{ required: true, message: 'Field name is required' }]}
                                                                                                                                        >
                                                                                                                                            <Select placeholder="Select Field">
                                                                                                                                                {renderfieldsOptions.map((option) => (
                                                                                                                                                    <Option key={option.value} value={option.value}>
                                                                                                                                                        {option.label}
                                                                                                                                                    </Option>
                                                                                                                                                ))}
                                                                                                                                            </Select>
                                                                                                                                        </Form.Item>
                                                                                                                                        <Form.Item
                                                                                                                                            {...fieldRestField}
                                                                                                                                            label="Field Label"
                                                                                                                                            name={[fieldName, 'label_name']}
                                                                                                                                            rules={[{ required: true, message: 'Field label is required' }]}
                                                                                                                                        >
                                                                                                                                            <Input placeholder="Enter Field Label" />
                                                                                                                                        </Form.Item>
                                                                                                                                    </Card>
                                                                                                                                ))}
                                                                                                                                <Form.Item>
                                                                                                                                    <Button
                                                                                                                                        type="dashed"
                                                                                                                                        onClick={() => addField()}
                                                                                                                                        block
                                                                                                                                        icon={<PlusOutlined />}
                                                                                                                                    >
                                                                                                                                        Add Field
                                                                                                                                    </Button>
                                                                                                                                </Form.Item>
                                                                                                                            </>
                                                                                                                        )}
                                                                                                                    </Form.List>
                                                                                                                </Card>
                                                                                                            ))}
                                                                                                            <Form.Item>
                                                                                                                <Button
                                                                                                                    type="dashed"
                                                                                                                    onClick={() => addStatus()}
                                                                                                                    block
                                                                                                                    icon={<PlusOutlined />}
                                                                                                                >
                                                                                                                    Add Payment Status
                                                                                                                </Button>
                                                                                                            </Form.Item>
                                                                                                        </>
                                                                                                    )}
                                                                                                </Form.List>
                                                                                            </Card>
                                                                                        ))}
                                                                                        <Form.Item>
                                                                                            <Button
                                                                                                type="dashed"
                                                                                                onClick={() => addPayment()}
                                                                                                block
                                                                                                icon={<PlusOutlined />}
                                                                                            >
                                                                                                Add Payment Type
                                                                                            </Button>
                                                                                        </Form.Item>
                                                                                    </>
                                                                                )}
                                                                            </Form.List>
                                                                        </Card>
                                                                    ))}
                                                                    <Form.Item>
                                                                        <Button
                                                                            type="dashed"
                                                                            onClick={() => addAdmission()}
                                                                            block
                                                                            icon={<PlusOutlined />}
                                                                        >
                                                                            Add Admission Type
                                                                        </Button>
                                                                    </Form.Item>
                                                                </>
                                                            )}
                                                        </Form.List>
                                                    </Card>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => addCollege()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add College
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Panel>
                            </Collapse>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => addWorkspace()}
                                block
                                icon={<PlusOutlined />}>
                                Add Workspace
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );
};
export default DynamicForm;