import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserSchema } from "../types/schemas";
import axios from "axios";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserSchema) => {
      await axios.post('http://localhost:3000/users', data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [''] })
    },
  });
}
