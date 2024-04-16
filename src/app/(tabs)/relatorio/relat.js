import { Text, View, FlatList, StyleSheet } from "react-native"
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";

const data = [
    {
      id: 1,  
      date: "2024-04-16",
      bibles: 10,
      visitors: 50,
      absences: 5,
      offerings: 250.50
    },
    {
      id: 2,  
      date: "2024-04-15",
      bibles: 8,
      visitors: 45,
      absences: 3,
      offerings: 200.75
    },
    {
      id: 3,  
      date: "2024-04-14",
      bibles: 12,
      visitors: 60,
      absences: 7,
      offerings: 300.30
    },
  ];

const emojisWithoutIcons = [
{title: 'happy'},
{title: 'cool'},
{title: 'lol'},
{title: 'sad'},
{title: 'cry'},
{title: 'angry'},
{title: 'confused'},
{title: 'excited'},
{title: 'kiss'},
{title: 'devil'},
{title: 'dead'},
{title: 'wink'},
{title: 'sick'},
{title: 'frown'},
];



const Item = ({date, bibles, visitors}) => (
    <View className="justify-center">
        <View className="my-10">
            <Text className="color-teal-400">{date}</Text>
        </View>
        <View className="flex-row justify-between border-b-2 border-solid"
        style={{borderColor: '#152E45'}}>
            <Text>Biblias</Text>
            <Text>{bibles}</Text>
        </View>
        <View className="flex-row justify-between w-32">
            <Text>Visitantes</Text>
            <Text>{visitors}</Text>
        </View>
    </View>

  );

  const renderButton = (selectedItem) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.date) || 'Selecione a data'}
        </Text>
      </View>
    );
  };
  
  const renderItem = (item, index, isSelected) => {
    return (
      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
        <Text style={styles.dropdownItemTxtStyle}>{item.date}</Text>
      </View>
    );
  };

export default function Relat()
{
const [selectedItem, setSelectedItem] = useState(null);

    return(
        <View className="m-28 flex-1 items-center justify-center">

      {selectedItem && (
        <FlatList
          data={[selectedItem]}
          renderItem={({item}) => 
                <Item date={item.date} bibles={item.bibles} visitors={item.visitors}/>}                
          keyExtractor={(item) => item.id.toString()}
        />
      )}


                <SelectDropdown
                data={data}
                onSelect={setSelectedItem} 
                renderButton={renderButton}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
                />




        </View>
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });