import { Pressable, Text, TouchableHighlight, View } from "react-native"
import CardDefault from "../../components/card-default"

export default function Home() {
     return (

<View className="flex-1 items-center justify-center">


            <CardDefault icone="book" title="Titulo" />



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
