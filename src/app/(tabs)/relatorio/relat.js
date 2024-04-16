import { Text, View, FlatList } from "react-native"

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

  const Item = ({date, bibles, visitors}) => (
    <View className="p-5 justify-center items-center">
      <Text className="color-teal-400">{date}</Text>
    <View className="flex-row justify-between w-32">
        <Text>Biblias</Text>
        <Text>{bibles}</Text>
    </View>
    <View className="flex-row justify-between w-32">
        <Text>Visitantes</Text>
        <Text>{visitors}</Text>
    </View>
    </View>

  );



export default function Relat()
{
    return(
        <View className="m-28 flex-1 items-center justify-center">
            
                <FlatList 
                data={data} 
                keyExtractor={data => data.id}
                renderItem={({item}) => 
                <Item date={item.date} bibles={item.bibles} visitors={item.visitors}/>}
                />

                
           

        </View>
    )
}