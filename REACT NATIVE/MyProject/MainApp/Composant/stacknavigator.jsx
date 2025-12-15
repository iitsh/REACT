import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerNavigator } from './DrawerNavigator';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [panier, setPanier] = useState([]);

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <DrawerNavigator {...props} panier={panier} setPanier={setPanier} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
