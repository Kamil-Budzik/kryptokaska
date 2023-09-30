// components
import Wrapper from '../components/Wrapper';
import { Button, Input } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

interface Crypto {
  shortName: string;
  longName: string;
}

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
          <Input value={item.longName} disabled readOnly />
          <Button onClick={() => handleDelete(item.shortName)}>X</Button>
        </li>
      ))}
    </ul>
  );
};

type Inputs = {
  shortName: string;
  longName: string;
};

const SettingsForm = ({
  handleAddition,
}: {
  handleAddition: (shortName: string, longName: string) => void;
}) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddition(data.shortName, data.longName);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('shortName')} />
      <Input {...register('longName')} />
      <Button type="submit">Add</Button>
    </form>
  );
};

function Settings() {
  const [items, setItems] = useState<Crypto[]>([
    { shortName: 'BT', longName: 'Bitcoin' },
    { shortName: 'ET', longName: 'Ethereum' },
  ]);

  const handleAddition = (shortName: string, longName: string) => {
    setItems((prev) => [...prev, { shortName, longName }]);
  };

  const handleDelete = (shortName: string) => {
    setItems((prev) => prev.filter((item) => item.shortName !== shortName));
  };

  return (
    <Wrapper>
      <SettingsForm handleAddition={handleAddition} />
      {items.length ? (
        <section>
          <header>Items display</header>
          <ListDisplay items={items} handleDelete={handleDelete} />
        </section>
      ) : (
        <p>No values provided</p>
      )}
    </Wrapper>
  );
}

export default Settings;
