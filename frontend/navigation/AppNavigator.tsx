import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ToDoScreen from '../screens/ToDoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen}
          options={({ navigation }) => ({
            headerLeft: () => null, // Hides the back button
            headerTitle: "To-Do List",
            headerBackVisible: false,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Login')}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
