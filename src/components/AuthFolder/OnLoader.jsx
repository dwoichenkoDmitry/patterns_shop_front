import React, {useEffect} from 'react';
import {useAuth} from "../Hooks/useAuth";

const OnLoader = ({children}) => {
    const {signIn} = useAuth()

    let update = false

    useEffect(() => {
        if(update){return}
        let login = localStorage.getItem("login")
        let name = localStorage.getItem("name")
        let mail = localStorage.getItem("mail")
        let staff = null
        update = true
        if(localStorage.getItem("staff")) {
            staff = localStorage.getItem("staff") === "true"
        }

        console.log(6)

        if(login!==null && mail!==null && staff!== null){
            signIn({login: login, name: name, mail: mail, staff: staff})
        }
    }, [update]);

    return children
};

export default OnLoader;