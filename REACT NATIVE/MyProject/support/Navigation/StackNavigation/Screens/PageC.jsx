import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

export default function PageC({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Menu horizontal en haut */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menu}
        style={styles.menuWrapper}
      >
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>goBack()</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.pop()}>
          <Text style={styles.buttonText}>pop()</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.pop(2)}>
          <Text style={styles.buttonText}>pop(2)</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonText}>popToTop()</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('PageB')}>
          <Text style={styles.buttonText}>navigate → PageB</Text>
        </Pressable>
      </ScrollView>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.title}>📄 Page A</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuWrapper: {
    paddingTop: 30,
    maxHeight: 80,
  },
  menu: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#df0a9fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});
