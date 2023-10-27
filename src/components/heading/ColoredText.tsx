const ColoredText = ({
  textColor,
  backGroundColor,
  text,
}: {
  textColor: string;
  backGroundColor: string;
  text: string;
}) => {
  return (
    <span
      className={`mx-1 rounded-md bg-['${backGroundColor}'] px-2 text-[12px] font-normal text-['${textColor}']`}
    >
      {text}
    </span>
  );
};
export default ColoredText;
