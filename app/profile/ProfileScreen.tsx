import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSettings } from '../../context/SettingsContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const currencies = [
  { label: "PEN - Peruvian Sol", value: "PEN" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "MXN - Mexican Peso", value: "MXN" },
  { label: "COP - Colombian Peso", value: "COP" },
  { label: "CLP - Chilean Peso", value: "CLP" }
];

export default function ProfileScreen() {
  const { currency, setCurrency, exchangeRate, setExchangeRate } = useSettings();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <StyledScrollView 
        className="flex-1 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Header */}
        <StyledView className="bg-white rounded-2xl shadow p-4 mb-6 flex-row items-center space-x-4">
          <StyledView className="w-16 h-16 bg-gray-200 rounded-full" />
          <StyledView>
            <StyledText className="text-lg font-semibold text-gray-800">PokéCollector</StyledText>
            <StyledText className="text-sm text-gray-500">Member since April 2023</StyledText>
          </StyledView>
        </StyledView>

        {/* Currency Settings */}
        <StyledView className="bg-white rounded-2xl shadow p-4 mb-6">
          <StyledText className="text-base font-bold text-gray-800 mb-4">Currency Settings</StyledText>

          <StyledText className="text-sm font-medium mb-2">Currency</StyledText>
          <View className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Picker
              selectedValue={currency}
              onValueChange={(itemValue) => setCurrency(itemValue)}
              style={{ 
                backgroundColor: 'white',
                height: 48,
                width: '100%',
              }}
            >
              {currencies.map((curr) => (
                <Picker.Item 
                  key={curr.value} 
                  label={curr.label} 
                  value={curr.value}
                  style={{
                    fontSize: 14,
                    color: '#111827',
                  }}
                />
              ))}
            </Picker>
          </View>

          <StyledView className="flex-row justify-between items-center mt-6 mb-2">
            <StyledText className="text-sm text-gray-600">Exchange Rate</StyledText>
            <StyledText className="text-sm text-[#45B3B4] font-medium">
              1 USD = {exchangeRate.toFixed(2)}
            </StyledText>
          </StyledView>

          <Slider
            minimumValue={1.0}
            maximumValue={5.0}
            step={0.05}
            value={exchangeRate}
            onValueChange={setExchangeRate}
            minimumTrackTintColor="#45B3B4"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#45B3B4"
          />

          <StyledView className="flex-row justify-between mt-2 px-1">
            {['1.00', '2.00', '3.00', '4.00', '5.00'].map((label, i) => (
              <StyledText key={i} className="text-xs text-gray-400">{label}</StyledText>
            ))}
          </StyledView>
        </StyledView>

        {/* App Preferences */}
        <StyledView className="bg-white rounded-2xl shadow p-4 mb-6">
          <StyledText className="text-base font-bold text-gray-800 mb-4">App Preferences</StyledText>

          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledView>
              <StyledText className="text-sm text-gray-800">Dark Mode</StyledText>
              <StyledText className="text-xs text-gray-500">Switch to dark theme</StyledText>
            </StyledView>
            <Switch 
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              disabled={true}
              trackColor={{ false: '#D1D5DB', true: '#45B3B4' }}
            />
          </StyledView>

          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledView>
              <StyledText className="text-sm text-gray-800">Notifications</StyledText>
              <StyledText className="text-xs text-gray-500">Price alerts and updates</StyledText>
            </StyledView>
            <Switch 
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: '#45B3B4' }}
            />
          </StyledView>

          <StyledTouchableOpacity className="flex-row justify-between items-center">
            <StyledText className="text-sm text-gray-800">Language</StyledText>
            <StyledText className="text-sm text-gray-400">English (US)</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Account Section */}
        <StyledView className="bg-white rounded-2xl shadow p-4 mb-6 space-y-4">
          <StyledTouchableOpacity>
            <StyledText className="text-sm text-gray-800">Privacy & Security</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity>
            <StyledText className="text-sm text-gray-800">Help & Support</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Sign Out Button */}
        <StyledTouchableOpacity 
          className="bg-red-500 rounded-2xl p-4 items-center mt-2"
          activeOpacity={0.7}
          onPress={() => {
            // Handle sign out
          }}
        >
          <StyledText className="text-white font-bold">Sign Out</StyledText>
        </StyledTouchableOpacity>

        <StyledView className="h-4" />
      </StyledScrollView>
    </StyledSafeAreaView>
  );
} 