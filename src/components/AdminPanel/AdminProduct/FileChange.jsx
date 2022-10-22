import React, {useEffect, useRef, useState} from 'react';
import classes from './FileChange.module.css'
import {useAxios} from "../../Hooks/useAxios";



const FileChange = ({visionFunc, idProduct, sizeFile}) => {

    const [changes, setChanges] = useState({file: ''})
    const {PostAxios} = useAxios()

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    visionFunc(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function ChangeFile() {
        if(changes.file!==''){
            const form = new FormData()
            form.append('id', idProduct)
            form.append('size', sizeFile)
            form.append('file', changes.file)
            PostAxios('api/products/UpdateFileOnProduct', form)
        }
    }


    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)


    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <input onChange={(e)=> {setChanges({...changes, file: e.target.files[0]})}} type="file"/>
                <button onClick={ChangeFile}>Изменить</button>
            </div>
        </div>
    );
};

export default FileChange;