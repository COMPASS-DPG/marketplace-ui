'use client';
import { RxCross2 } from 'react-icons/rx';

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

import MultipleButton from '@/components/Input/MultipleButton';
import MultiSelectTag from '@/components/Input/MultiSelectTag';

import { filterObjType } from '../app/search/page';
const FilterCourse = ({
  filterObj,
  setFilterObj,
  setFilterOpen,
  SearchFilterOptions,
}: {
  filterObj: filterObjType;
  setFilterObj: (value: filterObjType) => void;
  setFilterOpen: (value: boolean) => void;
  SearchFilterOptions: () => void;
}) => {
  const handleChange = (name: string, value: string[] | string) => {
    setFilterObj({ ...filterObj, [name]: value });
  };

  const handleFilterButton = () => {
    setFilterOpen(false);
    SearchFilterOptions();
  };

  return (
    <div
      className={`w-[375px] p-5 ${outfit.className} text-[20px]  leading-7 text-[#092724]`}
    >
      {/* heading */}
      <div className='flex justify-between pb-6 font-semibold'>
        <p>Filter</p>
        <RxCross2 size='20px' onClick={() => setFilterOpen(false)} />
      </div>
      {/*  Competencies*/}
      <div className='mb-5 mt-3 w-[335px]'>
        <label className='pb-3 text-[16px] font-medium leading-6'>
          Competencies
        </label>
        <MultiSelectTag
          onChange={(value) => handleChange('competencies', value)}
          value={filterObj.competencies}
          options={Options}
          placeholder='--Select--'
        />
      </div>

      {/*  third party provider*/}

      <div className='mb-5 mt-3 w-[335px]'>
        <label className='pb-3 text-[16px] font-medium leading-6'>
          Third Party Course Providers
        </label>
        <MultiSelectTag
          onChange={(value) => handleChange('courseProviders', value)}
          value={filterObj.courseProviders}
          options={Options}
          placeholder='--Select--'
        />
      </div>
      {/*language*/}

      <div className='mb-5 mt-3 w-[335px]'>
        <label className='pb-3 text-[16px] font-medium leading-6'>
          Language
        </label>
        <MultiSelectTag
          onChange={(value) => handleChange('language', value)}
          value={filterObj.language}
          options={Options}
          placeholder='--Select--'
        />
      </div>
      {/*sort by*/}
      <div className='mb-5 mt-3 w-[335px]'>
        <label className='text-[16px] font-medium leading-6'>Sort by</label>

        <MultipleButton
          options={['Popular', 'High Price', 'Low Price', 'Rating', 'Impact']}
          onClick={(val: string) => handleChange('sortBy', val)}
          value={filterObj.sortBy}
        />
      </div>

      {/*duration*/}
      <div className='mb-5 mt-3 w-[335px]'>
        <label className='text-[16px] font-medium leading-6'>Duration</label>
        <MultipleButton
          options={['<1 Hrs', '1-2 Hrs', '>2Hrs']}
          onClick={(val: string) => handleChange('duration', val)}
          value={filterObj.duration}
        />
      </div>

      <div>
        <ButtonFill
          onClick={handleFilterButton}
          classes='w-[335px] bg-[#385B8B] h-[40px] text-[#fff] py-1'
        >
          Apply Filters
        </ButtonFill>
      </div>
    </div>
  );
};
export default FilterCourse;
