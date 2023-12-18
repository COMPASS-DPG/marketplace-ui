import SingleCompetency from '@/components/course-description/SingleCompetency';

import { CompetencyType } from '@/redux/marketplace/marketplaceReducer';

const Competencies = ({ competency }: { competency: CompetencyType[] }) => {
  return (
    <div className='py-4 '>
      {competency?.map((item) => {
        return (
          <SingleCompetency
            key={item.id}
            competency={{ name: item.name, levels: item.levels }}
          />
        );
      })}
    </div>
  );
};
export default Competencies;
