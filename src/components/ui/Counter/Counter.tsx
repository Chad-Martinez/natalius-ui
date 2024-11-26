import { FC, useEffect, useRef, useState } from 'react';
import styles from './Counter.module.css';
import { moneyFormatter } from '../../../helpers/format-helpers';

const Counter: FC<{
  title: string;
  amount: number;
  interval: number;
  skip: number;
  amountStyles?: { [key: string]: string };
  titleStyles?: { [key: string]: string };
}> = ({
  title,
  amount,
  interval,
  skip,
  amountStyles,
  titleStyles,
}): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const counterDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    const counterElement = counterDivRef.current;

    if (counterElement) {
      observer.observe(counterElement);
    }

    return () => {
      if (counterElement) {
        observer.unobserve(counterElement);
      }
    };
  }, [counterDivRef]);

  useEffect(() => {
    if (!isVisible) return;
    const int = setInterval(() => {
      setCount((prevCount) => (prevCount += skip));
    }, interval);

    if (count >= amount) {
      clearInterval(int);
      setIsFinished(true);
    }

    return () => clearInterval(int);
  }, [amount, count, interval, skip, isVisible]);

  return (
    <div ref={counterDivRef}>
      {isVisible ? (
        <>
          <div
            className={`${styles.amount} ${isFinished ? styles.slam : ''}`}
            style={{ ...amountStyles }}
          >
            {`$${moneyFormatter(count)}`}
          </div>
          <div className={styles.title} style={{ ...titleStyles }}>
            {title}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Counter;
