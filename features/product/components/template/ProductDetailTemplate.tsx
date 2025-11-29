import React, { useState } from 'react'; // 1. Added useState
import { View, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { useRouter } from 'expo-router';
import { A_SellerInfo } from '../atoms/SellerInfo';
import { M_AddToCartButton } from '../atoms/AddToCartButton';
import { O_ReviewsSection } from '../organisms/ReviewsSection';
import { Text } from '@/components/ui/text';
import { ChevronLeft } from 'lucide-react-native';
import { ProductDetailSkeleton } from '../molecules/productDetailSkeleton';
import { useProductById } from '../../hooks';
import { AddToCartSheet } from '../../../cart/components/organisms/addToCartSheet';

cssInterop(ExpoImage, { className: 'style' });

interface Review {
  id: string;
  reviewText: string;
  rating: number;
  reviewDate: string;
  reviewerImage: any;
}

interface ProductDetailProps {
  product_id: string;
}

// Temporary mock data
const TEMP_REVIEWS: Review[] = [
  {
    id: '1',
    reviewText: 'Fast Delivery Time and Good Price',
    rating: 4.5,
    reviewDate: 'XX/XX/XXXX',
    reviewerImage: require('@/assets/images/avatar_user.png'),
  },
  {
    id: '2',
    reviewText: 'Excellent quality and fast shipping',
    rating: 5,
    reviewDate: 'XX/XX/XXXX',
    reviewerImage: require('@/assets/images/konektinda-logo.png'),
  },
];

export const ProductDetailTemplate: React.FC<ProductDetailProps> = ({ product_id }) => {
  const router = useRouter();
  const [isCartSheetVisible, setIsCartSheetVisible] = useState(false);
  const { data: product, isLoading, isError } = useProductById(product_id || '');

  const handleBackPress = () => {
    router.push('/listing');
  };

  const handleAddToCart = () => {
    setIsCartSheetVisible(true);
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center text-red-500">Failed to load product</Text>
      </View>
    );
  }

  const primaryVariant = product.variants?.[0];
  const category = product.category;

  // Important: extract product id from the product data
  const supplierId = product.supplier_id;

  const sections = [
    {
      id: 'header',
      component: (
        <View key="header">
          {/* Back Button */}
          <Pressable onPress={handleBackPress} className="m-2">
            <ChevronLeft />
          </Pressable>

          {/* Product Image */}
          <View className="items-center justify-center py-6">
            <ExpoImage
              source={require('@/assets/images/temp_image.png')}
              className="h-40 w-72"
              contentFit="contain"
            />
          </View>

          {/* Product Information */}
          <View className="items-center px-4 py-4">
            {/* Category */}
            {category?.category_name && (
              <Text className="text-xs font-semibold text-gray-500">{category.category_name}</Text>
            )}

            {/* Product Name */}
            <Text className="text-center text-lg font-bold text-gray-800">
              {product.product_name}
            </Text>

            {/* Variant Name */}
            {primaryVariant?.variant_name && (
              <Text className="mt-1 text-sm text-gray-600">
                {primaryVariant.variant_name} sdasa {primaryVariant.product_variant_id}
              </Text>
            )}

            {/* Price and Stock */}
            <View className="mt-3 flex-row items-center gap-4">
              <Text className="text-xl font-bold text-red-500">
                ₱{primaryVariant?.price?.toFixed(2)}
              </Text>
              <Text
                className={`text-sm font-semibold ${primaryVariant?.stock && primaryVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {primaryVariant?.stock && primaryVariant.stock > 0
                  ? `${primaryVariant.stock} in stock`
                  : 'Out of stock'}
              </Text>
            </View>

            {/* Description */}
            {product.product_description && (
              <Text className="mt-4 text-center text-sm leading-6 text-gray-700">
                {product.product_description}
              </Text>
            )}
          </View>

          {/* Seller Info */}
          <A_SellerInfo
            supplierId={supplierId}
            sellerImage={require('@/assets/images/Avatar.png')}
            sellerName="SELLER NAME"
            listingDate="XX/XX/XXXX"
          />

          {/* Add to Cart Button */}
          <M_AddToCartButton onPress={handleAddToCart} />
        </View>
      ),
    },
    {
      id: 'reviews',
      component: (
        <View key="reviews">
          {TEMP_REVIEWS && TEMP_REVIEWS.length > 0 && <O_ReviewsSection reviews={TEMP_REVIEWS} />}
        </View>
      ),
    },
    {
      id: 'similar',
      component: (
        <View key="similar" className="px-4 py-6">
          <Text className="mb-4 text-lg font-bold text-red-500">Products similar to this...</Text>
        </View>
      ),
    },
  ];

  return (
    <>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        className="flex-1 bg-white"
        scrollEnabled={true}
      />

      {/* 6. RENDER THE MODAL */}
      <AddToCartSheet
        visible={isCartSheetVisible}
        onClose={() => setIsCartSheetVisible(false)}
        product={product}
      />
    </>
  );
};
