import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { O_ProductHeaderBar } from '../organisms/ProductHeaderBar';
import { O_ProductInfo } from '../organisms/ProductInfo';
import { A_SellerInfo } from '../atoms/SellerInfo';
import { M_AddToCartButton } from '../atoms/AddToCartButton';
import { O_ReviewsSection } from '../organisms/ReviewsSection';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface Review {
  id: string;
  reviewText: string;
  rating: number;
  reviewDate: string;
  reviewerImage: any;
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

export const ProductTemplate: React.FC = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
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
          brandName="BRAND NAME"
          productName="Product Name"
          size="000mL"
          price={100.0}
          description="This is a product description that highlights the perfect mix of quality, design, and everyday functionality. This is a product description that highlights the perfect mix of quality, design, and everyday functionality."
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
