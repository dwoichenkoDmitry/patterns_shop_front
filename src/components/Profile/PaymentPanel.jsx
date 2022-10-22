import React, {useEffect, useRef} from 'react';
import classes from "./ProfileStyles/PaymentPanel.module.css"
import {useAxios} from "../Hooks/useAxios";
import {useAuth} from "../Hooks/useAuth";

const PaymentPanel = ({setVision, price}) => {

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVision(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const {PostAxios} = useAxios()
    const {user} = useAuth()

    function SaleBag() {
            PostAxios('api/sales/SalesProducts', {login: user.login}).then((request)=>{
                if(request.data.payment[1][1].confirmation_url){
                    window.location.href = request.data.payment[1][1].confirmation_url
                    PostAxios('api/sales/CheckPayment', {login: user.login, id: request.data.payment[4][1]})
                }

            })

    }


    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef);



    return (
        <div className={classes.shadowFon}>
            <div ref={wrapperRef} className={classes.RegisterWindow}>
                <div className={classes.leftSide}>
                    <div onClick={SaleBag} className={classes.paymentType}>
                        <img src="https://zapaskin24.ru/wp-content/uploads/2021/11/logo-Ю.png" alt="Юкасса"/>
                    </div>


                </div>

                <div className={classes.rightSide}>
                    <h1>Стоимость покупки</h1>
                    <h1>{price} руб</h1>
                </div>
            </div>
        </div>
    );
};

export default PaymentPanel;