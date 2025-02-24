import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from './app/screens/ListScreen';
import CreateScreen from './app/screens/CreateScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import UpdateScreen from './app/screens/UpdateScreen';
import AnalyticsScreen from './app/screens/AnalyticsScreen';
import ReadingBooksScreen from './app/screens/ReadingBooksScreen';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from './styles/style';
import { initDatabase } from './app/utils/DatabaseUitls';
import { RootStackParamList } from './app/models/RootStackParamList';
import { useBookStore } from './app/stores/Store';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ListStack = () => (
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
    <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'List' }} />
    <Stack.Screen name="CreateScreen" component={CreateScreen} options={{ title: 'Create' }} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Details' }} />
    <Stack.Screen name="UpdateScreen" component={UpdateScreen} options={{ title: 'Update' }} />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
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
    <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{ title: 'Analytics' }} />
  </Stack.Navigator>
);

const ReadingStack = () => (
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
    <Stack.Screen name="ReadingScreen" component={ReadingBooksScreen} options={{ title: 'Reading' }} />
  </Stack.Navigator>
);

export default function App() {
  const { isOffline } = useBookStore();
  useEffect(() => {
    initDatabase().catch((error) => {console.error("Error initializing database", error);});
  }, []);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';

              if (route.name === 'List') {
                iconName = 'list';
              } else if (route.name === 'Analytics') {
                iconName = 'bar-chart';
              } else if (route.name === 'Reading') {
                iconName = 'book';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="List" component={ListStack} />
          {!isOffline && <Tab.Screen name="Analytics" component={AnalyticsStack} /> }
          {!isOffline && <Tab.Screen name="Reading" component={ReadingStack} /> }
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}