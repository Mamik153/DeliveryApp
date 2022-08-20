import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowNarrowRightIcon } from "react-native-heroicons/outline"
import FeaturedCard from './FeaturedCard'
import sanityClient from '../sanity'
import { useNavigation } from '@react-navigation/native'


const FeaturedRow = ({ id, title, description, featuredCategory }) => {

    const [restaurants, setRestaurants] = useState([]);
    const navigation = useNavigation();

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

    //console.log("DATA", restaurants)
  return (
    <View id={id}>
        <TouchableOpacity 
                onPress={() => { navigation.navigate('Restaurant Collection', {id, title, description }) }} className="flex-row items-center justify-between px-3 pt-5 pl-3">
            <View>
                <Text className="text-lg font-bold">{title}</Text>
                <Text className="text-md text-gray-400">{description}</Text>
            </View>
            <>
                <ArrowNarrowRightIcon size={20} color="#6750A4" />
            </>
        </TouchableOpacity>
        <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            className="pt-2"
        >
           

            {restaurants?.map(restaurant => (
                 <FeaturedCard
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
           
            
        </ScrollView>
    </View>
  )
}

export default FeaturedRow