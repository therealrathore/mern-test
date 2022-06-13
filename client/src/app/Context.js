import React, {useState,createContext, useContext, useEffect} from 'react'
const MainContext = createContext()

const Context = ({children}) => {
   
    const [username, setUsername] = useState()
    const [userID, setUserID] = useState()
    
    useEffect(() => {
       const {userID, username} = JSON.parse(localStorage.getItem('auth'));
       setUserID(userID)
       setUsername(username)
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