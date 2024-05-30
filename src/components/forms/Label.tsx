import { FC } from 'react';

const Label: FC<{ name: string; text: string }> = ({
  name,
  text,
}): JSX.Element => {
  return <label htmlFor={name}>{text}</label>;
};

export default Label;
