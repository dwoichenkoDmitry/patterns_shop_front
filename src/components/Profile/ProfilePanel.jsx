import React, {useState, useEffect} from 'react';
import classes from "./ProfileStyles/ProfilePanel.module.css"
import File from "../../img/plan_raboty.pdf"
import Image from "../../img/productPlace.jpg"
import ChangePassword from "./ChangePassword";
import {useAxios} from "../Hooks/useAxios";
import {useAuth} from "../Hooks/useAuth";
import PaymentPanel from "./PaymentPanel";
import PopupPlayer from "../Cource/PopupPlayer";

const ProfilePanel = () => {
    const [ChangePassVision, setPasswordVision] = useState(false)

    const {GetAxios, PostAxios, URL} = useAxios()
    const {user} = useAuth()

    const [paymentVision, setPaymentVision] = useState(false)
    const [videoVision, setVideoVision] = useState(false)
    const [videoLink, setVideoLink] = useState('')

    const [bagProducts, setBagProducts] = useState([])
    const [saledProducts, setSaledProduct] = useState([])

    const [bagPrice, setBagPrice] = useState(0)

    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetAxios("api/sales/GetProductOnBag/"+user.login).then((response)=>{
            setBagProducts([])
            setBagProducts([response.data.products])
        })
        GetAxios("api/sales/GetSaledProductsForLogin/"+user.login).then((response)=>{
            setSaledProduct([])
            setSaledProduct([response.data.products])
            console.log(response)
        })
    }, [])

    function VisionChangePass() {
        setPasswordVision(true)
    }



    function DeleteOnBag(id, size) {
        const form = new FormData()
        form.append('login', user.login)
        form.append('id', id)
        form.append('size', size)

        PostAxios("api/sales/DeleteProductOnBag", form).then((res)=>{
            GetAxios("api/sales/GetProductOnBag/"+user.login).then((response)=>{
                setBagProducts([])
                setBagProducts([response.data.products])
            })
        })

    }

    function SaleBag() {
        GetAxios("api/sales/CheckBagPrice/"+user.login).then((request)=>{
            setBagPrice(request.data.price)
            setPaymentVision(true)
        })

    }


    return (
        <div className={classes.container}>
            <div className={classes.bag}>
                <div className={classes.headerContainer}>
                    <div/>
                    <div>
                        <h3>Корзина</h3>
                    </div>
                    <div>
                        {bagProducts.length>0? bagProducts[0].length>0?
                            <button className={classes.saleBtn} onClick={SaleBag}>Перейти к оплате</button>
                            :
                            <button className={classes.saleBtn}>Корзина пуста</button>
                            :
                            ''
                        }

                    </div>
                </div>
                <div className={classes.bagFlow}>
                    {bagProducts.length>0? bagProducts[0].map((item, index)=>
                        <div key={index} className={classes.bagElement}>
                            <img className={classes.bagImg} src={URL+'img/'+item.image}/>
                            <h4>{item.name}</h4>
                            <h4>{item.size}</h4>
                            <h4>{item.price} руб.</h4>
                            <h4 onClick={(e)=>{DeleteOnBag(item.id, item.size)}} className={classes.decorateInlineBtn}>Удалить</h4>
                        </div>
                        )
                        :
                        ''
                    }
                </div>
            </div>
            <div className={classes.profInfo}>
                <h3>Профиль</h3>
                <h4>Логин: legomainia</h4>
                <h4>Имя: Дмитрий</h4>
                <h4>Почта: dwoichenko@yandex.ru</h4>
                <h4 className={classes.changePassword} onClick={VisionChangePass}>Сменить пароль</h4>
            </div>
            <div className={classes.sales}>
                <div className={classes.headerContainer}>
                    <h3>Купленные товары</h3>
                </div>

                <div className={classes.bagFlow}>
                    {saledProducts.length>0? saledProducts[0].map((item, index)=>
                        <div key={index} className={classes.bagElement}>
                            <img className={classes.bagImg} src={URL+ 'img/'+item.image}/>
                            <h4>{item.name}</h4>
                            {item.course!==''?
                                <h4 className={classes.video} onClick={(e)=>{
                                    setVideoLink(item.course)
                                    setVideoVision(true)
                                }}>Ролик</h4>
                                :
                                ''
                            }
                            <h4 className={classes.decorateInlineBtn}><a href={URL+'img/'+item.file} target="_blank" rel="noreferrer">Скачать файл</a></h4>
                        </div>
                    )
                        :
                        ''
                    }


                </div>


            </div>
            {ChangePassVision?
                    <ChangePassword setVision={setPasswordVision}/>
                :
                    ''
            }

            {videoVision?
                <PopupPlayer link={videoLink} closePopup={setVideoVision}/>
                :
                ''
            }

            {paymentVision?
                <PaymentPanel price={bagPrice} setVision={setPaymentVision}/>
                :
                ''
            }

        </div>
    );
};

export default ProfilePanel;