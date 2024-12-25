import { useCrudContext } from '@/context/crud';
import { selectCurrentItem } from '@/redux/course/selector';
import { Button } from 'antd';
import React from 'react';
import { GrCertificate } from "react-icons/gr";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useSelector } from 'react-redux';
export default function Index() {
    const { state } = useCrudContext();
    const { isReadBoxOpen } = state;
    const { result: currentResult } = useSelector(selectCurrentItem);
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();  // This will use the filename from the URL
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const show = isReadBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };

    return (
        <div style={show}>
            <div>

                <div className='mt-6'>
                    <ul className='text-justify'>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Mode</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.mode_info}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>University</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.university}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Advantages</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.advantages}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Website URL</span>
                            <span className='flex-1 text-[#1F77B4] text-left'>
                                <a href={currentResult?.website_url} target="_blank" rel="noopener noreferrer">
                                    {currentResult?.website_url}
                                </a>
                            </span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Utm Link</span>
                            <span className='flex-1 text-[#1F77B4] text-left'>
                                <a href={currentResult?.utm_link} target="_blank" rel="noopener noreferrer">
                                    {currentResult?.utm_link}
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>

                <div>
                    <ul className='text-justify'>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Course</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.course}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Electives</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.electives}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Eligibility</span>
                            <span className='flex-1 text-gray-500 text-left'>{currentResult?.eligibility}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='col-span-2'>
                <div>
                    <ul className='text-justify'>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Registration Fee</span>
                            <span className='flex-1 text-red-500 text-left'>₹ {currentResult?.reg_fee}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Course Fee</span>
                            <span className='flex-1 text-red-500 text-left'>₹ {currentResult?.fee}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Examination Fee</span>
                            <span className='flex-1 text-red-500 text-left'>₹ {currentResult?.examinationFee}</span>
                        </li>
                        <li className='flex justify-between mb-1 border-b leading-6 overflow-hidden text-ellipsis whitespace-nowrap'>
                            <span className='flex-1 text-gray-700'>Discounted Total Fees</span>
                            <span className='flex-1 text-red-500 text-left'>₹ {currentResult?.ebd}</span>
                        </li>
                        {currentResult?.sampleMarksheets && currentResult?.sampleMarksheets.length > 0 && (
                            <li className='flex items-center justify-center gap-2 mt-3'>
                                {currentResult?.sampleMarksheets.map((sheet, index) => (
                                    <Button className='rounded-md border-[#FFE98F] bg-[#FFE98F] text-[#FF6600] hover:text-[#FF6600] flex items-center gap-0.5 w-44'
                                        key={index}
                                        onClick={() => handleDownload(sheet.downloadURL)}
                                    >
                                        <span className='text-base'><GrCertificate /></span> <span>Sample Marksheet</span>
                                    </Button>
                                ))}
                            </li>
                        )}
                        {currentResult?.sampleDegrees && currentResult?.sampleDegrees.length > 0 && (
                            <li className='flex flex-col gap-2 mt-3'>
                                {currentResult?.sampleDegrees.map((sheet, index) => (
                                    <Button className='rounded-md border-[#8fff95] bg-[#8fff95] text-green-800 hover:text-green-800 flex items-center gap-0.5 w-44'
                                        key={index}
                                        onClick={() => handleDownload(sheet.downloadURL)}
                                    >
                                        <span className='text-base'><HiOutlineClipboardDocumentList /></span> <span>Sample Degree</span>
                                    </Button>
                                ))}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
