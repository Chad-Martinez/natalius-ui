import { FC, useEffect, useState } from 'react';
import styles from './Counter.module.css';

const Counter: FC<{
  period: string;
  amount: number;
  interval: number;
  skip: number;
}> = ({ period, amount, interval, skip }): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const int = setInterval(() => {
      setCount((prevCount) => (prevCount += skip));
    }, interval);

    if (count >= amount) {
      clearInterval(int);
      setIsFinished(true);
    }

    return () => clearInterval(int);
  }, [amount, count, interval, skip]);

  return (
    <>
      <div className={`${styles.amount} ${isFinished ? styles.slam : ''}`}>
        ${count}
      </div>
      <div className={styles.counter}>{period}</div>
    </>
  );
};

export default Counter;
