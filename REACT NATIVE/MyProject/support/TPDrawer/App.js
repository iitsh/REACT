import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../TPDrawer_bottom/Navigation/DrawerNavigator';

export default function App() {
return (
    //NavigationContainer : permet à ton app de gérer les transitions entre les écrans
<NavigationContainer>
    <DrawerNavigator />
</NavigationContainer>
)
}
