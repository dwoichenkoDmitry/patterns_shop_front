import React, {useEffect, useRef, useState} from 'react';
import classes from './CategoryUpdatePanel.module.css'
import {useAxios} from "../../Hooks/useAxios";

const CategoryUpdatePanel = ({visionFunc, category}) => {

    const [changes, setChanges] = useState({name: '', image:''})

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    visionFunc(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    const {PostAxios} = useAxios()

    function ChangeCategory() {
        const form = new FormData()
        if(changes.name==='' && changes.image===''){
            alert("Изменений не обнаружено")

        }
        else{
            if(changes.image===''){
                form.append('imgUpdate', 'false')
            }
            else {
                form.append('imgUpdate', 'true')
                form.append('image', changes.image)
            }
            form.append('name', changes.name===''?category.name:changes.name)
            form.append('id', category.id)
            PostAxios("api/products/changeCategoryForId", form)
        }
        visionFunc(false)
    }

    function deleteCategory() {
        const form = new FormData()
        form.append('id', category.id)
        PostAxios("api/products/deleteCategory", form)
        visionFunc(false)
    }

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <div>
                   <h3>Наименование</h3>
                    <input className={classes.inp} onChange={(e)=>{setChanges({...changes, name: e.target.value})}} type="text" defaultValue={category.name}/>
                </div>
                <div>
                    <h3>Изображение</h3>
                    <input className={classes.inp} onChange={(e)=> {setChanges({...changes, image: e.target.files[0]})}} type="file"/>
                </div>
                <div className={classes.btns}>
                    <button className={classes.changeBtn} onClick={ChangeCategory}>Изменить</button>
                    <button className={classes.changeBtn} onClick={deleteCategory}>Удалить</button>
                </div>

            </div>
        </div>
    );
};

export default CategoryUpdatePanel;