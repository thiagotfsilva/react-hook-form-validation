import { Stack, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form';
import { UserSchema } from '../types/schemas';
import RHFAutocomplete from '../../components/RHFAutocomplete';
import { useGenders, useLanguages, useSkills, useStates } from '../services/queries';
import RHFToggleButtonGroup from '../../components/RHFToggleButtonGroup';
import RHFRadioGroup from '../../components/RHFRadioGroup';
import RHFCheckbox from '../../components/RHFCheckbox';
import { useEffect } from 'react';
import RHFDateTimePicker from '../../components/RHFDateTimePicker';
import RHFDateRangePicker from '../../components/RHFDateRangerPicker';

const Users = () => {
  const { watch, register, formState: { errors }} = useFormContext<UserSchema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const genderQuery = useGenders();
  const skills = useSkills();

  useEffect(() => {
		const sub = watch((value) => {
			console.log(value);
		});

		return () => sub.unsubscribe();
	}, [watch]);

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
      <RHFAutocomplete<UserSchema>
       name="states"
       label="States"
       options={statesQuery.data}
      />
      <RHFToggleButtonGroup<UserSchema>
       name="languagesSpoken"
       options={languagesQuery.data}
      />
      <RHFRadioGroup<UserSchema>
        name="gender"
        label='Gender'
        options={genderQuery.data}
      />
      <RHFCheckbox<UserSchema>
        name="skills"
        label='Skills'
        options={skills.data}
      />
      <RHFDateTimePicker<UserSchema>
        name="registrationDateAndTime"
        label="Registration Date & Time"
      />
      <Typography>Former Employment Period:</Typography>
      <RHFDateRangePicker<UserSchema> name="formetEmploymentPeriod"/>
    </Stack>
  );
}

export default Users;
