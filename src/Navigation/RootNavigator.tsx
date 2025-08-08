import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../Helpers/globalFunction';
import Login from '../Screens/Login';
import OTPVerification from '../Screens/OTPVarification';
import SelectLanguage from '../Screens/SelectLanguage';
import Onboarding from '../Screens/Onboarding';

function RootNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
