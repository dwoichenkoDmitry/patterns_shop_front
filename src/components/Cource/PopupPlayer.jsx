import React, {useEffect, useRef} from 'react';
import classes from "./CourseStyles/PopupPlayer.module.css";

const PopupPlayer = ({link, closePopup}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closePopup(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <iframe className={classes.videoObj} src={link}
                        title="YouTube video player" frameBorder="0"
                        allowFullScreen/>
            </div>
        </div>
    );
};

export default PopupPlayer;