import React, { useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Image, type ImageStyle, View, Pressable, FlatList, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Radius } from 'lucide-react-native';
import { Rating } from 'react-native-ratings';

const {width, height } = Dimensions.get('screen');
const data = [
{
    id: '1',
    image: require('@/assets/images/temp_image.png')
  },
  {
    id: '2',
    image: require('@/assets/images/temp_image.png')
  }
];

     const imageH = height * 0.3;
    const imageW = imageH * 0.64;

const IMAGE_STYLE: ImageStyle = {
 flex: 0.5,
 height: '100%',
 resizeMode: 'contain'
};

const avatar_user: ImageStyle = {
    flexGrow: 0.2,
    height: '55%', width: 'auto', 
    resizeMode: 'contain',
};


export default function ProductScreen() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    }



 return (
    <>
    <ScrollView>
    <Stack.Screen options = {{title: 'Product Page'}} />
        <View className="items-center flex-row bg-[#2C666E] h-24 justify-between ">
                    <Image source={require('@/assets/images/KonekTinda _Logo.png')} style={IMAGE_STYLE}/>
                    <Image source={require('@/assets/images/avatar_user.png')} style={avatar_user} />
        </View>
        <View className="m-2"> 
            <Pressable onPress={handlePress}>
                <Image source={require('@/assets/images/back_arrow.png')} />
            </Pressable>
        </View>
        <View>
                <FlatList
                    data = {data}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    renderItem={({item}) => {
                        return <View className= "justify-center items-center" style = {{width}} >
                            <Image source={ item.image }
                                style={{width: imageW, height: imageH, resizeMode: 'cover'}}/>
                            </View>
                    }}
                    />
        </View>
        <View className="justify-center items-center">
            <Text className="font-Afacad font-bold"> {"\n"} BRAND NAME {"\n"} Product Name {"\n"}      (000mL) </Text>
            <Text className="font-Afacad text-[#EB5555] font-bold"> P100.00 {"\n"}  </Text>
            <Text className="font-Afacad text-center"> This is a product description that highlights the perfect mix of quality, design, and everyday functionality. This is a product description that highlights the perfect mix of quality, design, and everyday functionality. {"\n"} </Text>
        </View>
        <View className="flex-row items-center justify-center gap-2">
            <Image source={require('@/assets/images/Avatar.png')} resizeMode="contain"/>
            <Text className='font-Roboto'> Distributed by SELLER NAME {"\n"} Product listed on XX/XX/XXXX </Text>
        </View>
        <View className="flex-row items-center justify-center mb-4">
            <Pressable onPress={() => alert('Button pressed!')}
            className="bg-[#EB5555] w-[90%] justify-center self-center rounded-lg aspect-[4/0.5]"> <Text className="text-center text-white justify-center font-Afacad"> <Image source={require('@/assets/images/cart.png')} resizeMode="contain"/> Add to Cart </Text></Pressable>
        </View>

        <View style={{width}}>
                    <FlatList
                    data = {data}
                    keyExtractor={(_, index) => index.toString()}
                    pagingEnabled
                    style = {{width}}
                    renderItem={({item}) => {
                        return <View className= "pt-10 pl-5 pr-5 pb-5" style={{ width }}>
                            <View className="relative">
                                <View className="bg-[#D9D9D9] rounded-md flex-1">
                                    <View className="flex-column justify-start items-start flex-1 p-5">
                                        <View className="flex-row gap-3"> 
                                            <Text className="text-lg font-Afacad"> "Fast Delivery Time and Good Price"</Text>
                                            <Rating type='star' ratingCount={5} imageSize={20} readonly={true} startingValue={4.5} starContainerStyle={{backgroundColor: 'transparent', alignItems: 'flex-start' }} />
                                        </View>
                                        <Text className="text-sm font-Afacad"> Reviewed on XX/XX/XXXX </Text>
                                        <Text className="font-Afacad"> This is a sample review text that captures the user’s experience and overall satisfaction with the product. It highlights both the quality and the value it provides. </Text>
                                    </View>
                                </View>
                            </View>
                            <Image source={ item.image } style={{
                                width: imageW / 2.75,
                                height: imageW / 2.75,
                                borderRadius: imageW / 2,
                                resizeMode: 'cover',

                                position:'absolute',
                                top: -(imageW / 50),
                                left: 10,
                                borderWidth: 2,
                                borderColor: '#FFFFFF'

                            }} className="items-left justify-left"/>
                            </View>
                    }}
                    />
        </View>
        <View>
            <Text className="font-Afacad text-[#EB5555] font-bold"> Products similar to this... {"\n"}  </Text>

            
        </View>
        </ScrollView>

    </>
 );  
}