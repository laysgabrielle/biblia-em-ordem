import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

interface DrawerProps {
  onClose: () => void;
  onSelectFilter: (selectedTurmas: string[]) => void;
}

const Drawer: React.FC<DrawerProps> = ({ onClose, onSelectFilter }) => {
  const [turmas, setTurmas] = useState<string[]>([]);
  const [selectedTurmas, setSelectedTurmas] = useState<string[]>([]);

  useEffect(() =>  {
    const fetchTurmas = async () => {
      try {
        const turmasSnapshot = await db.collection('turmas').get();
        const turmasData = turmasSnapshot.docs.map((doc) => doc.id);
        setTurmas(turmasData);
      } catch (error) {
        console.error('Erro ao recuperar turmas:', error);
      }
    };

    fetchTurmas();

    return () => {
      // Cleanup, if needed
    };
  }, []);

  const toggleTurma = (turma: string) => {
    if (selectedTurmas.includes(turma)) {
      setSelectedTurmas(selectedTurmas.filter(item => item !== turma));
    } else {
      setSelectedTurmas([...selectedTurmas, turma]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>Fechar</Text>
      </TouchableOpacity>
      {turmas.map((turma) => (
        <View key={turma} style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => toggleTurma(turma)}>
            <Text style={styles.filterOption}>{turma}</Text>
          </TouchableOpacity>
          <Text>{' '}</Text>
          <Text style={styles.checkbox}>
            {selectedTurmas.includes(turma) ? '✓' : ''}
          </Text>
        </View>
      ))}
      <TouchableOpacity onPress={() => onSelectFilter(selectedTurmas)}>
        <Text style={styles.confirmButton}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterOption: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 18,
  },
  confirmButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Drawer;
