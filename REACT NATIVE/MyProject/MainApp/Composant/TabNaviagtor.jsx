import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Catalogue from '../Screen/Catalogue';
import Menu from '../Screen/Menu';
import Panier from '../Screen/Panier';
import Connexion from '../Screen/Connexion';
import Inscription from '../Screen/Inscirption';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ panier, setPanier, initialRouteName }) {
  return (
    <Tab.Navigator initialRouteName={initialRouteName || "Accueil"}>
      <Tab.Screen
        name="Accueil"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      >
        {(props) => <Menu {...props} panier={panier} setPanier={setPanier} />}
      </Tab.Screen>
      <Tab.Screen
        name="Catalogue"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> }}
      >
        {(props) => <Catalogue {...props} panier={panier} setPanier={setPanier} />}
      </Tab.Screen>
      <Tab.Screen
        name="Panier"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }}
      >
        {(props) => <Panier {...props} panier={panier} setPanier={setPanier} />}
      </Tab.Screen>
      <Tab.Screen
        name="Connexion"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="log-in" size={size} color={color} /> }}
      >  
        {(props) => <Connexion {...props} panier={panier} setPanier={setPanier} />}
      </Tab.Screen>
      <Tab.Screen
        name="Inscription"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-add" size={size} color={color} /> }}
      >
        {(props) => <Inscription {...props} panier={panier} setPanier={setPanier} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
