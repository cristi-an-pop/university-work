import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MemoryListScreen from './screens/MemoryListScreen';
import CreateMemoryScreen from './screens/CreateMemoryScreen';
import UpdateMemoryScreen from './screens/UpdateMemoryScreen';
import { RootStackParamList } from './models/RootStackParamList';
import { initDatabase } from './utils/DatabaseUitls';
import MemoryDetailsScreen from './screens/MemoryDetailsScreen';
import { colors } from './styles';
import WebSocketService from './service/WebSocketService';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase().catch((error) => {console.error("Error initializing database", error);});

    WebSocketService.getInstance();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.dark,
          },
          headerTintColor: colors.lighttext,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen name="MemoryList" component={MemoryListScreen} options={{ title: 'Memories List' }}/>
        <Stack.Screen name="CreateMemory" component={CreateMemoryScreen} options={{ title: 'Add Memory' }}/>
        <Stack.Screen name="UpdateMemory" component={UpdateMemoryScreen} options={{ title: 'Update Memory' }}/>
        <Stack.Screen name="MemoryDetails" component={MemoryDetailsScreen} options={{ title: 'Memory Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
