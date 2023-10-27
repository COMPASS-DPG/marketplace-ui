import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';

import { MarketPlaceIcon } from '~/svg';

const Footer = () => {
  return (
    <div className='bottom-0 left-0 right-0 mt-4 border-t-2 border-solid border-gray-100'>
      <div className='mx-[22px] my-[10px] flex justify-between '>
        <div className='mx-[21px] text-center text-[#385B8B]'>
          <div className='flex justify-center'>
            <MarketPlaceIcon width='24px' />
          </div>
          <div className='text-center text-sm font-bold '>Marketplace</div>
        </div>
        <div className='mx-[21px] text-center text-[#65758C]'>
          <div className='flex justify-center'>
            <AiFillSetting size={24} />
          </div>
          <div className='text-center text-sm font-normal'>Competency</div>
        </div>
        <div className='mx-[21px] text-center  text-[#65758C]'>
          <div className='flex justify-center '>
            <HiOutlineUserCircle size={24} />
          </div>
          <div className='text-center text-sm font-normal'>Account</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
