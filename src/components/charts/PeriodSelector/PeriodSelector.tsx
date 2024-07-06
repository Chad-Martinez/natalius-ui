import { ChangeEvent, FC } from 'react';
import RadioGroup from '../../forms/RadioGroup';
import RadioInput from '../../forms/RadioInput';

const PeriodSelector: FC<{
  defaultChecked: string;
  loadGraphData: (event: ChangeEvent<HTMLInputElement>) => void;
  hasWeek?: boolean;
}> = ({ defaultChecked, loadGraphData, hasWeek = true }): JSX.Element => {
  return (
    <RadioGroup>
      {hasWeek ? (
        <RadioInput
          id='week'
          name='period'
          value='week'
          label='Week'
          defaultChecked={defaultChecked === 'week'}
          handleChange={loadGraphData}
        />
      ) : (
        ''
      )}
      <RadioInput
        id='month'
        name='period'
        value='month'
        label='Month'
        defaultChecked={defaultChecked === 'month'}
        handleChange={loadGraphData}
      />
      <RadioInput
        id='quarter'
        name='period'
        value='quarter'
        label='Quarter'
        defaultChecked={defaultChecked === 'quarter'}
        handleChange={loadGraphData}
      />
      <RadioInput
        id='year'
        name='period'
        value='year'
        label='Year'
        defaultChecked={defaultChecked === 'year'}
        handleChange={loadGraphData}
      />
    </RadioGroup>
  );
};

export default PeriodSelector;
