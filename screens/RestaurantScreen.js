import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ArrowNarrowLeftIcon,
  SearchIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  StarIcon
} from "react-native-heroicons/outline"
import { urlFor } from '../sanity'
import Dish from '../components/Dish'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'


const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {
    params: {
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
    }
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
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
    }))
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      //headerShown: false,
      hideWhenScrolling: true,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <SearchIcon size={20} color="#111" />
      )
      
    })
   }, [])


  return (
    <>
    <BasketIcon />
      <ScrollView style={{
        backgroundColor: "#FFFBFE"
      }}>
        <View className="relative">
          <Image 
            source={{
              uri: urlFor(imgUrl).url()
            }}
            className="w-full h-60 bg-sky-100 p-5 rounded-b-3xl"
          />
          {/* <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-sky-50 bg-opacity-5 w-max absolute top-12 left-3 rounded-full">
            <ArrowNarrowLeftIcon size={20} color="#111" />
          </TouchableOpacity> */}
        </View>
        <View className="p-3 pb-5 bg-white rounded-b-3xl">
          <Text className="text-2xl font-bold">{title}</Text>
          <Text className="text-gray-500 text-md font-light">{short_description}</Text>
          <View className="flex-row items-center space-x-2 mt-3">
            <View className="flex-row items-center space-x-0.5">
              <StarIcon size={20} color="#111" />
              <Text className="text-sm">{rating}</Text>
            </View>
            <Text className="text-xs text-black">
              .  {cuisines}
            </Text>         
          </View>
          <View className="flex-row items-center space-x-0.5 space-y-2">
            <LocationMarkerIcon size={20} color="#111" />
            <Text className="text-sm pb-1" numberOfLines={1}>{address}</Text>
          </View>
          
        </View>

        <View className="mt-8 py-5 px-3 bg-white rounded-3xl">
            <Text className="text-xl font-bold">Menu</Text>
            {/* DISHES */}
            <View  className="">
              {dishes.map(dish => (
                <Dish 
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  description={dish.short_description}
                  price={dish.price}
                  image={dish.image}
                />
              ))}
              
            </View>         
          </View>

          <View className="pt-12 pb-20 px-3">
              <Text className="text-lg font-medium text-emerald-300">Powered By</Text>
              <Text className="text-7xl font-extrabold text-sky-200 pt-4">Sanity</Text>    
          </View>  
      </ScrollView>
    </>
    
  )
}

export default RestaurantScreen