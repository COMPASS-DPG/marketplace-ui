import ButtonFill from '@/components/buttons/ButtonFill';

const ButtonPopup = ({
  setShowPopUp,
  purchaseCourse,
}: {
  setShowPopUp: (value: boolean) => void;
  purchaseCourse: () => void;
}) => {
  return (
    <div className='fixed inset-0 z-50 flex'>
      <div className='backdrop-blur-{none} absolute  inset-0  bg-black bg-opacity-50'></div>
      {/* pop up height and width and position */}
      <div className='modal-container z-50 mx-auto mt-40 h-[290px] w-[331px] overflow-y-auto rounded-lg bg-white shadow-lg '>
        {/* popUp inside thing */}
        <div className='modal-content flex flex-col justify-between pb-2 pt-8 text-left'>
          <p className=' mb-3 text-center  text-[22px] font-semibold leading-7 text-[#272728]'>
            Confirm Your Purchase
          </p>

          <p className='px-2 py-6 text-center text-[16px] font-normal leading-7 text-[#65758C] '>
            Thank you for choosing us for your learning journey! Cr.145 will be
            debited from your wallet for this purchase.
          </p>
          <div className='flex justify-center gap-5 pt-4'>
            <ButtonFill
              onClick={() => setShowPopUp(false)}
              classes='w-[140px] h-[36px] bg-[#EEF5FF] text-[#385B8B]'
            >
              Close
            </ButtonFill>
            <ButtonFill
              onClick={() => purchaseCourse()}
              classes='w-[140px] h-[36px] bg-[#385B8B] text-[#fff]'
            >
              Confirm
            </ButtonFill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPopup;
