import React, {useRef} from 'react';
import classes from "./AdminStyles/NavAdmins.module.css"
import {useAxios} from "../Hooks/useAxios";

const NavAdmins = () => {

    const {PostAxios} = useAxios()

    function RegisterAdmin() {
        let url = 'api/adminRegister/'

        PostAxios(url, {
            login: loginRef.current.value,
            mail: mailRef.current.value,
            password: passwordRef.current.value,
        }).then(request => {
            console.log(request)
        })
            .catch(err => console.log(err))
    }

    const loginRef = useRef(null)
    const mailRef = useRef(null)
    const passwordRef = useRef(null)
    return (
        <div className={classes.container}>
            <div className={classes.inContainer}>
                <h1>Добавление администратора</h1>
                <div className={classes.inputElem}>
                    <h3>Логин</h3>
                    <input ref={loginRef} type="text"/>
                </div>
                <div className={classes.inputElem}>
                    <h3>E-mail</h3>
                    <input ref={mailRef} type="email"/>
                </div>
                <div className={classes.inputElem}>
                    <h3>Пароль</h3>
                    <input ref={passwordRef} type="text"/>
                </div>
                <h2 onClick={RegisterAdmin} className={classes.sendBtn}>Добавить</h2>
            </div>
        </div>
    );
};

export default NavAdmins;