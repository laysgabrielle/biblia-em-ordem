import { createContext } from "react";
import "../styles/global.css"
import { Slot } from "expo-router"


export const loginContext = createContext({
    authenticated: false,
    setAuthenticated: (auth: boolean) => {}
  });

export function Layout(){

    function ficticia(){}
    return (
        <loginContext.Provider value={{authenticated: false, setAuthenticated: ficticia}}>
        <Slot/>
        </loginContext.Provider>
    )
}