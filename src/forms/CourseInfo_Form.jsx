import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOptions } from '@/redux/options/actions';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';

export default function InfoForm({ isUpdateForm = false }) {
    const dispatch = useDispatch();

    // States for filtered options
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filteredSubcourses, setFilteredSubcourses] = useState([]);

    // Fetch data for modes, universities, courses, and subcourses
    const modes = useSelector((state) => selectSpecificEntityData(state, 'modes'));
    const universities = useSelector((state) => selectSpecificEntityData(state, 'university'));
    const courses = useSelector((state) => selectSpecificEntityData(state, 'course'));
    const subcourses = useSelector((state) => selectSpecificEntityData(state, 'subcourse'));

    // Loading states
    const modesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'modes'));
    const universitiesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'university'));
    const coursesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'course'));
    const subcoursesLoading = useSelector((state) => selectSpecificEntityLoading(state, 'subcourse'));

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch all required options
        dispatch(fetchOptions('modes', { signal }));
        dispatch(fetchOptions('university', { signal }));
        dispatch(fetchOptions('course', { signal }));
        dispatch(fetchOptions('subcourse', { signal }));

        return () => controller.abort();
    }, [dispatch]);

    // Transform fetched data into options for Select components
    const toOptions = (data) => data?.map((item) => ({ label: item.name, value: item._id })) || [];

    const handleModeChange = (selectedMode) => {
        // Filter universities based on selected mode
        const filtered = universities?.filter((university) =>
            university.modes?.includes(selectedMode)
        );

        // Update state
        setFilteredUniversities(filtered || []);
        setFilteredCourses([]); // Reset child options
        setFilteredSubcourses([]);
    };

    const handleUniversityChange = (selectedUniversity) => {
        // Filter courses based on selected university
        const filtered = courses?.filter((course) =>
            course.university?.includes(selectedUniversity)
        );

        // Update state
        setFilteredCourses(filtered || []);
        setFilteredSubcourses([]);
    };

    const handleCourseChange = (selectedCourse) => {
        // Filter subcourses based on selected course
        const filtered = subcourses?.filter((subcourse) =>
            subcourse.course?.includes(selectedCourse)
        );

        // Update state
        setFilteredSubcourses(filtered || []);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Form.Item label="Enabled" name="enabled" valuePropName="checked" initialValue={true}>
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                </Form.Item>
                <Form.Item label="Removed" name="removed" valuePropName="checked" initialValue={false}>
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                </Form.Item>
            </div>
            <Form.Item
                label="Mode Info"
                name="mode_info"
                rules={[{ required: true, message: 'Please select a mode info' }]}
            >
                <Select
                    placeholder="Select mode"
                    loading={modesLoading}
                    options={toOptions(modes)}
                    onChange={handleModeChange}
                />
            </Form.Item>

            <Form.Item
                label="University"
                name="university"
                rules={[{ required: true, message: 'Please select a university' }]}
            >
                <Select
                    placeholder="Select university"
                    loading={universitiesLoading}
                    options={toOptions(filteredUniversities)}
                    onChange={handleUniversityChange}
                />
            </Form.Item>

            <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: 'Please select a course' }]}
            >
                <Select
                    placeholder="Select course"
                    loading={coursesLoading}
                    options={toOptions(filteredCourses)}
                    onChange={handleCourseChange}
                />
            </Form.Item>
            <Form.Item label="electives" name="electives">
                <Select
                    placeholder="Select electives"
                    loading={subcoursesLoading}
                    options={toOptions(filteredSubcourses)}
                />
            </Form.Item>
            <Form.Item label="Fee" name="fee">
                <Input placeholder="Enter fee amount" />
            </Form.Item>
            <Form.Item label="Registration Fee" name="reg_fee">
                <Input placeholder="Enter registration fee" />
            </Form.Item>
            <Form.Item label="Examination Fee" name="examinationFee">
                <Input placeholder="Enter examination fee" />
            </Form.Item>
            <Form.Item label="Advantages" name="advantages">
                <Input placeholder="Enter advantages" />
            </Form.Item>
            <Form.Item label="Eligibility" name="eligibility">
                <Input placeholder="Enter eligibility criteria" />
            </Form.Item>
            <Form.Item label="Website URL" name="website_url">
                <Input placeholder="Enter website URL" />
            </Form.Item>
            <Form.Item label="UTM Link" name="utm_link">
                <Input placeholder="Enter UTM link" />
            </Form.Item>
            <Form.Item label="EBD" name="ebd">
                <Input placeholder="Enter Early Bird Discount details" />
            </Form.Item>
        </>
    );
}
