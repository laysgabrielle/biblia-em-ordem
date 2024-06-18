import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';

interface DrawerProps {
  onClose: () => void;
  onSelectFilter: (selectedFilter: string | number | null, filterType: string) => void;
  onConfirm: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onClose, onSelectFilter, onConfirm }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const drawerAnim = useState(new Animated.Value(-300))[0]; // Valor inicial para a animação do drawer

  const findSundays = (): number[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    const sundays: number[] = [];

    for (let day = 1; day <= numDays; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0) {
        sundays.push(day);
      }
    }

    return sundays;
  };

  const [sundays, setSundays] = useState<number[]>([]);
  const [selectedSunday, setSelectedSunday] = useState<number | null>(null);

  useEffect(() => {
    const foundSundays = findSundays();
    setSundays(foundSundays);

    // Animação para deslizar o drawer
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const handleConfirm = () => {
    onSelectFilter(selectedField, 'field');
    onSelectFilter(selectedSunday, 'domingo');
    onConfirm();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: drawerAnim }] }]}>
      <View style={styles.filtersContainer}>
        <Text style={styles.title}>Campos</Text>
        <View>
          {['biblias', 'retardatarios', 'visitantes', 'ofertas', 'revistas'].map((filter) => (
            <View key={filter} style={styles.checkboxContainer}>
              <RadioButton.Android
                value={filter}
                status={selectedField === filter ? 'checked' : 'unchecked'}
                onPress={() => setSelectedField(filter)}
                color="#FFA500"
              />
              <TouchableOpacity onPress={() => setSelectedField(filter)}>
                <Text style={styles.filterOption}>{filter}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Domingos</Text>
        {sundays.map((sunday) => (
          <View key={sunday} style={styles.checkboxContainer}>
            <RadioButton.Android
              value={sunday.toString()}
              status={selectedSunday === sunday ? 'checked' : 'unchecked'}
              onPress={() => setSelectedSunday(sunday)}
              color="#FFA500"
            />
            <TouchableOpacity onPress={() => setSelectedSunday(sunday)}>
              <Text style={styles.filterOption}>{sunday}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
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
    top: 40,
    width: '75%',
    height: '100%',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  filtersContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA500',
    textAlign: 'center',
  },
  filterOption: {
    fontSize: 18,
    marginBottom: 1,
    color: 'white',
    marginLeft: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFF',
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButton: {
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Drawer;
