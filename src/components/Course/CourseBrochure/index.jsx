import React, { useEffect, useState } from 'react';
import { Select, Spin, Button, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';
import { selectListItems } from '@/redux/course/selector';
import { MdOutlineFileDownload } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';

const FilterComponent = () => {
    const dispatch = useDispatch();

    // Fetch data for list items
    const { result: listResult = {}, isLoading: listIsLoading } = useSelector(selectListItems);
    const { items: brochures = [] } = listResult;

    // States for filtered options and selections
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filteredSubcourses, setFilteredSubcourses] = useState([]);
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

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

    // Fetch initial data
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(fetchOptions('modes', { signal }));
        dispatch(fetchOptions('university', { signal }));
        dispatch(fetchOptions('course', { signal }));
        dispatch(fetchOptions('subcourse', { signal }));

        return () => controller.abort();
    }, [dispatch]);

    // Transform data into Select options
    const toOptions = (data) =>
        data?.map((item) => ({ label: item.name, value: item._id })) || [];

    const handleModeChange = (selectedMode) => {
        setSelectedMode(selectedMode);
        const filtered = universities?.filter((university) =>
            university.modes?.includes(selectedMode)
        );
        setFilteredUniversities(filtered || []);
        resetCourseAndSubcourse();
    };

    const handleUniversityChange = (selectedUniversity) => {
        setSelectedUniversity(selectedUniversity);
        const filtered = courses?.filter((course) =>
            course.university?.includes(selectedUniversity)
        );
        setFilteredCourses(filtered || []);
        setFilteredSubcourses([]);
        setSelectedCourse(null);
    };

    const handleCourseChange = (selectedCourse) => {
        setSelectedCourse(selectedCourse);
        const filtered = subcourses?.filter((subcourse) =>
            subcourse.course?.includes(selectedCourse)
        );
        setFilteredSubcourses(filtered || []);
    };

    const resetCourseAndSubcourse = () => {
        setFilteredCourses([]);
        setFilteredSubcourses([]);
        setSelectedUniversity(null);
        setSelectedCourse(null);
    };

    const handleReset = () => {
        setSelectedMode(null);
        resetCourseAndSubcourse();
        setFilteredUniversities([]);
    };

    const handleDownload = (url) => {
        window.open(url, '_blank');
    };

    const handleDelete = (url, university, course, electives) => {
        console.log('Deleted:', { url, university, course, electives });
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between mb-8">
                <div className="space-x-2">
                    {/* Mode Select */}
                    <Select
                        className="w-40"
                        placeholder="Select a Mode"
                        options={toOptions(modes)}
                        onChange={handleModeChange}
                        loading={modesLoading}
                        value={selectedMode}
                        allowClear
                    />

                    {/* University Select */}
                    <Select
                        className="w-40"
                        placeholder="Select a University"
                        options={toOptions(filteredUniversities)}
                        onChange={handleUniversityChange}
                        loading={universitiesLoading}
                        value={selectedUniversity}
                        allowClear
                        disabled={!selectedMode}
                    />

                    {/* Course Select */}
                    <Select
                        className="w-40"
                        placeholder="Select a Course"
                        options={toOptions(filteredCourses)}
                        onChange={handleCourseChange}
                        loading={coursesLoading}
                        value={selectedCourse}
                        allowClear
                        disabled={!selectedUniversity}
                    />

                    {/* Subcourse Select */}
                    <Select
                        className="w-40"
                        placeholder="Select a Subcourse"
                        options={toOptions(filteredSubcourses)}
                        onChange={(value) => setFilteredSubcourses(value)}
                        loading={subcoursesLoading}
                        allowClear
                        disabled={!selectedCourse}
                    />
                </div>
                <Button onClick={handleReset} type="default">
                    Reset
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {listIsLoading ? (
                    <Spin size="large" />
                ) : brochures.length > 0 ? (
                    brochures.map((brochure, index) => (
                        <div key={index} className="text-center">
                            <iframe
                                src={brochure.downloadURL}
                                width="250"
                                height="180"
                                title={`Brochure ${index}`}
                                style={{ border: 'none' }}
                            />
                            <div className="mt-2 flex gap-4 items-center justify-center">
                                <Popconfirm
                                    title="Are you sure you want to download this PDF?"
                                    onConfirm={() => handleDownload(brochure.downloadURL)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        className="bg-transparent text-blue-600 border-none text-xl hover:text-blue-700"
                                        icon={<MdOutlineFileDownload />}
                                    />
                                </Popconfirm>
                                <Popconfirm
                                    title="Are you sure you want to delete this file?"
                                    onConfirm={() =>
                                        handleDelete(
                                            brochure.downloadURL,
                                            brochure.university.namd,
                                            brochure.course.name,
                                            brochure.electives.name
                                        )
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        className="bg-transparent text-red-600 border-none text-xl hover:text-red-700"
                                        icon={<DeleteOutlined />}
                                    />
                                </Popconfirm>
                                <div className="flex flex-col">
                                    <p className="font-semibold">{brochure.university?.name || 'N/A'}</p>
                                    <p className="text-sm">{brochure.course?.name || 'N/A'}</p>
                                    <p className="text-sm">{brochure.electives?.name || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No brochures available</p>
                )}
            </div>
        </div>
    );
};

export default FilterComponent;
