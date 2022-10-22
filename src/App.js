import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import Products from "./components/Products/Products";
import {AuthProvider} from "./components/AuthFolder/AuthProvider";
import AdminPanel from "./AdminPanel";
import AccessRestriction from "./components/AuthFolder/AccessRestriction";
import OnLoader from "./components/AuthFolder/OnLoader";
import Course from "./components/Cource/Course";
import ProductCard from "./components/Products/ProductCard";
import ProfileMain from "./components/Profile/ProfileMain";
import {AxiosContext} from "./components/AxiosPart/AxiosContext";
import ProductsByCategory from "./components/Products/ProductsByCategory";
import AboutUsWithHeader from "./components/AboutUs/AboutUsWithHeader";



function App() {


    return(
        <AuthProvider>
            <OnLoader>
                <AxiosContext>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/categories" element={<Products/>}/>
                        <Route path="/categories/:name" element={<ProductsByCategory/>}/>
                        <Route path="/course" element={<Course/>}/>
                        <Route path="/about" element={<AboutUsWithHeader/>}/>
                        <Route path="/admin" element={<AccessRestriction><AdminPanel/></AccessRestriction>}/>
                        <Route path="/products/:id" element={<ProductCard/>}/>
                        <Route path="/profile" element={<AccessRestriction><ProfileMain/></AccessRestriction>}/>
                    </Routes>
                </AxiosContext>


            </OnLoader>
        </AuthProvider>
    )
}

export default App;
