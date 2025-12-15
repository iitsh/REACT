import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { ProfileScreen } from '../../TPDrawer/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
return (
    <Drawer.Navigator initialRouteName="Menu Principal">
    <Drawer.Screen name="Menu Principal" component={TabNavigator} options={{ drawerIcon : ({color, size}) => <Ionicons name="home" size={size} color={color} />}} />
    {/* signifie que le Drawer contient une entrée appelée "Menu Principa.
    et que cette entrée affiche le composant TabNavigator,
    c'est-à-dire le menu Bottom Tabs. */}
    <Drawer.Screen name="Profil" component={ProfileScreen} options={{ drawerIcon : ({color, size}) => <Ionicons name="person" size={size} color={color} />}} />
    </Drawer.Navigator>

)
}
