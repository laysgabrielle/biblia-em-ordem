import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from './drawer'; // Importe o componente Drawer
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, Timestamp, getDoc } from "firebase/firestore";

const MainScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);
  const [selectedDomingo, setSelectedDomingo] = useState<Date | null>(null);
  const [dadosObtained, setDadosObtained] = useState<any[]>([]);
  const [turmaNome, setTurmaNome] = useState<string | null>(null);

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
    if (selectedTurma) {
      const turmaDocRef = doc(db, "turmas", selectedTurma);
      const turmaDoc = await getDoc(turmaDocRef);
      setTurmaNome(turmaDoc.exists() ? turmaDoc.data().nome : null);
    }
    await fetchDados(selectedTurma, selectedDomingo);
    handleCloseDrawer();
  };

  const fetchDados = async (turmaId: string | null, domingo: Date | null) => {
    if (turmaId && domingo) {
      try {
        const turmaDocRef = doc(db, "turmas", turmaId);

        const q = query(
          collection(db, "dados_obtained"),
          where("turma_referente", "==", turmaDocRef),
          where("dia_letivo", ">=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate()))),
          where("dia_letivo", "<=", Timestamp.fromDate(new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1)))
        );

        const querySnapshot = await getDocs(q);
        const dataVz = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), visitantes: doc.data().visitantes ? doc.data().visitantes : 0 }));
        setDadosObtained(dataVz);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>Biblias:</Text>
        <Text style={styles.itemValue}>{item.biblias}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>Revistas:</Text>
        <Text style={styles.itemValue}>{item.revistas}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>Retardatarios:</Text>
        <Text style={styles.itemValue}>{item.retardatarios}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>Ofertas:</Text>
        <Text style={styles.itemValue}>{item.ofertas}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>Visitantes:</Text>
        <Text style={styles.itemValue}>{item.visitantes}</Text>
      </View>
    </View>
  );

  const handlePrint = () => {
    // Implemente a lógica de impressão aqui
    console.log("Imprimir dados");
  };

  const handleReload = () => {
    handleConfirm(); // Isso executa a mesma lógica de confirmar
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
          <MaterialIcons name="menu" size={24} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReload} style={styles.button}>
          <Text style={styles.reloadButtonText}>Recarregar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrint} style={styles.button}>
          <MaterialIcons name="print" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
      {turmaNome && (
        <View style={styles.selectedTurmaContainer}>
          <Text style={styles.selectedTurmaText}>Turma: {turmaNome}</Text>
        </View>
      )}
      {selectedDomingo !== null && (
        <View style={styles.selectedDomingoContainer}>
          <Text style={styles.selectedDomingoText}>Domingo: {selectedDomingo.toLocaleDateString()}</Text>
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
      {/* Adicione a imagem no final do relatório */}
      <View style={styles.footer}>
        <View style={styles.imageContainer}>
          <Image source={require("../../../../../assets/images/blidemtransp.png")} style={styles.image} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6c6c6', // Cor de fundo
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha os itens igualmente ao longo do eixo principal
    alignItems: 'center',
    backgroundColor: '#152E45', // Cor azul
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 10,
    marginHorizontal: 10,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#152E45',
    padding: 10,
    borderRadius: 5,
  },
  selectedTurmaContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedTurmaText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#152E45',
  },
  selectedDomingoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedDomingoText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#152E45',
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginTop: 120,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 70,
    marginRight: 70,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#152E45',
  },
  itemValue: {
    fontSize: 18,
    marginLeft: 90,
    marginRight: 10,
    color: '#152E45',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha a imagem à direita
    alignItems: 'flex-end', // Alinha a imagem abaixo
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  reloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainScreen;
