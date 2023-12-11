import SingleCompetency from '@/components/course-description/SingleCompetency';

type CompetencyType = {
  [key: string]: string[];
};

const Competencies = ({ competency }: { competency: CompetencyType }) => {
  return (
    <div className='py-4 '>
      {Object.keys(competency ?? {})?.map((key, index) => {
        return (
          <SingleCompetency
            key={index}
            competency={{ key: index, name: key, levels: competency[key] }}
          />
        );
      })}
    </div>
  );
};
export default Competencies;
