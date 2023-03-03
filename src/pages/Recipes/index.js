import FoodCard from "../../components/FoodCard";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Recipes = () => {

    const navigate = useNavigate();
    //logic ketika tidak ada token, maka harus login terlebih dahulu agar bisa masuk ke halaman recipes
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    }, [navigate])

    return (
        <>
            <FoodCard/>
        </>
    )
}
export default Recipes;