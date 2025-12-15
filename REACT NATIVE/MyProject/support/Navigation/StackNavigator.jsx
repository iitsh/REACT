
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './StackNavigation/Screens/HomeScreen';
import PageA from './StackNavigation/Screens/PageA';
import PageB from './StackNavigation/Screens/pageB';
import PageC from './StackNavigation/Screens/PageC';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PageA" component={PageA} />
      <Stack.Screen name="PageB" component={PageB} />
        <Stack.Screen name="PageC" component={PageC} />
    </Stack.Navigator>
  );
}
