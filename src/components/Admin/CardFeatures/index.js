import './index.css'
import { BiFoodMenu, BiGroup } from 'react-icons/bi'
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultIcon from '../../../assets/images/default-icon.jpg'

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;

const CardFeatures = () => {

    const iconDefault = (e) => {
        e.target.src = defaultIcon
    }

    const JWT_TOKEN = localStorage.getItem('token');

    const [data, setData] = useState();

    useEffect(() => {
        if(JWT_TOKEN){
            axios({
                method: 'get',
                url: `${BASE_URL}/api/v1/user`,
                headers: {
                    Authorization: `Bearer ${JWT_TOKEN}`,
                    apiKey: `${API_KEY}`
                }
            })
            .then(function(response){
                setData(response.data.user);
                console.log(response.data.user);
            })
        }
    },[JWT_TOKEN]);
    
    const handleRecipesBtn = () => {
        window.location = '/recipes'
    }
    
    const handleUsersBtn = () => {
        window.location = '/users'
    }

    return (
        <div className='dashboard'>
            <div className='row dashCards container'>
                <div className='col-12 col-md-6 col-lg-6'>
                    <div className='dashAdmCard container'>
                        <h1><b>Welcome {data && data.name}</b></h1>
                        <img className='adminIcon' alt={data && data.name} onError={iconDefault} src={
                            data && data.profilePictureUrl ? data && data.profilePictureUrl 
                            : defaultIcon}
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-6'>
                    <div className='row'>
                        <div onClick={handleRecipesBtn} className='col-6 col-md-12 col-lg-12'>
                            <div className='dashRecipesCard'>
                                <h1><b>Recipes</b> <BiFoodMenu/></h1>
                            </div>
                        </div>
                        <div className='col-6 col-md-12 col-lg-12'>
                            <div onClick={handleUsersBtn} className='dashUsersCard'>
                                <h1><b>Users</b> <BiGroup/></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardFeatures;