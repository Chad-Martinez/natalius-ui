import { FC } from 'react';
import styles from './SprintBar.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const SprintBar: FC<{ progress: number; goal: number; end: string }> = ({
  progress,
  goal,
  end,
}): JSX.Element => {
  const timeLeft = `${dayjs(end).fromNow(true)} left`;

  const progressWidth = (): string => {
    if (!progress) return '0%';

    const progressWidth = (progress / goal) * 100;
    if (progressWidth > 100) return '100%';

    return `${Math.floor(progressWidth)}%`;
  };

  const progressColor = (): string => {
    if (!progress) return '#242424';

    const progressColor = progress / goal;

    if (progressColor < 0.33) return '#fe343d';
    if (progressColor >= 0.33 && progressColor <= 0.66) return '#feaf34';
    return '#34fe66';
  };

  return (
    <>
      <div className={styles.sprintHeader}>
        <span>
          Goal: ${progress ? progress : 0} / ${goal}
        </span>
        <span>{timeLeft}</span>
      </div>
      <div className={styles.sprintBarContainer}>
        <div
          className={styles.sprintBar}
          style={{
            width: progressWidth(),
            backgroundColor: progressColor(),
          }}
        ></div>
      </div>
    </>
  );
};

export default SprintBar;
