import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LocationMarkerIcon } from "react-native-heroicons/outline"
import { StarIcon } from "react-native-heroicons/solid"
import { urlFor } from "../sanity.js"
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id, 
    imgUrl, 
    title, 
    rating, 
    genre, 
    address, 
    short_description,
    dishes,
    long,
    lat
}) => {

    const cuisines = genre?.map((item, index) => (index == genre.length - 1 ?  item.name : `${item.name}, `));

    const navigation = useNavigation();
  return (
    <TouchableOpacity 
    id={id} 
    className="bg-white rounded-3xl w-full mr-3 my-2"
    onPress={() => {
        navigation.navigate('Restaurant', {
            id,
            imgUrl,
            title,
            rating,
            cuisines,
            address,
            short_description,
            dishes,
            long,
            lat
        })
    }}    
>
    <Image 
        source={{
            uri: urlFor(imgUrl).url(),
        }}
        className="rounded-3xl w-full aspect-video object-cover"
    />
    <View className="p-2 rounded-b-lg">
        <Text>{title}</Text>
        <View className="py-1 flex-row items-center">
            <View className="bg-green-600 flex-row py-0.5 px-1 rounded-xl">
            <StarIcon size={15} color="white" />
            <Text className="pr-1 text-xs text-white">{rating}</Text>
            </View>
            
            <Text className="text-xs text-gray-400 ml-1 line-clamp-1">{cuisines}</Text>
        </View>
        <View className="flex-row items-center">
            <LocationMarkerIcon size={15} color="#6750A4" opacity={0.4} />
            <Text className="pl-1 text-xs text-gray-400 text-ellipsis" numberOfLines={1}>{address}</Text>
        </View>
    </View>
  
</TouchableOpacity>
  )
}

export default RestaurantCard