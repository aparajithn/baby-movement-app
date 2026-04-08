import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { ExerciseListScreen } from './src/screens/ExerciseListScreen';
import { ExerciseDetailScreen } from './src/screens/ExerciseDetailScreen';
import { MilestonesScreen } from './src/screens/MilestonesScreen';
import { RoutinePlayerScreen } from './src/screens/RoutinePlayerScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Simple placeholder for Settings screen
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, color: colors.textPrimary }}>Settings</Text>
      <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 16 }}>Baby Movement App v1.0</Text>
    </View>
  );
}

// Tab icons
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    Exercises: '📋',
    Milestones: '📊',
    Settings: '⚙️',
  };
  return (
    <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>{icons[name] || '📱'}</Text>
  );
};

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Exercises" 
        component={ExerciseListScreen} 
        initialParams={{ minAge: undefined, maxAge: undefined }}
      />
      <Tab.Screen name="Milestones" component={MilestonesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="ExerciseList" 
            component={ExerciseListScreen}
            options={{ presentation: 'card' }}
          />
          <Stack.Screen 
            name="ExerciseDetail" 
            component={ExerciseDetailScreen}
            options={{ presentation: 'card' }}
          />
          <Stack.Screen 
            name="RoutinePlayer" 
            component={RoutinePlayerScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
