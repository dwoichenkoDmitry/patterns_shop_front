import {createContext, useState} from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({login: '', name: '', staff: '', mail: ''})

    const signIn = (newUser) => {
        localStorage.setItem("login", newUser.login)
        localStorage.setItem("mail", newUser.mail)
        localStorage.setItem("name", newUser.name)
        localStorage.setItem("staff", newUser.staff)
        setUser(newUser)
    }

    const signOut = (() => {
        localStorage.removeItem("login")
        localStorage.removeItem("mail")
        localStorage.removeItem("name")
        localStorage.removeItem("staff")
        setUser(null)
    })

    const checkUserRoot = (() => {
        if(user){
            if(user.staff === true){
                return true
            }
        }
        return false
    })

    const value = {user, signIn, signOut, checkUserRoot}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}