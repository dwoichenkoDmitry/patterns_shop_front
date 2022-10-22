import React from 'react';
import classes from './AboutStyles/AboutPanels.module.css'

const AboutPanel2 = () => {
    return (
        <div className={classes.container}>
            <h1 className={classes.headerText}>Реквизиты</h1>
            <h2 className={classes.headerTextUnmain}>Ладочкин Юрий Михайлович</h2>
            <h2 className={classes.headerTextUnmain}><span>Адрес:</span>Свердловская обл. г.Североуральск, ул. Свердлова д. 60 кв. 1; к.т.</h2>
            <h2 className={classes.headerTextUnmain}><span>Т.номер:</span>+79506346726</h2>
            <h2 className={classes.headerTextUnmain}><span>ИНН:</span>660600753064</h2>
            <h2 className={classes.headerTextUnmain}><span>Расчетный счет:</span>40817810716548119561</h2>
            <h2 className={classes.headerTextUnmain}><span>Кор. счет:</span>30101810500000000674</h2>
            <h2 className={classes.headerTextUnmain}><span>БИК:</span>046577674</h2>
            <h2 className={classes.headerTextUnmain}><span>Банк:</span>УРАЛЬСКИЙ БАНК ПАО СБЕРБАНК</h2>
        </div>
    );
};

export default AboutPanel2;