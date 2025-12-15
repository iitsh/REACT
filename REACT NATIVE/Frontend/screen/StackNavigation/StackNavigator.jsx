
import { createStackNavigator } from '@react-navigation/stack';
import { Inscription } from '../Inscription';
import { Connexion } from '../Connexion';
import { Espace_client } from '../espace_client';



const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inscription" >
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="espace_client" component={Espace_client} />
    </Stack.Navigator>
  );
}
