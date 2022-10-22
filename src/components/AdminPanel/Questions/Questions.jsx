import React, {useEffect, useState} from 'react';
import classes from './Questions.module.css'
import {useAxios} from "../../Hooks/useAxios";
import QuestionWindow from "./QuestionWindow";


const Questions = () => {

    const {GetAxios} = useAxios()
    const [vision, setVision] = useState(false)

    const [questions, setQuestions] = useState([])

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios("api/GetAllQuestions/").then((request)=> {
            setQuestions(request.data.data)
        })

    },[vision])

    const [questionClickedItem, setClickedItem] = useState({})

    function OpenWindow(item) {
        setClickedItem({...item})
        setVision(true)
    }

    return (
        <div>
            {questions.map((item, index)=>
                <div key={index} onClick={(e) => {OpenWindow(item)} } className={classes.questionItem}>
                    <h3>{item.name}</h3>
                    <h3>{item.realize}</h3>
                </div>
            )

            }

            {questions.length===0?
                <h2>Обращения отсутствуют</h2>
                :
                ''
            }

            {vision?
                <QuestionWindow visionFunc={setVision} item={questionClickedItem} updateList={setQuestions}/>
                :
                ''

            }

        </div>
    );
};

export default Questions;