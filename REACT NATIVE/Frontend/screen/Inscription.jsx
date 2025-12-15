import { useState, useEffect } from "react";
import styles from '../styles/styles';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import { initDB } from "../Database/initdb";
import { InsertUser } from "../Database/Task";

 export const Inscription =({navigation})=>
 {

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  useEffect(() => {
    const setupDB = async () => {
      try {
        await initDB();
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    };

    setupDB();
  }, []);

  //methode pour verifier que les champs ne sont pas vider et pour inserer un utilisateur
    
    const handleInscription = async () => {
    if (nom && email && motDePasse) {
      try {
        await InsertUser(nom, email, motDePasse);
        Alert.alert('Inscription réussie', `Bienvenue, ${nom} !`);
        setNom('');
        setEmail('');
        setMotDePasse('');
      } catch (error) {
        console.error('Erreur lors de l\'insertion :', error);
        Alert.alert('Erreur', 'Impossible d\'insérer l\'utilisateur.');
      }
    } else {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
    }
  };


return (
   
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire d'inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
       value={nom}
       onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
       value={email}
       onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
       value={motDePasse}
       onChangeText={setMotDePasse}
        secureTextEntry
      />

      {/* Bouton S'inscrire */}
      <TouchableOpacity style={styles.button} onPress={handleInscription}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <Pressable style={{marginTop:20}} onPress={() => navigation.navigate('Connexion')}>
        <Text style={{color:'blue', fontSize:15, fontWeight:'bold'}}>Déjà un compte ? Connexion</Text>
      </Pressable>

     
    </View>
  );
};
