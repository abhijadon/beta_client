import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Drawer } from 'antd';
import {
    selectSpecificEntityData,
    selectSpecificEntityLoading,
} from '@/redux/options/selectors';
import { fetchOptions } from '@/redux/options/actions';
import { BiBook, BiReset } from 'react-icons/bi';
import CourseBrochure from '../CourseBrochure';

const FilterComponent = ({ onFilterChange, onResetFilters, config }) => {
    const dispatch = useDispatch();

    // Drawer state for brochure
    const [isBrochureDrawerOpen, setIsBrochureDrawerOpen] = useState(false);

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

    return (
        <>
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="space-x-2">
                    <Select
                        className="w-48"
                        placeholder="Select Mode"
                        options={toOptions(modes)}
                        onChange={(value) => onFilterChange('mode_info', value)}
                        loading={modesLoading}
                        allowClear
                    />
                    <Select
                        className="w-48"
                        placeholder="Select University"
                        options={toOptions(universities)}
                        onChange={(value) => onFilterChange('university', value)}
                        loading={universitiesLoading}
                        allowClear
                    />
                    <Select
                        className="w-48"
                        placeholder="Select Course"
                        options={toOptions(courses)}
                        onChange={(value) => onFilterChange('course', value)}
                        loading={coursesLoading}
                        allowClear
                    />
                    <Select
                        className="w-48"
                        placeholder="Select Subcourse"
                        options={toOptions(subcourses)}
                        onChange={(value) => onFilterChange('subcourse', value)}
                        loading={subcoursesLoading}
                        allowClear
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        icon={<BiBook />}
                        onClick={() => setIsBrochureDrawerOpen(true)}
                    >
                        Open Brochure
                    </Button>
                    <Button
                        icon={<BiReset />}
                        onClick={onResetFilters}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* Drawer for Brochure */}
            <Drawer
                className={`fixed top-8 left-5 bottom-8 z-50 bg-white w-[800px] shadow-lg h-auto rounded-2xl transform transition-transform duration-500 ease-in-out ${isBrochureDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                title="Course Brochure"
                placement="left"
                onClose={() => setIsBrochureDrawerOpen(false)}
                open={isBrochureDrawerOpen}
                bodyStyle={{
                    maxHeight: '100vh', // Adjust drawer height for smaller screens
                    overflowY: 'auto',
                    padding: window.innerWidth > 768 ? '20px' : '10px',
                }}
            >
                {/* Include the CourseBrochure component or any content */}
                <CourseBrochure />
            </Drawer>
        </>
    );
};

export default FilterComponent;
