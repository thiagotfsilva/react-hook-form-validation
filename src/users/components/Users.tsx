
import { Stack, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form';
import { UserSchema } from '../types/schemas';
import RHFAutocomplete from '../../components/RHFAutocomplete';
import { useEffect } from 'react';

const states = [
  { id: "1", label: "California" },
  { id: "2", label: "Texas" },
  { id: "3", label: "New Jersey" },
];

const Users = () => {
  const { register, watch, formState: { errors }} = useFormContext<UserSchema>();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value)
    });
    return () => sub.unsubscribe();
  }, [watch])

  return(
    <Stack sx={{ gap: 2 }}>
      <TextField
       {...register('name')}
       label="Name"
       error={!!errors.name}
       helperText={errors.name?.message}
      />
      <TextField
       {...register('email')}
       label="Email"
       error={!!errors.email}
       helperText={errors.email?.message}
      />
      <RHFAutocomplete<UserSchema> name="states" label="States" options={states}/>
    </Stack>
  );
}

export default Users;
