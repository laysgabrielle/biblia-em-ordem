import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from './drawer'; // Importe o componente Drawer
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, Timestamp } from "firebase/firestore";

const MainScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);
  const [selectedDomingo, setSelectedDomingo] = useState<Date | null>(null);
  const [dadosObtained, setDadosObtained] = useState<any[]>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleFilterSelect = (selectedFilter: string | number | null, filterType: string) => {
    if (filterType === 'turma') {
      setSelectedTurma(selectedFilter as string);
    } else if (filterType === 'domingo') {
      if (typeof selectedFilter === 'number') {
        const today = new Date();
        setSelectedDomingo(new Date(today.getFullYear(), today.getMonth(), selectedFilter));
      }
    }
  };

  const handleConfirm = async () => {
    console.log("Selected Turma:", selectedTurma);
    console.log("Selected Domingo:", selectedDomingo);
    await fetchDados(selectedTurma, selectedDomingo);
    handleCloseDrawer();
  };

  const fetchDados = async (nomeTurma: string | null, domingo: Date | null) => {
    if (nomeTurma && domingo) {
      try {
        const turmaDocRef = doc(db, "turmas", nomeTurma);

        const q = query(
          collection(db, "dados_obtained"),
          where("turma_referente", "==", turmaDocRef),
          where("dia_letivo", ">=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate()))),
          where("dia_letivo", "<=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1)))
        );

        const querySnapshot = await getDocs(q);
        const dataVz = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDadosObtained(dataVz);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      {Object.entries(item).map(([key, value]) => (
        <Text key={key} style={styles.itemText}>
          {key}: {String(value)}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
        <MaterialIcons name="menu" size={24} color="#152E45" />
      </TouchableOpacity>
      {selectedTurma && (
        <View style={styles.selectedTurmaContainer}>
          <Text style={styles.selectedTurmaText}>Turma selecionada: {selectedTurma}</Text>
        </View>
      )}
      {selectedDomingo !== null && (
        <View style={styles.selectedDomingoContainer}>
          <Text style={styles.selectedDomingoText}>Domingo selecionado: {selectedDomingo.toLocaleDateString()}</Text>
        </View>
      )}
      <FlatList
        data={dadosObtained}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {isDrawerOpen && (
        <Drawer onClose={handleCloseDrawer} onSelectFilter={handleFilterSelect} onConfirm={handleConfirm} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  drawerButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 2,
  },
  selectedTurmaContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  selectedTurmaText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  selectedDomingoContainer: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  selectedDomingoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  listContainer: {
    paddingTop: 200,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default MainScreen;
