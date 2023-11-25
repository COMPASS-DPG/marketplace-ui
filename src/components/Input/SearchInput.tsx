'use client';

import React from 'react';
import { RxCross1 } from 'react-icons/rx';

import { Filter } from '~/svg';

type PropsType = {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  required?: boolean;
  handleClick?: () => void;
  selectedOptionCount?: number;
};

const SearchInput = ({
  value,
  placeholder,
  required = false,
  onChange,
  handleClick = () => null,
  selectedOptionCount,
}: PropsType) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className='flex w-[331px]  items-center justify-between rounded-full border px-[10px] py-[5px] shadow-md focus-within:border-blue-400 focus-within:ring-blue-400 '>
      <div>
        <svg
          className='h-4 w-4 text-gray-500 dark:text-gray-400'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
      </div>
      <div>
        <input
          type='text'
          className={`block  rounded-3xl border-0
        bg-white py-2.5 pl-2 pr-[70px] text-sm text-gray-900 placeholder:font-medium placeholder:text-[#909090]
        focus:ring-0 `}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='relative pr-3'>
        {value != '' ? (
          <RxCross1 />
        ) : (
          <div onClick={() => handleClick()} className='relative inline-block'>
            {selectedOptionCount != 0 && (
              <p className=' mb-[-12px]  rounded-full bg-[#FF5A5A] text-center text-[#fff]'>
                {selectedOptionCount}
              </p>
            )}
            <Filter width='24px' />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
