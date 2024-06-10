import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';
import { db, auth } from "../../../../../firebase/firebaseConfig";
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
  const drawerAnim = useRef(new Animated.Value(-300)).current; // Initial value for drawer animation

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
  const [confirmButtonClicked, setConfirmButtonClicked] = useState<boolean>(false);

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

    // Animation to slide in the drawer
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
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
    <Animated.View style={[styles.container, { transform: [{ translateX: drawerAnim }] }]}>
      <View style={styles.filtersContainer}>
        <Text style={[styles.title, { textAlign: 'center' }]}>Turmas</Text>
        {loadingTurmas ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          turmas.map((turma) => (
            <TouchableOpacity key={turma.id} onPress={() => toggleTurma(turma.id)} style={styles.checkboxContainer}>
              <RadioButton.Android
                value={turma.id}
                status={selectedTurma === turma.id ? 'checked' : 'unchecked'}
                onPress={() => toggleTurma(turma.id)}
                color="#FFA500"
              />
              <Text style={[styles.filterOption, { textAlign: 'center' }]}>{turma.nome}</Text>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.separator} />

        <Text style={[styles.title, { textAlign: 'center' }]}>Domingos</Text>
        {domingos.map((domingo) => (
          <View key={domingo} style={styles.checkboxContainer}>
            <RadioButton.Android
              value={domingo.toString()}
              status={selectedDomingo === domingo ? 'checked' : 'unchecked'}
              onPress={() => toggleDomingo(domingo)}
              color="#FFA500"
            />
            <TouchableOpacity onPress={() => toggleDomingo(domingo)}>
              <Text style={[styles.filterOption, { textAlign: 'center' }]}>{domingo}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleConfirm}
        style={[
          styles.confirmButton,
          confirmButtonClicked && { backgroundColor: 'orange' }
        ]}
        onPressIn={() => setConfirmButtonClicked(true)}
        onPressOut={() => setConfirmButtonClicked(false)}
      >
        <MaterialIcons name="check" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
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
    top: 40, // Adjust marginTop here
    width: '75%',
    height: '100%',
    justifyContent: 'space-between', // Add this to space items evenly
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 10, // Adjust horizontal shadow offset to move the shadow towards the right
      height: 0, // Vertical shadow offset
    },
    shadowOpacity: 0.5, // Adjust shadow opacity to your liking
    shadowRadius: 10, // Adjust shadow blur radius
    elevation: 5, // Adjust elevation for Android shadow
  },
  filtersContainer: {
    justifyContent: 'center', // Center filter options vertically
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA500',
  },
  filterOption: {
    fontSize: 18,
    marginBottom: 1,
    color: 'white',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 20,
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 30,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 30, // Tornar o botão redondo
    width: 50, // Diminuir a largura do botão
    height: 50, // Diminuir a altura do botão
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Drawer;
