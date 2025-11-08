import { useQuery } from '@tanstack/react-query';
import { userApi } from '../services/user';

export const QUERY_KEYS = {
  users: () => ['users'],
  user: (id: number) => ['user', id],
  posts: () => ['posts'],
} as const;

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.users(),
    queryFn: userApi.getUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => userApi.getUser(id),
  });
}

export function usePosts() {
  return useQuery({
    queryKey: QUERY_KEYS.posts(),
    queryFn: userApi.getPosts,
  });
}
