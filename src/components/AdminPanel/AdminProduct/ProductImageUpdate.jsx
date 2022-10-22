import React, {useEffect, useRef, useState} from 'react';
import classes from './ProductImageUpdate.module.css'
import {useAxios} from "../../Hooks/useAxios";

const ProductImageUpdate = ({visionFunc, idProduct, updateGet}) => {

    const [image, setImage] = useState(null)

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

    const {PostAxios} = useAxios()

    function SendImg() {
        const form = new FormData()
        form.append('image', image)
        form.append('id', idProduct)
        PostAxios("api/products/UpdateProductImage", form)
        updateGet(0)
    }

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} type="file"/>
                    <button onClick={SendImg}  className={classes.sendImgBtn}>Отправить</button>
            </div>
        </div>
    );
};

export default ProductImageUpdate;