import { ReactNode, createContext, useState} from 'react'

export const UserContext = createContext({} as any  )

type UserContextProviderProps = {
    children: ReactNode,
}


export const UserProvider = ({children}: UserContextProviderProps) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false)
    const toggleUsuarioLogado = (logar: boolean) => {
        setUsuarioLogado(logar)
    }

    return (
        <UserContext.Provider value={{usuarioLogado, toggleUsuarioLogado}}>
            {children}
        </UserContext.Provider>
    )
}