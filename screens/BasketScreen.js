import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import {
    MinusIcon,
    PlusIcon
 } from "react-native-heroicons/solid"
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const tax = (basketTotal * 5) / 100;
    const deliveryCharge = 50;
    const total = basketTotal + tax + deliveryCharge;
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])

    const dispatch = useDispatch();

   
    useLayoutEffect(() => {
        navigation.setOptions({
           headerTitle: restaurant.title,
           headerStyle: {
            backgroundColor: '#FFFBFE',
           },
           headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
          headerTitleAlign: 'center',
          hideWhenScrolling: true,
            headerShadowVisible: false,
        })
    }, [])

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems)
    }, [items])

    //console.log("setGroupedItemsInBasket", groupedItemsInBasket)

    const addItemToBasket = (id, name, description, price, image) => {        
        dispatch(addToBasket({ id, name, description, price, image }))
    }

    const removeItemFromBasket = (id) => {
        //console.log(items.length)
        if(!items.length > 0){
            return
        }

        dispatch(removeFromBasket({ id }))
    }


    return (
        <View className="flex-1">
            <ScrollView className="p-3 flex-1" >
                {items.length > 0 && (<View className="bg-white border border-solid border-sky-300 divide-y divide-gray-200 rounded-3xl p-3 mb-7">
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                        <View key={key} className="flex-row items-center py-2 space-x-2">
                            <Image 
                                source={{
                                    uri: urlFor(items[0]?.image).url()
                                }}
                                className="h-16 w-16 rounded-xl"
                            />
                            <View className=" w-2/5">
                                <View>
                                    <Text className="font-bold text-md flex-1">{items[0]?.name}</Text>
                                    <Text className="font-medium text-gray-600 text-xs flex-1">&#8377;{items[0]?.price}</Text>
                                </View>
                                
                                <Text className="text-gray-500 font-light text-xs flex-1" numberOfLines={2}>{items[0]?.description}</Text>
                            </View>
                            
                            <View className="mr-4 h-7 bg-white border border-green-600  rounded-md">
                                <View className="flex-row justify-between items-center space-x-2">
                                    
                                    <TouchableOpacity onPress={() => removeItemFromBasket(items[0]?.id)} className="py-2 px-1 rounded-l-md">
                                        <MinusIcon size={10} color="rgb(34, 197, 94)" />
                                    </TouchableOpacity>
                                    <Text className="text-xs font-bold text-green-500">{items.length}</Text>
                                    <TouchableOpacity className="py-2 px-1 rounded-r-md" onPress={() => addItemToBasket(items[0]?.id, items[0]?.name, items[0]?.description, items[0]?.price, items[0]?.image)}>
                                        <PlusIcon size={10} color="rgb(34, 197, 94)" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text className="font-bold">&#8377;{items[0]?.price * items.length}</Text>
                        </View>
                    ))}
                </View>)}           

            </ScrollView>

            <View className="bg-white px-3 pb-3 pt-10 rounded-t-3xl space-y-2">
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500">Subtotal</Text>
                    <Text className="text-gray-500">&#8377;{basketTotal}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500">Delivery Charges</Text>
                    <Text className="text-gray-500">&#8377;{deliveryCharge}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500">GST (5% of subtotal)</Text>
                    <Text className="text-gray-500">&#8377;{tax}</Text>
                </View>
                <View className="flex-row items-center justify-between pb-2">
                    <Text className="font-bold text-base">Total</Text>
                    <Text className="font-bold text-base">&#8377;{total}</Text>
                </View>
                <TouchableOpacity className="bg-blue-500 px-3 py-5 rounded-xl" onPress={() => navigation.navigate("PreparingOrderScreen")}>
                    <Text className="text-center text-white font-bold text-md">Proceed to payment</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default BasketScreen