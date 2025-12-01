import React, { useState } from 'react';
import { View, FlatList, ScrollView, Alert } from 'react-native';
import { O_CheckoutHeader } from '../organisms/CheckoutHeader';
import { M_CheckoutFooter } from '../molecules/checkoutFooter';
import { useCartAll, useUpdateCartItem } from '../../hooks';
import { useAuthStore } from '../../../auth/hooks/useAuthStore';
import { O_SupplierCard } from '../organisms/supplierCard';
import { useRouter } from 'expo-router';

type SelectableProduct = {
  id: string;
  supplierId: string;
  productVariantId?: number;
  productImage: any;
  productName: string;
  productVariant: string;
  quantity: number;
  productPrice: number;
  supplierName: string;
  isSelected: boolean;
};

type SupplierGroup = {
  supplierId: string;
  supplierName?: string;
  products: SelectableProduct[];
};

export const T_CheckoutTemplate = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  console.log('Current User:', user?.email);

  const { data: cart } = useCartAll();
  const updateCartItemMutation = useUpdateCartItem();

  // Transform cart data into SelectableProduct format
  const serverProducts = React.useMemo(() => {
    return (
      cart?.map((item: any) => ({
        id: String(item.cart_item_id ?? item.id),
        supplierId: String(
          item.variant?.product?.supplier?.supplier_id ??
            item.product?.supplier?.supplier_id ??
            'unknown'
        ),
        productVariantId: item.product_variant_id ?? item.variant?.product_variant_id,
        productImage: require('@/assets/images/temp_image.png'),
        productName: item.product?.product_name || item.variant?.product?.product_name || 'Unknown',
        productVariant: item.variant?.variant_name || 'Standard',
        quantity: item.quantity,
        productPrice: Number(item.price || item.unit_price),
        supplierName: item.variant?.product?.supplier?.supplier_name || 'Unknown Supplier',
        isSelected: true,
      })) ?? []
    );
  }, [cart]);

  // Track local changes (selection and quantity) separately
  const [localChanges, setLocalChanges] = useState<
    Map<string, { quantity?: number; isSelected?: boolean }>
  >(new Map());

  // Merge server data with local changes for display
  const products = React.useMemo(
    () =>
      serverProducts.map((product: SelectableProduct) => ({
        ...product,
        quantity: localChanges.get(product.id)?.quantity ?? product.quantity,
        isSelected: localChanges.get(product.id)?.isSelected ?? product.isSelected,
      })),
    [serverProducts, localChanges]
  );

  const handleProceedToCheckout = () => {
    // Filter to find only selected products
    const selectedItems = products.filter((p: SelectableProduct) => p.isSelected);

    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select at least one item to checkout.');
      return;
    }

    // Get their IDs
    const selectedIds = selectedItems.map((p: SelectableProduct) => p.id);

    // Push to checkout with IDs
    router.push({
      pathname: '/checkout',
      params: { selectedIds: JSON.stringify(selectedIds) },
    });
  };

  const handleQuantityChange = (id: string, newQty: number) => {
    const product = serverProducts.find((p: SelectableProduct) => p.id === id);

    // Persist to backend if we have variant id
    if (product?.productVariantId) {
      updateCartItemMutation.mutate(
        { productVariantId: Number(product.productVariantId), quantity: Number(newQty) },
        {
          onError: (err) => {
            console.error('Failed to update cart item', err);
          },
        }
      );
    } else {
      console.warn('Missing productVariantId for item', id);
    }

    // Update local state
    setLocalChanges((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { ...newMap.get(id), quantity: newQty });
      return newMap;
    });
  };

  const supplierGroups: SupplierGroup[] = React.useMemo(
    () =>
      Object.values(
        products.reduce(
          (acc: Record<string, SupplierGroup>, p: SelectableProduct) => {
            const key = p.supplierId || 'unknown';
            if (!acc[key])
              acc[key] = { supplierId: key, supplierName: p.supplierName, products: [] };
            acc[key].products.push(p);
            return acc;
          },
          {} as Record<string, SupplierGroup>
        )
      ),
    [products]
  );

  const checkedProducts = products.filter((p: SelectableProduct) => p.isSelected);
  const orderTotal = checkedProducts.reduce((total: number, product: SelectableProduct) => {
    return total + product.quantity * product.productPrice;
  }, 0);
  const renderSupplier = ({ item }: { item: SupplierGroup }) => (
    <O_SupplierCard
      products={item.products}
      supplierName={item.supplierName}
      isChecked={item.products.every((p) => p.isSelected)}
      oncheckedChange={(value: boolean) => {
        setLocalChanges((prev) => {
          const newMap = new Map(prev);
          for (const product of item.products) {
            newMap.set(product.id, { ...newMap.get(product.id), isSelected: value });
          }
          return newMap;
        });
      }}
      onItemToggle={(id: string, value: boolean) => {
        setLocalChanges((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, { ...newMap.get(id), isSelected: value });
          return newMap;
        });
      }}
      onItemQuantityChange={(id: string, newQty: number) => {
        handleQuantityChange(id, newQty);
      }}
    />
  );
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
            data={supplierGroups}
            renderItem={renderSupplier}
            keyExtractor={(g) => g.supplierId}
            contentContainerStyle={{ paddingVertical: 1 }}
          />
        </ScrollView>
      </View>

      <View className="items-bottom">
        <M_CheckoutFooter
          orderTotal={orderTotal}
          deliveryfee={0}
          onPress={handleProceedToCheckout}
        />
      </View>
    </View>
  );
};
