import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@mui/material';

type Inputs = {
  shortName: string;
  longName: string;
};

const SettingsForm = ({
  handleAddition,
}: {
  handleAddition: (shortName: string, longName: string) => void;
}) => {
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddition(data.shortName, data.longName);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('shortName', { required: true })} />
      <Input {...register('longName', { required: true })} />
      {/* @ts-ignore */}
      <Button type="submit" disabled={errors.shortName || errors.longName}>
        Dodaj
      </Button>
    </form>
  );
};

export default SettingsForm;
