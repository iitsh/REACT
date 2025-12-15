import { Image, Text, View, Pressable } from "react-native";
import React, { useState } from 'react';
import styles from '../Style/style';

const Articles = ({ item, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const name = item.nom;
  const price = item.prix;
  const category = item.categorie;
  const stock = item.stock;
  const available = item.disponible;
  const description = item.description;

  return (
    <View style={styles.articleCard}>
      <Image source={{ "uri": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ5Po4oyzpU83M7BJUNtvqKC6A86gYUfrNb_sNWE0ENLbCV4fMtFshSBnXbBuYqb_Fr_dhg6_xdbGhXW13zZ3kQOHvOhNhPa9Ml3XWiq_QVzSqk-rDk51Tc-EUS8VEMgtSVMGVeK1Y&usqp=CAc"}} style={styles.articleImage} />
      <View style={styles.articleInfo}>
        <View style={styles.articleHeader}>
          <Text style={styles.articleTitle}>{name}</Text>
          <Text style={styles.articlePrice}>{price}</Text>
        </View>

        <Pressable style={styles.articleButton} onPress={() => setShowDetails((v) => !v)}>
          <Text style={styles.articleButtonText}>{showDetails ? 'Masquer les détails' : 'Afficher les détails'}</Text>
        </Pressable>

        {showDetails && (
          <View>
            {category !== undefined && (
              <Text style={styles.articleDetails}>catégorie : {String(category)}</Text>
            )}
            {stock !== undefined && (
              <Text style={styles.articleDetails}>stock : {String(stock)}</Text>
            )}
            {available !== undefined && (
              <Text style={styles.articleDetails}>disponible : {String(available)}</Text>
            )}
            {description && (
              <Text style={styles.articleDetails}>description : {description}</Text>
            )}
          </View>
        )}

        <Pressable style={styles.articleButton} onPress={onAddToCart}>
          <Text style={styles.articleButtonText}>+ Ajouter au panier</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(Articles);