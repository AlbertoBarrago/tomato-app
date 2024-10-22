import {Tabs} from 'expo-router';
import React, {useLayoutEffect} from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tomato',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'timer' : 'timer-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'help' : 'help-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
