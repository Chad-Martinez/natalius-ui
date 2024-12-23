import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import { getMilageInfo } from '../../helpers/milage-helper';
import dayjs from 'dayjs';
import Counter from '../ui/Counter/Counter';

const MilageDeductionWidget: FC<{ milage: number }> = ({
  milage,
}): JSX.Element => {
  const currentYear = dayjs().year();

  const milageInfo = getMilageInfo(currentYear);

  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={`${currentYear} Milage Tax Deducation`}>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {milage && milageInfo ? (
          <div>
            <Counter
              title={`${milage} mi @ ${milageInfo?.deduction}¢ p/mi`}
              amount={milage * (milageInfo?.deduction / 100)}
              interval={2}
              skip={2}
              amountStyles={{
                fontSize: '3rem',
                fontWeight: '500',
                width: '100%',
              }}
              titleStyles={{ textAlign: 'right', width: '100%' }}
            />
          </div>
        ) : (
          <CardContentVacant title='No Milage Logged' />
        )}
      </CardContent>
    </Card>
  );
};

export default MilageDeductionWidget;
