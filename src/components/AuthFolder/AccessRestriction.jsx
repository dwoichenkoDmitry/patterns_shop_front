import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useAuth} from "../Hooks/useAuth";


const AccessRestriction = ({children}) => {
    const {user} = useAuth()

    if(user){
        if(user.staff !== true){
            return <Navigate to="/"/>
        }
    }
    else{
        return <Navigate to="/"/>
    }



    return children
};

export default AccessRestriction;