import { FC } from 'react';
import widgetStyles from './Widget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import CardFooter from '../ui/Card/CardFooter';
import { ISprint } from '../../interfaces/ISprint.interface';
import { deleteSprint } from '../../services/sprintServices';
import SprintBar from '../charts/SprintBar/SprintBar';

const SprintGoalWidget: FC<{ sprint: ISprint }> = ({ sprint }): JSX.Element => {
  const handleDeleteSprint = async (): Promise<void> => {
    try {
      await deleteSprint(sprint._id);
    } catch (error) {
      console.error('Delete Sprint Error: ', error);
    }
  };

  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
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
        linkLeftHandleClick={handleDeleteSprint}
        linkRight='/dashboard/sprint-form'
        linkRightText={sprint ? 'Review Sprint' : 'Set Sprint'}
      />
    </Card>
  );
};

export default SprintGoalWidget;
