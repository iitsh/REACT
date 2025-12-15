import { Text, View, Pressable,ScrollView} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../Style/style';

const Menu = ({navigation, panier}) => {

    return (
        <SafeAreaView style={{flex:1}} >
            <View>
                <Pressable style={{backgroundColor:'cyan', padding:7, borderRadius:9, alignSelf: 'flex-start', marginLeft: 320}} onPress={() => navigation.navigate('Panier')}>
                    <Text style={styles.cartText}>🛒 {panier.length}</Text>
                </Pressable>
            </View>
            
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{padding:20, marginLeft:60}}>
        {/*style= {flexDirection:'row'} c'est pour aligner horizantalement , mais on peut pas scroller si on a beaucoup de bouttons horizantalement*/}

            <View style={{marginTop:40}}>
            <Pressable style={{padding:10, backgroundColor:'lightgreen', marginRight:5}} onPress={() => navigation.navigate('Catalogue')}>
            <Text>Accueil</Text>
            </Pressable>
            </View>

            <View style={{marginTop:40}}>
            <Pressable style={{padding:10, backgroundColor:'lightgreen', marginRight:5}} onPress={() => navigation.navigate('Inscription')}>
            <Text>Inscription</Text>
            </Pressable>
            </View>

            <View style={{marginTop:40}}>
            <Pressable style={{padding:10, backgroundColor:'lightgreen', marginRight:5}} onPress={() => navigation.navigate('Connexion')}>
            <Text>Connexion</Text>
            </Pressable>
            </View>


        </ScrollView>
        </SafeAreaView>
    )} 
export default Menu