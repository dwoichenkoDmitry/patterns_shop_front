import React, {useEffect, useState} from 'react';
import classes from './CategoryChange.module.css'
import {useAxios} from "../../Hooks/useAxios";
import CategoryUpdatePanel from "./CategoryUpdatePanel";


const CategoryChange = () => {

    const [categories, setCategories] = useState([])
    const [visionPanel, setVisionPanel] = useState(false)
    const [category, setCategory] = useState({id:'', name: ''})

    const {GetAxios, URL} = useAxios()
    let update = false
    useEffect(( ) => {
        if (update) return
        update = true
        GetAxios("api/products/getAllCategoriesForUpdate").then((request)=>{
            setCategories([...request.data.categories])

        })


    },[])


    function ChangeVision(name, id) {
        setCategory({'id': id, 'name': name})
        setVisionPanel(true)
    }

    return (
        <div className={classes.container}>
            {categories.map((item, index) =>
                <div key={index} className={classes.productBody}>
                    <img src={URL+"img/"+item.image}/>
                    <h3>{item.name}</h3>
                    <h3 onClick={(e)=> {ChangeVision(item.name, item.id)}}>Изменить</h3>
                </div>
            )

            }

            {visionPanel?
                <CategoryUpdatePanel category={category} visionFunc={setVisionPanel}/>
                :
                ''
            }

        </div>
    );
};

export default CategoryChange;