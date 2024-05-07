import React, {useState} from "react";
import { Pressable, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


type props = { 
    title: string;
    icone: {
        style: string;
    };
}



function CardVariavel(props: props) {
    const [tamanhoY, setTamanhoY] = useState(140);
    const [tamanhoX, setTamanhoX] = useState(330);
    const [corDaSombra, setcorDaSombra] = useState("black");
    const [escala, setEscala] = useState(1);

    const alterarEscala = () => {
        if(escala == 1)
            setEscala(1.13)
        if(escala == 1.13)
            setEscala(1)
        console.log("apertado");
    }



    return (
        
        <Pressable onPress={() => alterarEscala()}>
            <View className="flex-row rounded-md items-center p-6 justify-between m-2 shadow-xl shadow-black"
        style={
            {
                shadowColor: corDaSombra,
                width: tamanhoX,
                height: tamanhoY,
                backgroundColor: "#152E45",
                transform: [{scale: escala}],
            }
        } >
            <View className="rounded-full justify-center items-center w-28 h-28
            shadow-xl shadow-white "            
            style={{ backgroundColor: "#152E45", }}>
                <MaterialIcons name={props.icone} size={40} color="white">
                    
                </MaterialIcons>
            </View>

            <View className="flex-col">
                <View className="border-t-2 border-white px-2 ml-2"
                style={{width: 167,}}>
                    <Text className="color-white text-end pb-12" >
                        {props.title}
                    </Text>
                </View>
                <View className="flex-row border-2 border-white p-3 justify-center" >
                    <View className="border-2 border-white p-2">
                        <TouchableOpacity >
                                <Text className="color-white"> - </Text>
                            </TouchableOpacity>
                    </View>

                    <View className="border-2 border-white p-2">
                        <Text className="color-white"> 50 </Text>
                    </View>

                    <View className="border-2 border-white p-2">
                        <Pressable pressRetentionOffset={45}
                        onPress={() => console.log("MENOR")}>
                                <Text className="color-white"> + </Text>
                            </Pressable>
                    </View>

                </View>

            </View>
        </View>
    </Pressable>

        )
}

export default CardVariavel;



