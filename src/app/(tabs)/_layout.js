import { Tabs } from "expo-router";

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
                    paddingBottom: 34,
                    paddingTop: 14,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            }
        }>
            <Tabs.Screen name="index"/>
            <Tabs.Screen name="turmas"/>
            <Tabs.Screen name="formulario"/>
            <Tabs.Screen name="relatorio"/>
        </Tabs>
    )
}