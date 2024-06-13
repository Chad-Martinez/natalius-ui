import { FC, useEffect, useState } from 'react';
import pageStyles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import useInput from '../../hooks/useInput';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ISprint, ISprintBase } from '../../interfaces/ISprint.interface';
import { addSprint, updateSprint } from '../../services/sprintServices';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

const SprintGoalForm: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const sprint = useLoaderData() as ISprint;

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    sprint
      ? dayjs(sprint.start).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')
  );

  const {
    value: goal,
    isValid: goalIsValid,
    hasError: goalHasError,
    valueChangeHandler: goalChangeHandler,
    inputBlurHandler: goalBlurHandler,
  } = useInput((v) => v !== '', sprint ? sprint.goal.toString() : '');

  useEffect(() => {
    setIsFormValid(startIsValid && goalIsValid);
  }, [startIsValid, goalIsValid]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      const payload: ISprintBase = {
        start,
        goal: +goal,
      };
      if (sprint) {
        const updatedSprint: ISprint = {
          ...payload,
          _id: sprint._id,
        };
        await updateSprint(updatedSprint);
      } else {
        await addSprint(payload);
      }
      notify(
        sprint ? 'Sprint updated' : 'Sprint added',
        'success',
        'add-sprint-success'
      );
      navigate(-1);
    } catch (error) {
      console.error('Sprint Goal Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-sprint-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={formStyles.form}>
          <h3 className={formStyles.title}>Sprint Goal Form</h3>
          <span>A sprint goal is a two week earnings goal</span>
          <FormGroup>
            <Label name='start' text='Goal Start Date' />
            <Input
              type='date'
              value={start}
              hasError={startHasError}
              errorMessage='Goal start date required'
              handleChange={startChangeHandler}
              handleBlur={startBlurHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label name='end' text='Goal End Date' />
            <Input
              type='date'
              value={dayjs(start).add(2, 'week').format('YYYY-MM-DD')}
              disabled={true}
            />
          </FormGroup>
          <Input
            id='goal'
            name='goal'
            value={Math.round(+goal).toString()}
            hasError={goalHasError}
            placeholder='Enter a two week earnings goal'
            min={1}
            step={1}
            type='number'
            errorMessage='Income goal must be greater than $1'
            handleChange={goalChangeHandler}
            handleBlur={goalBlurHandler}
          />
        </div>
      </div>
      <BottomNav>
        <Button text='Cancel' onClick={handleCancel} />
        <Button
          text='Submit'
          solid={true}
          disabled={!isFormValid}
          loading={isTransmitting}
          onClick={handleSubmit}
        />
      </BottomNav>
    </>
  );
};

export default SprintGoalForm;
