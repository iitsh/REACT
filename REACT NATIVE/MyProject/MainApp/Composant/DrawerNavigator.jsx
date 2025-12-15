import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNaviagtor';





const Drawer = createDrawerNavigator();

export const DrawerNavigator = ({ panier, setPanier }) => {
  return (

    <Drawer.Navigator initialRouteName="Accueil">
      <Drawer.Screen
        name="Accueil"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      >
        {(props) => <TabNavigator {...props} panier={panier} setPanier={setPanier} initialRouteName="Panier"/>}
      </Drawer.Screen>
      <Drawer.Screen
        name="Catalogue"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> }}

      >
        {(props) => <TabNavigator {...props} panier={panier} setPanier={setPanier} initialRouteName="Catalogue" />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Panier"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }}

      >
        {(props) => <TabNavigator {...props} panier={panier} setPanier={setPanier} initialRouteName="Panier" />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Connexion"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="log-in" size={size} color={color} /> }}

      >
        {(props) => <TabNavigator {...props} panier={panier} setPanier={setPanier} initialRouteName="Connexion" />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Inscription"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="person-add" size={size} color={color} /> }}

      >
        {(props) => <TabNavigator {...props} panier={panier} setPanier={setPanier} initialRouteName="Inscription" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
