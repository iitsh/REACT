import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './MainApp/Composant/stacknavigator';
import { UserProvider } from './MainApp/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <SafeAreaView style={{flex:1}}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
}
