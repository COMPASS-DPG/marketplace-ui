'use client';

import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

import { Filter } from '~/svg';

type PropsType = {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  handleClick: () => void;
  selectedOptionCount?: number;
  handleCrossIcon: () => void;
  handleFilterIcon: () => void;
};

const SearchInput = ({
  value,
  placeholder,
  onChange,
  handleClick = () => null,
  selectedOptionCount,
  handleCrossIcon,
  handleFilterIcon,
}: PropsType) => {
  const [showCross, setShowCross] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowCross(false);
      handleClick();
    }
  };

  return (
    <div className='m-[16px] flex max-w-[450px] items-center justify-between  rounded-full border px-[10px] py-[5px] shadow-md focus-within:border-blue-400 focus-within:ring-blue-400 '>
      <div className='flex items-center justify-center'>
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <div>
          <input
            type='text'
            className={`block  rounded-3xl border-0
        bg-white py-2.5 pr-[60px] text-sm text-gray-900 placeholder:font-medium placeholder:text-[#909090]
        focus:ring-0 `}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e?.target?.value), setShowCross(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className='relative pr-3 pt-2'>
        {value != '' && showCross ? (
          <div
            onClick={() => handleCrossIcon()}
            className='relative inline-block'
          >
            <RxCross1 />
          </div>
        ) : (
          <div
            onClick={() => handleFilterIcon()}
            className='relative inline-block cursor-pointer'
          >
            {selectedOptionCount != 0 && (
              <p className='absolute right-0 top-[-4px] z-10 mb-[-12px] rounded-full bg-[#FF5A5A] px-[6px] text-center text-[#fff]'>
                {selectedOptionCount}
              </p>
            )}
            <div>
              <Filter width='24px' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
