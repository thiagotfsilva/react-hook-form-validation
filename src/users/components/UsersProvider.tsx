import { FormProvider, useForm } from "react-hook-form";
import { UserSchema, defaultValues, schema } from '../types/schemas';
import { zodResolver } from '@hookform/resolvers/zod'
import Users from "./Users";

export function UsersProvider() {
  const methods = useForm<UserSchema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })

  return(
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}
