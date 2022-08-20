import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from "../sanity.js"
import { useNavigation } from '@react-navigation/native'

const CategoriesCard = ({ id, imgUrl, title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="mr-2 relative rounded-xl w-20" id={id}>
      <Image source={{ uri: urlFor(imgUrl).width(200).url() }} className="bg-sky-100  h-20 w-20 rounded-full" />
      <Text className="text-center text-black text-xs pt-1" numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoriesCard