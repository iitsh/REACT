import React, { useState, useEffect, useContext } from 'react';
import { initDB } from "../Database/initdb";
import { verifyUser } from '../Database/Task';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styles from "../Style/authStyles";
import { UserContext } from '../context/UserContext';

const Connexion = ({ navigation }) => {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: '',
    });

    const [erreurs, setErreurs] = useState({});

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

    const handleChange = (champ, valeur) => {
        setFormData(prev => ({
            ...prev,
            [champ]: valeur
        }));
        if (erreurs[champ]) {
            setErreurs(prev => ({
                ...prev,
                [champ]: ''
            }));
        }
    };

    const validerFormulaire = () => {
        let nouvellesErreurs = {};

        if (formData.email.trim() === '') {
            nouvellesErreurs.email = 'L\'email est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim()) && formData.email.trim() !== "") {
            nouvellesErreurs.email = 'Le format de l\'email est invalide.';
        }

        if (formData.motDePasse.trim() === '') {
            nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
        }
        if (formData.motDePasse.trim().length < 12 && formData.motDePasse.trim().length > 0) {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins 12 caractères";
        }
        if (formData.motDePasse.trim().length > 25) {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au maximum 20 caractères";
        }
        const hasNumber = /\d/.test(formData.motDePasse.trim());
        if (hasNumber === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un chiffre";
        }
        const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(formData.motDePasse.trim());
        if (hasSpecialChar === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins un caractère spécial";
        }
        const hasUpperCase = /[A-Z]/.test(formData.motDePasse.trim());
        if (hasUpperCase === false && formData.motDePasse.trim() !== "") {
            nouvellesErreurs.motDePasse = "Le mot de passe doit contenir au moins une majuscule";
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    }

    const handleSubmit = async () => {
        if (validerFormulaire()) {
            try {
                const user = await verifyUser(formData.email, formData.motDePasse);
                if (user) {
                    Alert.alert('Connexion réussie', `Bienvenue !`);
                    setUser(user);
                    navigation.navigate('Catalogue');
                } else {
                    Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.champContainer}>
                    <Text style={{fontWeight:'bold', fontSize:40, marginBottom:10, marginLeft:60}}> Connexion</Text>
                </View>

                <View style={styles.champContainer}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput placeholder="Entrez votre adresse email" keyboardType="email-address" style={[styles.input, erreurs.email && styles.inputErreur]} value={formData.email} autoCapitalize="none" onChangeText={(valeur) => handleChange('email', valeur)} />
                    {erreurs.email && <Text style={styles.texteErreur}>{erreurs.email}</Text>}
                </View>

                <View style={styles.champContainer}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput placeholder="Entrez votre mot de passe" secureTextEntry style={[styles.input, erreurs.motDePasse && styles.inputErreur]} value={formData.motDePasse} onChangeText={(valeur) => handleChange('motDePasse', valeur)} />
                    {erreurs.motDePasse && <Text style={styles.texteErreur}>{erreurs.motDePasse}</Text>}
                </View>

                <View style={styles.champContainer}>
                    {/* Bouton S'inscrire */}
                    <Pressable style={styles.bouton} onPress={handleSubmit}>
                        <Text style={styles.texteBouton}>Se connecter</Text>
                    </Pressable>
                </View>

                <View>
                    <Pressable onPress={() => navigation.navigate('Inscription')}>
                        <Text style={{color:'green', textAlign:'center', marginTop:10}}>Pas de compte ? Inscrivez-vous</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Connexion;