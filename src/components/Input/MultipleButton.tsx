const MultipleButton = ({
  options,
  onClick,
  value,
}: {
  options: string[];
  onClick: (val: string) => void;
  value: string;
}) => {
  return (
    <div className='mt-2'>
      {options.map((c, index) => {
        return (
          <button
            key={index}
            onClick={() => onClick(c)}
            type='button'
            value={value}
            className={`mr-4 mt-2 rounded-full border px-4 py-2 text-[14px] leading-6 text-[#65758C] ${
              c === value ? 'border-[#385B8B]' : 'border-[#ccc]'
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
};
export default MultipleButton;
