import { ChangeEvent, FC } from 'react';
import RadioGroup from '../../forms/RadioGroup';
import RadioInput from '../../forms/RadioInput';

const PeriodSelector: FC<{
  defaultChecked: string | undefined;
  loadGraphData: (event: ChangeEvent<HTMLInputElement>) => void;
  graphName: string;
  hasWeek?: boolean;
}> = ({
  defaultChecked,
  loadGraphData,
  graphName,
  hasWeek = true,
}): JSX.Element => {
  return (
    <RadioGroup>
      {hasWeek ? (
        <RadioInput
          id={`week-${graphName}`}
          name={`period-${graphName}`}
          value='Week'
          label='Week'
          defaultChecked={defaultChecked === 'week'}
          handleChange={loadGraphData}
        />
      ) : (
        ''
      )}
      <RadioInput
        id={`month-${graphName}`}
        name={`period-${graphName}`}
        value='Month'
        label='Month'
        defaultChecked={defaultChecked === 'month'}
        handleChange={loadGraphData}
      />
      <RadioInput
        id={`quarter-${graphName}`}
        name={`period-${graphName}`}
        value='Quarter'
        label='Quarter'
        defaultChecked={defaultChecked === 'quarter'}
        handleChange={loadGraphData}
      />
      <RadioInput
        id={`year-${graphName}`}
        name={`period-${graphName}`}
        value='Year'
        label='Year'
        defaultChecked={defaultChecked === 'year'}
        handleChange={loadGraphData}
      />
    </RadioGroup>
  );
};

export default PeriodSelector;
