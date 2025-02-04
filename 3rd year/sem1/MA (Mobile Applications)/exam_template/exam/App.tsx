import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './app/models/RootStackParamList';
import { initDatabase } from './app/utils/DatabaseUitls';
import { colors } from './styles/style';
import WebSocketService from './app/services/WebSocketService';
import ListScreen from './app/screens/ListScreen';
import CreateScreen from './app/screens/CreateScreen';
import UpdateScreen from './app/screens/UpdateScreen';
import DetailsScreen from './app/screens/DetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase().catch((error) => {console.error("Error initializing database", error);});

    //WebSocketService.getInstance();
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
        <Stack.Screen name="ItemList" component={ListScreen} options={{ title: 'List' }}/>
        <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create' }}/>
        <Stack.Screen name="Update" component={UpdateScreen} options={{ title: 'Update' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
