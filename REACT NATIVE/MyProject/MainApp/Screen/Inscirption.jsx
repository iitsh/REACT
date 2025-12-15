import { useState, useEffect } from "react";
import styles from '../Style/authStyles';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, ScrollView } from 'react-native';
import { initDB } from "../Database/initdb";
import { InsertUser } from "../Database/Task";

export const Inscription = ({navigation}) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    numero: ''
  });
  const [erreurs, setErreurs] = useState({});

  const handleChange = (champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      [champ]: valeur
    }));
    
    // Efface l'erreur du champ quand l'utilisateur modifie
    if (erreurs[champ]) {
      setErreurs(prev => ({
        ...prev,
        [champ]: ''
      }));
    }
  };

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

  // Ensure database is initialized before allowing inscription
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeAndSetDb = async () => {
      try {
        await initDB();
        setDbInitialized(true);
      } catch (error) {
        console.error("Failed to initialize database:", error);
        setDbInitialized(false);
      }
    };
    initializeAndSetDb();
  }, []);

  // Vérification en temps réel de la correspondance des mots de passe
  useEffect(() => {
    if (formData.motDePasse && formData.confirmerMotDePasse) {
      if (formData.motDePasse !== formData.confirmerMotDePasse) {
        setErreurs(prev => ({
          ...prev,
          confirmerMotDePasse: 'Les mots de passe ne correspondent pas'
        }));
      } else {
        setErreurs(prev => ({
          ...prev,
          confirmerMotDePasse: ''
        }));
      }
    }
  }, [formData.motDePasse, formData.confirmerMotDePasse]);

  const validerFormulaire = () => {
    let nouvellesErreurs = {};

    if (!formData.nom.trim()) nouvellesErreurs.nom = 'Le nom est obligatoire';
    if (!formData.prenom.trim()) nouvellesErreurs.prenom = 'Le prénom est obligatoire';
    if (!formData.numero.trim()) nouvellesErreurs.numero = 'Le numéro est obligatoire';
    if (!formData.email.trim()) nouvellesErreurs.email = 'L\'email est obligatoire';
    if (!formData.motDePasse.trim()) nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
    if (!formData.confirmerMotDePasse.trim()) nouvellesErreurs.confirmerMotDePasse = 'La confirmation du mot de passe est obligatoire';

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      nouvellesErreurs.email = 'Le format de l\'email est invalide.';
    }

    // Validation du numéro
    if (formData.numero && !/^\d+$/.test(formData.numero.trim())) {
      nouvellesErreurs.numero = "Le numéro doit contenir uniquement des chiffres";
    } else if (formData.numero && formData.numero.trim().length !== 10) {
      nouvellesErreurs.numero = "Le numéro doit contenir exactement 10 chiffres";
    }

    // Validation du mot de passe
    if (formData.motDePasse) {
      if (formData.motDePasse.length < 12) {
        nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères";
      } else if (formData.motDePasse.length > 25) {
        nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 25 caractères";
      } else {
        const hasNumber = /\d/.test(formData.motDePasse);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.motDePasse);
        const hasUpperCase = /[A-Z]/.test(formData.motDePasse);

        if (!hasNumber) {
          nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un chiffre";
        } else if (!hasSpecialChar) {
          nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un caractère spécial";
        } else if (!hasUpperCase) {
          nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
        }
      }
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleInscription = async () => {
    if (!dbInitialized) {
      Alert.alert('Erreur', 'La base de données n\'est pas initialisée. Veuillez réessayer plus tard.');
      return;
    }
    if (validerFormulaire()) {
      try {
        await InsertUser(
          formData.nom,
          formData.prenom,
          formData.numero,
          formData.email,
          formData.motDePasse,
          formData.confirmerMotDePasse
        );
        
        Alert.alert('Inscription réussie', `Bienvenue, ${formData.prenom} ${formData.nom} !`);
        
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          numero: '',
          email: '',
          motDePasse: '',
          confirmerMotDePasse: ''
        });
        
        // Rediriger vers la page de connexion
        navigation.navigate('Connexion');
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        let errorMessage = 'Une erreur est survenue lors de l\'inscription';
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
          errorMessage = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
        }
        Alert.alert('Erreur', errorMessage);
      }
    }
  };
    

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
      <View style={styles.champContainer}>
        <Text style={{fontWeight:'bold', fontSize:40, marginBottom:10}}>Inscription</Text>
        <Text style={{fontSize:20, marginBottom:10}}>Créez votre compte</Text>
      </View>
      
      <View style={styles.champContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput 
          placeholder="Entrez votre nom" 
          style={[styles.input, erreurs.nom && styles.inputErreur]} 
          value={formData.nom}
          autoCapitalize="words" 
          onChangeText={(valeur) => handleChange('nom', valeur)}
        />
        {erreurs.nom && <Text style={styles.texteErreur}>{erreurs.nom}</Text>}
      </View>

      <View style={styles.champContainer}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput 
          placeholder="Entrez votre prénom" 
          style={[styles.input, erreurs.prenom && styles.inputErreur]} 
          value={formData.prenom}
          autoCapitalize="words" 
          onChangeText={(valeur) => handleChange('prenom', valeur)}
        />
        {erreurs.prenom && <Text style={styles.texteErreur}>{erreurs.prenom}</Text>}
      </View>

      <View style={styles.champContainer}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput 
          placeholder="Entrez votre numéro" 
          keyboardType="phone-pad"
          style={[styles.input, erreurs.numero && styles.inputErreur]} 
          value={formData.numero}
          onChangeText={(valeur) => handleChange('numero', valeur)}
        />
        {erreurs.numero && <Text style={styles.texteErreur}>{erreurs.numero}</Text>}
      </View>
      
      <View style={styles.champContainer}>
        <Text style={styles.label}>Adresse email</Text>
        <TextInput 
          placeholder="Entrez votre adresse email" 
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, erreurs.email && styles.inputErreur]} 
          value={formData.email}
          onChangeText={(valeur) => handleChange('email', valeur)}
        />
        {erreurs.email && <Text style={styles.texteErreur}>{erreurs.email}</Text>}
      </View>
      
      <View style={styles.champContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput 
          placeholder="Entrez votre mot de passe" 
          secureTextEntry
          style={[styles.input, erreurs.motDePasse && styles.inputErreur]} 
          value={formData.motDePasse}
          onChangeText={(valeur) => handleChange('motDePasse', valeur)}
        />
        {erreurs.motDePasse && <Text style={styles.texteErreur}>{erreurs.motDePasse}</Text>}
      </View>

      <View style={styles.champContainer}>
        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <TextInput 
          placeholder="Confirmez votre mot de passe" 
          secureTextEntry
          style={[styles.input, erreurs.confirmerMotDePasse && styles.inputErreur]} 
          value={formData.confirmerMotDePasse}
          onChangeText={(valeur) => handleChange('confirmerMotDePasse', valeur)}
        />
        {erreurs.confirmerMotDePasse && <Text style={styles.texteErreur}>{erreurs.confirmerMotDePasse}</Text>}
      </View>

      <View style={styles.champContainer}>
        <TouchableOpacity style={styles.bouton} onPress={handleInscription}>
          <Text style={styles.texteBouton}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <Pressable onPress={() => navigation.navigate('Connexion')}>
          <Text style={{color:'green', textAlign:'center', marginTop:10}}>Déjà un compte ? Connectez-vous</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  );
}

export default Inscription