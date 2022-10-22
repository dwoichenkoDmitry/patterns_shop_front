import React, {useState, useEffect} from 'react';
import classes from './ProductStyles/PanelProductCard.module.css'
import MainInfo from "./ProductInfo/MainInfo";
import Tkani from "./ProductInfo/Tkani";
import Commentaries from "./Commentaries";
import {useAuth} from "../Hooks/useAuth";
import {useAxios} from "../Hooks/useAxios";


const PanelProductCard = ({idProd, product, sizeList}) => {
    const [sizes, setSizes] = useState(sizeList)
    const [actives, setActives] = useState([1,0,0])

    const [navi, ] = useState(['Описание модели', 'Ткань / расход', 'Прибавки'])
    const [activeNav, setNavAct] = useState([1,0,0])
    const [activeSize, setActiveSize] = useState(sizes[0])

    const [sizeOnBag, setSizeOnBag] = useState([])
    const [sizeOnSales, setSizeOnSales] = useState([])

    const {user} = useAuth()

    const {GetAxios, URL} = useAxios()

    useEffect(( ) => {
        setSizes(sizeList)
    },[sizeList])


    let update = false
    useEffect(( ) => {
        if (update) return
        update = true

        GetSizes()
    },[])

    function GetSizes() {
        if(user){
            GetAxios("api/sales/GetSizesOfLogin/"+user.login+'/'+idProd).then((response)=>{
                setSizeOnBag([...response.data.sizesBag])
                setSizeOnSales([...response.data.sizesSaled])
            })
        }
    }

    function ChangeAct(ind){
        let mas = []
        for (let i=0;i<sizes.length;i++){
            mas.push(i===ind? 1:0)
        }
        setActives(mas)
        setActiveSize(sizes[ind])

    }

    function ChangeActNav(ind){
        const mas = navi.map((item, index) => index === ind ? 1 : 0);
        setNavAct(mas)
    }

    function adaptParameters(strok){
        let mas = strok.split('$')
        let ret = []
        let secMas = []
        for(let i=0; i<mas.length; i++){
            if(i%2===0){
                secMas.push(mas[i])
            }
            else {
                secMas.push(mas[i])
                ret.push(secMas)
                secMas = []
            }
        }
        return ret
    }

    const {PostAxios} = useAxios()

    function AddProductOnBag(){

        const form = new FormData()
        form.append('login', user.login)
        form.append('id', product.id)
        form.append('size', sizes[actives.indexOf(1)])

        PostAxios("api/sales/AddProductOnTheBag", form).then(()=> GetSizes())

    }

    return (
        <div>
            <h2>{product.name}</h2>
            <div className={classes.container}>
                <div className={classes.leftSide}>
                    <img src={URL+"img/"+product.image} alt="img"/>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.sizeAndPrice}>
                        <h1 className={classes.price}>{product.price} руб</h1>
                        <h3 className={classes.sizeText}>Выберите размер</h3>
                        <div className={classes.sizes}>
                            {sizes.map((size, index) => <div key={index} onClick={(e) => ChangeAct(index)} className={[classes.size, actives[index]===1? classes.activeSize: ''].join(' ')}>{size}</div>)}
                        </div>
                        <div>
                            {!user?
                                <h2 className={[classes.addProduct, classes.grayBtn].join(' ')}>Авторизуйтесь</h2>
                                :
                                <div>
                                    {sizeOnBag.indexOf(activeSize)!==-1?
                                        <h2 className={[classes.addProduct, classes.grayBtn].join(' ')}>В корзине</h2>
                                        :
                                        <div>
                                            {sizeOnSales.indexOf(activeSize)!==-1?
                                                <h2 className={[classes.addProduct, classes.grayBtn].join(' ')}>В покупках</h2>
                                                :
                                                <h2 onClick={AddProductOnBag} className={[classes.addProduct, classes.redBtn].join(' ')}>Добавить в корзину</h2>
                                            }
                                        </div>

                                    }
                                </div>
                            }
                        </div>

                    </div>
                    <div className={classes.mainInfo}>
                        <div className={classes.navbar}>
                            {navi.map((size, index) =>
                                <h4 key={index} onClick={(e)=> ChangeActNav(index)} className={[classes.navigate ,activeNav[index]===1? classes.avtiveNav : ''].join(' ')}>{size}</h4>)
                            }
                        </div>
                        {activeNav[0]===1?
                            <MainInfo text={product.description}/>

                            :
                            ''
                        }
                        {activeNav[1]===1?
                            <Tkani  text={product.cloth}/>
                            :
                            ''
                        }
                        {activeNav[2]===1?
                            <Tkani  text={product.addition}/>

                            :
                            ''

                        }


                    </div>
                </div>
            </div>
            <Commentaries id={idProd}/>
        </div>
    );
};

export default PanelProductCard;