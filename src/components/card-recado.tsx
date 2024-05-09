import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

interface Props {
    location: string;
    title: string;
    info:String;
}

function CardRecado(props:Props) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setShowDetails(!showDetails)}
            activeOpacity={0.8}
        >
            <View
                style={{
                    width: 350,
                    height: showDetails ? 280 : 190, // Ajusta a altura do card conforme o estado
                    backgroundColor: "#D0D4D8",
                    borderRadius: 10,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <Image
                    source={require("../../assets/images/feed.jpg")} // Caminho da imagem
                    style={{
                        width: "100%",
                        height: showDetails ? 140 : 100, // Altura da imagem conforme o estado
                        resizeMode: "cover",
                    }}
                />
                <View
                    style={{
                        padding: 12,
                    }}
                >
                    <Text style={{ color: "black", fontSize: 14 }}>
                        {props.title}
                    </Text>
                    <Text style={{ color: "black", fontSize: 10 }}>
                        {props.location}
                    </Text>
                    {showDetails && (
                        <Text style={{ color: "black" }}>
                            {props.info}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardRecado;