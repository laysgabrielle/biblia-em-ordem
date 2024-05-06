import "../../../styles/global.css";
import { Button, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import CardDefault from "../../../components/card-default";

export default function Relatorio(){
    return (
        <View className="flex-1 justify-center items-center m-5">

            <Link href="relatorio/relat" options={{headerShown: false,}} className="m-3">
                <CardDefault title="Relatórios" icone="fact-check"/>
            </Link>

            <Link href="relatorio/ranking" className="m-3">
                <CardDefault title="Rankings" icone="analytics"/>
            </Link>

        </View>
    )
}