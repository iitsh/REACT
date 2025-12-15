
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Style/style';

const Panier = ({ panier, setPanier }) => {

  // --- Étape 1: Regrouper les produits pour l'affichage ---
  // On part d'un objet vide pour compter nos produits.
  const groupedItems = {};
  // On parcourt chaque produit du panier d'origine.
  panier.forEach(item => {
    // Si on a déjà vu ce produit (basé sur son nom)...
    if (groupedItems[item.nom]) {
      // ...on augmente juste sa quantité.
      groupedItems[item.nom].quantity++;
    } else {
      // Sinon, c'est la première fois qu'on le voit.
      // On l'ajoute à notre objet avec une quantité de 1.
      groupedItems[item.nom] = { ...item, quantity: 1 };
    }
  });
  // On transforme notre objet de comptage en une liste (array) pour l'afficher.
  const cartItems = Object.values(groupedItems);

  // --- Étape 2: Fonctions pour modifier le panier ---

  // Pour augmenter la quantité, on ajoute simplement le même produit à la liste d'origine.
  const increaseQuantity = (item) => {
    // On crée une nouvelle liste avec tous les anciens produits, plus le nouveau.
    const newPanier = [...panier, item];
    setPanier(newPanier);
  };

  // Pour diminuer la quantité, on trouve l'index du premier article et on le retire.
  const decreaseQuantity = (item) => {
    const indexToRemove = panier.findIndex(p => p.nom === item.nom);
    if (indexToRemove !== -1) {
      const newPanier = [...panier.slice(0, indexToRemove), ...panier.slice(indexToRemove + 1)];
      setPanier(newPanier);
    }
  };

  // Pour supprimer un article, on garde seulement les produits qui n'ont pas le même nom.
  const deleteItem = (item) => {
    const newPanier = panier.filter(p => p.nom !== item.nom);
    setPanier(newPanier);
  };

  // --- Étape 3: Affichage des éléments ---
  const renderItem = ({ item }) => (
    <View style={localStyles.cartItemContainer}>
      <Text style={localStyles.itemText}>{item.nom} - {item.prix}</Text>
      <View style={localStyles.quantityControls}>
        <Pressable onPress={() => decreaseQuantity(item)} style={localStyles.button}>
          <Text style={localStyles.buttonText}>-</Text>
        </Pressable>
        <Text style={localStyles.quantityText}>{item.quantity}</Text>
        <Pressable onPress={() => increaseQuantity(item)} style={localStyles.button}>
          <Text style={localStyles.buttonText}>+</Text>
        </Pressable>
        <Pressable onPress={() => deleteItem(item)} style={[localStyles.button, localStyles.deleteButton]}>
          <Ionicons name="trash-bin" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { marginLeft: 8 }]}>🛒 Mon Panier</Text>
      </View>
      <Pressable
        style={{
          backgroundColor: 'red',
          padding: 10,
          margin: 10,
          borderRadius: 5,
          alignItems: 'center'
        }}
        onPress={() => {
          setPanier([]);
        }}
      >
        <Text style={{ color: 'white' }}>Vider le panier</Text>
      </Pressable>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.nom}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  }
});

export default Panier;
