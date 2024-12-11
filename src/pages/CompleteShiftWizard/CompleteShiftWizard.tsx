import {
  useParams,
  useLocation,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import { notify } from '../../helpers/toast-helpers';
import { IClub } from '../../interfaces/IClub.interface';
import { IShift } from '../../interfaces/IShift.interface';
import { FC, useCallback, useEffect, useState } from 'react';
import ShiftIncome from '../../components/shift-wizard/ShiftIncome';
import ShiftMilage from '../../components/shift-wizard/ShiftMilage';
import { updateShift, getShift } from '../../services/shiftServices';
import ShiftDetails from '../../components/shift-wizard/ShiftDetails';
import ShiftSummary from '../../components/shift-wizard/ShiftSummary';
import ShiftExpenses from '../../components/shift-wizard/ShiftExpenses';
import ShiftFileUpload from '../../components/shift-wizard/ShiftFileUpload';
import { addImage } from '../../services/imageService';

const Elements = [
  ShiftDetails,
  ShiftIncome,
  ShiftExpenses,
  ShiftFileUpload,
  ShiftMilage,
  ShiftSummary,
];

export type ShiftData = {
  shiftInfo: IShift;
  image: File | null;
};

const CompleteShiftWizard: FC = (): JSX.Element => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(
    location.state?.goToPage || 0
  );
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const getShiftData = useCallback(async (): Promise<void> => {
    const { shiftId } = params;
    if (shiftId) {
      const { data } = await getShift(shiftId);
      setShiftData({ shiftInfo: data, image: null });
    }
  }, [params]);

  useEffect(() => {
    getShiftData();
    if (!location.state?.goToPage) setCurrentStepIndex(0);
  }, [getShiftData, location]);

  const clubsLoaderData = useLoaderData() as IClub[];
  useEffect(() => {
    if (clubsLoaderData) {
      if (clubsLoaderData instanceof AxiosError)
        notify(
          'Error retrieving club data. Try request again.',
          'error',
          'shift-loader-error'
        );
      else {
        setClubs(clubsLoaderData);
      }
    }
  }, [clubsLoaderData]);

  const goNext = (shiftDataFromStep: ShiftData | null): void => {
    if (shiftDataFromStep) {
      setShiftData({ ...shiftDataFromStep });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goBack = (
    shiftDataFromStep: ShiftData | null,
    jumpToStep?: number
  ): void => {
    if (shiftDataFromStep) {
      setShiftData({ ...shiftDataFromStep });
      jumpToStep === undefined
        ? setCurrentStepIndex(currentStepIndex - 1)
        : setCurrentStepIndex(jumpToStep);
    }
  };

  const handleFinish = async (shift?: IShift): Promise<void> => {
    try {
      setIsTransmitting(true);
      const shiftToUpdate = shift ? shift : shiftData?.shiftInfo;
      if (!shiftToUpdate) return;
      await updateShift({ ...shiftToUpdate, shiftComplete: true });

      if (shiftData?.image) {
        const formData = new FormData();
        formData.append('image', shiftData.image);
        formData.append('shiftId', shiftToUpdate._id);
        await addImage(formData);
      }
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
  };

  const mappedElements = Elements.map((Element, index) => {
    return (
      <Element
        key={`${index}-${shiftData?.shiftInfo._id}`}
        goNext={goNext}
        goBack={goBack}
        onFinish={handleFinish}
        isTransmitting={isTransmitting}
        shiftData={shiftData}
        clubs={clubs}
      />
    );
  });
  return <>{shiftData && mappedElements[currentStepIndex]}</>;
};

export default CompleteShiftWizard;
