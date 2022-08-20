import { View, Text, SafeAreaView, Image, Platform, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import {
    UserCircleIcon,
    ChevronDownIcon,
    SearchIcon,
    QrcodeIcon
} from "react-native-heroicons/outline"

import Categories from '../components/Categories'

import { SvgUri } from 'react-native-svg';
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
//import * as Animatable from "react-native-animatable"



const HomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true)
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
     navigation.setOptions({
        headerShown: false,
     })
    }, [])


    useEffect(() => {
        
        sanityClient.fetch(`
        *[_type == "featured"]{
            ...,
            restaurants[]->{
              ...,
              dishes[]->,    
            }
          }
        `).then(data => {
            setFeaturedCategories(data);
            setLoading(false)
        })
    }, [])
    
    //console.log("featuredCategories", featuredCategories)
    if(loading){
        return(
            <View className="bg-blue-900  flex-1 ">
                <View className="items-center justify-center  flex-1 pt-32">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru"
                        }}  
                        className="w-24 h-24"    
                    />
                    <Text className="text-center text-emerald-200 text-2xl font-semibold pt-2">Deliveroo</Text>
                </View>
                <View className="pt-10 pb-4">
                    <Text className="text-center text-white text-xs font-semibold pt-4">Powered By</Text>
                    <Text className="text-center text-white text-3xl font-semibold pt-1">Sanity</Text>
                </View>
                
            </View>
        )

    }else{
        return (
            <>
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === 'android' ? 50 : 0,
                    backgroundColor: "#FFFBFE",            
                    maxWidth: 800,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                }} >
                <View className="px-3">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row py-3 items-center space-x-4 flex-1">
                            {/* <SvgUri
                                width="30px"
                                height="30px"
                                uri="https://media.foodinvites.com/static/ManifestLogo.svg"
                            /> */}
                            <Image
                                source={{
                                    uri: "https://links.papareact.com/wru"
                                }}  
                                className="w-8 h-8 rounded-full"    
                            />
                            <View>
                                <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
        
                                <TouchableOpacity
                                    className=" flex-row items-center"
                                    onPress={() => {
                                        navigation.navigate('Address')
                                    }}    
                                >
                                    <Text className="font-bold text-xl">Home</Text>
                                    <ChevronDownIcon size={15} color="#111" />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
        
                        <TouchableOpacity onPress={() => { navigation.navigate('Account') }}>
                            <UserCircleIcon size={35} color="#6750A4" />
                        </TouchableOpacity>
                    </View>
        
                    <View className="flex-row items-center py-3 space-x-4">
                        <View 
                            className="flex-row items-center space-x-2 flex-1 py-2 px-3 rounded-3xl "
                            style={{
                                backgroundColor: "#F3EDF7"
                            }}
                        >
                            <SearchIcon size={20} color="gray" />
                            <TextInput placeholder="Search for your favourite" keyboardType="default" />
                        </View>
        
                        <TouchableOpacity className="p-2 rounded-xl" style={{ backgroundColor: "#EEE8F4" }}>    
                            <QrcodeIcon size={30} color="#6750A4" />
                        </TouchableOpacity>
                    </View>
                </View>
        
                
                
                <ScrollView className="py-3" contentContainerStyle={{ paddingBottom: 50 }}>
                    {/* Categories */}
                    <Categories />
                    {featuredCategories?.map((category, index) => (
                           
                            <FeaturedRow
                                key={category._id}
                                id={category._id}
                                title={category.name}
                                description={category.short_description}
                            />
                            
                        ))}
        
                        <View className="pt-12 px-3 pb-40">
                            <Text className="text-lg font-medium text-emerald-300">Powered By</Text>
                            <Text className="text-7xl font-extrabold text-sky-200 pt-4">Sanity</Text>    
                        </View>            
                    
                </ScrollView>
                
               
            </SafeAreaView>
            {/* <View className="h-16 w-full fixed bottom-0 left-0 z-50 p-3" style={{ 
                backgroundColor: "#FFFBFE",
                boxShadow: '0px 0 10px rgba(0, 0, 0, 0.8)',
                elevation: 20
             }}>
                <Text>APP BAR HERE</Text>
            </View> */}
            </>
            
          )
    }
  
}

export default HomeScreen