import { registerRootComponent } from 'expo';

import App from './App';
// import App from './support/TPDrawer/App';
import Inscription from './MainApp/Screen/Inscirption';
import Connexion from './MainApp/Screen/Connexion';
import StackNavigator from './MainApp/Composant/stacknavigator';
import Catalogue from './MainApp/Screen/Catalogue';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);
