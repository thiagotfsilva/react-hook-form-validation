import { FormControlLabel, Switch } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
}

function RHFSwitch<T extends FieldValues>({ name, label }: Props<T>)  {
  const { control } = useFormContext<T>()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  )
}

export default RHFSwitch;
