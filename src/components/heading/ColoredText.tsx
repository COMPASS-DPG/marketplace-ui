const ColoredText = ({ text, classes }: { text: string; classes: string }) => {
  return <div className={`rounded-md px-2 text-[12px] ${classes}`}>{text}</div>;
};
export default ColoredText;
