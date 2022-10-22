import React, {useState} from 'react';
import classes from './CategoryAdd.module.css'
import {useAxios} from "../../Hooks/useAxios";


const CategoryAdd = () => {

    const {PostAxios} = useAxios()

    const [image, setImage] = useState('')
    const [name, setName] = useState('')


    function PostCategory(){
        const formData = new FormData()
        formData.append('photo', image)
        formData.append('name', name)

        PostAxios('api/products/addCategories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((request)=> {
            console.log(request)})

    }

    return (
        <div>
            <div className={classes.container}>
                <div>
                    <h3>Наименование</h3>
                    <input onChange={(e)=> {setName(e.target.value)}} type="text"/>
                </div>

                <div>
                    <h3>Изображение</h3>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} type="file"/>
                </div>
            </div>
            <button className={classes.sendBtn} onClick={PostCategory}>Отправить</button>
        </div>
    );
};

export default CategoryAdd;