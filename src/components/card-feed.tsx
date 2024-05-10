import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { Text, View, Button, Image } from 'react-native';

interface Props {
    title: string;
    subtitle: string;
}

const CardFeed: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <View style={{
            borderRadius: 10,
            alignItems: "top",
            padding: 0,
            justifyContent: "space-between",
            margin: 0,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#152E45",
            width: '100%',
            height: 250,
        }}>
            <Image
                source={require("../../assets/images/feed.jpg")}
                style={{
                    resizeMode: 'cover',
                    width: '100%', // Ajuste para ocupar 100% da largura do container
                    height: '75%', // Ajuste para ocupar 100% da altura do container
                    borderRadius: 10, // Manter o mesmo raio de borda do card
                
                    
                }} />
            <MaterialIcons name="edit" size={24} color="orange" style={{ position: 'absolute',marginLeft: 350, marginTop: 155 }}/>
            <View style={{ position: 'absolute', top: 50, left: 15,padding: 10, }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{title}</Text>
                <Text style={{ color: '#fff', fontSize: 16 }}>{subtitle}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between',width:'100%', margin: 8 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%', margin: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 'auto', }}>
                    <Link href="feed/">
                        <Text style={{ color: '#fff', fontSize: 18, textDecorationLine: 'underline' }}>Eventos</Text>
                    </Link>
                    <Link href="feed/recados">
                        <Text style={{ color: '#fff', fontSize: 18, textDecorationLine: 'underline' }}>Recados</Text>
                    </Link>
                </View>
                </View>
                
            </View>
        </View>
    );
}


export default CardFeed;
