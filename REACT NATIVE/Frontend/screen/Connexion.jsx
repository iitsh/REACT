import styles from '../styles/styles';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useContext, useEffect, useState } from "react";
import { initDB } from "../Database/initdb";
import { verifyUser } from '../Database/Task';
import { UserContext } from '../context/UserContext';


 export const Connexion =({ navigation })=>
 {

  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const { setUser } = useContext(UserContext)

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

     const handleConnexion = async () => {
    if (email && motDePasse) {
      try {
        const user = await verifyUser(email, motDePasse);
console.log("Résultat VerifUser:", user);
        if (user) {
          Alert.alert('Connexion réussie', 'Bienvenue !');
          console.log('Utilisateur authentifié');
         // Mettre l’utilisateur dans le contexte
        setUser({
    Nom: user.Nom,
    email: user.email
  });
          navigation.navigate('espace_client');
        } else {
          Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification :', error);
        Alert.alert('Erreur', 'Une erreur est survenue.');
      }
    } else {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
    }
  };

return (
   
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire de connexion</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={setMotDePasse}
        secureTextEntry
      />

      {/* Bouton S'inscrire */}
      <TouchableOpacity style={styles.button} onPress={handleConnexion}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <Pressable style={{marginTop:20}} onPress={() => navigation.navigate('Inscription')}>
              <Text style={{color:'blue', fontSize:15, fontWeight:'bold'}}>Pas de compte? Inscription</Text>
      </Pressable>

     
    </View>
  );
};
