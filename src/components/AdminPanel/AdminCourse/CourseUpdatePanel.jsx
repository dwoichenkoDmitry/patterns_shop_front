import React, {useEffect, useRef, useState} from 'react';

import classes from "./CourseUpdatePanel.module.css";
import {useAxios} from "../../Hooks/useAxios";

const CourseUpdatePanel = ({visionFunc, item, listUpdate}) => {

    const [course, setCourse] = useState({...item})

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


    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    const {PostAxios} = useAxios()

    function DeleteCategory() {
        PostAxios("api/courses/DeleteCourse", {id: item.id}).then(()=>{
            visionFunc(false)
            listUpdate()
        })
    }

    function UpdateProduct() {
        const form = new FormData()
        form.append('id', course.id)
        form.append('name', course.name)
        form.append('link', course.link)
        form.append('image', course.image)
        PostAxios("api/courses/UpdateCourse", form).then(()=> {
            visionFunc(false)
            listUpdate()
        })
    }

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <input className={classes.inpElem} defaultValue={item.name} onChange={(e)=> {setCourse({...course, name: e.target.value})}} type="text"/>
                <input className={classes.inpElem} defaultValue={item.link} onChange={(e)=> {setCourse({...course, link: e.target.value})}} type="text"/>
                <input className={classes.inpElem} onChange={(e)=>{setCourse({...course, image: e.target.files[0]})}} type="file"/>
                <div className={classes.btns}>
                    <button onClick={UpdateProduct}>Изменить</button>
                    <button onClick={DeleteCategory}>Удалить</button>
                </div>

            </div>
        </div>
    );
};

export default CourseUpdatePanel;