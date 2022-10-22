import React, {useEffect, useRef, useState} from 'react';
import classes from "./Registration.module.css";
import Alerter from "./UIComponents/Alerter";
import {useAuth} from "./Hooks/useAuth";
import {useAxios} from "./Hooks/useAxios";

const Registration = ({changeVision}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    changeVision(false)
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
    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [mail, setMail] = useState("")
    let [name, setName] = useState("")
    const firstPassword = useRef(null)
    const secondPassword = useRef(null)
    const [stepFirst, setStep] = useState(true)
    const loginRef = useRef(null)
    const mailRef = useRef(null)
    const codeRef = useRef(null)
    const nameRef = useRef(null)
    const [codeAuth, setCode] = useState("78")
    const [showAlerter, setShowAlerter] = useState(false)
    const [alerterMessage, setMessage] = useState('')
    const [AlerterClose, setAlertClose] = useState(true)
    const {signIn} = useAuth();
    const {GetAxios, PostAxios} = useAxios()

    function AddRegistration() {
        if (firstPassword.current.value === secondPassword.current.value && firstPassword.current.value.length > 8) {

            setLogin(loginRef.current.value)
            setMail(mailRef.current.value)
            setPassword(firstPassword.current.value)
            setName(nameRef.current.value)


            GetAxios('api/checkUser/' + loginRef.current.value).then(request => {
                if (request.data.check === 'allowed') {
                    SendCodeApi()
                    setStep(false)
                } else {
                    setMessage("Пользователь с таким логином уже существует")
                    setAlertClose(true)
                    setShowAlerter(true)
                }
            }).catch(err => console.log(err))


        }
    }

    function SendCodeApi() {
        let url = 'api/sendCode/'

        PostAxios(url, {mail: mailRef.current.value}).then(request => {
            setCode(request.data.data)
        })
            .catch(err => console.log(err))
    }

    function ClickAuthCode() {
        if (codeRef.current.value === codeAuth) {
            RegisterUser()
            setMessage("Добро пожаловать, " + login)
            setAlertClose(true)
            const user = {login: login, name:name, mail: mail, staff: false}
            signIn(user)
        } else {
            setMessage("Неудачно, попробуйте ещё раз")
            setAlertClose(false)
        }
        setShowAlerter(true)
    }

    function RegisterUser() {
        let url = 'api/register/'

        PostAxios(url, {login: login, name: name , mail: mail, password: password})
            .catch(err => console.log(err))
    }


    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.RegisterWindow}>
                {stepFirst ?
                    <div>
                        <h1 className={classes.headerText}>Регистрация</h1>
                        <h3>Имя</h3>
                        <input ref={nameRef} type="text"/>
                        <h3>Логин</h3>
                        <input ref={loginRef} type="text"/>
                        <h3>Почта</h3>
                        <input ref={mailRef} type="email"/>
                        <h3>Пароль</h3>
                        <input ref={firstPassword} type="password"/>
                        <h3>Повторите пароль</h3>
                        <input ref={secondPassword} type="password"/>
                        <h2 onClick={AddRegistration} className={classes.RegBtn}>Зарегистрироваться</h2>
                    </div>
                    :

                    <div>
                        <h3 className={classes.secStepText}>Введите код, присланный вам на почту</h3>
                        <input ref={codeRef} maxLength={5} type="text"/>
                        <h2 onClick={ClickAuthCode} className={classes.secStepBtn}>Отправить</h2>
                    </div>


                }

                {showAlerter ?
                    <Alerter
                        functionVisible={changeVision}
                        closeWindow={AlerterClose}
                        showAlert={setShowAlerter}
                        message={alerterMessage}/>
                    :
                    ''
                }

            </div>
        </div>
    );
};

export default Registration;