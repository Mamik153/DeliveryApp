import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Delivery")
      }, 4000)
    }, [])
    

  return (
    <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: '#004d76' }}>
        <Animatable.Image 
            source={require("../assets/foodLoading.gif")}
            animation="slideInUp"
            iterationCount={1}
            className="h-96 w-96"
        />
        {/* <Image
            source={require("../assets/foodLoading.gif")}
            className="h-96 w-96"
        /> */}
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-base my-10 text-white font-bold text-center relative -top-20"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle className="relative -top-16" size={40} indeterminate={true} color="white" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen