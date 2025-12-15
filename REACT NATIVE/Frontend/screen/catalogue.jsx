import { useEffect, useState, useMemo, useCallback } from "react";
import {View, Text, FlatList, TextInput} from "react-native";
import {styles} from '../styles/Catalogue.styles';
import { SafeAreaView } from "react-native-safe-area-context";

export const Catalogue = () => {
    const [produits, setProduits] = useState([]);
    const [erreur, setErreur] = useState(null);
    const [recherche, setRecherche] = useState('');

    useEffect (() =>{
        const chargerProduits = async () => {
            try{
                // 10.0.2.2 is the special IP for Android Emulator to reach the host machine's localhost
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
        }
        chargerProduits();
    }, []);

    const produitsFiltres = useMemo(() => {
        return produits.filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase())
        );
    }, [produits, recherche]);
      
    const renderItem = useCallback(({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.nom}</Text>
            <Text>{item.categorie} - {item.prix} €</Text>
            <Text>{item.description}</Text>
            <Text>Stock : {item.stock} | Disponible : {item.disponible ? 'Oui' : 'Non'}</Text>
        </View>
    ), []);

    if (erreur) return <Text style={styles.erreur}>Erreur : {erreur}</Text>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <TextInput
                    placeholder="Rechercher un produit..."
                    value={recherche}
                    onChangeText={setRecherche}
                    style={{
                        borderWidth: 1,
                        borderColor: '#110404ff',
                        borderRadius: 5,
                        padding: 8,
                        marginBottom: 10,
                    }}
                />
                <FlatList
                    data={produitsFiltres}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}