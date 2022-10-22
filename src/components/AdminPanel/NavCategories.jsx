import React, {useRef, useState} from 'react';
import {useAxios} from "../Hooks/useAxios";

const NavCategories = () => {

    const {PostAxios} = useAxios()

    const [image, setImage] = useState('')

    function changeImage(e){
        setImage(e.target.files[0])
    }

    function PostCategory(){
        const formData = new FormData()
        formData.append('photo', image)
        formData.append('name', nameRef.current.value)

        PostAxios('api/products/addCategories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((request)=> {
            console.log(request)})

    }

    const imageRef = useRef(null)
    const  nameRef = useRef(null)


    return (
        <div>
            <input onChange={changeImage} ref={imageRef} type="file"/>
            <input ref={nameRef} type="text"/>
            <button onClick={PostCategory}>Добавить</button>
        </div>
    );
};

export default NavCategories;