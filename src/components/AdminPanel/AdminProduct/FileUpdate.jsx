import React, {useEffect, useRef, useState} from 'react';
import classes from './FileUpdate.module.css'
import {useAxios} from "../../Hooks/useAxios";
import FileChange from "./FileChange";


const FileUpdate = ({visionFunc, idProduct}) => {

    const {GetAxios, PostAxios} = useAxios()
    const [newFile, setNewFile] = useState({id: idProduct, name: '', file: ''})
    const [sizes, setSizes] = useState([])
    const [vision, setVision] = useState(false)
    const [changedSize, setChangedSize] = useState()

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios("api/products/GetSizesForProductId/"+idProduct).then((response)=>{
            setSizes([...response.data.sizes])
        })
    }, [])

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

    function AddFile() {
        if (newFile.file!=='' && newFile.name !== '') {
            const form = new FormData()
            form.append('name', newFile.name)
            form.append('file', newFile.file)

            PostAxios('api/products/AddNewFileOnProduct', newFile)
        }
    }

    function DeleteSize(size) {
        PostAxios('api/products/DeleteSizeOnProduct', {size: size, id: idProduct})
    }

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)


    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <div className={classes.leftSide}>
                    {sizes.map((item, index)=>
                        <div key={index} className={classes.deletedFiles}>
                            <h3>{item}</h3>
                            <h4 onClick={(e)=> {
                                setChangedSize(item)
                                setVision(true)
                            }}>Изменить</h4>
                            <h4 onClick={(e)=> {DeleteSize(item)}}>Удалить</h4>
                        </div>
                    )

                    }


                </div>
                <div className={classes.rightSide}>
                    <h2>Добавить файл</h2>
                    <input onChange={(e)=> {setNewFile({...newFile, name: e.target.value})}} type="text"/>
                    <input onChange={(e)=> {setNewFile({...newFile, file: e.target.files[0]})}} type="file"/>
                    <h2 onClick={AddFile} className={classes.addBtn}>Добавить</h2>
                </div>
                {vision?
                    <FileChange visionFunc={setVision} idProduct={idProduct} sizeFile={changedSize}/>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default FileUpdate;