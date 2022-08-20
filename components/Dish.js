import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { useDispatch, useSelector } from 'react-redux'
import {
   MinusIcon,
   PlusIcon
} from "react-native-heroicons/solid"
import { addToBasket, selectBasketItemsWithId, removeFromBasket } from '../features/basketSlice'

const Dish = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        if(isPressed == false){
            setIsPressed(true);
        }
        
        dispatch(addToBasket({ id, name, description, price, image }))

        //console.log(items.length)
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0){
            setIsPressed(false);
            return
        }

        dispatch(removeFromBasket({ id }))
        //console.log(items.length)

        if(items.length == 0){
            setIsPressed(false)
        }
    }

    return (        
        <View              
            id={id} 
            className="flex-row my-2"
        >
            <View className="flex-row justify-between w-full">    
                <View className="relative">
                    <Image
                        source={{
                            uri: urlFor(image).url(),
                        }}
                        className="w-20 h-20 rounded-2xl p-4"
                    />
                    {isPressed ? (
                        <View className="w-4/5 left-2 -top-3 bg-white border border-green-600  rounded-md">
                            <View className="flex-row justify-between items-center space-x-2">
                                
                                <TouchableOpacity onPress={removeItemFromBasket} className="py-2 px-1 rounded-l-md">
                                    <MinusIcon size={10} color="rgb(34, 197, 94)" />
                                </TouchableOpacity>
                                <Text className="text-xs font-bold text-green-500">{items.length}</Text>
                                <TouchableOpacity className="py-2 px-1 rounded-r-md" onPress={addItemToBasket}>
                                    <PlusIcon size={10} color="rgb(34, 197, 94)" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity className="w-4/5 left-2 -top-3 bg-white border border-green-600  rounded-md" onPress={addItemToBasket}>
                            <Text className=" py-1 text-center text-green-600 font-semibold">ADD</Text>
                        </TouchableOpacity>
                    )}
                </View>   
                <View className="flex-1 pl-2">
                    <Text className="text-lg font-medium">{name}</Text>
                    <Text className="text-gray-600 font-medium text-md">&#8377;{price}</Text>               
                    <Text className="text-xs text-gray-400" numberOfLines={2}>{description}</Text> 
                    
                </View> 
            </View>      
        </View>
        
    )
}

export default Dish