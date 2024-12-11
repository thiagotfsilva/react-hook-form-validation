import { Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack, Typography } from '@mui/material'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { defaultValues, UserSchema } from '../types/schemas';
import RHFAutocomplete from '../../components/RHFAutocomplete';
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from '../services/queries';
import RHFToggleButtonGroup from '../../components/RHFToggleButtonGroup';
import RHFRadioGroup from '../../components/RHFRadioGroup';
import RHFCheckbox from '../../components/RHFCheckbox';
import { Fragment, useEffect } from 'react';
import RHFDateTimePicker from '../../components/RHFDateTimePicker';
import RHFDateRangePicker from '../../components/RHFDateRangerPicker';
import RHFSlider from '../../components/RHFSlider';
import RHFSwitch from '../../components/RHFSwitch';
import RHFTextField from '../../components/RHFTextField';

const Users = () => {
  const {
    //watch,
    control,
    unregister,
    reset,
    setValue,
  } = useFormContext<UserSchema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const genderQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const id = useWatch({ control, name: 'id' });

  const userQuery = useUser(id);

 /*  useEffect(() => {
		const sub = watch((value) => {
			console.log(value);
		});

		return () => sub.unsubscribe();
	}, [watch]); */

  const isTeacher = useWatch({ control, name: "isTeacher"})

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  })

  const handleUserClick = (id: string) => {
    setValue('id', id)
  }

  useEffect(() => {
    if(!isTeacher) {
      replace([])
      unregister('students')
    }
  }, [isTeacher, replace, unregister])

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data)
    }
  }, [userQuery.data, reset])

  const handleReset = () => {
    reset(defaultValues)
  };

  return(
    <Container maxWidth="sm" component="form">
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<UserSchema> name='name' label="Full name"/>
          <RHFTextField name='email' label="Email"/>
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
            options={skillsQuery.data}
          />
          <RHFDateTimePicker<UserSchema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<UserSchema> name="formetEmploymentPeriod"/>
          <RHFSlider<UserSchema> name='salaryRange' label='Salary Range' />
          <RHFSwitch<UserSchema> name="isTeacher" label='Are you a teacher?' />

          {isTeacher && (
            <Button onClick={() => append({ name: '' })} type='button'>
              Add new student
            </Button>
          )}

          {fields.map((field, index) =>(
            <Fragment key={field.id}>
              <RHFTextField
              name={`students.${index}.name`}
              label="Name"
              />
              <Button
              color='error'
              onClick={() => remove(index)}
              >Remove</Button>
            </Fragment>
          ))}
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button type='submit'>New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Users;
