import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import PortfolioScreen from '../screens/PortfolioScreen';
import MercadosScreen from '../screens/MercadosScreen';
import IAScreen from '../screens/IAScreen';
import AlertasScreen from '../screens/AlertasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => (
  <Text style={{ fontSize: 22 }}>{name}</Text>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#1a1a1a',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#555',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tab.Screen name="Portfolio" component={PortfolioScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="💼" focused={focused} />, tabBarLabel: 'Portfolio' }} />
      <Tab.Screen name="Mercados" component={MercadosScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="📊" focused={focused} />, tabBarLabel: 'Mercados' }} />
      <Tab.Screen name="IA" component={IAScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="🤖" focused={focused} />, tabBarLabel: 'IA Señales' }} />
      <Tab.Screen name="Alertas" component={AlertasScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="🔔" focused={focused} />, tabBarLabel: 'Alertas' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} />, tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}