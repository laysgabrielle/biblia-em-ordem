import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

type props = {
    title: string,
    location: string,
    info: string,
}

function CardRecado(props: props) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            activeOpacity={0.8}
        >
            <View
                style={{
                    width: 350,
                    height: showDetails ? 280 : 220, // Ajusta a altura do card conforme o estado
                    backgroundColor: "#152E45",
                    borderRadius: 10,
                    padding:10,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    alignItems: 'center',
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10}}>
                <MaterialIcons name="delete" size={20} color="orange"/>
                <MaterialIcons name="edit" size={20} color="orange" />
                </View>
                <Image
                    source={require("../../assets/images/feed.jpg")} // Caminho da imagem
                    style={{
                        width: showDetails ? 110 : 100,
                        height: showDetails ? 110 : 100, // Altura da imagem conforme o estado
                        resizeMode: "cover",
                        borderRadius: 50,
                    }}
                />
                <View
                    style={{
                        padding: 12,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 18 ,}}>
                        {props.title}
                    </Text>
                    <Text style={{ color: "white", fontSize: 12 }}>
                        {props.location}
                    </Text>
                    {showDetails && (
                        <Text style={{ color: "white" }}>
                            {props.info}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardRecado;