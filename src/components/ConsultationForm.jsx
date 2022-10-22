import React, {useRef, useState} from 'react';
import classes from "./ConsultationForm.module.css";
import Checker from "./UIComponents/Checker";
import {useAxios} from "./Hooks/useAxios";

const ConsultationForm = () => {
    const [showTel, setShowTel] = useState(true)
    const InpRefTel = useRef(null)
    const InpRefMail = useRef(null)
    const [CheckerTel, setCheckerTel] = useState(true)
    const [CheckerMail, setCheckerMail] = useState(false)
    const nameRef = useRef(null)
    const questionRef = useRef(null)
    const {PostAxios} = useAxios()


    function sendQuestion(){
        let url = 'api/questionSave/'
        let name = nameRef.current.value
        let type
        let realise
        let message = questionRef.current.value
        message = message.replace(/\r?\n/g, '<br/>')

        if(showTel===true){
            type = "telephone"
            realise = InpRefTel.current.value
        }
        else {
            type = "mail"
            realise = InpRefMail.current.value
        }

        PostAxios(url, {name: name, type: type, realise: realise, message: message})
            .catch(err => console.log(err))

        nameRef.current.value = ""
        questionRef.current.value = ""
        if(showTel===true){
            InpRefTel.current.value = ""
        }
        else {
            InpRefMail.current.value = ""
        }
    }




    return (
        <div className={classes.ConsultationForm}>
            <h1 className={classes.textMain}>Остались вопросы? Свяжитесь с нами</h1>
            <div className={classes.container}>
                <div className={classes.containerItem}>
                    <p>Как к вам обращаться? <input ref={nameRef} className={classes.nameInp} type="text"/></p>
                    <p>Удобный способ связи</p>
                    <p className={classes.radioInpC}><span>Телефон:<Checker CheckerKey={1}
                                    changeCheck={setShowTel} checkKey={CheckerTel} setFirst={setCheckerTel} setSec={setCheckerMail}/></span>
                        <span>Почта:<Checker CheckerKey={2} changeCheck={setShowTel}
                                             checkKey={CheckerMail} setFirst={setCheckerTel} setSec={setCheckerMail}/></span></p>
                    {showTel?
                        <p><input ref={InpRefTel} type="tel" className={classes.phone_number} placeholder="+7 (900) 123-45-67"
                                  pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"/></p>
                        :
                        <p><input ref={InpRefMail} className={classes.phone_number} placeholder="E-mail" type="email"/></p>
                    }
                    <p>Ваш вопрос</p>
                    <textarea ref={questionRef} className={classes.textAnswer} />
                    <p onClick={sendQuestion} className={classes.sendBtn}>Отправить</p>


                </div>
            </div>
        </div>
    );
};

export default ConsultationForm;