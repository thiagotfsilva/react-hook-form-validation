import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Option } from "../../types/Option";

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: () => axios.get<Option[]>('http://localhost:3000/states').then((res) => res.data),
  });
};

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => axios.get<Option[]>('http://localhost:3000/languages').then((res) => res.data),
  });
};

export function useGenders() {
  return useQuery({
    queryKey: ['genders'],
    queryFn: () => axios.get<Option[]>('http://localhost:3000/genders').then((res) => res.data),
  });
};

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => axios.get<Option[]>('http://localhost:3000/skills').then((res) => res.data),
  });
};

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<Option[]>('http://localhost:3000/users').then((res) => res.data),
  });
};
