import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

interface Option {
    text: string;
    id: number;
}

interface Props {
    options: Option[];
    onChange: (number: number[]) => void;
}

export default function Checkbox({ options, onChange }: Props) {
    const [selected, setSelected] = useState<number[]>([]);

    const toggle = (id: number) => {
        let index = selected.findIndex((i)=> i === id);
        let arrSelecteds = [...selected];
        if(index === -1){
            arrSelecteds = [id];
        }
        setSelected(arrSelecteds);
    }

    useEffect(()=> onChange(selected), [selected])
    return (
        <View>
            {options.map((op, index) => (
                <View key={index} style={styles.optionContainer}>
                    <View>
                        <TouchableOpacity onPress={()=> toggle(op.id)}>
                            {
                                (selected.findIndex(i=> i=== op.id) !== -1) ?
                                <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#F7900B" /> 
                                : 
                                <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#F7900B" />
                            }
                        </TouchableOpacity>
                    </View>
                    <Text key={index} style={styles.optionText}>{op.text}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    optionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText:{
        color:'white',
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '600',
    },
})