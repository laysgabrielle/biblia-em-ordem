import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function CardDefault(props) {
    return (
        <View className="flex-row rounded-md items-center p-6 justify-between m-2 shadow-xl shadow-black"
        style={
            {
                width: 330,
                height: 160,
                backgroundColor: "#152E45",
            }
        }>
            <View className="rounded-full justify-center items-center w-28 h-28
            shadow-xl shadow-white "
            style={{ backgroundColor: "#152E45", }}>
                <MaterialIcons name={props.icone} size={40} color="white">
                    
                </MaterialIcons>
            </View>
            <View className="border-t-2 border-white p-2 ml-2"
            style={{width: 167,}}>
                <Text className="color-white text-end pb-12" >
                    {props.title}
                </Text>
            </View>
        </View>
        )
}

export default CardDefault;



