
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Catalogue from './Catalogue';
import Panier from './Panier';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Catalogue">
      <Stack.Screen name="Catalogue" component={Catalogue} />
      <Stack.Screen name="Panier" component={Panier} />
    </Stack.Navigator>
  );
}
