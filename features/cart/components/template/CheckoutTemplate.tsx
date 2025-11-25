import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { O_CheckoutHeader } from '../organisms/CheckoutHeader';
import { M_ProductCard } from '../molecules/productCard';
import { M_CheckoutFooter } from '../molecules/checkoutFooter';
import { useCartAll } from '../../hooks';
import { CartItem } from '../../types';
import { useAuthStore } from '../../../auth/hooks/useAuthStore';

type SelectableProduct = {
  id: string;
  productImage: any;
  productName: string;
  productVariant: string;
  quantity: number;
  productPrice: number;
  isSelected: boolean;
};

export const T_CheckoutTemplate = () => {
  const user = useAuthStore((state) => state.user);
  console.log('Current User:', user?.email);

  const { data: cart, isLoading, error } = useCartAll();

  console.log('Cart Data:', cart);
  //console.log("hi" +cart.items);
  const [products, setProducts] = useState<SelectableProduct[]>([]);
  useEffect(() => {
    if (cart) {
      const initialProducts = cart.map((item: any) => ({
        id: item.cart_item_id || item.id, // Ensure we grab the ID
        productImage: require('@/assets/images/temp_image.png'),
        // Handle nested API data safely
        productName: item.product?.product_name || item.variant?.product?.product_name || 'Unknown',
        productVariant: item.variant?.variant_name || 'Standard',
        quantity: item.quantity,
        productPrice: Number(item.price || item.unit_price),
        isSelected: true,
      }));

      setProducts(initialProducts);
    }
  }, [cart]);
  const toggleSelection = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, isSelected: !product.isSelected } : product
      )
    );
  };
  const renderProduct = ({ item }: { item: SelectableProduct }) => (
    <M_ProductCard
      product={item}
      isChecked={item.isSelected}
      oncheckedChange={() => toggleSelection(item.id)}
    />
  );
  const orderTotal = products
    .filter((product) => product.isSelected)
    .reduce((total, product) => {
      return total + product.quantity * product.productPrice;
    }, 0);

  return (
    <View className="flex-1">
      <O_CheckoutHeader
        houseNoStreetName={'2313 Taft'}
        barangay={'Barangay 728'}
        city={'Malate'}
        province={'Metro Manila'}
        postalCode={1004}
        country={'Philippines'}
      />

      <View className="flex-1">
        <ScrollView>
          <FlatList
            className="flex-1"
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        </ScrollView>
      </View>

      <View className="items-bottom">
        <M_CheckoutFooter orderTotal={orderTotal} deliveryfee={50.2} />
      </View>
    </View>
  );
};
