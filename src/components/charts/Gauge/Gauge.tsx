import { FC } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styles from './Gauge.module.css';

type GaugeProps = {
  title: string;
  ytdValue: number;
  max: number;
  reverse?: boolean;
};

const Gauges: FC<GaugeProps> = ({
  title,
  ytdValue,
  max,
  reverse = false,
}): JSX.Element => {
  const settings = {
    width: 150,
    height: 150,
    value: Math.round(ytdValue),
  };

  const colors = {
    success: '#34fe66',
    successDark: '#52b202',
    warning: '#feaf34',
    danger: '#fe343d',
    unfilled: '#242424',
  };

  const positive = () => {
    if (ytdValue / max > 0.66) {
      return colors.success;
    } else if (ytdValue / max <= 0.66 && ytdValue / max > 0.33) {
      return colors.warning;
    } else {
      return colors.danger;
    }
  };

  const negative = () => {
    if (ytdValue / max > 0.66) {
      return colors.danger;
    } else if (ytdValue / max <= 0.66 && ytdValue / max > 0.33) {
      return colors.warning;
    } else {
      return colors.success;
    }
  };

  return (
    <div>
      <div className={styles.gaugeTitle}>{title}</div>
      <Gauge
        {...settings}
        cornerRadius='50%'
        valueMin={0}
        valueMax={max}
        sx={() => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 25,
            color: '#52b202',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: reverse ? negative() : positive(),
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: colors.unfilled,
          },
        })}
        text={`$${settings.value}`}
      />
    </div>
  );
};

export default Gauges;
