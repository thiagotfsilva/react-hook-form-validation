import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserSchema } from "../types/schemas";
import axios from "axios";
import { omit } from "lodash";
import { mapData } from "../utils/mapData";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserSchema) => {
      await axios.post(
        'http://localhost:3000/users',
        omit(mapData(data), 'variant')
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('User created');
    },
  });
}

export function useEditUser() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserSchema) => {
      if (data.variant === 'edit') {
        await axios.put(
          `http://localhost:3000/users/${data.id}`,
          omit(mapData(data), 'variant')
        )
      }
    },

    onSuccess: async (_, variable) => {
      await queryCLient.invalidateQueries({ queryKey: ['users'] });

      if (variable.variant === 'edit') {
        await queryCLient.invalidateQueries({
          queryKey: ['users', { id: variable.id }],
        })
        alert('User edited');
      }
    }
  })
}
