import React, {useState,createContext, useContext, useMemo} from 'react'
const MainContext = createContext()

const Context = ({children}) => {
   
    const [username, setUsername] = useState()
    const [userID, setUserID] = useState()

    useMemo(() => {
       const auth = JSON.parse(localStorage.getItem('auth'));
       setUserID(auth?.userID)
       setUsername(auth?.username)
    },[])

    return (
        <MainContext.Provider 
            value={{
            username,userID
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export default Context

export const MainContextState = () => {
    return useContext(MainContext)
}