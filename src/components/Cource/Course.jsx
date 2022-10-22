import React from 'react';
import classes from './CourseStyles/Course.module.css'
import MainHeader from "../MainHeader";
import CoursePanel from "./CoursePanel";

const Course = () => {
    return (
        <div>
            <MainHeader/>
            <CoursePanel/>
        </div>
    );
};

export default Course;