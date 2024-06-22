import { FC, PropsWithChildren } from 'react';
import formStyles from './FormComponents.module.css';

const RadioGroup: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <div className={formStyles.radioGroup}>{children}</div>;
};

export default RadioGroup;
