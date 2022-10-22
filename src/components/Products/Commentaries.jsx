import React, {useState, useEffect, useRef} from 'react';
import classes from './ProductStyles/Commentaries.module.css'
import {useAxios} from "../Hooks/useAxios";
import {useAuth} from "../Hooks/useAuth";

const Commentaries = ({id}) => {

    const {GetAxios, PostAxios, URL} = useAxios()
    const {user} = useAuth()

    const [reload, setReload] = useState(0)

    const [comment, setComment] = useState({
        id:id,
        name: '',
        comment: '',
        image: '',
        day: '',
        month: '',
        year: '',
        hour: '',
        minute: ''
    })

    const [comments, setComments] = useState([])
    useEffect(( ) => {
        GetAxios("api/products/getProductCommentaries/"+id).then((request)=>{
            setComments(request.data.comments)
        })
        let y = reload
    },[reload])



    function AddComment() {
        let date = new Date();
        setComment({
            ...comment,
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth(),
            hour: date.getHours(),
            minute: date.getMinutes()})
        const formData = new FormData()
        formData.append('id', comment.id)
        if(user.name === ''){
            formData.append('name', "Неизвестно")
        }
        else {
            formData.append('name', user.name)
        }

        formData.append('comment', comment.comment)
        formData.append('image', comment.image)
        setTimeout(function(){
            formData.append('day', comment.day)
            formData.append('month', comment.month)
            formData.append('year', comment.year)
            formData.append('hour', comment.hour)
            formData.append('minute', comment.minute)
            PostAxios('api/products/AddComment', formData).then((request) => {
                setReload(reload+1)

            })
        },200);



    }

    return (
        <div>
            <div className={classes.container}>
                <textarea onChange={(e)=> {
                    let date = new Date()
                    setComment({
                        ...comment,
                        comment: e.target.value,
                        year: date.getFullYear(),
                        day: date.getDate(),
                        month: date.getMonth(),
                        hour: date.getHours(),
                        minute: date.getMinutes()
                    })}

                } className={classes.inpAddComment}/>
                <div  className={classes.addCommentsBtns}>
                    <input onChange={(e)=> {
                        let date = new Date()
                        setComment({
                            ...comment,
                            image: e.target.files[0],
                            year: date.getFullYear(),
                            day: date.getDate(),
                            month: date.getMonth(),
                            hour: date.getHours(),
                            minute: date.getMinutes()
                        })}
                    } type="file" accept=".png, .jpg, .jpeg"/>
                    <button onClick={AddComment}>Отправить</button>
                </div>

            </div>
            <div>
                {comments.map((item, index)=>
                    <div key={index} className={classes.container}>
                        <div className={classes.commentInfo}>
                            <h4 className={classes.nameInfo}>{item.name}</h4>
                            <h4 className={classes.dateInfo}>{item.date.split('$')[0]}</h4>
                            <h4 className={classes.dateInfo}>{item.date.split('$')[1]}</h4>
                        </div>
                        <h3>{item.comment}</h3>
                        <div>
                            {item.image===""?
                                ''
                                :
                                <img className={classes.commentImg} src={URL+"img/"+item.image}/>
                            }
                        </div>

                    </div>
                )

                }
            </div>



        </div>

    );
};

export default Commentaries;