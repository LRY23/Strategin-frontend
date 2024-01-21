import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import UtilisateurScreen from './screens/UtilisateurScreen';
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen';

import users from './reducers/users';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore ({
  reducer: { users },
});

const TabNavigator = () => {
  return (   
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';

              if (route.name === 'Utilisateur') {
                iconName = 'users';
              } else if (route.name === 'Profil') {
                iconName = 'gear';
              }
              return <FontAwesome name={`${iconName}`} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0554ca',
            tabBarInactiveTintColor: '#335561',
            headerShown: false,
          })}>
        <Tab.Screen name="Utilisateur" component={UtilisateurScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
  );
 }

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}