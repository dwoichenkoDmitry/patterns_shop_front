import React, {useEffect, useState} from 'react';
import {useAxios} from "../../Hooks/useAxios";
import classes from "../AdminProduct/ProductUpdate.module.css";
import CourseUpdatePanel from "./CourseUpdatePanel";



const CourseUpdate = () => {
    const [courses, setCourses] = useState([])

    const {URL, GetAxios} = useAxios()

    const [currentCourse, setCurrentCourse] = useState({id:'', name:'', link:''})

    const [vision, setVision] = useState(false)

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        ListUpdate()
    },[vision])

    function ListUpdate() {
        GetAxios("api/courses/GetAllCourses").then((request)=>{
            setCourses(request.data.courses)
        })
    }

    function ChangeVision(item) {
        setCurrentCourse({...item})
        setVision(true)
    }

    return (
        <div>
            {courses.map((item, index)=>
                <div key={index} className={classes.productBody}>
                    <img src={URL+"img/"+item.image}/>
                    <h4>{item.name}</h4>
                    <h3 onClick={(e)=>{ChangeVision(item)}}>Изменить</h3>
                </div>
            )

            }

            {vision?
                <CourseUpdatePanel listUpdate={ListUpdate} visionFunc={setVision} item={currentCourse}/>
                :
                ''
            }
        </div>
    );
};

export default CourseUpdate;