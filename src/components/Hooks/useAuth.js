import {useContext} from "react";
import {AuthContext} from "../AuthFolder/AuthProvider";

export function useAuth(){
    return useContext(AuthContext)
}