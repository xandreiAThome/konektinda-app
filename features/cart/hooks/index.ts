import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, fetchCartItems, updateCartItem } from '../services';

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
