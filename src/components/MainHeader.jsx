import React, {useState} from 'react';
import classes from "./MainHeader.module.css";
import Logo from "../img/logo.png"
import Registration from "./Registration";
import SighUp from "./SighUp";
import {Link} from "react-router-dom";
import '../App.css';
import {useAuth} from "./Hooks/useAuth";

const MainHeader = ({adaptive}) => {

    const [register, setRegister] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const {user, signOut} = useAuth()
    function openRegistration() {
        setRegister(true)
    }

    function openSignUp(){
        setSignUp(true)
    }





    return (
        <div className={classes.mainHeaderContainer}>
            <div className={classes.logoRow}>
                <Link className={classes.links} to="/"><img className={classes.logoImg} src={Logo} alt="logo"/></Link>
                <div className={classes.centerLogo}>
                    <h1>LavLi</h1>
                    <div> </div>
                    <h3>С любовью к ангелам</h3>
                </div>
                <div>
                    {user? user.login?
                        <h4><Link className={classes.links} to="/profile"><span>Профиль</span></Link>  /  <span onClick={signOut}>Выйти</span></h4>
                        :
                        <h4><span onClick={openSignUp}>Войти</span>  /  <span onClick={openRegistration}>Зарегистрироваться</span></h4>
                        :
                        <h4><span onClick={openSignUp}>Войти</span>  /  <span onClick={openRegistration}>Зарегистрироваться</span></h4>
                    }
                </div>
            </div>
            {adaptive?
                <div>

                </div>
                :
                <div className={classes.navList}>
                    <Link className={classes.links} to="/categories"><h3>Выкройки</h3></Link>
                    <Link className={classes.links} to="/course"><h3>Курсы</h3></Link>
                    <Link className={classes.links} to="/about"><h3>О нас</h3></Link>
                    {user && user.staff === true ?
                        <Link className={classes.links} to="/admin"><h3>Админ-панель</h3></Link>
                        :
                        ''
                    }
                </div>
            }


            {register ?
                <Registration changeVision={setRegister}/>
                :
                ""
            }
            {signUp?
                <SighUp changeVision={setSignUp}/>
                :
                ""
            }
        </div>
    );
};

export default MainHeader;