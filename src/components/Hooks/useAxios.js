import {useContext} from "react";
import {AxiosLinkContext} from "../AxiosPart/AxiosContext";


export function useAxios(){
    return useContext(AxiosLinkContext)
}