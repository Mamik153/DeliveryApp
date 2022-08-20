import { View, Text, SafeAreaView, TouchableOpacity, Image, } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import MapView, { Marker } from 'react-native-maps';
import {
    XIcon,
    PhoneIcon
 } from "react-native-heroicons/solid"
 import * as Progress from 'react-native-progress';


const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity className="mr-3" onPress={() => navigation.navigate("Home")}>
                  <XIcon size={20} color="black" />
                </TouchableOpacity>
                
            ),
            headerTitle: "Order",
            headerShadowVisible: false,
        })
       }, [])

    
    return (
        <View className="flex-1" style={{ backgroundColor: '#FFFBFE' }}>
            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className="flex-1"
                mapType='mutedStandard'
            >
                <Marker 
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.description}
                    identifier="origin"
                />
            </MapView>
            <SafeAreaView className="bg-white rounded-t-2xl px-4 pt-5 -top-2 pb-2">
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-bold">Delivery in 10 mins</Text>
                    <Text className="text-emerald-600 bg-emerald-100 py-2 px-3 font-medium text-xs rounded-lg uppercase">On Time</Text>
                </View>
                <Progress.Bar borderRadius={10} width={null} color="#004d76" height={8} indeterminate={true} />
                <Text className="my-2 text-gray-400">to Home - B-211 DDA B-Block</Text>
                <View className="p-2 border border-solid border-sky-400 rounded-2xl  mt-2 divide-y divide-dashed divide-sky-400 ">
                    <View className="flex-row items-center justify-between py-3">
                        <Image
                            source={{
                                uri: "https://links.papareact.com/wru"
                            }}
                            className="w-10 h-10 rounded-full"
                        />
                        <Text className="text-md break-all whitespace-pre-wrap font-medium">Sonny is on the way to deliver your order</Text>
                        <PhoneIcon width={25} height={25} color="#004d76" />
                    </View>
                    <Text className="text-md font-semibold py-3">Add Delivery Instructions</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen