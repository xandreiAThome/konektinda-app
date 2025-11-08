import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { O_ProductHeaderBar } from '../organisms/ProductHeaderBar';
import { O_ProductInfo } from '../organisms/ProductInfo';
import { A_SellerInfo } from '../atoms/SellerInfo';
import { M_AddToCartButton } from '../atoms/AddToCartButton';
import { O_ReviewsSection } from '../organisms/ReviewsSection';
import { Text } from '@/components/ui/text';
import { Alert } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface Review {
  id: string;
  reviewText: string;
  rating: number;
  reviewDate: string;
  reviewerImage: any;
}

interface ProductTemplateProps {
  brandName: string;
  productName: string;
  price: number;
  size: string;
  description: string;
}

// Temporary mock data
const TEMP_PRODUCT_IMAGE = require('@/assets/images/temp_image.png');
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
    reviewerImage: require('@/assets/images/temp_image.png'),
  },
];

export const ProductTemplate: React.FC<ProductTemplateProps> = ({
  brandName,
  productName,
  price,
  size,
  description,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.push('/(tabs)/listing');
  };

  const handleAddToCart = () => {
    Alert.alert('Success', 'Product added to cart!');
  };
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <Pressable onPress={handleBackPress} className="m-2">
          <ChevronLeft />
        </Pressable>

        {/* Product Image */}
        <View className="items-center justify-center py-6">
          <Image
            source={TEMP_PRODUCT_IMAGE}
            style={{ resizeMode: 'contain' }}
            className="h-40 w-72"
          />
        </View>

        {/* Product Information */}
        <O_ProductInfo
          brandName={brandName}
          productName={productName}
          size={size}
          price={price}
          description={description}
        />

        {/* Seller Info */}
        <A_SellerInfo
          sellerImage={require('@/assets/images/Avatar.png')}
          sellerName="SELLER NAME"
          listingDate="XX/XX/XXXX"
        />

        {/* Add to Cart Button */}
        <M_AddToCartButton onPress={handleAddToCart} />

        {/* Reviews Section */}
        {TEMP_REVIEWS && TEMP_REVIEWS.length > 0 && <O_ReviewsSection reviews={TEMP_REVIEWS} />}

        {/* Similar Products Section */}
        <View className="px-4 py-6">
          <Text className="mb-4 text-lg font-bold text-red-500">Products similar to this...</Text>
        </View>
      </ScrollView>
    </View>
  );
};
