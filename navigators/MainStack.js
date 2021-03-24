import React from 'react';
import { Text, View } from 'react-native';
import MainScreen from '../screens/MainScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Coming Soon!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const MainStack = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      barStyle={{ backgroundColor: colors.primary }}
      shifting={true}
    >
      <Tab.Screen
        name='List'
        component={MainScreen}
        options={{
          tabBarIcon: 'receipt',
          tabBarAccessibilityLabel: 'List',
        }}
      />
      <Tab.Screen
        name='Pantry'
        component={NotificationsScreen}
        options={{
          tabBarIcon: 'wardrobe',
          tabBarAccessibilityLabel: 'Pantry',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
