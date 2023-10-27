import CouseCard from '@/components/Course/CouseCard';

const RecommendedCourses = () => {
  return (
    <div className='flex w-full flex-col items-center gap-5'>
      {new Array(5).fill('').map((ele, index) => {
        return <CouseCard key={index} />;
      })}
    </div>
  );
};
export default RecommendedCourses;
