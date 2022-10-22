import React, {useState} from 'react';
import classes from "./CourseStyles/VideoObject.module.css";
import PopupPlayer from "./PopupPlayer";
import {useAxios} from "../Hooks/useAxios";

const VideoObject = ({video}) => {
    const [showPopup, setShowPopup] = useState(false)

    function show(){
        setShowPopup(true)
    }

    const {URL} = useAxios()

    return (
        <div onClick={show} className={classes.imgContainer}>
            <img className={classes.imgObj} src={URL + 'img/' + video.image} alt="img"/>
            <h2 className={classes.vidName}>{video.name}</h2>
            {showPopup?
                <PopupPlayer closePopup={setShowPopup} link={video.link}/>
                :
                ''
            }
        </div>
    );
};

export default VideoObject;