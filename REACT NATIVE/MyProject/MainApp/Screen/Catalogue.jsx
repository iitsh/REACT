import { SafeAreaView} from 'react-native-safe-area-context';
import {Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import styles from '../Style/style';
import { produits } from '../Data/Data';
import Articles from '../Composant/Article';
import { View } from 'react-native';
import { UserContext } from '../context/UserContext';

const Catalogue = ({navigation, panier, setPanier}) => {
  const { user } = useContext(UserContext);
  const [produits, setProduits] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState('');

  const ajouterAuPanier = useCallback((produit) => {
    setPanier((prev) => [...prev, produit]);
  }, [setPanier]);

  useEffect (() =>{
        const chargerProduits = async () => {
            try{
                // 10.0.2.2 is for Android Emulator to access host localhost
                const res = await fetch('http://10.0.2.2:3000/api/produits');
                console.log("Response status:", res.status);
                
                if(!res.ok){
                    throw new Error('Echec de chargement des produits');
                }
                const data = await res.json();
                setProduits(data);
            }
            catch(error){
                console.error("Erreur fetch:", error);
                setErreur(error.message);
            }
            finally{

            }
        }
        chargerProduits();
    }, []);
    const produitsFiltres = useMemo(() => {
        return produits.filter(p =>
            p.nom.toLowerCase().includes(recherche.toLowerCase())
        );
    }, [produits, recherche]);

    if (erreur) return <Text style={styles.erreur}>Erreur : {erreur}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        {user && <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Bonjour, {user.nom}</Text>}
        <TouchableOpacity
            style={styles.cartBadge}
            onPress={() => navigation.navigate('Panier')}
          >
            <Text style={styles.cartText}>🛒 {panier.length}</Text>
          </TouchableOpacity>
        <TextInput placeholder="🔍    Rechercher..." style={{backgroundColor: 'white', padding: 10, marginLeft:65, borderRadius:10, width:'70%'}} value={recherche} onChangeText={setRecherche}/>
      </View>

      <FlatList
        data={produitsFiltres}
        keyExtractor={(item, index) => String(item.id || item._id || index)}
        renderItem={({ item }) => (
          <Articles item={item} onAddToCart={() => ajouterAuPanier(item)} />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default Catalogue;
