import { Button, Input } from '@mui/material';
import type { Crypto } from '../../../pages/Settings.tsx';

const ListDisplay = ({
  items,
  handleDelete,
}: {
  items: Crypto[];
  handleDelete: (shortName: string) => void;
}) => {
  return (
    <ul>
      {items.map((item) => (
        <li>
          <Input value={item.shortName} disabled readOnly />
          <Input value={item.fullName} disabled readOnly />
          <Button onClick={() => handleDelete(item.shortName)}>X</Button>
        </li>
      ))}
    </ul>
  );
};

export default ListDisplay;
