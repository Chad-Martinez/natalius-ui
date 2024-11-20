import { FC } from 'react';
import logo from '../../../assets/shell.png';

type Props = {
  addedStyles?: { [key: string]: string };
  clickHandler?: () => void;
};

const Logo: FC<Props> = ({ addedStyles, clickHandler }): JSX.Element => {
  return (
    <img
      src={logo}
      style={addedStyles}
      alt='Natalius logo'
      onClick={clickHandler}
    />
  );
};

export default Logo;
