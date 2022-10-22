import React, {useEffect, useRef} from 'react';
import classes from './QuestionWindow.module.css'
import {useAxios} from "../../Hooks/useAxios";


const QuestionWindow = ({visionFunc, item, updateList}) => {

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

    const {GetAxios, PostAxios} = useAxios()

    function DeleteQuestion() {
        PostAxios("api/DeleteQuestion/", {name: item.name, realize: item.realize, text: item.text})
        GetAxios("api/GetAllQuestions/").then((request)=> {
            updateList(request.data.data)
        })
        visionFunc(false)


    }

    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.container}>
                <div className={classes.mainInfo}>
                    <div className={classes.side}>
                        <h3 className={classes.headers}>Имя</h3>
                        <h4 className={classes.datas}>{item.name}</h4>
                    </div>
                    <div className={classes.side}>
                        <h3 className={classes.headers}>Способ связи</h3>
                        <h4 className={classes.datas}>{item.realize}</h4>
                    </div>
                </div>
                <h3 className={classes.headers}>Обращение</h3>

                <h4 className={classes.datas}>{item.text.split('<br />').join('<br>')}</h4>
                <button onClick={DeleteQuestion} className={classes.deleteBtn}>Отвечено</button>
            </div>
        </div>
    );
};

export default QuestionWindow;