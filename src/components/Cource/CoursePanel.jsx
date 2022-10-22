import React, {useState, useEffect} from 'react';
import classes from './CourseStyles/CoursePanel.module.css'
import VideoObject from "./VideoObject";
import {useAxios} from "../Hooks/useAxios";

const CoursePanel = () => {
    const [videos, setVideos] = useState([])

    const {GetAxios} = useAxios()

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios("api/courses/GetAllCourses").then((request)=> {
            setVideos([])
            setVideos([...videos, request.data.courses])
        })
    }, [])

    return (
        <div>
            <h2>Курсы</h2>
            <div className={classes.container}>
                {videos.length>0? videos[0].map((item, index) =>
                    <VideoObject key={index} video={item}/>
                )
                :
                ''
                }


            </div>
        </div>

    );
};

export default CoursePanel;