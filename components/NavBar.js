import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Botão do menu lateral */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={32} color="green" />
      </TouchableOpacity>

      {/* Ícone central */}
      <Image
        source={require('../assets/logo1.png')}
        style={styles.logo}
      />

      {/* Botão de busca */}
      <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
        <Feather name="search" size={32} color="green" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 120,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
