import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemToCart } from '../services';

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
