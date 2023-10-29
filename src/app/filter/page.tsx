'use client';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';

import ButtonFill from '@/components/buttons/ButtonFill';
import { outfit } from '@/components/FontFamily';
const Options = [
  { value: 'Pregnancy Identification', label: 'Pregnancy Identification' },
  {
    value: 'Vaginal Examination and plotting on partograph',
    label: 'Vaginal Examination and plotting on partograph',
  },
  {
    value: 'Lorem ipsum dolor vfdgfd differesdb ksadvcnjksn ...',
    label: 'Lorem ipsum dolor vfdgfd differesdb ksadvcnjksn ...',
  },
];
const FilterCourse = () => {
  return (
    <div
      className={`w-[375px] p-5 ${outfit.className} text-[20px] font-semibold leading-7 text-[#092724]`}
    >
      {/* heading */}
      <div className='flex justify-between pb-6'>
        <p>Filter</p>
        <RxCross2 size='20px' />
      </div>
      {/*  Competencies*/}
      <div className='mb-5 mt-3 w-[335px]'>
        <p className='pb-3 text-[16px] font-medium leading-6'>Competencies</p>
        <Select
          isMulti
          name='colors'
          options={Options}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
      <div className='mb-5 mt-3 w-[335px]'>
        <p className='pb-3 text-[16px] font-medium leading-6'>
          Third Party Course Providers
        </p>
        <Select
          isMulti
          name='colors'
          options={Options}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
      <div className='mb-5 mt-3 w-[335px]'>
        <p className='pb-3 text-[16px] font-medium leading-6'>Language</p>
        <Select
          isMulti
          name='colors'
          options={Options}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
      <div className='mb-5 mt-3 w-[335px]'>
        <p className='pb-3 text-[16px] font-medium leading-6'>Sort by</p>
        <Select
          isMulti
          name='colors'
          options={Options}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
      <div className='mb-5 mt-3 w-[335px]'>
        <p className='pb-3 text-[16px] font-medium leading-6'>Duration</p>
        <Select
          isMulti
          name='colors'
          options={Options}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>

      <div>
        <ButtonFill
          onClick={() => null}
          classes='w-[335px] bg-[#385B8B] text-[#fff] py-1'
        >
          Apply Filters
        </ButtonFill>
      </div>
    </div>
  );
};
export default FilterCourse;
