import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenUser from './screens/ScreenUser';
import ScreenDetailUser from './screens/ScreenDetailUser';
import MedicineScreen from './screens/MedicineScreen';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import ForgetPass from './screens/ForgetPass';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} options={{ title: 'Forget Pass' }} />
        <Stack.Screen name="ScreenUser" component={ScreenUser} options={{ title: 'User List' }} />
        <Stack.Screen name="ScreenDetailUser" component={ScreenDetailUser} options={{ title: 'User Detail' }} />
        <Stack.Screen name="MedicineScreen" component={MedicineScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}