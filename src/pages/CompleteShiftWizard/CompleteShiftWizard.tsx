import { FC, useEffect, useState } from 'react';
import ShiftDetails from './ShiftDetails';
import ShiftIncome from './ShiftIncome';
import ShiftExpenses from './ShiftExpenses';
import ShiftMilage from './ShiftMilage';
import ShiftSummary from './ShiftSummary';
import { IShift } from '../../interfaces/IShift.interface';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SelectOptions } from '../../types/SelectOptions';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import { updateShift } from '../../services/shiftServices';

type ShiftLoaderData = {
  clubNames: SelectOptions[];
  shift: IShift;
};

const CompleteShiftWizard: FC = (): JSX.Element => {
  const [shiftData, setShiftData] = useState<IShift | null>(null);
  const [clubNames, setClubNames] = useState<SelectOptions[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const shiftLoaderData = useLoaderData() as ShiftLoaderData;

  const Elements = [
    ShiftDetails,
    ShiftIncome,
    ShiftExpenses,
    ShiftMilage,
    ShiftSummary,
  ];

  useEffect(() => {
    if (shiftLoaderData) {
      if (shiftLoaderData instanceof AxiosError)
        notify(
          'Error retrieving shift data. Try request again.',
          'error',
          'shift-loader-error'
        );
      else {
        setShiftData(shiftLoaderData.shift);
        setClubNames(shiftLoaderData.clubNames);
      }
    }
  }, [shiftLoaderData]);

  const goNext = (shiftDataFromStep: IShift | null) => {
    if (shiftDataFromStep) {
      setShiftData({ ...shiftData, ...shiftDataFromStep });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goBack = (shiftDataFromStep: IShift | null, jumpToStep?: number) => {
    if (shiftDataFromStep) {
      setShiftData({ ...shiftData, ...shiftDataFromStep });
      jumpToStep === undefined
        ? setCurrentStepIndex(currentStepIndex - 1)
        : setCurrentStepIndex(jumpToStep);
    }
  };

  const handleFinish = async (): Promise<void> => {
    if (shiftData) {
      try {
        setIsTransmitting(true);
        await updateShift({ ...shiftData, shiftComplete: true });
        notify('Shift Completed!', 'success', 'complete-shift-success');
        navigate(-1);
      } catch (error) {
        notify(
          'Error completing shift. Try again',
          'error',
          'complete-shift-error'
        );
      } finally {
        setIsTransmitting(false);
      }
    }
  };

  const mappedElements = Elements.map((Element, index) => {
    return (
      <Element
        key={index}
        goNext={goNext}
        goBack={goBack}
        onFinish={handleFinish}
        isTransmitting={isTransmitting}
        shiftData={shiftData}
        clubOptions={clubNames}
      />
    );
  });
  return <>{shiftData && mappedElements[currentStepIndex]}</>;
};

export default CompleteShiftWizard;
