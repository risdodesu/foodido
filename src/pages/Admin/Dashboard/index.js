import CardFeatures from "../../../components/Admin/CardFeatures";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Dashboard = () => {

    const navigate = useNavigate();
    //logic ketika tidak ada token dan role bukan admin, maka akan redirect ke halaman login
    useEffect(()=>{
        if (localStorage.getItem('role')!=='admin' || localStorage.getItem('token') ==='null'){
            navigate('/')
        }
    }, [navigate])

    return (
        <div>
            <CardFeatures/>
        </div>
    )
}

export default Dashboard;