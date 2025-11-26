import React, { useState } from 'react';
import { Modal, View, Text, Pressable, Alert } from 'react-native';
import { ImagePlaceholder } from '../../../product/components/atoms/imagePlaceholder';
import { QuantityCounter } from '../atoms/quantityCounter';
import { Product } from '../../../product/types';
import { M_AddToCartButton } from '../../../product/components/atoms/AddToCartButton';
import { useAddItemToCart, useCartItems, useUpdateCartItem } from '../../hooks/index';

interface AddToCartSheetProps {
  visible: boolean;
  onClose: () => void;
  product?: Product;
}

export const AddToCartSheet: React.FC<AddToCartSheetProps> = ({ visible, onClose, product }) => {
  const [quantityVariant1, setQuantityVariant1] = useState(0);
  const [quantityVariant2, setQuantityVariant2] = useState(0);

  const variant1 = product?.variants?.[0];
  const variant2 = product?.variants?.[1];

  const total =
    quantityVariant1 * (variant1?.price || 0) + quantityVariant2 * (variant2?.price || 0);

  const { data: cartItems } = useCartItems();
  const addItemMutation = useAddItemToCart();
  const updateItemMutation = useUpdateCartItem();

  const handleTextChange = (text: string, setter: React.Dispatch<React.SetStateAction<number>>) => {
    const num = parseInt(text, 10);
    if (isNaN(num)) {
      setter(0);
    } else {
      setter(num);
    }
  };

  // will decide to either add new item or update based on cart contents
  const processItem = (variantId: number, quantityToAdd: number) => {
    const existingItem = cartItems?.find((item: any) => item.product_variant_id === variantId);

    if (existingItem) {
      const newTotalQuantity = existingItem.quantity + quantityToAdd;
      console.log(
        `Updating item ${variantId}: ${existingItem.quantity} + ${quantityToAdd} = ${newTotalQuantity}`
      );

      return updateItemMutation.mutateAsync({
        productVariantId: variantId,
        quantity: newTotalQuantity,
      });
    } else {
      console.log(`Adding new item ${variantId}`);

      return addItemMutation.mutateAsync({
        productVariantId: variantId,
        quantity: quantityToAdd,
      });
    }
  };

  const handleAddToCartPress = async () => {
    const variantId1 = variant1?.product_variant_id;
    const variantId2 = variant2?.product_variant_id;

    if (!variantId1 || !variantId2) {
      Alert.alert('Error', 'Product variant IDs could not be found.');
      return;
    }

    const mutationPromises = [];

    if (quantityVariant1 > 0) {
      mutationPromises.push(processItem(variantId1, quantityVariant1));
    }
    if (quantityVariant2 > 0) {
      mutationPromises.push(processItem(variantId2, quantityVariant2));
    }

    if (mutationPromises.length === 0) {
      Alert.alert('No items selected', 'Please add a quantity to at least one item.');
      return;
    }

    try {
      await Promise.all(mutationPromises);
      Alert.alert('Success!', 'Items added to your cart.');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Could not add items to cart. Please try again.');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50" onPress={onClose} />

      <View className="rounded-t-3xl bg-white p-4">
        <View className="mb-3 h-1.5 w-12 self-center rounded-full bg-gray-300" />

        <View className="mb-4 flex-row items-center">
          <ImagePlaceholder />

          <View className="flex-1 pl-4">
            <Text className="text-lg font-bold text-[#1e1e1e]">
              {product?.product_name || 'Product'}
            </Text>
            <Text className="my-1 text-base font-bold text-[#1e1e1e]">
              {product?.category?.category_name || 'Category'}
            </Text>
          </View>
        </View>

        {variant1 && (
          <View className="mb-3 rounded-xl border border-gray-200 p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-[#eb5555]">
                  ₱{variant1.price.toFixed(2)}/pc
                </Text>
                <Text className="text-sm font-semibold text-gray-500">{variant1.variant_name}</Text>
              </View>
              <QuantityCounter
                value={quantityVariant1}
                onIncrement={() => setQuantityVariant1((v) => v + 1)}
                onDecrement={() => setQuantityVariant1((v) => Math.max(0, v - 1))}
                onChangeText={(text) => handleTextChange(text, setQuantityVariant1)}
              />
            </View>
          </View>
        )}

        {variant2 && (
          <View className="rounded-xl border border-gray-200 p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-[#eb5555]">
                  ₱{variant2.price.toFixed(2)}/pc
                </Text>
                <Text className="text-sm font-semibold text-gray-500">{variant2.variant_name}</Text>
              </View>
              <QuantityCounter
                value={quantityVariant2}
                onIncrement={() => setQuantityVariant2((v) => v + 1)}
                onDecrement={() => setQuantityVariant2((v) => Math.max(0, v - 1))}
                onChangeText={(text) => handleTextChange(text, setQuantityVariant2)}
              />
            </View>
          </View>
        )}

        <Text className="my-5 text-center text-2xl font-bold text-[#eb5555]">
          Order Total - ₱{total.toFixed(2)}
        </Text>

        <M_AddToCartButton onPress={handleAddToCartPress} />
      </View>
    </Modal>
  );
};
