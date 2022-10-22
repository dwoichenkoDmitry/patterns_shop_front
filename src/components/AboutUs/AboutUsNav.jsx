import React, {useState} from 'react';
import classes from './AboutStyles/AboutUsNav.module.css'
import AboutPanel1 from "./AboutPanel1";
import AboutPanel2 from "./AboutPanel2";
import AboutPanel3 from "./AboutPanel3";
import AboutPanel4 from "./AboutPanel4";
import AboutPanel5 from "./AboutPanel5";

const AboutUsNav = () => {
    const [navPos, setNavPos] = useState('1')

    const [URL,] = useState('www//:pidoras.ru')

    function NavClick(e){
        console.log(e)
        setNavPos(e.currentTarget.id)
    }


    return (
        <div className={classes.container}>
            <div className={classes.leftSide}>
                <div onClick={NavClick} className={[classes.sideElement, navPos==='1'? classes.active : classes.nonActive].join(' ')} id="1">
                    <h3>О нас</h3>
                </div>
                <div onClick={NavClick} className={[classes.sideElement, navPos==='2'? classes.active : classes.nonActive].join(' ')} id="2">
                    <h3>Реквизиты</h3>
                </div>
                <div onClick={NavClick} className={[classes.sideElement, navPos==='3'? classes.active : classes.nonActive].join(' ')} id="3">
                    <h3>Оплата</h3>
                </div>
                <div onClick={NavClick} className={[classes.sideElement, navPos==='4'? classes.active : classes.nonActive].join(' ')} id="4">
                    <h3>Пользовательское соглашение</h3>
                </div>
                <div onClick={NavClick} className={[classes.sideElement, navPos==='5'? classes.active : classes.nonActive].join(' ')} id="5">
                    <h3>Политика конфиденциальности</h3>
                </div>
            </div>

            <div className={classes.rightSide}>
                {navPos==='1'?
                    <AboutPanel1/>
                    :
                    ''
                }
                {navPos==='2'?
                    <AboutPanel2/>
                    :
                    ''
                }
                {navPos==='3'?
                    <AboutPanel3/>
                    :
                    ''
                }
                {navPos==='4'?
                    <AboutPanel4/>
                    :
                    ''
                }
                {navPos==='5'?
                    <AboutPanel5 URL={URL}/>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default AboutUsNav;