import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { Inscription } from './screen/Inscription';
import { Connexion } from './screen/Connexion';
import { Espace_client } from './screen/espace_client';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './screen/StackNavigation/StackNavigator';
import { UserProvider } from './context/UserContext';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </UserProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
