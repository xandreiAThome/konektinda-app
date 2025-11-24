import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCartProducts } from '../services/index';
import { useAuthStore } from '../../auth/hooks/useAuthStore';

export const QUERY_KEYS = {
  cart: () => ['cart'],
} as const;

export function useCartAll() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: QUERY_KEYS.cart(),
    queryFn: async () => {
      if (!user) throw new Error('No user logged in');

      const token = await user.getIdToken();
      return fetchCartProducts(token);
    },
    staleTime: 0,
    gcTime: 0,
  });
}
