import { Pressable, Text, View } from "react-native"
import {db} from "../../../firebase/firebaseConfig";
import { doc, setDoc, getDoc} from "firebase/firestore";

export default function Home() {
     return (

<View className="flex-1 items-center justify-center">
            <Text>TELA FEED 2</Text>
            <Pressable onPress={AdicionarAluno} ><Text>SALVAR</Text></Pressable>
            <Pressable onPress={AdicionarAlunoNested} ><Text>nested</Text></Pressable>
        </View>


)
}

function AdicionarAluno() {
      setDoc(doc(db, "alunos", "3"), {
          nome: "Jose Aparecido",
          dataNascimento: "2002-02-02",
          faltas: { faltou: true},
     }
     )
}

function AdicionarAlunoNested() {
     setDoc(doc(db, "alunos", "1", "faltas", "asdf"), {
          dia_falta: "2024/12/12"
     }
     )
}
