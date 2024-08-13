import { FC, useCallback, useEffect, useRef, useState } from 'react';
import widgetStyles from './Widget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import CardFooter from '../ui/Card/CardFooter';
import { ISprint } from '../../interfaces/ISprint.interface';
import {
  deleteSprint,
  markSprintComplete,
} from '../../services/sprintServices';
import SprintBar from '../charts/SprintBar/SprintBar';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import dayjs from 'dayjs';
import ConfettiExplosion from 'react-confetti-explosion';
import Modal from '../ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const SprintGoalWidget: FC<{ sprintData: ISprint | undefined }> = ({
  sprintData,
}): JSX.Element => {
  const [sprint, setSprint] = useState<ISprint | undefined>();
  const [sprintGoalMet, setSprintGoalMet] = useState<boolean>(false);
  const dialogRef = useRef<IHTMLDialogElement | null>(null);
  const deleteSprintRef = useRef<IHTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const handleDeleteSprint = async (): Promise<void> => {
    try {
      if (!sprint) return;
      await deleteSprint(sprint._id);
      setSprint(undefined);
    } catch (error) {
      console.error('Delete Sprint Error: ', error);
    } finally {
      deleteSprintRef.current?.closeModal();
    }
  };

  const toggleDeleteSprintModal = (): void => {
    deleteSprintRef.current?.openModal();
  };

  const handleCompleteSprint = useCallback(async () => {
    if (!sprintData) return;
    const { data } = await markSprintComplete(sprintData);
    if (data.goalMet) setSprintGoalMet(true);
    dialogRef.current?.openModal();
    setSprint(undefined);
  }, [sprintData]);

  useEffect(() => {
    if (sprintData) {
      setSprint(sprintData);
      const { end } = sprintData;
      if (dayjs().isAfter(end, 'day')) {
        handleCompleteSprint();
      }
    }
  }, [sprintData, handleCompleteSprint]);

  return (
    <>
      <Modal
        ref={dialogRef}
        title={sprintGoalMet ? 'Sprint Goal Successful' : 'Sprint Goal Failed'}
        subtitle='Do you want to set another sprint goal now?'
        onConfirm={() => navigate('/dashboard/sprint-form')}
      />
      <Modal
        ref={deleteSprintRef}
        title='Delete Sprint?'
        subtitle='This action cannot be undone'
        onConfirm={handleDeleteSprint}
      />
      <Card
        addedStyles={{
          maxWidth: '607.5px',
        }}
      >
        {sprintGoalMet && (
          <div style={{ alignSelf: 'center' }}>
            <ConfettiExplosion force={0.7} />
          </div>
        )}
        <CardHeader text={'Two Week Sprint Goal'}>
          <FontAwesomeIcon
            className={widgetStyles.faIcon}
            icon={faGripVertical}
          />
        </CardHeader>
        <CardContent>
          {sprint ? (
            <SprintBar
              progress={sprint.progress || 0}
              goal={sprint.goal}
              end={sprint.end || ''}
            />
          ) : (
            <CardContentVacant title='No Sprint Goal Set' />
          )}
        </CardContent>
        <CardFooter
          linkLeftText={sprint ? 'Delete Sprint' : ''}
          linkLeftHandleClick={toggleDeleteSprintModal}
          linkRight='/dashboard/sprint-form'
          linkRightText={sprint ? 'Review Sprint' : 'Set Sprint'}
        />
      </Card>
    </>
  );
};

export default SprintGoalWidget;
