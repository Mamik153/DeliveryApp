import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import RestaurantCollectionScreen from './screens/RestaurantCollectionScreen';
import AddressSelectorScreen from './screens/AddressSelectorScreen';
import AccountScreen from './screens/AccountScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import { XIcon } from 'react-native-heroicons/solid';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen} />
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen 
              name='Address' 
              component={AddressSelectorScreen} 
              options={{ presentation: 'modal' }} 
            />
            <Stack.Screen 
              name='Restaurant Collection' 
              component={RestaurantCollectionScreen} 
              options={{ presentation: 'fullScreenModal', headerShown: false }}
            />
            <Stack.Screen 
              name='Basket' 
              component={BasketScreen} 
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen 
              name="PreparingOrderScreen" 
              component={PreparingOrderScreen} 
              options={{ presentation: 'fullScreenModal', headerShown: false }}
            />
            <Stack.Screen 
              name="Delivery" 
              component={DeliveryScreen} 
              options={{ presentation: 'fullScreenModal' }}
            />
          </Stack.Navigator> 
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
    
   
  );
}