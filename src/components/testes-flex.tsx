import React from 'react';
import { View, StyleSheet } from 'react-native';

function SeuComponente(){
  return (
    <View style={styles.container}>
      <View style={styles.view1}></View>
      <View style={styles.view2}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para alinhar os elementos no início da linha
    alignItems: 'center', // Para centralizar verticalmente os elementos
    width:'100%' // Para que o container ocupe toda a largura disponível
  },
  view1: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    
  },
  view2: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    marginRight:'auto'
   
  },
});

export default SeuComponente;
