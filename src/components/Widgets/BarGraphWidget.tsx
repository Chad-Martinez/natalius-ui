import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import BarGraph from '../charts/Bar/BarGraph';
import RadioGroup from '../forms/RadioGroup';
import RadioInput from '../forms/RadioInput';
import { useLoaderData } from 'react-router-dom';

type GraphData = {
  label: string;
  totalIncome: number;
}[];

const BarGraphWidget: FC = (): JSX.Element => {
  const graphLoaderData = useLoaderData() as {
    graphData: {
      dailyIncomeCurrentWeek: GraphData;
      monthlyIncomeCurrentQuarter: GraphData;
      monthlyIncomeCurrentYear: GraphData;
      weeklyIncomeCurrentMonth: GraphData;
    };
  };

  const [period, setPeriod] = useState<string>('Week');
  const [graphData, setGraphData] = useState<GraphData>([]);

  useEffect(() => {
    if (graphLoaderData && graphLoaderData.graphData) {
      setGraphData(graphLoaderData.graphData?.dailyIncomeCurrentWeek);
    }
  }, [graphLoaderData]);

  const loadGraphData = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'Month':
        setPeriod('Month');
        setGraphData(graphLoaderData.graphData.weeklyIncomeCurrentMonth);
        break;
      case 'Quarter':
        setPeriod('Quarter');
        setGraphData(graphLoaderData.graphData.monthlyIncomeCurrentQuarter);
        break;
      case 'Year':
        setPeriod('Year');
        setGraphData(graphLoaderData.graphData.monthlyIncomeCurrentYear);
        break;
      default:
        setPeriod('Week');
        setGraphData(graphLoaderData.graphData.dailyIncomeCurrentWeek);
        break;
    }
  };

  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={`${period} to Date`}>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        <RadioGroup>
          <RadioInput
            id='week'
            name='period'
            value='Week'
            label='Week'
            defaultChecked={true}
            handleChange={loadGraphData}
          />
          <RadioInput
            id='month'
            name='period'
            value='Month'
            label='Month'
            handleChange={loadGraphData}
          />
          <RadioInput
            id='quarter'
            name='period'
            value='Quarter'
            label='Quarter'
            handleChange={loadGraphData}
          />
          <RadioInput
            id='year'
            name='period'
            value='Year'
            label='Year'
            handleChange={loadGraphData}
          />
        </RadioGroup>
        {graphData.length > 0 ? (
          <BarGraph graphData={graphData} />
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
    </Card>
  );
};

export default BarGraphWidget;
