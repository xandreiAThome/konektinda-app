import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { O_CheckoutHeader } from '../organisms/CheckoutHeader';
import { M_ProductCard } from '../molecules/productCard';
import { M_CheckoutFooter } from '../molecules/checkoutFooter';
import { useCartAll, useUpdateCartItem } from '../../hooks';
import { CartItem } from '../../types';
import { useAuthStore } from '../../../auth/hooks/useAuthStore';
import { O_SupplierCard } from '../organisms/supplierCard';

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
  const user = useAuthStore((state) => state.user);
  console.log('Current User:', user?.email);

  const { data: cart, isLoading, error } = useCartAll();

  console.log('Cart Data:', cart);
  const [products, setProducts] = useState<SelectableProduct[]>([]);
  const updateCartItemMutation = useUpdateCartItem();

  useEffect(() => {
    if (cart) {
      const initialProducts = cart.map((item: any) => ({
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
      }));

      setProducts((prev) => {
        if (!prev || prev.length === 0) return initialProducts;

        const serverMap = new Map(initialProducts.map((p) => [p.id, p]));

        const merged: typeof initialProducts = [];

        for (const old of prev) {
          const serverItem = serverMap.get(old.id);
          if (serverItem) {
            merged.push({
              ...serverItem,
              quantity: old.quantity ?? serverItem.quantity,
              isSelected: old.isSelected ?? serverItem.isSelected,
            });
            serverMap.delete(old.id);
          }
        }

        for (const remaining of serverMap.values()) {
          merged.push(remaining);
        }

        return merged;
      });
    }
  }, [cart]);

  const handleQuantityChange = (id: string, newQty: number) => {
    setProducts((prev) => {
      const item = prev.find((p) => p.id === id);
      const variantId = item?.productVariantId;

      // Persist to backend if we have variant id
      if (variantId) {
        updateCartItemMutation.mutate(
          { productVariantId: Number(variantId), quantity: Number(newQty) },
          {
            onError: (err) => {
              console.error('Failed to update cart item', err);
            },
          }
        );
      } else {
        console.warn('Missing productVariantId for item', id);
      }

      return prev.map((p) => (p.id === id ? { ...p, quantity: newQty } : p));
    });
  };
  const supplierGroups: SupplierGroup[] = Object.values(
    products.reduce<Record<string, SupplierGroup>>((acc, p) => {
      const key = p.supplierId || 'unknown';
      if (!acc[key]) acc[key] = { supplierId: key, supplierName: p.supplierName, products: [] };
      acc[key].products.push(p);
      return acc;
    }, {})
  );

  const toggleSelection = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, isSelected: !product.isSelected } : product
      )
    );
  };

  const checkedProducts = products.filter((p) => p.isSelected);
  const totalChecked = checkedProducts.length;
  const orderTotal = checkedProducts.reduce((total, product) => {
    return total + product.quantity * product.productPrice;
  }, 0);
  const renderSupplier = ({ item }: { item: SupplierGroup }) => (
    <O_SupplierCard
      products={item.products}
      supplierName={item.supplierName}
      isChecked={item.products.every((p) => p.isSelected)}
      oncheckedChange={(value: boolean) => {
        setProducts((current) =>
          current.map((prod) =>
            prod.supplierId === item.supplierId ? { ...prod, isSelected: value } : prod
          )
        );
      }}
      onItemToggle={(id: string, value: boolean) => {
        setProducts((current) =>
          current.map((p) => (p.id === id ? { ...p, isSelected: value } : p))
        );
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
        <M_CheckoutFooter orderTotal={orderTotal} deliveryfee={0} />
      </View>
    </View>
  );
};
