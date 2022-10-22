import React, {useRef, useEffect, useState} from 'react';
import classes from './ChangeProductForId.module.css'
import {useAxios} from "../../Hooks/useAxios";
import ProductImageUpdate from "./ProductImageUpdate";
import FileUpdate from "./FileUpdate";

const ChangeProductForId = ({visionFunc, idProduct, updateGet}) => {

    const [product, setProduct] = useState({name: '', price: '', discount: false, oldPrice: '', description: '', cloth: '', addition: '', course: ''})
    const {GetAxios, PostAxios} = useAxios()
    const [imageUpdateVision, setImageUpdateVision] = useState(false)
    const [checker, setChecker] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [fileUpdateVision, setFileUpdateVision] = useState(false)

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true
        GetAxios("api/products/getProductForId/"+idProduct).then((request) => {
            setProduct(request.data.products)
            setChecker(request.data.products.discount)
        })

        GetAxios("api/products/getAllCategoriesForUpdate").then((response)=> {
            setCategories([...response.data.categories])
        })
    }, [])

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
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

    function DeleteProduct() {
        PostAxios("api/products/DeleteProductForId", {id: idProduct})
        updateGet(0)
        visionFunc(false)

    }

    function ChangeProductMain() {
        PostAxios("api/products/UpdateProductMainInfo", product)
        PostAxios("api/products/ChangeCategoryForProductId", {id: idProduct, categories: selectedCategories})
        updateGet(0)
        visionFunc(false)
    }


    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <div className={classes.flexContainer}>
                    <div className={classes.leftSide}>
                        <div className={classes.inpItem}>
                            <h4>Имя</h4>
                            <input onChange={(e)=>{setProduct({...product, name:e.target.value})}} defaultValue={product.name} type="text"/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Цена</h4>
                            <input onChange={(e)=>{setProduct({...product, price:e.target.value})}} defaultValue={product.price} type="number"/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Скидка</h4>
                            <input onChange={(e)=>{setProduct({...product, discount:e.target.checked})}} defaultChecked={checker} type="checkbox"/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Старая цена</h4>
                            <input onChange={(e)=>{setProduct({...product, oldPrice:e.target.value})}} defaultValue={product.oldPrice} type="number"/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Категории</h4>
                            <div className={classes.checkers}>
                                {categories.map((item, index)=>
                                    <div className={classes.checkersContainer} key={index}>
                                        <p>{item.name}</p>
                                        <input onChange={(e)=>{e.target.checked? setSelectedCategories([...selectedCategories, item.id]): setSelectedCategories(selectedCategories.filter((itemMas)=>itemMas!==item.id))}} type="checkbox"/>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>

                    <div className={classes.rightSide}>
                        <div className={classes.inpItem}>
                            <h4>Описание</h4>
                            <textarea onChange={(e)=>{setProduct({...product, description:e.target.value})}} defaultValue={product.description}/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Ткань</h4>
                            <textarea onChange={(e)=>{setProduct({...product, cloth:e.target.value})}} defaultValue={product.cloth}/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Дополнение</h4>
                            <textarea onChange={(e)=>{setProduct({...product, addition:e.target.value})}} defaultValue={product.addition}/>
                        </div>
                        <div className={classes.inpItem}>
                            <h4>Курс</h4>
                            <input onChange={(e)=>{setProduct({...product, course:e.target.value})}} defaultValue={product.course} type="text"/>
                        </div>
                    </div>
                </div>

                <div className={classes.btns}>
                    <button onClick={DeleteProduct}>Удалить</button>
                    <button onClick={(e)=>{setImageUpdateVision(true)}}>Изменить картинку</button>
                    <button onClick={(e)=>{setFileUpdateVision(true)}}>Изменить файлы</button>
                    <button onClick={ChangeProductMain}>Изменить</button>
                </div>
                {imageUpdateVision?
                    <ProductImageUpdate updateGet={updateGet} idProduct={idProduct} visionFunc={setImageUpdateVision}/>
                    :
                    ''
                }
                {fileUpdateVision?
                    <FileUpdate visionFunc={setFileUpdateVision} idProduct={idProduct}/>
                    :
                    ''
                }
            </div>


        </div>
    );
};

export default ChangeProductForId;