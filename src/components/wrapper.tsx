import React from 'react';
import {View, StyleSheet} from 'react-native';

const ViewStyleProps = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },

});

export default ViewStyleProps;