import React, {useState} from 'react';
import classes from "./AdminStyles/MainForm.module.css"
import NavAdmins from "./NavAdmins";
import ProductAdd from "./AdminProduct/ProductAdd";
import CategoryNav from "./CategoryUpdate/CategoryNav";
import Questions from "./Questions/Questions";
import CoursesMain from "./AdminCourse/CoursesMain";

const MainForm = () => {
    const [navPos, setNavPos] = useState(1)

    function NavClick(e){
        setNavPos(e.target.id/1)
    }
    return (
        <div className={classes.container}>
            <div className={classes.leftSide}>
                <h2 onClick={NavClick} className={navPos===1? classes.active : classes.nonActive} id="1">Выкройки</h2>
                <h2 onClick={NavClick} className={navPos===2? classes.active : classes.nonActive} id="2">Курсы</h2>
                <h2 onClick={NavClick} className={navPos===3? classes.active : classes.nonActive} id="3">Администраторы</h2>
                <h2 onClick={NavClick} className={navPos===4? classes.active : classes.nonActive} id="4">Категории</h2>
                <h2 onClick={NavClick} className={navPos===5? classes.active : classes.nonActive} id="5">Обращения</h2>
            </div>

            


            <div className={classes.rightSide}>
                {navPos===1?
                    <ProductAdd/>
                    :
                    ''
                }
                {navPos===2?
                    <CoursesMain/>
                    :
                    ''
                }
                {navPos===3?
                    <NavAdmins/>
                    :
                    ''
                }
                {navPos===4?
                    <CategoryNav/>
                    :
                    ''
                }
                {navPos===5?
                    <Questions/>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default MainForm;