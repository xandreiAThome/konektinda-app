import { fetchCartProducts } from '../services/index';
import { useAuthStore } from '../../auth/hooks/useAuthStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, fetchCartItems, updateCartItem } from '../services';

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

export function useCartItems() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: (data) => {
      console.log('Item added to cart:', data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Error adding item to cart:', error);
    },
  });
}
