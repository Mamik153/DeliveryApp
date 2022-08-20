import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal)
    
    return (
        <>
            {items?.length > 0 && (
                <View className="absolute bottom-3 w-full z-50 px-3 flex-row justify-center">
                    <TouchableOpacity onPress={() => {
                                navigation.navigate('Basket')
                            }} className="bg-black flex-row items-center justify-between w-full px-5 py-5 rounded-xl">
                        <Text className="text-white font-semibold text-md">{items.length} {items.length > 1 ? 'items' : 'item'} | &#8377;{basketTotal}</Text>
                        <Text className="text-white font-semibold text-md">View Cart</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>       
        
    )
}

export default BasketIcon