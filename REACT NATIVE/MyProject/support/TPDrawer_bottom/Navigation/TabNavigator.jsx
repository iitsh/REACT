import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccueilScreen } from '../../TPDrawer/screens/AccueilScreen';
import { ParametresScreen } from '../../TPDrawer/screens/PrametresScreen';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
return (
<Tab.Navigator>
    <Tab.Screen name="Accueil" component={AccueilScreen} options={{tabBarIcon : ({color, size}) => <Ionicons name="home" size={size} color={color} />}}/>
    <Tab.Screen name="Paramètres" component={ParametresScreen} options={{tabBarIcon : ({color, size}) => <Ionicons name="settings" size={size} color={color} />}}/>
</Tab.Navigator>
)
}
