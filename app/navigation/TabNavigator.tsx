import React, { useEffect, useRef } from 'react';
import { Platform, Image, View, Animated, ImageSourcePropType, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import QuoteScreen from '../quote/QuoteScreen';
import ProfileScreen from '../profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 3;

interface TabIconProps {
  source: ImageSourcePropType;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ source, focused, size = 34 }) => {
  const translateY = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const config = {
      duration: 200,
      useNativeDriver: true,
    };

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: focused ? -12 : 0,
        ...config,
      }),
      Animated.timing(scale, {
        toValue: focused ? 1.2 : 1,
        ...config,
      }),
    ]).start();
  }, [focused]);

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
    }}>
      <Animated.View
        style={{
          transform: [
            { translateY },
            { scale }
          ],
        }}
      >
        <Image
          source={source}
          style={{
            width: size,
            height: size,
          }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default function TabNavigator() {
  const tabIndicatorPosition = useRef(new Animated.Value(0)).current;
  const prevIndex = useRef(0);

  const handleTabPress = (index: number) => {
    Animated.spring(tabIndicatorPosition, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      damping: 20,
      mass: 0.7,
      stiffness: 120,
    }).start();
    prevIndex.current = index;
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: false,
          tabBarStyle: {
            height: 60,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            backgroundColor: 'white',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          tabBarItemStyle: {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }
        }}
        screenListeners={{
          tabPress: (e) => {
            const routeName = e.target?.split('-')[0];
            const index = routeName === 'Home' ? 0 : routeName === 'Quote' ? 1 : 2;
            handleTabPress(index);
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                source={require('../../assets/pokeball-icon.png')}
                focused={focused}
                size={focused ? 44 : 34}
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Quote" 
          component={QuoteScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                source={require('../../assets/RvK-logo.png')}
                focused={focused}
                size={focused ? 48 : 38}
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                source={require('../../assets/trainer-icon.png')}
                focused={focused}
                size={focused ? 44 : 34}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 8,
          width: TAB_WIDTH * 0.3,
          height: 3,
          backgroundColor: '#45B3B4',
          borderRadius: 1.5,
          transform: [{ translateX: tabIndicatorPosition }],
          left: TAB_WIDTH * 0.35, // Center the line within the tab
        }}
      />
    </View>
  );
} 