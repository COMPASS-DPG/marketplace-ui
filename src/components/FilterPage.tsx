'use client';
import { RxCross2 } from 'react-icons/rx';

import ButtonFill from '@/components/buttons/ButtonFill';
import { outfit } from '@/components/FontFamily';
import MultipleButton from '@/components/Input/MultipleButton';
import MultiSelectTag from '@/components/Input/MultiSelectTag';

import MultiSelectCreatable from './Input/MultiSelectCreatable';
import {
  COMPETENCY_OPTIONS,
  LANGUAGE_OPTIONS,
  PROVIDER_OPTIONS,
} from './options';
import { filterObjType } from '../app/search/page';

const FilterCourse = ({
  filterObj,
  setFilterObj,
  setFilterOpen,
  SearchFilterOptions,
  handleFilterCourse,
}: {
  filterObj: filterObjType;
  setFilterObj: (value: filterObjType) => void;
  setFilterOpen: (value: boolean) => void;
  SearchFilterOptions: () => void;
  handleFilterCourse: () => void;
}) => {
  const handleChange = (name: string, value: string[] | string) => {
    setFilterObj({ ...filterObj, [name]: value });
  };

  const handleApplyFilter = () => {
    SearchFilterOptions();
    setFilterOpen(false);
    handleFilterCourse();
  };

  return (
    <div
      className={`w-[375px] p-5 ${outfit.className} text-[20px]  leading-7 text-[#092724]`}
    >
      {/* heading */}
      <div className='flex justify-between pb-6 font-semibold'>
        <p>Filter</p>
        <RxCross2
          size='20px'
          onClick={() => setFilterOpen(false)}
          className='cursor-pointer'
        />
      </div>
      {/*  Competencies*/}
      <div className='mb-5 mt-3 w-[335px]'>
        <label className='pb-3 text-[16px] font-medium leading-6'>
          Competencies
        </label>
        <MultiSelectTag
          onChange={(value) => handleChange('competencies', value)}
          value={filterObj.competencies ?? []}
          options={COMPETENCY_OPTIONS}
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
          value={filterObj.courseProviders ?? []}
          options={PROVIDER_OPTIONS}
          placeholder='--Select--'
        />
      </div>
      {/*language*/}

      <div className='mb-5 mt-3 w-[335px]'>
        <label className='pb-3 text-[16px] font-medium leading-6'>
          Language
        </label>
        <MultiSelectCreatable
          onChange={(value) => handleChange('language', value)}
          value={filterObj.language ?? []}
          options={LANGUAGE_OPTIONS}
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

      <div>
        <ButtonFill
          onClick={handleApplyFilter}
          classes='w-[335px] bg-[#385B8B] h-[40px] text-[#fff] py-1'
        >
          Apply Filters
        </ButtonFill>
      </div>
    </div>
  );
};
export default FilterCourse;
