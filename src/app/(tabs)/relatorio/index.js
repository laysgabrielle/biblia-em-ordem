import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import CardDefault from '../../../components/card-default';
import CardRelatorio from '../../../components/card-relatorio';

const Relatorio = () => {
  return (
    <View style={styles.container}>
      {/* CardRelatorio no topo da tela */}
      <View style={styles.cardRelatorio}>
        <CardRelatorio />
      </View>

      {/* Links para as diferentes seções */}
      <View style={styles.content}>
        <Link href="relatorio/relat" options={{ headerShown: false }} style={styles.link}>
          <CardDefault title="Relatórios" icone="fact-check" />
        </Link>

        <Link href="relatorio/ranking" style={styles.link}>
          <CardDefault title="Rankings" icone="analytics" />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6c6c6', // Cor de fundo branca
  },
  cardRelatorio: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  link: {
    marginVertical: 5, // Margin ajustada para 5
  },
});

export default Relatorio;
