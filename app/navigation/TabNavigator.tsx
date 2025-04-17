import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from '../home/HomeScreen';
import QuoteScreen from '../quote/QuoteScreen';
import ProfileScreen from '../profile/ProfileScreen';
import { TAB_BAR_HEIGHT, ICON_SIZE, ACTIVE_COLOR, INACTIVE_COLOR } from '../constants/layout';

export type TabParamList = {
  Home: undefined;
  Quote: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingBottom: 0
      }
    })
  },
  tabBarItem: {
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  }
});

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons 
              name="home" 
              size={ICON_SIZE} 
              color={color}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Quote" 
        component={QuoteScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/RvK-logo.png')}
              style={[styles.icon, { resizeMode: 'contain' }]}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign 
              name="smileo" 
              size={ICON_SIZE} 
              color={color}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 