import './App.css';
import MainHeader from "./components/MainHeader";
import {useState} from "react";
import MainPanelNav from "./components/MainPanelNav";
import NewProductSect from "./components/NewProductSect";
import ConsultationForm from "./components/ConsultationForm";

const HomePage = () => {
    const [adaptSize, setAdaptSize] = useState(false)

    window.addEventListener("resize", resizeWindow)

    function resizeWindow(){
        if(document.documentElement.clientWidth > 700){
            setAdaptSize(false)
        }
        else {
            setAdaptSize(true)
        }
    }



    return (
        <div className="App">
            <MainHeader adaptive={adaptSize}/>
            <MainPanelNav/>
            <NewProductSect/>
            <ConsultationForm/>

        </div>
    );
};

export default HomePage;