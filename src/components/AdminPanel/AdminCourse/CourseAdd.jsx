import React, {useState} from 'react';
import classes from './CourseAdd.module.css'
import {useAxios} from "../../Hooks/useAxios";

const CourseAdd = () => {

    const [course, setCourse] = useState({name:'', link:'', image:''})

    const {PostAxios} = useAxios()

    function SendCourse() {
        const form = new FormData()
        if(course.name!==''&& course.link!=='' && course.image!==''){
            form.append('name', course.name)
            form.append('link', course.link)
            form.append('image', course.image)

            PostAxios("api/courses/AddCourse", form)
        }
    }

    return (
        <div>
            <div>
                <h3>Наименование</h3>
                <input onChange={(e)=>{setCourse({...course, name: e.target.value})}} type="text"/>
            </div>
            <div>
                <h3>Ссылка</h3>
                <input onChange={(e)=>{setCourse({...course, link: e.target.value})}} type="text"/>
            </div>
            <div>
                <h3>Картинка</h3>
                <input onChange={(e)=>{setCourse({...course, image: e.target.files[0]})}} type="file"/>
            </div>
            <button onClick={SendCourse} className={classes.btn}>Создать</button>
        </div>
    );
};

export default CourseAdd;