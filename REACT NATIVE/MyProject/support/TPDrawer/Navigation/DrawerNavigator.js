import { createDrawerNavigator } from '@react-navigation/drawer';
import { AccueilScreen } from '../screens/AccueilScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ParametresScreen } from '../screens/PrametresScreen';

;

//permet de créer une navigation par tiroir (menu latéral)
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
return (
        //initialRouteName: définir l'écran affiché par défaut à l'ouverture de l'app
        <Drawer. Navigator initialRouteName="Accueil">
        {/* définir un écran dans ton Drawer. Navigator */}
            <Drawer. Screen name="Accueil" component={AccueilScreen} />
            <Drawer. Screen name="Profil" component={ProfileScreen} />
            <Drawer. Screen name="Paramètres" component={ParametresScreen} />
        </Drawer. Navigator>
)
}
