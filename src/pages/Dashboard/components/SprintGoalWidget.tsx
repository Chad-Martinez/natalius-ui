import { FC } from 'react';
import widgetStyles from '../../../styles/Widget.module.css';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import CardContent from '../../../components/ui/Card/CardContent';
import CardContentVacant from '../../../components/ui/Card/CardContentVacant';
import CardFooter from '../../../components/ui/Card/CardFooter';
import SprintBar from '../../../components/charts/SprintBar/SprintBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { ISprint } from '../../../interfaces/ISprint.interface';
import { deleteSprint } from '../../../services/sprintServices';

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
