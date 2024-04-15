import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout(){
    return (
        <Tabs screenOptions={
            {
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#C6C6C6',
                    borderTopWidth: 0,
                    minHeight: 74,
                },
                tabBarItemStyle: {
                    paddingBottom: 25,
                    paddingTop: 14,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#B9C1C7',
            }
        }>
            <Tabs.Screen name="index" options={{tabBarIcon: () => <MaterialIcons name="list" size={30} color="#152E45"/>}}/>
            <Tabs.Screen name="turmas" options={{tabBarIcon: () => <MaterialIcons name="school" size={30} color="#152E45"/>}}/>
            <Tabs.Screen name="formulario" options={{tabBarIcon: () => <MaterialIcons name="fact-check" size={30} color="#152E45"/>}}/>
            <Tabs.Screen  name="relatorio" options={{tabBarIcon: () => <MaterialIcons name="add-task" size={30} color="#152E45"/>}}/>
        </Tabs>
    )
}