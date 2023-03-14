import ProfileInfo from "../../components/ProfileInfo"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {

    const navigate = useNavigate();
    //logic ketika tidak ada token, maka akan redirect ke halaman utama
    useEffect(()=>{
        if (!localStorage.getItem('token')){
            navigate('/')
        }
    }, [navigate])

    return(
        <>
            <ProfileInfo/>
        </>
    )
}

export default Profile;