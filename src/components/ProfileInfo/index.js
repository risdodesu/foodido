import './index.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultIcon from '../../assets/images/default-icon.jpg'
import {BsPencil, BsEnvelope, BsPerson, BsTelephone, BsCardText} from 'react-icons/bs'
import { Button } from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;

const ProfileInfo = () => {

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

    return(
        <div className="profilePosition">
            <div className='profileContent'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-6 d-flex align-item-center justify-content-center'>
                        <img className='ProfileIcon' alt={data && data.name} onError={iconDefault} src={
                            data && data.profilePictureUrl ? data && data.profilePictureUrl 
                            : defaultIcon}
                        />
                    </div>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <h1 className='border-bottom'><b>{data && data.name}</b></h1>
                        <ul>
                            <li><BsCardText/> {data && data.id}</li>
                            <li><BsEnvelope/> {data && data.email}</li>
                            <li><BsTelephone/> {data && data.phoneNumber}</li>
                            <li><BsPerson/> {data && data.role}</li>
                        </ul>
                        <Button variant='success'>Edit Profile <BsPencil/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;