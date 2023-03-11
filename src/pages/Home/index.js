import Banner from "../../components/Banner"
import Introduction from "../../components/Introduction"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Home = () => {

    const navigate = useNavigate();
    //logic ketika role admin, maka akan redirect ke halaman dashboard
    useEffect(()=>{
        if(localStorage.getItem('role') === 'admin'){
            navigate('/dashboard')
        }
    }, [navigate])

    return(
        <>
            <Banner/>
            <Introduction/>
        </>
    )
}
export default Home