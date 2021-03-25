import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';

const styles = StyleSheet.create({
  notificationScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function NotificationsScreen() {
  return (
    <View style={styles.notificationScreen}>
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
      shifting
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
