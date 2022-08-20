import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import sanityClient from '../sanity'
import FeaturedCard from '../components/FeaturedCard'
import RestaurantCard from '../components/RestaurantCard'
import {
  ArrowNarrowLeftIcon,
  SearchIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  StarIcon
} from "react-native-heroicons/outline"

const RestaurantCollectionScreen = () => {

  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  const {
    params: {
      id,
      title,
      description,
    }
  } = useRoute();

  /*useLayoutEffect(() => {
    navigation.setOptions({
       headerTitle: `${title} Restuarants`,
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
   }, [])*/

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == 'featured' && _id == $id]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type[]->{
                        name
                    }
                }
            }[0]
        `, { id }).then(data => {
            setRestaurants(data?.restaurants)
        })
    }, [id])


    //console.log("restaurantsID", id)
  return (
    <ScrollView className=" flex-1" style={{ backgroundColor: "#FFFBFE",}}>
      <View className="h-80 bg-emerald-200 rounded-b-3xl justify-center relative">
        <Text className="text-5xl font-bold pt-14 pl-3 text-emerald-500">{title} Restaurants</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} className="rounded-full bg-white w-10 h-10 absolute left-3 top-14">
          <ArrowNarrowLeftIcon size={30} color="black" style={{ top: 5, left: 4 }} />
        </TouchableOpacity>
      </View>
      <View className="p-3">
        {restaurants?.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}                  
            short_description={restaurant.short_description}
            genre={restaurant.type}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default RestaurantCollectionScreen