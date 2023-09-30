import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@mui/material';

type Inputs = {
  shortName: string;
  fullName: string;
};

const SettingsForm = ({
  handleAddition,
}: {
  handleAddition: (shortName: string, fullName: string) => void;
}) => {
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddition(data.shortName, data.fullName);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('shortName', { required: true })} />
      <Input {...register('fullName', { required: true })} />
      {/* @ts-ignore */}
      <Button type="submit" disabled={errors.shortName || errors.longName}>
        Dodaj
      </Button>
    </form>
  );
};

export default SettingsForm;
