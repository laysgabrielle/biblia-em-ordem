import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";


export default function TabLayout() {
    const [route, setRoute] = useState('feed');
    return (
        <Tabs screenOptions={
            {
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#B9C1C7',
                    borderTopWidth: 0,
                    minHeight: 74,
                },
                tabBarItemStyle: {
                    paddingBottom: 25,
                    paddingTop: 14,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFFF00',
                tabBarInactiveTintColor: '#B9C1C7',
            }
        }>
            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('feed'); },
            }}
                name="feed"
                options={{
                    tabBarIcon: () => <MaterialIcons name="list" size={30} color="#152E45"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'feed' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />


            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('turmas'); },
            }}
                name="turmas"
                options={{
                    tabBarIcon: () => <MaterialIcons name="school" size={30} color="#152E45"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'turmas' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('formulario'); },
            }}
                name="formulario"
                options={{
                    tabBarIcon: () => <MaterialIcons name="fact-check" size={30} color="#152E45"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'formulario' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('relatorio'); },
            }}
                name="relatorio"
                options={{
                    tabBarIcon: () => <MaterialIcons name="add-task" size={30} color="#152E45"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'relatorio' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />
        </Tabs>
    )
}