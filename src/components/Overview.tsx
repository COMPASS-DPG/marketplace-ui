const Overview = ({ about }: { about: string }) => {
  return (
    <div className=''>
      <p className='pt-5 text-[16px] font-semibold leading-6 text-[#272728]'>
        About Course
      </p>

      <p className='py-3 text-[15px] leading-6 text-[##65758C]'>{about}</p>
    </div>
  );
};
export default Overview;
