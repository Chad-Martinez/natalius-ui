import { FC, PropsWithChildren } from 'react';
import formStyles from './FormComponents.module.css';

const FormGroup: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <div className={formStyles.formGroup}>{children}</div>;
};

export default FormGroup;
