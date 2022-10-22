import React, {useEffect, useState} from 'react';
import classes from "./AdminStyles/NavProducts.module.css"
import {useAxios} from "../Hooks/useAxios";


const NavProducts = () => {
    const [inputValues, setInputValues] = useState({name: '', price: '', discount: false,
        oldPrice: '', description: '', cloth: '', addition: '', course: '', image: ''})

    const [files, setFiles] = useState({})
    const [fileSizes, setFileSizes] = useState({})
    const [selectedCategories, setSelectedCategories] = useState([])
    const [fileCount, setFileCount] = useState(1)
    const {GetAxios, PostAxios} = useAxios()

    const [categories, setCategories] = useState([])
    let update = false
    useEffect(( ) => {
        if(update)return
        update=true

        let mas = []
        GetAxios("api/products/allCategories").then((request)=> {
            for (let i=0; i<Object.keys(request.data.data).length; i++) {

                mas.push(request.data.data[i].name)
            }
            setCategories(mas)
        })

    }, []);

    function GetFilesJson(){
        let result = {}
        for(let i=0;i<fileCount;i++){
            if(files[i].file!=='' && fileSizes[i].size!==''){
                result = {...result, [i]:{file: files[i].file, size: fileSizes[i].size}}
            }
        }
        return result
    }

    function CreateProduct() {
        const formData = new FormData()
        formData.append('name', inputValues.name)
        formData.append('price', inputValues.price)
        formData.append('discount', inputValues.discount===true? "true": "false")
        formData.append('oldPrice', inputValues.oldPrice)
        formData.append('description', inputValues.description)
        formData.append('cloth', inputValues.cloth)
        formData.append('addition', inputValues.addition)
        formData.append('course', inputValues.course)
        formData.append('image', inputValues.image)
        formData.append('categories', selectedCategories.join('$'))
        let str = GetFilesJson()

        formData.append('sizes', files)

        let id

        PostAxios("api/products/addProduct", formData).then((request) => {
            id = request.data.id
            for(let i=0;i<Object.keys(str).length;i++){
                const form = new FormData()
                form.append('size', str[i].size)
                form.append('file', str[i].file)
                form.append('id', id)

                PostAxios("api/products/addSizes", form).then((request) => {
                    console.log(request)
                })
            }
        })




    }

    function ClickOptionCategories(e) {
        setSelectedCategories(selectedCategories => [...selectedCategories, e.target.value])
    }

    function deleteRowFile() {
        if(fileCount>0){
            setFileCount(fileCount-1)
            setFiles({...files, [fileCount-1]:''})
            setFileSizes({...files, [fileCount-1]:''})
        }
    }


    return (
        <div className={classes.container}>

            <div className={classes.prodElem}>
                <h4>Наименование</h4>

                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, name: e.target.value})}} type="text"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Цена</h4>
                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, price: e.target.value})}} type="number"/>
            </div>


            <div className={classes.prodElem}>
                <h4>категории</h4>
                <div className={classes.categoriesHeigth}>
                    {
                        categories.map((item, index)=>
                            <div className={classes.containerCategories}>
                                <h5>{item}</h5>
                                <input onChange={(e)=>{e.target.checked? setSelectedCategories([...selectedCategories, item]): setSelectedCategories(selectedCategories.filter((itemMas)=>itemMas!==item))}} type="checkbox"/>
                            </div>


                        )
                    }
                </div>
            </div>
            <div className={classes.prodElem}>
                <h4>Скидка</h4>
                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, discount: e.target.checked})}} type="checkbox"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Старая цена</h4>
                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, oldPrice: e.target.value})}} type="number"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Описание</h4>
                <textarea className={classes.input} onChange={(e)=>{setInputValues({...inputValues, description: e.target.value})}} type="text"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Ткани</h4>
                <textarea className={classes.input} onChange={(e)=>{setInputValues({...inputValues, cloth: e.target.value})}} type="text"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Дополнительно</h4>
                <textarea className={classes.input} onChange={(e)=>{setInputValues({...inputValues, addition: e.target.value})}} type="text"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Ссылка на курсы</h4>
                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, course: e.target.value})}} type="text"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Изображение</h4>
                <input className={classes.input} onChange={(e)=>{setInputValues({...inputValues, image: e.target.files[0]})}} type="file"/>
            </div>
            <div className={classes.prodElem}>
                <h4>Файлы</h4>
                <div>
                    {[...Array(fileCount)].map((item,index) =>
                        <div key={index} className={[classes.prodElem, classes.fileInputContainer].join(' ')}>
                            <input className={classes.fileInput} onChange={(e)=>{setFileSizes({...fileSizes, [index]:{id: index, size: e.target.value}})}}  type="text"/>
                            <input type="file" onChange={(e)=>{setFiles({...files, [index]:{id: index ,file: e.target.files[0]}})}}/>
                        </div>
                    )

                    }
                    <button onClick={()=> setFileCount(fileCount+1)}>+</button>
                    <button onClick={deleteRowFile}>-</button>
                </div>


            </div>
            <button onClick={CreateProduct}>Создать</button>
        </div>
    );
};

export default NavProducts;