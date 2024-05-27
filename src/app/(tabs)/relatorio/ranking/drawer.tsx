import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';
import db from "../../../../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface DrawerProps {
  onClose: () => void;
  onSelectFilter: (selectedFilter: string | number | null, filterType: string) => void;
  onConfirm: () => void;
}

interface Turma {
  id: string;
  nome: string;
}

const Drawer: React.FC<DrawerProps> = ({ onClose, onSelectFilter, onConfirm }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({
    biblias: false,
    retardatarios: false,
    visitantes: false,
    ofertas: false,
    revistas: false,
  });

  const [loadingTurmas, setLoadingTurmas] = useState<boolean>(true);

  const EncontraDomingos = (): number[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate(); // Número de dias no mês atual
    const domingos: number[] = [];

    for (let day = 1; day <= numDays; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0) {
        domingos.push(day);
      }
    }

    return domingos;
  };

  const [domingos, setDomingos] = useState<number[]>([]);
  const [selectedDomingo, setSelectedDomingo] = useState<number | null>(null);

  useEffect(() => {
    const domingosEncontrados = EncontraDomingos();
    setDomingos(domingosEncontrados);
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters({ ...selectedFilters, [filter]: !selectedFilters[filter] });
  };

  const handleConfirm = () => {
    const selectedFields = Object.keys(selectedFilters).filter((filter) => selectedFilters[filter]);
    selectedFields.forEach((field) => {
      onSelectFilter(true, field); // Passa 'true' para os campos selecionados
    });
    onSelectFilter(selectedDomingo, 'domingo');
    onConfirm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campos</Text>
      <View>
        {Object.keys(selectedFilters).map((filter) => (
          <TouchableOpacity key={filter} onPress={() => toggleFilter(filter)} style={styles.checkboxContainer}>
            <RadioButton.Android
              value={filter}
              status={selectedFilters[filter] ? 'checked' : 'unchecked'}
              onPress={() => toggleFilter(filter)}
              color="#FFA500" // Definindo a cor do RadioButton como laranja
            />
            <Text style={styles.filterOption}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Domingos</Text>
      {domingos.map((domingo) => (
        <View key={domingo} style={styles.checkboxContainer}>
          <RadioButton.Android
            value={domingo.toString()}
            status={selectedDomingo === domingo ? 'checked' : 'unchecked'}
            onPress={() => setSelectedDomingo(domingo)}
            color="#FFA500" // Definindo a cor do RadioButton dos domingos como laranja
          />
          <TouchableOpacity onPress={() => setSelectedDomingo(domingo)}>
            <Text style={styles.filterOption}>{domingo}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <MaterialIcons name="check" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152E45',
    padding: 20,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '80%',
    height: '100%',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white', // Cor do título
  },
  filterOption: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Drawer;
