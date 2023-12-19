import { useState } from 'react';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { outfit, poppins } from '@/components/FontFamily';

import { LevelsType } from '@/redux/marketplace/marketplaceReducer';

type propType = {
  name: string;
  levels: LevelsType[];
};

const SingleCompetency = ({ competency }: { competency: propType }) => {
  const [open, setOpen] = useState(false);
  const { name, levels } = competency;
  return (
    <div className={`${outfit.className} mb-3 text-[#272728]`}>
      <div className=' rounded-lg border p-2'>
        <div className='flex justify-between'>
          <p className='font-md text-[16px] leading-[18px]'>{name}</p>
          <div
            onClick={() => setOpen(!open)}
            className='cursor-pointer rounded-sm hover:bg-slate-200'
          >
            {open ? (
              <MdKeyboardArrowUp size='20px' />
            ) : (
              <MdKeyboardArrowDown size='20px' />
            )}
          </div>
        </div>
        {open && (
          <div>
            <div className='flex items-center gap-1 py-3'>
              <BiSolidBarChartAlt2 size='16px' />

              <p className={`${poppins.className} text-[14px] font-semibold`}>
                Level
              </p>
            </div>
            <ul className='pl-2'>
              {levels?.map((level) => {
                return (
                  <li key={level?.id} className='flex items-start'>
                    &bull; {level?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleCompetency;
