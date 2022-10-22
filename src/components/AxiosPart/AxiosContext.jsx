import React, {createContext} from 'react';
import axios from "axios";

export const AxiosLinkContext = createContext(null)

export const AxiosContext = ({children}) => {
    const URL = "http://localhost:8000/"
    // const URL = "http://45.12.18.136/"

    const GetAxios = async (link) => {
        return await axios.get(URL+link)
    }

    const PostAxios = async (link, obj, body = '') => {
        if (body==='') {
            return await axios.post(URL+link, obj)
        }
        else {
            return await axios.post(URL+link, obj, body)
        }
    }
    const value = {URL, GetAxios, PostAxios}

    return <AxiosLinkContext.Provider value={value}>
        {children}
    </AxiosLinkContext.Provider>
}
