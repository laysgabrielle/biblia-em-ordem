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
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);
  const [loadingTurmas, setLoadingTurmas] = useState<boolean>(true);

  const EncontraDomingos = (): number[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
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
    const fetchTurmas = async () => {
      try {
        const turmasSnapshot = await getDocs(collection(db, 'turmas'));
        const turmasData = turmasSnapshot.docs.map((doc) => ({
          id: doc.id,
          nome: doc.data().nome
        }));
        setTurmas(turmasData);
        setLoadingTurmas(false);
      } catch (error) {
        console.error('Erro ao recuperar turmas:', error);
        setLoadingTurmas(false);
      }
    };

    fetchTurmas();

    const domingosEncontrados = EncontraDomingos();
    setDomingos(domingosEncontrados);
  }, []);

  const toggleTurma = (turma: string) => {
    if (selectedTurma === turma) {
      setSelectedTurma(null);
    } else {
      setSelectedTurma(turma);
    }
  };

  const toggleDomingo = (domingo: number) => {
    if (selectedDomingo === domingo) {
      setSelectedDomingo(null);
    } else {
      setSelectedDomingo(domingo);
    }
  };

  const handleTurmaConfirm = () => {
    onSelectFilter(selectedTurma, 'turma');
  };

  const handleDomingoConfirm = () => {
    onSelectFilter(selectedDomingo, 'domingo');
  };

  const handleConfirm = () => {
    handleTurmaConfirm();
    handleDomingoConfirm();
    onConfirm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turmas</Text>
      {loadingTurmas ? (
        <Text>Carregando...</Text>
      ) : (
        turmas.map((turma) => (
          <TouchableOpacity key={turma.id} onPress={() => toggleTurma(turma.id)} style={styles.checkboxContainer}>
            <RadioButton.Android
              value={turma.id}
              status={selectedTurma === turma.id ? 'checked' : 'unchecked'}
              onPress={() => toggleTurma(turma.id)}
              color="#FFA500"
            />
            <Text style={styles.filterOption}>{turma.nome}</Text>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.title}>Domingos</Text>
      {domingos.map((domingo) => (
        <View key={domingo} style={styles.checkboxContainer}>
          <RadioButton.Android
            value={domingo.toString()}
            status={selectedDomingo === domingo ? 'checked' : 'unchecked'}
            onPress={() => toggleDomingo(domingo)}
            color="#FFA500"
          />
          <TouchableOpacity onPress={() => toggleDomingo(domingo)}>
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
    color: 'white',
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
