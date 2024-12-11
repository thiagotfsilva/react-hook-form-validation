import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserSchema } from "../types/schemas";
import axios from "axios";
import { useId } from "react";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const id = useId()

  return useMutation({
    mutationFn: async (data: UserSchema) => {
      const user = {
        id: id,
        ...data
      }
      await axios.post('http://localhost:3000/users', user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [''] })
    },
  });
}
