import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@mui/material';
import { StyledForm } from './styles.ts';

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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('shortName', { required: true })}
        placeholder="symbol"
      />
      <Input
        {...register('fullName', { required: true })}
        placeholder="nazwa"
      />
      {/* @ts-ignore */}
      <Button type="submit" disabled={errors.shortName || errors.longName}>
        Dodaj
      </Button>
    </StyledForm>
  );
};

export default SettingsForm;
