import { Dispatch, FC, SetStateAction, useState } from 'react';
import Notifications from './CompleteShiftMenu/CompleteShiftMenu';
import Menu from './NavMenu/NavMenu';

export type DropdownProps = {
  openDropdowns: string | null;
  setOpenDropdowns: Dispatch<SetStateAction<string | null>>;
};

const TopNavMenus: FC = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string | null>(null);

  return (
    <>
      <Notifications
        openDropdowns={openDropdowns}
        setOpenDropdowns={setOpenDropdowns}
      />
      <Menu openDropdowns={openDropdowns} setOpenDropdowns={setOpenDropdowns} />
    </>
  );
};

export default TopNavMenus;
